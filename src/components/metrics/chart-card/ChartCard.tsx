"use client";

import { useTheme } from "next-themes";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import type { CurveType } from "recharts/types/shape/Curve";

import { Card } from "@/components/ui/card";

import { mockChartData } from "@/data/mock-data/chart-data";

import { COLORS } from "@/constants/colors";
import ChartTooltip from "./ChartTooltip";
import { useEffect, useState } from "react";
import ChartCardSkeleton from "./ChartCardSkeleton";

export default function ChartCard({
  lineType,
  loading,
}: {
  lineType: CurveType;
  loading?: boolean;
}) {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  const colorScheme = "red"; // Add logic here to determine if the trend it up/down and set this to the correct value

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || loading) {
    return <ChartCardSkeleton />;
  }

  return (
    <Card className="relative rounded-xl size-96">
      <div className="absolute flex flex-col justify-center align-middle w-full h-full px-4 py-4">
        <div className="flex flex-col">
          <p className="font-semibold text-2xl sticky">Annual Inflation Rate</p>
          <p>Up 10% since 2019</p>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={mockChartData} margin={{ top: 30 }}>
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={COLORS.CHART_CARD[`${colorScheme}`].fill}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={COLORS.CHART_CARD[`${colorScheme}`].fill}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <Area
              type={lineType}
              dataKey="pv"
              fill="url(#areaGradient)"
              stroke={COLORS.CHART_CARD[`${colorScheme}`].stroke}
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
