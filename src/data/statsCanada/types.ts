// Convert this into all possible options later (only use PID and Coordinate lookups)
export type StatsCanadaActions =
  | "getDataFromCubePidCoordAndLatestNPeriods"
  | "getCubeMetadata"
  | "getSeriesInfoFromCubePidCoord";

export type FetchStatsCanadaProps = {
  action: StatsCanadaActions;
  method: "GET" | "POST";
  productId: number;
  coordinate?: string;
  vector?: string;
  latestN?: number;
};

export type CubeMemberType = {
  memberId: number;
  parentMemberId: number | null;
  memberNameEn: string;
  memberNameFr: string;
  classificationCode: string;
  classificationTypeCode: string;
  geoLevel: number;
  vintage: number;
  terminated: 0 | 1;
  memberUomCode: number | null;
};

export type CubeDimensionType = {
  dimensionNameEn: string;
  dimensionNameFr: string;
  dimensionPositionId: number;
  hasUOM: boolean;
  member: CubeDimensionType[];
};

export type CoordinateType = {
  label: string;
  coordinate: string;
};
