import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

const HEIGHTS = [
  22, 38, 54, 72, 46, 88, 64, 34, 96, 58, 78, 42, 68, 92, 50, 30, 74, 84, 44,
  62, 98, 56, 36, 70, 48, 86, 60, 28, 76, 52, 90, 40, 66, 82, 46, 58,
];

export function Waveform({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <div className={`flex h-16 items-end gap-[3px] ${className}`} aria-hidden>
      {HEIGHTS.map((h, i) => (
        <motion.span
          key={i}
          className="w-[3px] shrink-0 rounded-full bg-flame"
          initial={{ height: 6 }}
          animate={
            reduce
              ? { height: `${h}%` }
              : {
                  height: [
                    `${Math.max(12, h * 0.35)}%`,
                    `${h}%`,
                    `${Math.max(14, h * 0.55)}%`,
                    `${h}%`,
                  ],
                }
          }
          transition={
            reduce
              ? { duration: 0 }
              : {
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.07,
                }
          }
          style={{ opacity: 0.35 + (h / 100) * 0.65 }}
        />
      ))}
    </div>
  );
}

export function Spectrogram({ active = true }: { active?: boolean }) {
  const reduce = useReducedMotion();
  const bars = useMemo(
    () =>
      Array.from({ length: 56 }, (_, i) => {
        const wave = Math.sin(i * 0.55) * 0.5 + Math.sin(i * 0.18) * 0.5;
        return 18 + Math.abs(wave) * 62 + ((i * 37) % 13);
      }),
    [],
  );
  return (
    <div className="flex h-36 items-end gap-1" aria-hidden>
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className="flex-1 min-w-0 rounded-t-sm"
          style={{
            background: `linear-gradient(to top, var(--color-flame), var(--color-ember) ${Math.min(90, h)}%, var(--color-lime))`,
          }}
          initial={{ height: "8%" }}
          animate={{ height: active ? `${h}%` : "8%" }}
          transition={
            reduce
              ? { duration: 0 }
              : active
                ? { duration: 0.9, delay: i * 0.018, ease: [0.22, 1, 0.36, 1] }
                : { duration: 0.25 }
          }
        />
      ))}
    </div>
  );
}
