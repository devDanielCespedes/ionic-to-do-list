import { useEffect, useState } from "react";

export function useTheme() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      return storedTheme === "dark";
    }
    return document.documentElement.classList.contains("ion-palette-dark");
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("ion-palette-dark");
    } else {
      document.documentElement.classList.remove("ion-palette-dark");
    }
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return { isDark, toggleTheme };
}
