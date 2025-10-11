"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { Switch } from "../ui/switch";

export const ThemeToggle = () => {
  const { setTheme, theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Skeleton className="h-5 w-[32px]" />;
  }

  const isDarkMode =
    theme === "dark" || (theme === "system" && systemTheme === "dark");

  return (
    <Switch
      checked={isDarkMode}
      onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
    />
  );
};
