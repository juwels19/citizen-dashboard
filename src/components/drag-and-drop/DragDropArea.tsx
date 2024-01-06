"use client";

import { DndContext } from "@dnd-kit/core";

export default function DragDropArea({
  children,
}: {
  children?: React.ReactNode;
}) {
  // This should be called inside a div to enable drag and drop for its children
  return (
    <DndContext>
      <div className="flex flex-col gap-4">{children}</div>
    </DndContext>
  );
}
