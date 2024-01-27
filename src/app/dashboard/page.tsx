import DataCardDropArea from "@/components/drag-and-drop/DataCardDropArea";
import DragDropArea from "@/components/drag-and-drop/DragDropArea";
import DraggableCard from "@/components/drag-and-drop/DraggableCard";
import ChartCard from "@/components/metrics/chart-card/ChartCard";
import KPICard from "@/components/metrics/kpi-card/KPICard";
import { fetchStatsCanadaData } from "@/data/statsCanada/fetcher";
import { FetchStatsCanadaProps } from "@/data/statsCanada/types";
import Dashboard from "@/components/dashboard/Dashboard";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default async function DashboardPage() {
  const fetchProps: FetchStatsCanadaProps = {
    method: "POST",
    action: "getDataFromCubePidCoordAndLatestNPeriods",
    productId: 36100434,
    coordinate: "1.1.1.1.0.0.0.0.0.0",
  };
  // const gdpData = await fetchStatsCanada(fetchProps);
  // console.log(gdpData);
  // console.log(gdpData[0].object.vectorDataPoint);

  // This file will probably contain all of the logic to get the required data for the dashboard
  // return (
  //   <DragDropArea>
  //     <div className="grid gap-4 pb-10 grid-cols-4 md:grid-cols-8 lg:grid-cols-12">
  //       {/* <DataCardDropArea id={1} />
  //       <DataCardDropArea id={2} />
  //       <DataCardDropArea id={3} />
  //       <DataCardDropArea id={4} />
  //       <DataCardDropArea id={5} /> */}
  //       {/* <DraggableCard id={1} /> */}

  //       {/* <div className="col-span-4 gap-4 flex flex-col">
  //         <KPICard title="Government Debt:" metric="$40 billion" />
  //         <KPICard title="Government Debt:" metric="$40 billion" />
  //       </div>
  //       <ChartCard lineType="monotone" />
  //       <ChartCard lineType="monotone" />
  //       <ChartCard lineType="monotone" /> */}
  //     </div>
  //   </DragDropArea>
  // );

  return (
    <div className="flex flex-col">
      <DashboardHeader />
      <Dashboard />
    </div>
  );
}
