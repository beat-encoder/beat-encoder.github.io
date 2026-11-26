import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const TONES = ["#d9f24f", "#d9f24f", "#67e8f9", "#0091ff", "#ff453a"];

interface VerdictRow {
  verdict: string;
  meaning: string;
}

interface RuleCard {
  title: string;
  body: string;
}

export function Grading() {
  const { t } = useTranslation();
  const rows = t("grading.rows", { returnObjects: true }) as VerdictRow[];
  const cards = t("grading.cards", { returnObjects: true }) as RuleCard[];
  return (
    <section
      id="grading"
      className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 md:px-8"
    >
      <div className="flex flex-wrap items-end justify-between gap-6">
        <h2 className="max-w-xl text-4xl font-black leading-[1.02] tracking-tight sm:text-5xl">
          {t("grading.titleA")}
          <br />
          {t("grading.titleB")}
        </h2>
        <p className="max-w-sm text-[15px] leading-relaxed text-muted">
          {t("grading.subtitle")}
        </p>
      </div>

      <div className="mt-12 overflow-hidden rounded-xl border border-line">
        {rows.map((r, i) => (
          <motion.div
            key={r.verdict}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-40px" }}
            transition={{
              duration: 0.45,
              delay: i * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`grid gap-2 px-6 py-5 sm:grid-cols-[240px_1fr] sm:items-center sm:gap-6 ${i % 2 ? "bg-strip" : "bg-coal"}`}
          >
            <span className="flex items-center gap-2.5 font-bold">
              <span
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ background: TONES[i] ?? "var(--color-muted)" }}
              />
              {r.verdict}
            </span>
            <span className="text-sm leading-relaxed text-muted">
              {r.meaning}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {cards.map((c) => (
          <div key={c.title} className="rounded-xl bg-coal p-6">
            <h3 className="font-bold">{c.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{c.body}</p>
          </div>
        ))}
      </div>

      <p className="mt-8 max-w-2xl text-sm leading-relaxed text-faint">
        {t("grading.footnote")}
      </p>
    </section>
  );
}
