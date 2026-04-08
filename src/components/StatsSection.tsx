"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Code2, Rocket, Cpu, GitBranch } from "lucide-react";
import { useLanguage } from "./LanguageContext";

/* ─── Animated counter with easeOutQuart ─── */
function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const counted = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85"],
  });

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      if (v > 0 && !counted.current && ref.current) {
        counted.current = true;
        const duration = 2000;
        const start = performance.now();
        const tick = (now: number) => {
          const elapsed = now - start;
          const t = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - t, 4);
          ref.current!.textContent = String(Math.round(eased * value));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    });
    return () => unsub();
  }, [value, scrollYProgress]);

  return (
    <div ref={containerRef} className="flex items-baseline">
      <span ref={ref} className="text-5xl md:text-7xl font-black tracking-tighter text-black dark:text-white">
        0
      </span>
      <span className="text-3xl md:text-5xl font-black tracking-tighter text-green-500">
        {suffix}
      </span>
    </div>
  );
}

/* ─── Stat card ─── */
function StatCard({
  value,
  suffix,
  label,
  icon,
  index,
}: {
  value: number;
  suffix: string;
  label: string;
  icon: React.ReactNode;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.4], [50, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      className="flex flex-col items-center gap-3 group"
    >
      <CountUp value={value} suffix={suffix} />

      <div className="mt-2 w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-900/60 border border-zinc-200 dark:border-white/5 flex items-center justify-center text-zinc-400 group-hover:text-green-500 group-hover:border-green-500/30 transition-all duration-500">
        {icon}
      </div>

      <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-600">
        {label}
      </span>
    </motion.div>
  );
}

/* ─── Section ─── */
export default function StatsSection() {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 0.3], [-60, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  const stats = [
    { value: 4, suffix: "+", label: t.stats_projects, icon: <Rocket className="w-full h-full" /> },
    { value: 17, suffix: "", label: t.stats_technologies, icon: <Cpu className="w-full h-full" /> },
    { value: 3, suffix: "yrs", label: t.stats_experience, icon: <Code2 className="w-full h-full" /> },
    { value: 500, suffix: "+", label: t.stats_commits, icon: <GitBranch className="w-full h-full" /> },
  ];

  return (
    <section ref={ref} className="relative z-20 py-24 overflow-hidden transition-colors duration-500">
      {/* Separator */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="w-full h-[1px] overflow-hidden">
          <motion.div
            style={{
              scaleX: useTransform(scrollYProgress, [0, 0.1, 0.5], [0, 1, 0]),
              opacity: useTransform(scrollYProgress, [0, 0.05, 0.35, 1], [0, 1, 1, 0]),
            }}
            className="h-full bg-gradient-to-r from-transparent via-green-500/40 to-transparent"
          />
        </div>
      </div>

      <motion.div style={{ y, opacity }} className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} {...stat} index={i} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
