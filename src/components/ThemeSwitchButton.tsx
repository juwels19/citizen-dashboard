"use client";

import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export default function ThemeSwitchButton() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Start of hydration error prevention code
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  // End of hydration error prevention code

  const isLightMode = theme === "light";

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={(): void => (isLightMode ? setTheme("dark") : setTheme("light"))}
      aria-label={isLightMode ? "Toggle to Dark Mode" : "Toggle to Light Mode"}
    >
      {isLightMode ? <MoonIcon className="stroke-gray-500" /> : <SunIcon />}
    </Button>
  );
}
