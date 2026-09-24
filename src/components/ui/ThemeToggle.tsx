"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

const THEME_CHANGE_EVENT = "favedigitals:theme-change";

function subscribe(callback: () => void) {
  window.addEventListener(THEME_CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", callback);

  return () => {
    window.removeEventListener(THEME_CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
    media.removeEventListener("change", callback);
  };
}

function getSnapshot() {
  return document.documentElement.classList.contains("dark");
}

function getServerSnapshot() {
  return false;
}

/**
 * ThemeToggle: visible light/dark mode switch.
 *
 * - Keyboard accessible button with 44px min tap target
 * - Dynamic, explicit aria-label indicating the switch action
 * - Subscribes to DOM/theme updates via React 19's useSyncExternalStore
 * - Persists choice to localStorage and toggles .dark / data-theme on <html>
 */
export function ThemeToggle({ className }: { className?: string }) {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleTheme = () => {
    const root = document.documentElement;
    const nextIsDark = !root.classList.contains("dark");

    if (nextIsDark) {
      root.classList.add("dark");
      root.setAttribute("data-theme", "dark");
      try {
        localStorage.setItem("theme", "dark");
      } catch {
        /* storage may be restricted */
      }
    } else {
      root.classList.remove("dark");
      root.setAttribute("data-theme", "light");
      try {
        localStorage.setItem("theme", "light");
      } catch {
        /* storage may be restricted */
      }
    }

    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  };

  const label = isDark ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={`flex h-11 w-11 items-center justify-center border border-line bg-paper text-ink-2 transition-colors duration-200 hover:border-line-strong hover:text-ink focus-visible:outline-2 focus-visible:outline-accent ${
        className ?? ""
      }`}
    >
      {isDark ? (
        <Sun size={18} aria-hidden="true" />
      ) : (
        <Moon size={18} aria-hidden="true" />
      )}
    </button>
  );
}
