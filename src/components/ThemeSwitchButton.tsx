"use client";

import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";

export default function ThemeSwitchButton({
  className,
  iconClassName,
}: {
  className?: string;
  iconClassName?: string;
}) {
  const { theme, setTheme } = useTheme();

  const isLightMode = theme === "light";

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={(): void => (isLightMode ? setTheme("dark") : setTheme("light"))}
      aria-label={isLightMode ? "Toggle to Dark Mode" : "Toggle to Light Mode"}
      className={className}
    >
      {isLightMode ? (
        <MoonIcon className={iconClassName} />
      ) : (
        <SunIcon className={iconClassName} />
      )}
    </Button>
  );
}
