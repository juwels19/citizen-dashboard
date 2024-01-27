import React from "react";
import { CommandItem, CommandShortcut } from "@/components/ui/command";
import { Check } from "lucide-react";

export default function AddMetricCommandItem({
  coordinate,
  label,
  value,
  onSelect,
  isSelected,
}: {
  coordinate: string;
  label: string;
  value: string;
  onSelect: (value: boolean, coordinate: string) => void;
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
