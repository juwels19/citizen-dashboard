import { TooltipProps } from "recharts";

export default function ChartTooltip({
  active,
  payload,
  label,
}: TooltipProps<number, string>) {
  if (active && payload && payload.length) {
    // console.log(payload);
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
}
