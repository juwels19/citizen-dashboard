import React from "react";

export default function DashboardGrid({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 auto-rows-fr gap-4">
      {children}
    </div>
  );
}
