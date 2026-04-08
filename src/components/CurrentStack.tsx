"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  Code2,
  GitBranch,
  Clock,
  TrendingUp,
  Zap,
  Sparkles,
  ExternalLink,
  Star,
  ArrowRight,
} from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";

/* ─── Language Color Map (GitHub default colors) ─── */
const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  Python: "#3776AB",
  Java: "#B07219",
  Lua: "#000080",
  HTML: "#E34C26",
  CSS: "#563D7C",
  SCSS: "#C6538C",
  Shell: "#89E051",
  Dockerfile: "#384D54",
  "C#": "#178600",
  "C++": "#F34B7D",
  Go: "#00ADD8",
  Rust: "#DEA584",
  PHP: "#4F5D95",
  Ruby: "#701516",
  Swift: "#FFAC45",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  PLpgSQL: "#336790",
  Prisma: "#2D3748",
  MDX: "#FCB32C",
};

const DEFAULT_COLOR = "#8B8B8B";

function getLangColor(name: string): string {
  return LANG_COLORS[name] || DEFAULT_COLOR;
}

/* ─── i18n ─── */
const TEXTS = {
  pt: {
    badge: "Stack em Tempo Real",
    title: "Stack",
    titleHighlight: "Atual",
    subtitle: "Linguagens que mais uso nos últimos 6 meses, direto do meu GitHub.",
    recentActivity: "Atividade Recente",
    languages: "Linguagens",
    repos: "repos ativos",
    totalCode: "código total",
    updatedAt: "Atualizado",
    today: "hoje",
    daysAgo: "dias atrás",
    viewOnGithub: "Ver no GitHub",
    loading: "Buscando dados do GitHub...",
    noData: "Sem dados disponíveis",
    dominance: "Domínio",
  },
  en: {
    badge: "Real-time Stack",
    title: "Current",
    titleHighlight: "Stack",
    subtitle: "Languages I use the most in the past 6 months, straight from my GitHub.",
    recentActivity: "Recent Activity",
    languages: "Languages",
    repos: "active repos",
    totalCode: "total code",
    updatedAt: "Updated",
    today: "today",
    daysAgo: "days ago",
    viewOnGithub: "View on GitHub",
    loading: "Fetching GitHub data...",
    noData: "No data available",
    dominance: "Dominance",
  },
};

