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

  // Metric creation is allowed at this point

  // Fetch cube metadata and coordinates series
  const formattedCoordinates: string[] = selectedCoordinates.map(
    (coordinate: CoordinateType) => formatCoordinate(coordinate.coordinate)
  );

  const metadataPromises = formattedCoordinates.map(async (coordinate) => {
    const res = await fetchStatsCanadaCoordInfo({
      productId,
      coordinate,
      method: "POST",
      action: "getSeriesInfoFromCubePidCoord",
    });
    return res[0].object;
  });

  const dataPromises = formattedCoordinates.map(async (coordinate) => {
    const res = await fetchStatsCanadaData({
      productId,
      coordinate,
      method: "POST",
      action: "getDataFromCubePidCoordAndLatestNPeriods",
    });
    return res[0].object.vectorDataPoint;
  });

  const metadata = await Promise.all(metadataPromises);
  const data = await Promise.all(dataPromises);

  // console.log(metadata);
  // console.log(data);

  // First save the table
  const tableData: InsertStatsCanadaTable = {
    productId,
    authorId: user.id,
    createdAt: DateTime.now().toISO(),
    updatedAt: DateTime.now().toISO(),
  };

  const insertTableResult = await addStatsCanadaTable(tableData);

  if (insertTableResult.rowsAffected !== 1)
    return new Response("Error", {
      status: HTTP_RESPONSE.SERVER_ERROR,
      statusText: `Database error. Please try again.`,
    });

  // Once table is saved, save all the data

  const valuesToInsert: InsertStatsCanadaData[] = [];
  const fetchedTable = await getStatsCanadaTable(productId);

  if (!fetchedTable)
    return new Response("Error", {
      status: HTTP_RESPONSE.SERVER_ERROR,
      statusText: `Database error. Please try again.`,
    });

  for (let i = 0; i < data.length; i++) {
    for (const dataPoint of data[i]) {
      valuesToInsert.push({
        productId,
        tableId: fetchedTable.id,
        coordinate: metadata[i].coordinate,
        label: metadata[i].SeriesTitleEn,
        labelFr: metadata[i].SeriesTitleFr,
        refPeriod: dataPoint.refPer,
        value: dataPoint.value,
        createdAt: DateTime.now().toISO(),
        updatedAt: DateTime.now().toISO(),
      });
    }
  }

  const addDataResult = await addStatsCanadaData(valuesToInsert);

  return new Response("Success", { status: HTTP_RESPONSE.OK });
}
