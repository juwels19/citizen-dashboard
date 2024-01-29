"use client";

import React from "react";
import { Table } from "@/components/ui/table";
import AddMetricModal from "@/components/add-metric/AddMetricModal";

import useSWR from "swr";
import { StatsCanadaTable } from "@/db/schema";

export default function AdminPage() {
  const {
    data: tables,
    isLoading,
    mutate,
  } = useSWR(
    "/api/stats-canada/metrics/fetch",
    (url) => fetch(url).then((res) => res.json()),
    { revalidateOnFocus: false }
  );

  console.log(tables);

  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-2xl">Admin Page</h1>
      <div className="flex justify-between px-1 py-1">
        <h1 className="font-bold text-xl pt-12">Current Stats Canada Tables</h1>
        <AddMetricModal />
      </div>
      {!isLoading &&
        tables &&
        tables.tables.map((table: StatsCanadaTable) => {
          return <p>{table.productId}</p>;
        })}
    </div>
  );
}
