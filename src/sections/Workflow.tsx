import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { FolderSearch, MousePointerClick, Undo2 } from "lucide-react";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

const ICONS = [FolderSearch, MousePointerClick, Undo2];

interface Step {
  title: string;
  body: string;
}

export function Workflow() {
  const { t } = useTranslation();
  const steps = t("workflow.steps", { returnObjects: true }) as Step[];
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section id="workflow" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 md:px-8">
      <h2 className="max-w-2xl text-4xl font-black leading-[1.02] tracking-tight sm:text-5xl">
        {t("workflow.titleA")}<br />{t("workflow.titleB")}
      </h2>
      <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-muted">
        {t("workflow.subtitle")}
      </p>
      <div ref={ref} className="relative mt-14">
        <div className="absolute left-[19px] top-2 h-[calc(100%-16px)] w-px bg-rail md:left-0 md:top-[19px] md:h-px md:w-full" aria-hidden />
        <motion.div
          aria-hidden
          className="absolute left-[19px] top-2 h-[calc(100%-16px)] w-px origin-top bg-accent md:left-0 md:top-[19px] md:h-px md:w-full md:origin-left"
          style={reduce ? undefined : { scaleY: lineScale, scaleX: lineScale }}
        />
        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          {steps.map((s, i) => {
            const Icon = ICONS[i] ?? FolderSearch;
            return (
              <motion.article
                key={s.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-70px" }}
                transition={{ duration: 0.6, delay: i * 0.14, ease: [0.22, 1, 0.36, 1] }}
                className="relative pl-14 md:pl-0 md:pt-14"
              >
                <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-btn bg-ink text-accent md:top-0">
                  <Icon size={18} />
                </span>
                <p className="font-mono text-[11px] text-faint">{t("workflow.stepPrefix")} 0{i + 1}</p>
                <h3 className="mt-2 text-xl font-bold tracking-tight">{s.title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{s.body}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
