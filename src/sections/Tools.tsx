import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { TOOL_DEFS, type Tool, type TranslatedTool } from "../data";

export function Tools() {
  const { t } = useTranslation();
  const strings = t("tools.items", { returnObjects: true }) as TranslatedTool[];
  const tools: Tool[] = TOOL_DEFS.map((def, i) => ({ ...def, ...strings[i] }));
  const [activeId, setActiveId] = useState(tools[0].id);
  const active = tools.find((tool) => tool.id === activeId) ?? tools[0];
  return (
    <section
      id="tools"
      className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 md:px-8"
    >
      <div className="flex flex-wrap items-end justify-between gap-6">
        <h2 className="max-w-xl text-4xl font-black leading-[1.02] tracking-tight sm:text-5xl">
          {t("tools.titleA")}
          <br />
          {t("tools.titleB")}
        </h2>
        <p className="max-w-sm text-[15px] leading-relaxed text-muted">
          {t("tools.subtitle")}
        </p>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-[380px_1fr]">
        <div
          className="flex flex-col"
          role="tablist"
          aria-label={t("tools.tabLabel")}
        >
          {tools.map((tool) => {
            const selected = active.id === tool.id;
            return (
              <button
                key={tool.id}
                role="tab"
                aria-selected={selected}
                onClick={() => setActiveId(tool.id)}
                className={`group relative flex items-center gap-4 border-b border-line px-2 py-2 text-left transition-colors ${selected ? "text-white" : "text-muted hover:text-paper"}`}
              >
                {selected && (
                  <motion.span
                    layoutId="tool-indicator"
                    className="absolute inset-y-0 left-0 w-[3px] bg-accent"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                )}
                <tool.icon
                  size={22}
                  className={
                    selected
                      ? "text-accent"
                      : "text-dim group-hover:text-muted"
                  }
                />
                <span className="flex-1">
                  <span className="block text-lg font-bold">{tool.name}</span>
                  <span className="block text-sm text-faint">
                    {tool.tagline}
                  </span>
                </span>
                <ArrowUpRight
                  size={18}
                  className={`transition-all ${selected ? "translate-x-0 text-accent opacity-100" : "-translate-x-1 opacity-0"}`}
                />
              </button>
            );
          })}
        </div>

        <div className="relative min-h-[340px] overflow-hidden rounded-xl bg-coal p-7 sm:p-9">
          <span
            aria-hidden
            className="pointer-events-none absolute -right-4 -top-8 select-none text-[150px] font-black leading-none text-white/[0.04]"
          >
            {String(tools.indexOf(active) + 1).padStart(2, "0")}
          </span>
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <active.icon size={30} className="text-accent" />
              <h3 className="mt-5 text-3xl font-black tracking-tight">
                {active.name}
              </h3>
              <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-fog">
                {active.description}
              </p>
              <ul className="mt-6 space-y-2.5">
                {active.bullets.map((b, i) => (
                  <motion.li
                    key={b}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.07 }}
                    className="flex items-start gap-2.5 text-sm text-bone"
                  >
                    <Check
                      size={16}
                      className="mt-0.5 shrink-0 text-lime"
                    />{" "}
                    {b}
                  </motion.li>
                ))}
              </ul>
              <p className="mt-8 inline-block rounded-full border border-pill px-3 py-1 font-mono text-[11px] text-muted">
                {active.meta}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
