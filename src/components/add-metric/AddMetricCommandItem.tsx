import React from "react";
import { CommandItem, CommandShortcut } from "@/components/ui/command";
import { Check } from "lucide-react";
import { CoordinateType } from "@/data/statsCanada/types";

export default function AddMetricCommandItem({
  coordinate,
  label,
  value,
  onSelect,
  isSelected,
}: {
  coordinate: CoordinateType;
  label: string;
  value: string;
  onSelect: (value: boolean, coordinate: CoordinateType) => void;
  isSelected?: boolean;
}) {
  return (
    <CommandItem
      value={value}
      className="justify-between"
      onSelect={() => {
        onSelect(!isSelected, coordinate);
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
