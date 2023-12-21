import NavProfileRow from './NavProfileRow';
import NavHeaderRow from './NavHeaderRow';
import { Separator } from '../ui/separator';

export default function NavContainer() {
  return (
    <div className="flex flex-col dark:bg-black bg-tan rounded-md min-h-full py-4 gap-y-12 px-2 w-72 justify-between">
      <div>
        <NavHeaderRow />
      </div>
      <div className="flex flex-col gap-4">
        <Separator decorative className="mt-2 bg-grey-1 dark:bg-grey-2" />
        <NavProfileRow />
      </div>
    </div>
  );
}
