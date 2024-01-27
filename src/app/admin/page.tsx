import React from "react";
import { Table } from "@/components/ui/table";
import AddMetricModal from "@/components/add-metric/AddMetricModal";

export default async function AdminPage() {
  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-2xl">Admin Page</h1>
      <div className="flex justify-between px-1 py-1">
        <h1 className="font-bold text-xl pt-12">Current Stats Canada Tables</h1>
        <AddMetricModal />
      </div>
    </div>
  );
}
