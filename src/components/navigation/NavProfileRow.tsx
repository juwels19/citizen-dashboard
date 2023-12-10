'use client';

import { UserButton, useUser, useClerk } from '@clerk/nextjs';
import NavProfileRowSkeleton from './NavProfileRowSkeleton';
import { cn } from '@/lib/utils';

export default function NavProfileRow() {
  const { user, isLoaded } = useUser();
  const clerk = useClerk();

  return isLoaded ? (
    <div className="flex flex-row gap-3 items-center justify-start pl-4">
      <UserButton />
      <div
        id="clerk-target"
        className={cn('flex flex-col gap-0.25 cursor-pointer')}
        onClick={() => clerk.openUserProfile()}
      >
        <p className="text-xs text-black dark:text-white">{user?.fullName}</p>
        <p className="text-xs text-grey-1">
          {user?.primaryEmailAddress?.emailAddress}
        </p>
      </div>
    </div>
  ) : (
    <NavProfileRowSkeleton />
  );
}
