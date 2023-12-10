import { fetchStatsCanada } from '@/data/statsCanada/fetcher';
import { FetchStatsCanadaProps } from '@/data/statsCanada/types';

export default async function DashboardPage() {
  const fetchProps: FetchStatsCanadaProps = {
    method: 'POST',
    action: 'getDataFromCubePidCoordAndLatestNPeriods',
    productId: 36100434,
    coordinate: '1.1.1.1.0.0.0.0.0.0',
  };
  const gdpData = await fetchStatsCanada(fetchProps);
  console.log(gdpData[0].object.vectorDataPoint);
  return <div></div>;
}
