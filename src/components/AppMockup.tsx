import { motion } from "framer-motion";
import {
  AudioLines,
  FolderSync,
  ListMusic,
  Settings,
  Tags,
  Volume2,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const NAV_ICONS = [FolderSync, AudioLines, Tags, Volume2, ListMusic, Settings];

const ROWS = [
  {
    file: "Solomun — Home.flac",
    genre: "Melodic House",
    tone: "var(--color-lime)",
  },
  { file: "Anyma — Pictures.mp3", genre: "Techno", tone: "var(--color-ember)" },
  {
    file: "Fisher — Losing It.wav",
    genre: "Tech House",
    tone: "var(--color-lime)",
  },
  {
    file: "Dom Dolla — Saving Up.aiff",
    genre: "House",
    tone: "var(--color-ice)",
  },
];

export function AppMockup() {
  const { t, i18n } = useTranslation();
  const labels = t("mockup.nav", { returnObjects: true }) as string[];
  const badges = ["HQ", "Regular", "HQ", "Good"];
  const isPortuguese = i18n.language.startsWith("pt");
  const localizedBadges = isPortuguese
    ? ["HQ", "Regular", "HQ", "Bom"]
    : badges;
  return (
    <div className="h-[360px] overflow-hidden rounded-xl border border-edge bg-onyx shadow-[0_32px_80px_rgba(0,0,0,.55)]">
      <div className="flex items-center gap-2 border-b border-line bg-soot px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-[11px] text-faint">
          Beat Encoder Utilities
        </span>
        <span className="ml-auto hidden rounded-full border border-mossline bg-moss px-2 py-0.5 font-mono text-[10px] text-lime sm:block">
          {t("mockup.badge")}
        </span>
      </div>
      <div className="flex">
        <aside className="hidden w-36 shrink-0 flex-col gap-1 border-r border-line p-3 sm:flex">
          <div className="mb-3 flex items-center gap-2 px-1">
            <img src="/app-icon.png" alt="" className="h-6 w-6 rounded-md" />
            <span className="text-[11px] font-bold leading-tight">
              Beat
              <br />
              Encoder
            </span>
          </div>
          {NAV_ICONS.map((Icon, idx) => (
            <div
              key={labels[idx]}
              className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-[11px] ${idx === 0 ? "bg-accent font-semibold text-white" : "text-muted"}`}
            >
              <Icon size={13} /> {labels[idx]}
            </div>
          ))}
        </aside>
        <div className="min-w-0 flex-1 p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-bold">{t("mockup.title")}</p>
              <p className="font-mono text-[10px] text-faint">
                {t("mockup.subtitle")}
              </p>
            </div>
            <span className="rounded-md bg-paper px-2.5 py-1 text-[11px] font-bold text-black">
              {t("mockup.button")}
            </span>
          </div>
          <div className="mt-4 space-y-2">
            {ROWS.map((r, i) => (
              <motion.div
                key={r.file}
                initial={{ opacity: 0, x: 14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: "-40px" }}
                transition={{
                  delay: 0.1 + i * 0.1,
                  duration: 0.45,
                  ease: "easeOut",
                }}
                className="flex items-center gap-3 rounded-lg border border-row bg-soot px-3 py-2"
              >
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: r.tone }}
                />
                <span className="min-w-0 flex-1 truncate text-[11px] font-medium">
                  {r.file}
                </span>
                <span className="hidden font-mono text-[10px] text-faint md:block">
                  {r.genre}
                </span>
                <span
                  className="font-mono text-[10px] font-bold"
                  style={{ color: r.tone }}
                >
                  {localizedBadges[i]}
                </span>
                <span className="font-mono text-[10px] text-faint">
                  {t("mockup.ready")}
                </span>
              </motion.div>
            ))}
          </div>
          <div
            className="mt-4 flex h-14 min-h-14 items-end gap-1.5 overflow-hidden"
            aria-hidden
          >
            {Array.from({ length: 32 }).map((_, i) => (
              <motion.span
                key={i}
                className="flex-1 rounded-full bg-flame"
                initial={{ height: 18 }}
                animate={{
                  height: [4, 18 + ((i * 29) % 22), 6, 14 + ((i * 17) % 16)],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  delay: i * 0.05,
                  ease: "easeInOut",
                }}
                style={{ opacity: 0.25 + ((i * 13) % 60) / 80 }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
