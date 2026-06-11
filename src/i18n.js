import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./locales/en/translation.json";
import arTranslation from "./locales/ar/translation.json";

const resources = {
    en: {
        translation: enTranslation,
    },
    ar: {
        translation: arTranslation,
    },
};

const getInitialLanguage = () => {
    if (typeof window === "undefined") {
        return "en";
    }

    const savedLanguage = window.localStorage.getItem("app_language");
    return savedLanguage === "ar" || savedLanguage === "en"
        ? savedLanguage
        : "en";
};

const setDocumentLanguage = (lng) => {
    if (typeof document === "undefined") {
        return;
    }

    const isArabic = lng === "ar";
    document.documentElement.lang = lng;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
};

i18n.use(initReactI18next).init({
    resources,
    lng: getInitialLanguage(),
    fallbackLng: "en",
    interpolation: {
        escapeValue: false,
    },
});

setDocumentLanguage(i18n.language);

i18n.on("languageChanged", (lng) => {
    if (typeof window !== "undefined") {
        window.localStorage.setItem("app_language", lng);
    }

    setDocumentLanguage(lng);
});

export default i18n;
