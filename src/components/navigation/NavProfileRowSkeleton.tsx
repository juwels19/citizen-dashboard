import UserButtonSkeleton from '../auth/UserButtonSkeleton';
import { Skeleton } from '../ui/skeleton';

export default function NavProfileRowSkeleton() {
  return (
    <div className="flex flex-row gap-2 py-2 justify-start pl-4">
      <UserButtonSkeleton />
      <div className="flex flex-col justify-around">
        <Skeleton className="h-2 w-[100px] bg-grey-2" />
        <Skeleton className="h-2 w-[125px] bg-grey-2" />
      </div>
    </div>
  );
}
