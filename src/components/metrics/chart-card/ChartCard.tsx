"use client";

import { useTheme } from "next-themes";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import type { CurveType } from "recharts/types/shape/Curve";

import { Card } from "@/components/ui/card";
import KebabButton from "@/components/KebabButton";

import { mockChartData } from "@/data/mock-data/chart-data";

import { COLORS } from "@/constants/colors";
import ChartTooltip from "./ChartTooltip";

export default function ChartCard({ lineType }: { lineType: CurveType }) {
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
                <stop
                  offset="5%"
                  stopColor={COLORS.CHART_CARD.green.fill}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={COLORS.CHART_CARD.green.fill}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <Area
              type={lineType}
              dataKey="pv"
              fill="url(#colorPv)"
              // fill={COLORS.CHART_CARD.green.fill}
              stroke={COLORS.CHART_CARD.green.stroke}
            />
            <Tooltip content={<ChartTooltip />} />
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
