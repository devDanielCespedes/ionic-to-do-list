import { useEffect, useState } from "react";

const THEME_STORAGE_KEY = "user-theme";

const applyTheme = (isDark: boolean) => {
  if (isDark) {
    document.documentElement.classList.add("ion-palette-dark");
  } else {
    document.documentElement.classList.remove("ion-palette-dark");
  }
};

const getInitialTheme = (): boolean => {
  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (storedTheme !== null) return storedTheme === "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

applyTheme(getInitialTheme());

export function useTheme() {
  const [isDark, setIsDark] = useState<boolean>(getInitialTheme);

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

    const handleThemeChange = (event: MediaQueryListEvent) => {
      setIsDark(event.matches);
      applyTheme(event.matches);
      localStorage.setItem(THEME_STORAGE_KEY, event.matches ? "dark" : "light");
    };

    prefersDark.addEventListener("change", handleThemeChange);

    return () => {
      prefersDark.removeEventListener("change", handleThemeChange);
    };
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const newTheme = !prev;

      applyTheme(newTheme);
      localStorage.setItem(THEME_STORAGE_KEY, newTheme ? "dark" : "light");

      return newTheme;
    });
  };

  return { isDark, toggleTheme };
}
