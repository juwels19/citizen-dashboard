"use client";

import { useDraggable } from "@dnd-kit/core";
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";

export default function DraggableCard({ id }: { id: number }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `draggable-data-card-${id}`,
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  const divStyles = `w-[350px] ${
    isDragging
      ? "rounded-lg border border-dashed border-gray-300 dark:border-gray-700"
      : ""
  }`;

  return (
    <div className={divStyles}>
      <Card style={style} ref={setNodeRef} {...listeners} {...attributes}>
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>
            Deploy your new project in one-click.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
