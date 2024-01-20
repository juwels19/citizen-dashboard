"use client";

import DataCardDropArea from "@/components/drag-and-drop/DataCardDropArea";
import DragDropArea from "@/components/drag-and-drop/DragDropArea";
import { useState } from "react";
import ChartCard from "../metrics/chart-card/ChartCard";
import KPICard from "../metrics/kpi-card/KPICard";
import TextCard from "../metrics/text-card/TextCard";
import DashboardGrid from "../DashboardGrid";

// I think dashboard ID should be a string UUID
export default function Dashboard({ dashboardId }: { dashboardId?: string }) {
  // Make a call to an api route to query the db to pull the dashboard

  return (
    <DragDropArea>
      <div className="flex flex-col pb-10 gap-8">
        <div className="flex flex-col w-full gap-2">
          <p className="font-semibold text-xl">Section Title</p>
          {/* This is the grid implementation */}
          <DashboardGrid>
            <KPICard title="Testing a longer title" metric="$12,000" />
            <TextCard
              title="Testing Title"
              content="This is what the text card will render and hopefully the card causes some wrapping that is really really long"
            />
            <TextCard
              title="Testing Title"
              content="This is what the text card will render"
            />
            <KPICard title="Testing a longer title" metric="$12,000" />
          </DashboardGrid>
          <DashboardGrid>
            <ChartCard lineType="monotone" />
            <ChartCard lineType="monotone" />
          </DashboardGrid>
          {/* This is the flexbox implementation */}
          {/* <div className="flex flex-col md:flex-row gap-4 flex-wrap">
            <div className="grow">
              <KPICard title="Testing a longer title" metric="$12,000" />
            </div>
            <div className="grow">
              <KPICard title="Test" metric="$12,000" />
            </div>
            <div className="grow">
              <KPICard title="Test" metric="$12,000" />
            </div>
            <div className="grow">
              <KPICard title="Test" metric="$12,000" />
            </div>
            <div className="grow">
              <KPICard title="Test" metric="$12,000" />
            </div>
            <div className="grow">
              <KPICard title="Test" metric="$12,000" />
            </div>
          </div>
          <div className="flex flex-col w-full md:flex-row gap-4 flex-wrap">
            <div className="">
              <ChartCard lineType="monotone" />
            </div>
            <div className="">
              <ChartCard lineType="monotone" />
            </div>
            <div className="">
              <ChartCard lineType="monotone" />
            </div>
            <div className="">
              <ChartCard lineType="monotone" />
            </div>
            <div className="">
              <ChartCard lineType="monotone" />
            </div>
            <div className="">
              <ChartCard lineType="monotone" />
            </div>
          </div> */}
        </div>
      </div>
    </DragDropArea>
  );
}
