// Convert this into all possible options later (only use PID and Coordinate lookups)
export type StatsCanadaActions = 'getDataFromCubePidCoordAndLatestNPeriods';

export type FetchStatsCanadaProps = {
  action: StatsCanadaActions;
  method: 'GET' | 'POST';
  productId: number;
  coordinate: string;
  latestN?: number;
};
