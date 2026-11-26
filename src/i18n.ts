import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enUS from "./locales/en-US.json";
import ptBR from "./locales/pt-BR.json";

export const LANGUAGE_STORAGE_KEY = "beat-encoder-site-lang";
export type SiteLanguage = "en-US" | "pt-BR";

export function detectInitialLanguage(): SiteLanguage {
  try {
    const saved = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (saved === "en-US" || saved === "pt-BR") return saved;
  } catch {
    // storage unavailable — fall through to browser detection
  }
  const browser = navigator.language || "";
  if (browser.toLowerCase().startsWith("pt")) return "pt-BR";
  return "en-US";
}

function applyDocumentLanguage(lng: string) {
  document.documentElement.lang = lng;
}

i18n.use(initReactI18next).init({
  lng: detectInitialLanguage(),
  fallbackLng: "en-US",
  supportedLngs: ["en-US", "pt-BR"],
  resources: {
    "en-US": { translation: enUS },
    "pt-BR": { translation: ptBR },
  },
  interpolation: {
    escapeValue: false,
  },
});

applyDocumentLanguage(i18n.language);
i18n.on("languageChanged", applyDocumentLanguage);

export default i18n;
