import {
  STATS_CANADA_API_LIMIT,
  STATS_CANADA_REFETCH_DELAY_MS,
} from "@/constants/common";
import { HTTP_RESPONSE } from "@/constants/http-responses";
import {
  fetchStatsCanadaCoordInfo,
  fetchStatsCanadaData,
} from "@/data/statsCanada/fetcher";
import { CoordinateType } from "@/data/statsCanada/types";
import {
  addStatsCanadaData,
  addStatsCanadaTable,
  getStatsCanadaTable,
  getUser,
} from "@/db/actions";
import { InsertStatsCanadaData, InsertStatsCanadaTable } from "@/db/schema";
import { formatCoordinate } from "@/lib/utils";
import { DateTime } from "luxon";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const { userId, selectedCoordinates, productId } = await req.json();

  if (selectedCoordinates.length === 0)
    return new Response("Error", {
      status: HTTP_RESPONSE.BAD_REQUEST,
      statusText: `You must select at least one coordinate.`,
    });

  // Get user and check if they are an admin
  const user = await getUser(userId);

  if (!user?.isAdmin)
    return new Response("Error", {
      status: HTTP_RESPONSE.UNAUTHORIZED,
      statusText: "You are unauthorized to perform this action.",
    });

  // Check if the table already exists
  const table = await getStatsCanadaTable(productId);

  if (table)
    return new Response("Error", {
      status: HTTP_RESPONSE.BAD_REQUEST,
      statusText: `Table with product ID ${productId} already exists.`,
    });

  // Data creation is allowed at this point

  // Fetch cube metadata and coordinates series
  const formattedCoordinates: string[] = selectedCoordinates.map(
    (coordinate: CoordinateType) => formatCoordinate(coordinate.coordinate)
  );

  //////////////////////////////////////// Batch fetching for metadata
  let metadataBatch = [];
  let metadata = [];
  let index = 0;

  while (index !== formattedCoordinates.length) {
    if (metadataBatch.length < STATS_CANADA_API_LIMIT - 1) {
      const coordinate = formattedCoordinates[index];
      metadataBatch.push(
        fetchStatsCanadaCoordInfo({
          productId,
          coordinate,
          method: "POST",
          action: "getSeriesInfoFromCubePidCoord",
        })
      );
      index++;
      continue;
    }

    // If we reach here, we know that the metadataBatch array is just under the API rate limit
    // so we should add a promise that takes 1.5 seconds to resolve to refresh the rate limit
    metadataBatch.push(
      new Promise((resolve) =>
        setTimeout(resolve, STATS_CANADA_REFETCH_DELAY_MS)
      )
    );
    metadata.push(...(await Promise.all(metadataBatch)));
    metadataBatch = [];
  }

  // Need to push the last remaining data to the array
  metadata.push(...(await Promise.all(metadataBatch)));

  // Filter out undefined since that's the return value of the delay
  metadata = metadata.filter((item) => item !== undefined);

  console.log(metadata.length);

  // Add another delay between metadata and data fetching for added resilience
  setTimeout(() => {}, STATS_CANADA_REFETCH_DELAY_MS);

  //////////////////////////////////////// Batch fetching for data
  let dataBatch = [];
  let data = [];
  index = 0;

  while (index !== formattedCoordinates.length) {
    if (dataBatch.length < STATS_CANADA_API_LIMIT - 1) {
      const coordinate = formattedCoordinates[index];
      dataBatch.push(
        fetchStatsCanadaData({
          productId,
          coordinate,
          method: "POST",
          action: "getDataFromCubePidCoordAndLatestNPeriods",
        })
      );
      index++;
      continue;
    }

    // If we reach here, we know that the dataBatch array is just under the API rate limit
    // so we should add a promise that takes 1.5 seconds to resolve to refresh the rate limit
    dataBatch.push(
      new Promise((resolve) =>
        setTimeout(resolve, STATS_CANADA_REFETCH_DELAY_MS)
      )
    );
    data.push(...(await Promise.all(dataBatch)));
    dataBatch = [];
  }

  // Need to push the last remaining data to the array
  data.push(...(await Promise.all(dataBatch)));

  // Filter out undefined since that's the return value of the delay
  data = data.filter((item) => item !== undefined);

  console.log(data.length);

  // First save the table
  // const tableData: InsertStatsCanadaTable = {
  //   productId,
  //   authorId: user.id,
  //   createdAt: DateTime.now().toISO(),
  //   updatedAt: DateTime.now().toISO(),
  // };

  // const insertTableResult = await addStatsCanadaTable(tableData);

  // if (insertTableResult.rowsAffected !== 1)
  //   return new Response("Error", {
  //     status: HTTP_RESPONSE.SERVER_ERROR,
  //     statusText: `Database error. Please try again.`,
  //   });

  // Once table is saved, save all the data

  // const valuesToInsert: InsertStatsCanadaData[] = [];
  // const fetchedTable = await getStatsCanadaTable(productId);

  // if (!fetchedTable)
  //   return new Response("Error", {
  //     status: HTTP_RESPONSE.SERVER_ERROR,
  //     statusText: `Database error. Please try again.`,
  //   });

  // for (let i = 0; i < data.length; i++) {
  //   for (const dataPoint of data[i]) {
  //     valuesToInsert.push({
  //       productId,
  //       tableId: fetchedTable.id,
  //       coordinate: metadata[i].coordinate,
  //       label: metadata[i].SeriesTitleEn,
  //       labelFr: metadata[i].SeriesTitleFr,
  //       refPeriod: dataPoint.refPer,
  //       value: dataPoint.value,
  //       createdAt: DateTime.now().toISO(),
  //       updatedAt: DateTime.now().toISO(),
  //     });
  //   }
  // }

  // const addDataResult = await addStatsCanadaData(valuesToInsert);

  return new Response("Success", { status: HTTP_RESPONSE.OK });
}
