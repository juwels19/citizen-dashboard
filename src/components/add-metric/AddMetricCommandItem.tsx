"use client";
import React, { useState } from "react";
import { CommandItem, CommandShortcut } from "@/components/ui/command";
import { Check } from "lucide-react";

export default function AddMetricCommandItem({
  label,
  value,
  onSelect,
}: {
  label: string;
  value: string;
  onSelect: () => void;
}) {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <CommandItem
      value={value}
      className="justify-between"
      onSelect={() => {
        setIsSelected(!isSelected);
        onSelect();
      }}
    >
      <span>{label}</span>
      {isSelected && (
        <CommandShortcut className="ml-4">
          <Check />
        </CommandShortcut>
      )}
    </CommandItem>
  );
}
