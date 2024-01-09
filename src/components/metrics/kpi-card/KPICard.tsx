"use client";

import { Card } from "../../ui/card";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";

export default function KPICard({
  title,
  metric,
}: {
  title: string;
  metric: string;
}) {
  return (
    <Card className="rounded-xl w-80 h-24">
      <div className="flex flex-col justify-center align-middle w-full h-full px-4 gap-2">
        <div className="flex justify-between">
          <p className="text-wrap">{title}</p>
          <EllipsisHorizontalIcon
            className="size-6 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-all ease-linear duration-400 rounded-full"
            onClick={() => console.log("clicked menu button")}
          />
        </div>
        <p className="font-bold text-3xl">{metric}</p>
      </div>
    </Card>
  );
}
