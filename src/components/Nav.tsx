import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LANGUAGE_STORAGE_KEY, type SiteLanguage } from "../i18n";

function LanguageSwitch() {
  const { t, i18n } = useTranslation();
  const current: SiteLanguage = i18n.language.startsWith("pt")
    ? "pt-BR"
    : "en-US";
  const set = (lng: SiteLanguage) => {
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, lng);
    } catch {
      // storage unavailable — language still applies for this visit
    }
    void i18n.changeLanguage(lng);
  };
  return (
    <div
      role="group"
      aria-label={t("nav.language")}
      className="flex items-center gap-0.5 rounded-full border border-pill p-0.5 text-xs font-bold"
    >
      {(["en-US", "pt-BR"] as const).map((lng) => (
        <button
          key={lng}
          onClick={() => set(lng)}
          aria-pressed={current === lng}
          className={`rounded-full px-2.5 py-1 transition-colors ${
            current === lng
              ? "bg-paper text-black"
              : "text-muted hover:text-white"
          }`}
        >
          {lng === "en-US" ? "EN" : "PT"}
        </button>
      ))}
    </div>
  );
}

export function Nav() {
  const { t } = useTranslation();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.4,
  });
  return (
    <>
      <motion.div
        className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-accent"
        style={{ scaleX }}
      />
      <header className="fixed inset-x-0 top-[3px] z-40 border-b border-white/[0.07] bg-ink/65 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-5 md:px-8">
          <a href="#top" className="flex items-center gap-2.5">
            <img
              src="/app-icon.png"
              alt="Beat Encoder"
              className="h-12 w-12 rounded-lg"
            />
            <span className="leading-none">
              <span className="block text-[24px] font-black tracking-tight">
                BEAT ENCODER
              </span>
              <span className="block font-mono text-[15px] tracking-[0.18em] text-muted">
                UTILITIES
              </span>
            </span>
          </a>
          <nav className="ml-auto hidden items-center gap-7 text-sm text-fog md:flex">
            <a className="hover:text-white" href="#tools">
              {t("nav.tools")}
            </a>
            <a className="hover:text-white" href="#spectrum">
              {t("nav.spectrum")}
            </a>
            <a className="hover:text-white" href="#grading">
              {t("nav.verdicts")}
            </a>
            <a className="hover:text-white" href="#workflow">
              {t("nav.workflow")}
            </a>
            <a className="hover:text-white" href="#specs">
              {t("nav.glance")}
            </a>
          </nav>
          <div className="ml-auto md:ml-0">
            <LanguageSwitch />
          </div>
          <a
            href="#download"
            className="hidden items-center gap-1 rounded-full bg-accent px-4 py-2 text-sm font-bold text-white hover:bg-bright sm:flex"
          >
            {t("nav.getApp")} <ArrowUpRight size={15} />
          </a>
        </div>
      </header>
    </>
  );
}
