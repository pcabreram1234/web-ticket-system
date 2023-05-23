import i18n from "i18next";
import english from "./en.json";
import spanish from "./es.json";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: false,
    resources: {
      en: {
        translation: english,
      },
      es: {
        translation: spanish,
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
