"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { theme, systemTheme, setTheme } = useTheme();

  function handleClick() {
    const resolvedTheme = theme === "system" ? systemTheme : theme;
    const newTheme = resolvedTheme === "dark" ? "light" : "dark";
    const newThemeMatchesSystem = newTheme === systemTheme;
    setTheme(newThemeMatchesSystem ? "system" : newTheme);
  }

  return (
    <Button
      variant="outline"
      className="relative h-auto gap-1 rounded-3xl p-1"
      onClick={handleClick}
    >
      <SunIcon className="size-5 rounded-full bg-red-500 p-1 text-foreground dark:bg-transparent dark:text-muted-foreground" />
      <MoonIcon className="size-5 rounded-full bg-transparent p-1 text-muted-foreground dark:bg-red-500 dark:text-foreground" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
