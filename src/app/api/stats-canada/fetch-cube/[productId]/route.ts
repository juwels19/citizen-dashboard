import { fetchStatsCanadaCube } from "@/data/statsCanada/fetcher";
import {
  CubeDimensionType,
  CubeMemberType,
  FetchStatsCanadaProps,
} from "@/data/statsCanada/types";
import { generateCubeCombinations } from "./generateCooridnates";
import { CoordinateType } from "@/data/statsCanada/types";

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  const productId = params.productId;

  const fetchProps: FetchStatsCanadaProps = {
    method: "POST",
    action: "getCubeMetadata",
    productId: parseInt(productId),
  };

  const cubeData = (await fetchStatsCanadaCube(fetchProps))[0];

  const fetchStatus = cubeData.status;
  const dimensions = cubeData.object.dimension;

  const arrayOfMembers = [];

  for (const dimension of dimensions) {
    arrayOfMembers.push(dimension.member);
  }

  const combinations = generateCubeCombinations(arrayOfMembers);

  const coordinates: CoordinateType[] = [];

  for (const combination of combinations) {
    const label = [];
    const coordinate = [];

    for (const member of combination) {
      label.push(member.memberNameEn);
      coordinate.push(member.memberId.toString());
    }

    coordinates.push({
      label: label.join(" - "),
      coordinate: coordinate.join("."),
    });
  }

  return Response.json({ productId: parseInt(productId), coordinates });
}
