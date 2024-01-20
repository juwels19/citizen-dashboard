"use client";

import KebabButton from "@/components/KebabButton";
import { Card } from "../../ui/card";

export default function KPICard({
  title,
  metric,
}: {
  title: string;
  metric: string;
}) {
  // w-64 md:w-72 lg:w-80 h-24
  return (
    <Card className="rounded-xl col-span-2 md:col-span-4">
      <div className="flex flex-col justify-center align-middle w-full h-full px-4 gap-2">
        <div className="flex justify-between">
          <p className="text-wrap">{title}</p>
          <KebabButton />
        </div>
        <p className="font-bold text-3xl">{metric}</p>
      </div>
    </Card>
  );
}
