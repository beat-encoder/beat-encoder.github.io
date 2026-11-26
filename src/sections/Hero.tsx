import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowDown, HardDrive, ShieldCheck } from "lucide-react";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { AppMockup } from "../components/AppMockup";
import { Waveform } from "../components/Waveform";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const { t } = useTranslation();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const mockY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 56]);
  const ghostY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -120]);
  const formats = t("hero.formats", { returnObjects: true }) as string[];

  return (
    <section
      ref={ref}
      id="top"
      className="noise relative overflow-hidden pt-16"
    >
      <motion.p
        style={{ y: ghostY }}
        aria-hidden
        initial={{ opacity: 0, x: reduce ? 0 : -120 }}
        animate={{ opacity: 0.6, x: 0 }}
        transition={{ duration: 2.2, delay: 0.2, ease }}
        viewport={{ once: false, margin: "100px" }}
        className="text-outline pointer-events-none absolute left-2 select-none whitespace-nowrap text-[12vw] font-black leading-none tracking-tighter opacity-60"
      >
        BEAT ENCODER
      </motion.p>
      <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-16 md:px-8 md:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
            >
              <p className="font-mono text-xs font-medium text-accent">
                {t("hero.kicker")}
              </p>
              <h1 className="mt-5 text-[52px] font-black leading-[0.95] tracking-tight sm:text-[72px] lg:text-[84px]">
                {t("hero.titleA")}
                <br />
                <span className="text-accent">{t("hero.titleB")}</span>
              </h1>
              <p className="mt-6 max-w-md text-lg leading-relaxed">
                <span className="block text-fog">{t("hero.subtitleA")}</span>
                <span className="mt-3 block text-fog">
                  {t("hero.subtitleB")}
                </span>
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <a
                href="#download"
                className="group flex items-center gap-2 rounded-full bg-paper px-6 py-3.5 font-bold text-black hover:bg-white"
              >
                {t("hero.download")}{" "}
                <ArrowDown
                  size={17}
                  className="transition-transform group-hover:translate-y-0.5"
                />
              </a>
              <a
                href="#tools"
                className="flex items-center gap-2 rounded-full border border-btn px-6 py-3.5 font-semibold hover:border-paper"
              >
                {t("hero.explore")} <ArrowDown size={17} />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.8 }}
              className="mt-10"
            >
              <Waveform />
              <div className="mt-6 flex flex-col gap-x-8 gap-y-3">
                <span className="flex items-center gap-2 text-sm text-muted">
                  <ShieldCheck size={16} className="text-lime" />{" "}
                  {t("hero.trust1")}
                </span>
                <span className="flex items-center gap-2 text-sm text-muted">
                  <HardDrive size={16} className="text-lime" />{" "}
                  {t("hero.trust2")}
                </span>
              </div>
            </motion.div>
          </div>

          <motion.div
            style={{ y: mockY }}
            initial={{ opacity: 0, y: 32, rotate: 1.2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease }}
            whileHover={
              reduce ? undefined : { rotate: -1.8, scale: 1.025, y: -6 }
            }
          >
            <AppMockup />
            <div className="mt-4 flex justify-between font-mono text-[10px] text-faint">
              <span>{t("hero.captionLeft")}</span>
              <span className="text-lime">● {t("hero.captionRight")}</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div
        className="relative border-y border-line bg-strip py-3.5 overflow-hidden"
        aria-hidden
      >
        <motion.div
          className="flex w-max gap-10 whitespace-nowrap"
          animate={reduce ? undefined : { x: ["0%", "-50%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        >
          {[...formats, ...formats].map((f, i) => (
            <span
              key={i}
              className="flex items-center gap-10 font-mono text-sm font-bold tracking-widest text-dim"
            >
              {f} <span className="text-accent">✦</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
