import UserButtonSkeleton from "../auth/UserButtonSkeleton";
import { Skeleton } from "../ui/skeleton";

export default function NavProfileRowSkeleton() {
  return (
    <div className="flex flex-row gap-2 justify-start pl-4">
      <UserButtonSkeleton />
      <div className="flex flex-col justify-around ml-1">
        <Skeleton className="h-2 w-[115px] bg-gray-600 dark:bg-gray-600" />
        {/* <Skeleton className="h-2 w-[150px] bg-gray-600 dark:bg-gray-600" /> */}
      </div>
    </div>
  );
}
