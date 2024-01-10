"use client";
import KebabButton from "@/components/KebabButton";

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import type { CurveType } from "recharts/types/shape/Curve";
import type { TooltipProps } from "recharts";

import { Card } from "@/components/ui/card";

import { mockChartData } from "@/data/mock-data/chart-data";

export default function ChartCard({ lineType }: { lineType: CurveType }) {
  const CustomTooltip = ({
    active,
    payload,
    label,
  }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      console.log(payload);
      const _payload = payload[0].payload;
      return (
        <div className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-950 shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50">
          <span className="font-semibold">
            {/* TODO: Make these values properties of the chart card */}
            {_payload.date}: {_payload.pv}
          </span>
        </div>
      );
    }
  };

  return (
    <Card className="relative rounded-xl size-96">
      <div className="absolute flex flex-col justify-center align-middle w-full h-full px-4 py-4">
        <div className="flex justify-center">
          <p className="font-semibold text-center text-2xl sticky">
            Annual Inflation Rate
          </p>
          {/* <KebabButton /> */}
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={mockChartData} margin={{ top: 30 }}>
            <defs>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area type={lineType} dataKey="pv" fill="url(#colorPv)" />
            <Tooltip content={<CustomTooltip />} />
            <XAxis
              dataKey="name"
              interval="preserveStartEnd"
              axisLine={false}
              className="lg:hidden"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
