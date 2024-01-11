import ThemeSwitchButton from "../ThemeSwitchButton";

export default function NavHeaderRow() {
  return (
    <div className="flex flex-row justify-between gap-2 px-4">
      <p className="text-white text-center">LOGO</p>
      <ThemeSwitchButton
        className="bg-transparent dark:bg-transparent hover:bg-gray-700 dark:hover:bg-gray-700"
        iconClassName="stroke-gray-400"
      />
    </div>
  );
}
