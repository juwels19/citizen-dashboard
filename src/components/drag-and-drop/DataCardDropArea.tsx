"use client";

import { useDroppable } from "@dnd-kit/core";

export default function DataCardDropArea({ id }: { id: number }) {
  const { isOver, setNodeRef } = useDroppable({
    id: `data-card-drop-area-${id}`,
  });

  return (
    <div
      ref={setNodeRef}
      className="p-4 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg col-span-4"
    >
      {`This is data card drop area ${id}`}
    </div>
  );
}
