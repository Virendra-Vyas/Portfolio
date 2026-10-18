"use client";

import { useSyncExternalStore } from "react";
import { ThemeIcon } from "@/lib/icons";
import { currentTheme, setTheme, subscribeToTheme, type Theme } from "@/lib/theme";
import styles from "./ThemeToggle.module.css";

/** Switches between the light and dark themes. Pressed means dark. */
export function ThemeToggle({ label }: { label: string }) {
  // The server cannot know the theme, so it renders the light state and the client corrects it.
  const theme = useSyncExternalStore<Theme>(subscribeToTheme, currentTheme, () => "light");
  const dark = theme === "dark";

  return (
    <button
      type="button"
      className={styles.toggle}
      aria-label={label}
      aria-pressed={dark}
      title={label}
      onClick={() => setTheme(dark ? "light" : "dark")}
    >
      <ThemeIcon dark={dark} />
    </button>
  );
}
