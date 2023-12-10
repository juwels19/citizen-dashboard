import ThemeSwitchButton from '../ThemeSwitchButton';

export default function NavHeaderRow() {
  return (
    <div className="flex flex-row justify-center gap-2">
      <p className="dark:text-white text-black text-center">LOGO</p>
      <h2 className="dark:text-white text-black text-xl">Name goes here</h2>
      <ThemeSwitchButton />
    </div>
  );
}
