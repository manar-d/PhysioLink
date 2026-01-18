import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import ar from "./locales/ar.json";
import ur from "./locales/ur.json";

const savedLang = localStorage.getItem("lang") || "en"

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar },
    ur: { translation: ur },
  },
  lng: savedLang,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

const rtlLanguages = ["ar", "ur"];

//control direction
const setDirection = (lang) => {
  document.documentElement.dir = rtlLanguages.includes(lang) ? "rtl" : "ltr";
  document.documentElement.lang = lang;
};

setDirection(savedLang);

i18n.on("languageChanged", setDirection);

export default i18n;