/* ─── Animated Counter ─── */
function AnimCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const done = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !done.current) {
          done.current = true;
          const start = performance.now();
          const dur = 1200;
          const tick = (now: number) => {
            const p = Math.min((now - start) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(Math.floor(eased * target));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

/* ─── Time ago helper ─── */
function timeAgo(date: string, t: (typeof TEXTS)["pt"]) {
  const diff = Date.now() - new Date(date).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return t.today;
  return `${days} ${t.daysAgo}`;
}

/* ─── Format bytes ─── */
function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1048576).toFixed(1)} MB`;
}

/* ─── Types ─── */
interface LanguageData {
  name: string;
  bytes: number;
  percentage: number;
}

interface RecentRepo {
  name: string;
  language: string | null;
  updatedAt: string;
  description: string | null;
  stars: number;
}

interface GitHubData {
  languages: LanguageData[];
  totalBytes: number;
  repoCount: number;
  recentActivity: RecentRepo[];
  lastUpdated: string;
}

/* ─── Main Component ─── */
export default function CurrentStack() {
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [hoveredLang, setHoveredLang] = useState<string | null>(null);
  const { lang } = useLanguage();
  const t = TEXTS[lang];

  useEffect(() => {
    fetch("/api/github/languages")
      .then((res) => res.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="relative z-20 py-24 md:py-32 overflow-hidden transition-colors duration-500">
      {/* Subtle background effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/4 -right-32 w-[400px] h-[400px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
          animate={{ scale: [1, 1.2, 1], y: [0, -30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 -left-32 w-[350px] h-[350px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(168,85,247,0.05) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
          animate={{ scale: [1, 1.3, 1], x: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-5 md:px-8 relative z-10">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-20"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/60 dark:bg-white/5 border border-zinc-200/80 dark:border-white/10 backdrop-blur-xl mb-8 shadow-sm"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Activity className="w-4 h-4 text-blue-500" />
            </motion.div>
            <span className="text-xs font-semibold tracking-widest uppercase text-zinc-500 dark:text-zinc-400">
              {t.badge}
            </span>
            <div className="relative">
              <span className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping opacity-40" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </div>
          </motion.div>

          {/* Title */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-zinc-900 dark:text-white mb-4 leading-[1.1]">
            {t.title}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-500">
              {t.titleHighlight}
            </span>
          </h2>

          <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base max-w-lg leading-relaxed">
            {t.subtitle}
          </p>
        </motion.div>

        {/* ── Content ── */}
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center py-20"
          >
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              >
                <Code2 className="w-5 h-5 text-blue-500" />
              </motion.div>
              <span className="text-sm font-mono text-zinc-400">{t.loading}</span>
            </div>
          </motion.div>
        ) : !data || data.languages.length === 0 ? (
          <div className="text-center py-20 text-zinc-500">{t.noData}</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* ── Left: Language Bars ── */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7"
            >
              {/* Multi-color progress bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
                    {t.languages}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-600">
                    {data.repoCount} {t.repos} • {formatBytes(data.totalBytes)} {t.totalCode}
                  </span>
                </div>
                <div className="h-3 rounded-full bg-zinc-200/60 dark:bg-white/[0.04] overflow-hidden flex">
                  {data.languages.map((lang, i) => (
                    <motion.div
                      key={lang.name}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${lang.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.08, duration: 0.8, ease: "easeOut" }}
                      className="h-full relative group cursor-pointer"
                      style={{ backgroundColor: getLangColor(lang.name) }}
                      onMouseEnter={() => setHoveredLang(lang.name)}
                      onMouseLeave={() => setHoveredLang(null)}
                    >
                      {/* Tooltip */}
                      <AnimatePresence>
                        {hoveredLang === lang.name && (
                          <motion.div
                            initial={{ opacity: 0, y: -8, scale: 0.9 }}
                            animate={{ opacity: 1, y: -32, scale: 1 }}
                            exit={{ opacity: 0, y: -8, scale: 0.9 }}
                            className="absolute left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-[11px] font-bold whitespace-nowrap z-50 shadow-lg pointer-events-none"
                          >
                            {lang.name} · {lang.percentage}%
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Language list cards */}
              <div className="space-y-2.5">
                {data.languages.map((language, index) => {
                  const color = getLangColor(language.name);
                  const isTop = index === 0;

                  return (
                    <motion.div
                      key={language.name}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                      onMouseEnter={() => setHoveredLang(language.name)}
                      onMouseLeave={() => setHoveredLang(null)}
                      className={`group relative flex items-center gap-4 px-5 py-4 rounded-xl border transition-all duration-400 cursor-default ${
                        hoveredLang === language.name
                          ? "bg-white/90 dark:bg-white/[0.04] border-zinc-300/80 dark:border-white/[0.1] shadow-md"
                          : "bg-white/50 dark:bg-white/[0.02] border-zinc-200/50 dark:border-white/[0.04]"
                      }`}
                    >
                      {/* Rank number */}
                      <div className="text-xs font-mono font-bold text-zinc-300 dark:text-zinc-700 w-5 text-right tabular-nums">
                        {index + 1}
                      </div>

                      {/* Color dot */}
                      <div className="relative">
                        <div
                          className="w-3.5 h-3.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: color }}
                        />
                        {isTop && (
                          <motion.div
                            className="absolute inset-0 rounded-full"
                            style={{ border: `2px solid ${color}` }}
                            animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        )}
                      </div>

                      {/* Name */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-zinc-800 dark:text-zinc-100">
                            {language.name}
                          </span>
                          {isTop && (
                            <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                              #1
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Bytes */}
                      <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-600 hidden sm:block">
                        {formatBytes(language.bytes)}
                      </span>

                      {/* Progress bar */}
                      <div className="w-24 md:w-32 flex items-center gap-2">
                        <div className="flex-1 h-1.5 rounded-full bg-zinc-200/60 dark:bg-white/[0.04] overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: color }}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${language.percentage}%` }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 + index * 0.08, duration: 0.8 }}
                          />
                        </div>
                        <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400 tabular-nums w-10 text-right">
                          {language.percentage}%
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* ── Right: Activity Feed + Top Stack ── */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5 space-y-6"
            >
              {/* Dominance card */}
              {data.languages[0] && (
                <div className="relative rounded-2xl overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      background: `linear-gradient(135deg, ${getLangColor(data.languages[0].name)} 0%, transparent 60%)`,
                    }}
                  />
                  <div className="relative p-6 rounded-2xl border border-zinc-200/60 dark:border-white/[0.06] bg-white/60 dark:bg-white/[0.02] backdrop-blur-xl">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
                        {t.dominance}
                      </span>
                      <Zap className="w-4 h-4 text-amber-500" />
                    </div>

                    <div className="flex items-end gap-3 mb-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${getLangColor(data.languages[0].name)}20` }}
                      >
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: getLangColor(data.languages[0].name) }}
                        />
                      </div>
                      <div>
                        <div className="text-2xl font-black text-zinc-900 dark:text-white">
                          {data.languages[0].name}
                        </div>
                        <div className="text-[11px] font-mono text-zinc-400">
                          {data.languages[0].percentage}% {lang === "pt" ? "do código total" : "of total code"}
                        </div>
                      </div>
                    </div>

                    {/* Mini chart showing top 3 */}
                    <div className="flex gap-1.5 h-16 items-end">
                      {data.languages.slice(0, 5).map((l, i) => (
                        <motion.div
                          key={l.name}
                          className="flex-1 rounded-t-md"
                          style={{ backgroundColor: getLangColor(l.name) }}
                          initial={{ height: 0 }}
                          whileInView={{ height: `${(l.percentage / data.languages[0].percentage) * 100}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5 + i * 0.1, duration: 0.6, ease: "easeOut" }}
                        />
                      ))}
                    </div>
                    <div className="flex gap-1.5 mt-1.5">
                      {data.languages.slice(0, 5).map((l) => (
                        <div
                          key={l.name}
                          className="flex-1 text-center text-[8px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-600 truncate"
                        >
                          {l.name}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Recent Activity Feed */}
              <div className="rounded-2xl border border-zinc-200/60 dark:border-white/[0.06] bg-white/60 dark:bg-white/[0.02] backdrop-blur-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-zinc-200/40 dark:border-white/[0.04] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GitBranch className="w-4 h-4 text-zinc-400" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
                      {t.recentActivity}
                    </span>
                  </div>
                  <a
                    href="https://github.com/RobsonRodriguess"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[10px] font-semibold text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
                  >
                    {t.viewOnGithub}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="divide-y divide-zinc-200/40 dark:divide-white/[0.03]">
                  {data.recentActivity.map((repo, i) => (
                    <motion.a
                      key={repo.name}
                      href={`https://github.com/RobsonRodriguess/${repo.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.08 }}
                      className="flex items-center gap-4 px-6 py-4 hover:bg-zinc-100/60 dark:hover:bg-white/[0.02] transition-colors group"
                    >
                      {/* Language dot */}
                      <div
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{
                          backgroundColor: repo.language
                            ? getLangColor(repo.language)
                            : DEFAULT_COLOR,
                        }}
                      />

                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold text-zinc-700 dark:text-zinc-200 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors truncate">
                          {repo.name}
                        </div>
                        <div className="text-[11px] text-zinc-400 dark:text-zinc-600 truncate">
                          {repo.language || "—"} • {timeAgo(repo.updatedAt, t)}
                        </div>
                      </div>

                      {repo.stars > 0 && (
                        <div className="flex items-center gap-1 text-[11px] text-zinc-400 flex-shrink-0">
                          <Star className="w-3 h-3" />
                          {repo.stars}
                        </div>
                      )}

                      <ArrowRight className="w-3.5 h-3.5 text-zinc-300 dark:text-zinc-700 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Last updated */}
              <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-zinc-400 dark:text-zinc-600">
                <Clock className="w-3 h-3" />
                <span>
                  {t.updatedAt}: {data.lastUpdated
                    ? new Date(data.lastUpdated).toLocaleDateString(lang === "pt" ? "pt-BR" : "en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : "—"}
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
