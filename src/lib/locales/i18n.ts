import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import en from "./en";
import pt from "./pt";

const resources = {
  en,
  pt,
};
const currentLanguageLocalStorage = localStorage.getItem("ionic-todo-list-language");

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: currentLanguageLocalStorage ?? "pt",
    fallbackLng: currentLanguageLocalStorage ?? "pt",
    ns: ["task", "common"],
    defaultNS: "common",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
