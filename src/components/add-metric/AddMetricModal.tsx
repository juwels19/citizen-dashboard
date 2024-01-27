"use client";

import React, { useState } from "react";
import { Loader2 } from "lucide-react";

import { swrFetcher } from "@/lib/utils";
import useSWR from "swr";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { statsCanadaFetchCubeSchema } from "@/data/statsCanada/schema";
import { CoordinateType } from "@/data/statsCanada/types";

import { Input } from "../ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddMetricCommandItem from "./AddMetricCommandItem";

export default function AddMetricModal() {
  interface CubeData {
    productId: number;
    coordinates: CoordinateType[];
  }

  const [productId, setProductId] = useState<string | null>(null);
  const [selectedCoordinates, setSelectedCoordinates] = useState<{
    [key: string]: boolean;
  }>({});

  const { data, isLoading: isCubeLoading } = useSWR<CubeData>(
    () => (productId ? `/api/stats-canada/fetch-cube/${productId}` : null),
    swrFetcher,
    { revalidateOnFocus: false }
  );

  const fetchCubeForm = useForm<z.infer<typeof statsCanadaFetchCubeSchema>>({
    resolver: zodResolver(statsCanadaFetchCubeSchema),
    defaultValues: {
      productId: undefined,
    },
  });

  const onFetchCubeFormSubmit = (
    values: z.infer<typeof statsCanadaFetchCubeSchema>
  ) => {
    setProductId(values.productId);
  };

  const handleItemClick = (coordinate: string) => {
    const newCoordinates = selectedCoordinates;
    if (selectedCoordinates[coordinate]) {
      delete newCoordinates[coordinate];
    } else {
      newCoordinates[coordinate] = true;
    }

    setSelectedCoordinates(newCoordinates);
  };

  return (
    <Dialog
      onOpenChange={() => {
        setProductId(null);
      }}
    >
      <DialogTrigger asChild>
        <Button className="self-end" onClick={() => fetchCubeForm.reset()}>
          Add new data
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Data Onboarding
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col py-4 gap-8">
          <Form {...fetchCubeForm}>
            <form onSubmit={fetchCubeForm.handleSubmit(onFetchCubeFormSubmit)}>
              <p className="mb-2">Stats Canada Product ID:</p>
              <div className="flex gap-8">
                <FormField
                  control={fetchCubeForm.control}
                  name="productId"
                  render={({ field }) => (
                    <FormItem className="gap-8 space-y-0">
                      <div className="flex flex-col gap-2">
                        <FormControl>
                          <Input {...field} placeholder="Product ID" />
                        </FormControl>
                        <FormMessage className="dark:text-red-500" />
                      </div>
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="self-start flex gap-2 grow"
                  disabled={isCubeLoading}
                >
                  {isCubeLoading && <Loader2 className="animate-spin" />}
                  Fetch Table
                </Button>
              </div>
            </form>
          </Form>
          {data && (
            <Command className="rounded-lg border shadow-md">
              <CommandInput
                placeholder={`Type in a series name for cube ${data.productId}...`}
              />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                {data.coordinates.map((coordinate, index) => {
                  return (
                    <AddMetricCommandItem
                      key={`coordinate-item-${index}`}
                      label={`${coordinate.coordinate}: ${coordinate.label}`}
                      value={coordinate.label}
                      onSelect={() => handleItemClick(coordinate.coordinate)}
                    />
                  );
                })}
              </CommandList>
            </Command>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
