"use client";

import React, { useState } from "react";
import { Loader2 } from "lucide-react";

import { swrFetcher } from "@/lib/utils";
import useSWR, { mutate } from "swr";

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
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddMetricCommandItem from "./AddMetricCommandItem";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

export default function AddMetricModal() {
  interface CubeData {
    productId: number;
    coordinates: CoordinateType[];
  }

  const { user } = useUser();

  const [productId, setProductId] = useState<string | null>(null);
  const [selectedCoordinates, setSelectedCoordinates] = useState<
    CoordinateType[]
  >([]);
  const [selectAllClicked, setSelectAllClicked] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    setSelectedCoordinates([]);
  };

  const handleItemClick = (isActive: boolean, coordinate: CoordinateType) => {
    if (isActive) {
      setSelectedCoordinates([...selectedCoordinates, coordinate]);
      return;
    }
    setSelectedCoordinates(
      selectedCoordinates.filter(
        (oldCoordinate) => oldCoordinate.coordinate !== coordinate.coordinate
      )
    );
  };

  const handleSelectAllClick = (isSelected: boolean) => {
    if (!isSelected) {
      setSelectedCoordinates([]);
      setSelectAllClicked(isSelected);
      return;
    }
    if (data) setSelectedCoordinates(data?.coordinates.map((coord) => coord));

    setSelectAllClicked(isSelected);
  };

  const addDataClick = async () => {
    setSubmitting(true);
    const res = await fetch("/api/stats-canada/metrics/create", {
      method: "POST",
      body: JSON.stringify({
        selectedCoordinates,
        productId,
        userId: user ? user.id : null,
      }),
    });

    if (!res.ok) {
      setSubmitting(false);
      toast.error(res.statusText);
      return;
    }

    mutate("/api/stats-canada/metrics/fetch");
    setSubmitting(false);
    setIsMenuOpen(false);
    toast.success("Metric has been added successfully!");
  };

  return (
    <Dialog
      open={isMenuOpen}
      onOpenChange={() => {
        setIsMenuOpen(!isMenuOpen);
        setProductId(null);
      }}
    >
      <DialogTrigger asChild>
        <Button
          className="self-end"
          onClick={() => {
            fetchCubeForm.reset();
            setIsMenuOpen(true);
            setSelectedCoordinates([]);
          }}
        >
          Add new data
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Data Onboarding
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col py-4 gap-4">
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
            <>
              <p>Coordinate Selection:</p>
              <Command className="rounded-lg border shadow-md">
                <CommandInput
                  placeholder={`Type in a series name for cube ${data.productId}...`}
                />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandItem
                    onSelect={() => handleSelectAllClick(!selectAllClicked)}
                  >
                    {selectAllClicked ? "Deselect" : "Select"} All
                  </CommandItem>
                  {data.coordinates.map((coordinate, index) => {
                    return (
                      <AddMetricCommandItem
                        key={`coordinate-item-${index}`}
                        label={`${coordinate.coordinate}: ${coordinate.label}`}
                        value={coordinate.label}
                        coordinate={coordinate}
                        onSelect={handleItemClick}
                        isSelected={selectedCoordinates.includes(coordinate)}
                      />
                    );
                  })}
                </CommandList>
              </Command>
              <Button onClick={addDataClick} disabled={submitting}>
                {submitting && <Loader2 className="animate-spin mr-2" />}
                Add Data
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
