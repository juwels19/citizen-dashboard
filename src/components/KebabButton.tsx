"use client";

import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

export default function KebabButton({
  href,
  className,
}: {
  href?: string;
  className?: string;
}) {
  return (
    <EllipsisHorizontalIcon
      className={cn(
        "size-6 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-all ease-linear duration-400 rounded-full",
        className
      )}
      // TODO: replace this onclick logic with router logic
      onClick={() => console.log("clicked menu button")}
    />
  );
}
