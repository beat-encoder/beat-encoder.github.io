import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Spectrogram } from "../components/Waveform";

interface Metric {
  value: string;
  label: string;
  note: string;
}

export function Spectrum() {
  const { t } = useTranslation();
  const metrics = t("spectrum.metrics", { returnObjects: true }) as Metric[];
  const axis = t("spectrum.axis", { returnObjects: true }) as string[];
  const chips = t("spectrum.chips", { returnObjects: true }) as string[];
  const cardRef = useRef<HTMLDivElement>(null);
  const cardInView = useInView(cardRef, { margin: "-80px" });
  return (
    <section id="spectrum" className="scroll-mt-24 border-y border-line bg-night">
      <div className="mx-auto max-w-6xl px-5 py-24 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-center">
          <div>
            <p className="font-mono text-xs font-medium text-accent">{t("spectrum.kicker")}</p>
            <h2 className="mt-4 text-4xl font-black leading-[1.02] tracking-tight sm:text-5xl">
              {t("spectrum.title")}
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted">
              {t("spectrum.subtitle")}
            </p>
            <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line">
              {metrics.map((m) => (
                <div key={m.label} className="bg-coal p-5">
                  <p className="text-[26px] font-black tracking-tight text-white">{m.value}</p>
                  <p className="mt-1 text-[13px] font-semibold">{m.label}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-faint">{m.note}</p>
                </div>
              ))}
            </div>
          </div>
          <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-xl border border-line bg-coal p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold">{t("spectrum.cardTitle")}</p>
                <p className="font-mono text-[11px] text-faint">{t("spectrum.cardSub")}</p>
              </div>
              <span className="rounded-md bg-lime px-2 py-1 font-mono text-xs font-bold text-black">{t("spectrum.badge")}</span>
            </div>
            <div className="mt-6 rounded-lg bg-ink p-4">
              <Spectrogram active={cardInView} />
              <div className="mt-3 flex justify-between font-mono text-[10px] text-dim">
                {axis.map((a) => (
                  <span key={a}>{a}</span>
                ))}
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-2 font-mono text-[11px]">
              {chips.map((c) => (
                <span key={c} className="rounded-full border border-pill px-2.5 py-1">{c}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
