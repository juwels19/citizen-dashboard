import DataCardDropArea from "@/components/drag-and-drop/DataCardDropArea";
import DragDropArea from "@/components/drag-and-drop/DragDropArea";
import DraggableCard from "@/components/drag-and-drop/DraggableCard";
import { fetchStatsCanada } from "@/data/statsCanada/fetcher";
import { FetchStatsCanadaProps } from "@/data/statsCanada/types";

export default async function DashboardPage() {
  const fetchProps: FetchStatsCanadaProps = {
    method: "POST",
    action: "getDataFromCubePidCoordAndLatestNPeriods",
    productId: 36100434,
    coordinate: "1.1.1.1.0.0.0.0.0.0",
  };
  // const gdpData = await fetchStatsCanada(fetchProps);
  // console.log(gdpData[0].object.vectorDataPoint);

  // This file will probably contain all of the logic to get the required data for the dashboard
  return (
    <div className="">
      <DragDropArea>
        <DataCardDropArea id={1} />
        <DataCardDropArea id={2} />
        <DataCardDropArea id={3} />
        <DataCardDropArea id={4} />
        <DataCardDropArea id={5} />
        <DraggableCard id={1} />
      </DragDropArea>
    </div>
  );
}
