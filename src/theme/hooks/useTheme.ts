import { useEffect, useState } from "react";

export function useTheme() {
  const [isDark, setIsDark] = useState(
    () => window.matchMedia("(prefers-color-scheme: dark)").matches, // Inicializa conforme o sistema
  );

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

    const handleThemeChange = (event: MediaQueryListEvent) => {
      setIsDark(event.matches);
      document.documentElement.classList.toggle("ion-palette-dark", event.matches);
    };

    // Aplica o tema inicial
    document.documentElement.classList.toggle("ion-palette-dark", isDark);

    // Ouvinte para mudanças do sistema operacional
    prefersDark.addEventListener("change", handleThemeChange);

    return () => {
      prefersDark.removeEventListener("change", handleThemeChange);
    };
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const newTheme = !prev;
      document.documentElement.classList.toggle("ion-palette-dark", newTheme);
      return newTheme;
    });
  };

  return { isDark, toggleTheme };
}
