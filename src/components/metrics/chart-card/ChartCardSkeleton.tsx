import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ChartCardSkeleton() {
  return (
    <Card className="relative rounded-xl size-96">
      <CardHeader className="items-center">
        <Skeleton className="w-full h-6 bg-gray-200 dark:bg-gray-800" />
      </CardHeader>
      <CardContent className="pt-4">
        <Skeleton className="justify-center w-full h-64 bg-gray-200 dark:bg-gray-800" />
      </CardContent>
    </Card>
  );
}
