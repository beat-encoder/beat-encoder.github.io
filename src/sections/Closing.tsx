import { motion } from "framer-motion";
import { Apple, ArrowUpRight, Github, Monitor } from "lucide-react";
import { useTranslation } from "react-i18next";

const PLATFORM_ICONS = [Apple, Monitor];

interface Spec {
  k: string;
  v: string;
}

interface Platform {
  name: string;
  cta: string;
  detail: string;
}

export function Closing() {
  const { t } = useTranslation();
  const specs = t("closing.specs", { returnObjects: true }) as Spec[];
  const platforms = t("closing.platforms", { returnObjects: true }) as Platform[];
  return (
    <>
      <section id="specs" className="scroll-mt-24 border-y border-line bg-night">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-24 md:px-8 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <p className="font-mono text-xs font-medium text-accent">
              {t("closing.kicker")}
            </p>
            <h2 className="mt-4 text-4xl font-black leading-[1.02] tracking-tight sm:text-5xl">
              {t("closing.titleA")}
              <br />
              {t("closing.titleB")}
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted">
              {t("closing.body")}
            </p>
          </div>
          <dl className="divide-y divide-line border-y border-line">
            {specs.map((s, i) => (
              <motion.div
                key={s.k}
                initial={{ opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="flex items-baseline justify-between gap-6 py-4"
              >
                <dt className="font-mono text-xs tracking-wider text-faint">
                  {s.k.toUpperCase()}
                </dt>
                <dd className="text-right text-[15px] font-semibold">{s.v}</dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </section>

      <section id="download" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-4xl font-black leading-[1.02] tracking-tight sm:text-6xl">
            {t("closing.dlTitleA")}
            <br />
            {t("closing.dlTitleB")}
          </h2>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-muted">
            {t("closing.dlBody")}
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {platforms.map((p, i) => {
              const Icon = PLATFORM_ICONS[i] ?? Monitor;
              return (
                <a
                  key={p.name}
                  href="https://github.com/beat-encoder/beat-encoder-utilities/releases"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-4 rounded-xl border border-edge bg-coal p-6 transition-colors hover:border-accent"
                >
                  <Icon size={30} className="shrink-0 text-paper" />
                  <span className="flex-1">
                    <span className="block text-lg font-bold">{p.cta}</span>
                    <span className="block text-sm text-faint">
                      {p.name} · {p.detail}
                    </span>
                  </span>
                  <ArrowUpRight size={20} className="text-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </a>
              );
            })}
          </div>
          <a
            href="https://github.com/beat-encoder/beat-encoder-utilities"
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-fog hover:text-white"
          >
            <Github size={16} /> {t("closing.source")} <ArrowUpRight size={15} />
          </a>
        </motion.div>
      </section>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-5 py-8 md:px-8">
          <span className="flex items-center gap-2.5">
            <img src="/app-icon.png" alt="" className="h-6 w-6 rounded-md" />
            <span className="text-sm font-bold">Beat Encoder Utilities</span>
          </span>
          <span className="font-mono text-[11px] text-dim">
            {t("closing.footerTag")}
          </span>
          <span className="ml-auto flex gap-6 text-sm text-muted">
            <a className="hover:text-white" href="#tools">
              {t("closing.footerTools")}
            </a>
            <a className="hover:text-white" href="#download">
              {t("closing.footerDownload")}
            </a>
            <a
              className="hover:text-white"
              href="https://github.com/beat-encoder"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </span>
        </div>
      </footer>
    </>
  );
}
