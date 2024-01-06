import ThemeSwitchButton from "../ThemeSwitchButton";

export default function NavHeaderRow() {
  return (
    <div className="flex flex-row justify-between gap-2 px-4">
      <p className="dark:text-white text-black text-center">LOGO</p>
      <ThemeSwitchButton />
    </div>
  );
}
