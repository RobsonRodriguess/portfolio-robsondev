"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Briefcase,
  Cloud,
  ChevronDown,
  ChevronRight,
  MapPin,
  Calendar,
  ExternalLink,
  Star,
  ArrowRight,
  BookOpen,
  Code2,
  Rocket,
} from "lucide-react";

// ═══════════════════════════════════════════════════════════
//  Data
// ═══════════════════════════════════════════════════════════
const timelineData = [
  {
    id: 1,
    year: "2026 — Present",
    yearShort: "2026+",
    title: "Cloud Architecture & DevOps",
    company: "Continuous Learning",
    location: "Remote",
    description:
      "Focusing on enterprise scalability and infrastructure. Actively pursuing Azure Fundamentals (AZ-900) and ITIL v4 certifications to align robust Fullstack development with IT service management best practices.",
    icon: Cloud,
    color: "#3b82f6",
    colorClass: "blue",
    tags: ["Azure", "AWS", "Docker", "CI/CD", "ITIL"],
    stats: [
      { label: "Focus", value: "Cloud & DevOps" },
      { label: "Goal", value: "AZ-900 + ITIL v4" },
    ],
    achievements: ["Studying Azure Fundamentals", "Deep-diving into infrastructure as code"],
  },
  {
    id: 2,
    year: "2023 — 2027",
    yearShort: "2023-27",
    title: "Systems Analysis and Development",
    company: "Instituto Federal de Goiás (IFG)",
    location: "Goiás, Brazil",
    description:
      "Undergraduate student with a strong foundation in software engineering, algorithms, and complex systems. Defended the 'Mind Health' eHealth platform as the final capstone project (TCC), architecting a secure backend with Next.js and Node.js.",
    icon: GraduationCap,
    color: "#10b981",
    colorClass: "emerald",
    tags: ["Software Engineering", "Algorithms", "Data Structures", "Databases"],
    stats: [
      { label: "Degree", value: "Technologo" },
      { label: "TCC", value: "Mind Health" },
    ],
    achievements: [
      "Capstone: Mind Health eHealth Platform",
      "Secure backend architecture with Next.js + Node.js",
    ],
  },
  {
    id: 3,
    year: "2025 — 2026",
    yearShort: "2025-26",
    title: "Full Stack Freelance Developer",
    company: "Independent / Remote",
    location: "Brasília, DF",
    description:
      "Architected and deployed production-ready applications for real clients. Delivered 'Candangos Shop' (e-commerce UI/UX) and 'Gabriela Decorações', implementing rigorous SEO strategies, Core Web Vitals optimization, and Vercel Analytics integration.",
    icon: Briefcase,
    color: "#a855f7",
    colorClass: "purple",
    tags: ["Next.js", "Tailwind CSS", "SEO", "Vercel", "PostgreSQL"],
    stats: [
      { label: "Projects", value: "2 Deployed" },
      { label: "Clients", value: "2+" },
    ],
    achievements: [
      "Candangos Shop — E-commerce live on Vercel",
      "Gabriela Decorações — SEO optimized platform",
    ],
  },
];

// ═══════════════════════════════════════════════════════════
//  Color maps
// ═══════════════════════════════════════════════════════════
const COLOR_MAP: Record<string, { bg: string; border: string; text: string; textDim: string; badge: string; glow: string }> = {
  blue: {
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    text: "text-blue-500",
    textDim: "text-blue-400/60",
    badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    glow: "shadow-blue-500/10",
  },
  emerald: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    text: "text-emerald-500",
    textDim: "text-emerald-400/60",
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    glow: "shadow-emerald-500/10",
  },
  purple: {
    bg: "bg-purple-500/10",
    border: "border-purple-500/30",
    text: "text-purple-500",
    textDim: "text-purple-400/60",
    badge: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    glow: "shadow-purple-500/10",
  },
};

const SECTION_ICONS = [Rocket, Code2, BookOpen];

// ═══════════════════════════════════════════════════════════
//  Component
// ═══════════════════════════════════════════════════════════
export default function Timeline() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track scroll for timeline line fill
  useEffect(() => {
    const handleScroll = () => {
      if (!lineRef.current) return;
      const rect = lineRef.current.getBoundingClientRect();
      const elHeight = lineRef.current.offsetHeight;
      const windowHeight = window.innerHeight;

      // 0 = top of section just appeared, 1 = bottom of line passed viewport
      const scrolled = (windowHeight - rect.top) / (elHeight + windowHeight * 0.5);
      setScrollProgress(Math.max(0, Math.min(1, scrolled)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleExpand = (id: number) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <section className="py-24 bg-white dark:bg-[#050505] relative z-20 transition-colors duration-500 overflow-hidden">
      {/* Background subtle gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[30vw] h-[30vh] bg-blue-500/3 dark:bg-blue-500/[0.02] blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[30vw] h-[30vh] bg-purple-500/3 dark:bg-purple-500/[0.02] blur-[120px] rounded-full" />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-20 md:mb-28"
        >
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter text-black dark:text-white mb-4">
            CAREER{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 to-zinc-600 dark:from-zinc-500 dark:to-zinc-700 italic">
              Timeline.
            </span>
          </h2>
          <div className="flex items-center gap-3">
            <div className="w-20 h-1 bg-green-500 rounded-full" />
            <span className="text-zinc-400 dark:text-zinc-600 font-mono text-xs uppercase tracking-widest">
              {timelineData.length} milestones
            </span>
          </div>
        </motion.div>

        {/* Timeline */}
        <div ref={lineRef} className="relative">
          {/* Vertical line — background */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800 -translate-x-1/2 md:-translate-x-1/2" />

          {/* Vertical line — fill (animated by scroll) */}
          <motion.div
            className="absolute left-6 md:left-1/2 top-0 w-px bg-gradient-to-b from-green-500 via-emerald-400 to-blue-500"
            style={{
              height: `${scrollProgress * 100}%`,
              transform: "translateX(-50%)",
            }}
          />

          {/* Cards */}
          <div className="relative space-y-16 md:space-y-24">
            {timelineData.map((item, index) => {
              const colors = COLOR_MAP[item.colorClass];
              const isExpanded = expandedId === item.id;
              const SectionIcon = SECTION_ICONS[index] || item.icon;
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, delay: index * 0.15 }}
                  className="relative grid grid-cols-1 md:grid-cols-2 md:gap-8 items-start"
                >
                  {/* Dot on the timeline line */}
                  <div className="absolute left-6 md:left-1/2 top-6 -translate-x-1/2 z-10 hidden md:block">
                    <motion.div
                      className={`w-11 h-11 rounded-full border-[3px] border-white dark:border-[#050505] ${colors.bg} flex items-center justify-center shadow-lg ${colors.glow}`}
                      whileHover={{ scale: 1.15 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <item.icon className={`w-4 h-4 ${colors.text}`} />
                    </motion.div>

                    {/* Pulse ring */}
                    <motion.div
                      className={`absolute inset-0 w-11 h-11 rounded-full border-2 ${colors.textDim}`}
                      animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeOut",
                        delay: index * 0.5,
                      }}
                    />
                  </div>

                  {/* Mobile dot */}
                  <div className="absolute left-6 top-0 -translate-x-1/2 z-10 md:hidden">
                    <div className={`w-9 h-9 rounded-full border-[3px] border-white dark:border-[#050505] ${colors.bg} flex items-center justify-center`}>
                      <item.icon className={`w-3.5 h-3.5 ${colors.text}`} />
                    </div>
                  </div>

                  {/* Spacer */}
                  <div className="hidden md:block" />

                  {/* Card — on mobile single col, on desktop the alternation is via flex order */}
                  <div className={`${isLeft ? "md:col-start-1 md:pr-16 md:text-right" : "md:col-start-2 md:pl-16"}`}>
                    <TimelineCard
                      item={item}
                      colors={colors}
                      isExpanded={isExpanded}
                      onToggle={() => toggleExpand(item.id)}
                      SectionIcon={SectionIcon}
                      align={isLeft ? "right" : "left"}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
//  TimelineCard
// ═══════════════════════════════════════════════════════════
function TimelineCard({
  item,
  colors,
  isExpanded,
  onToggle,
  SectionIcon,
  align,
}: {
  item: (typeof timelineData)[0];
  colors: (typeof COLOR_MAP)["blue"];
  isExpanded: boolean;
  onToggle: () => void;
  SectionIcon: React.ComponentType<{ className?: string }>;
  align: "left" | "right";
}) {
  return (
    <motion.div
      className={`group relative rounded-2xl border border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-zinc-900/30 backdrop-blur-sm shadow-sm dark:shadow-none transition-all duration-500 hover:border-zinc-300 dark:hover:border-white/10 cursor-pointer overflow-hidden`}
      onClick={onToggle}
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${item.color}40, transparent)`,
        }}
      />

      {/* Section header */}
      <div className={`p-5 md:p-6 ${align === "right" ? "md:text-right" : ""}`}>
        {/* Icon + Year row */}
        <div className={`flex items-center gap-3 mb-3 ${align === "right" ? "md:flex-row-reverse md:justify-end" : ""}`}>
          <div
            className={`w-8 h-8 rounded-lg ${colors.bg} flex items-center justify-center`}
          >
            <SectionIcon className={`w-4 h-4 ${colors.text}`} />
          </div>
          <span
            className={`text-xs font-mono font-bold uppercase tracking-widest ${colors.text}`}
          >
            {item.yearShort}
          </span>
        </div>

        <h3 className="text-xl md:text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-100 mb-1">
          {item.title}
        </h3>

        <div className={`flex items-center gap-2 text-zinc-500 dark:text-zinc-400 mb-3 text-sm ${align === "right" ? "md:justify-end" : ""}`}>
          <MapPin className="w-3 h-3" />
          <span>{item.company}</span>
          <span className="text-zinc-300 dark:text-zinc-700">·</span>
          <span className="text-zinc-400 dark:text-zinc-600">{item.location}</span>
        </div>

        <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed font-light line-clamp-2">
          {item.description}
        </p>

        {/* Stats row */}
        <div className={`flex gap-4 mt-4 mb-3 ${align === "right" ? "md:justify-end" : ""}`}>
          {item.stats.map((s) => (
            <div key={s.label}>
              <div className="text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-600 font-mono">
                {s.label}
              </div>
              <div className="text-sm font-bold text-zinc-700 dark:text-zinc-200">
                {s.value}
              </div>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className={`flex flex-wrap gap-1.5 mt-2 ${align === "right" ? "md:justify-end" : ""}`}>
          {item.tags.slice(0, isExpanded ? undefined : 3).map((tag) => (
            <span
              key={tag}
              className={`px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded-md border ${colors.badge}`}
            >
              {tag}
            </span>
          ))}
          {!isExpanded && item.tags.length > 3 && (
            <span className="px-2 py-0.5 text-[10px] font-mono text-zinc-400 dark:text-zinc-600">
              +{item.tags.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Expandable section */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 md:px-6 pb-5 space-y-4 border-t border-zinc-200/50 dark:border-white/5 pt-4">
              {/* Full description */}
              <p className="text-zinc-400 dark:text-zinc-500 text-sm leading-relaxed font-light">
                {item.description}
              </p>

              {/* Achievements */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Star className={`w-3.5 h-3.5 ${colors.text}`} />
                  <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                    Highlights
                  </span>
                </div>
                <div className="space-y-1.5">
                  {item.achievements.map((a, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <ArrowRight className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${colors.text}`} />
                      <span className="text-zinc-400 dark:text-zinc-500 font-light">
                        {a}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* All tags */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Code2 className={`w-3.5 h-3.5 ${colors.text}`} />
                  <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                    Tech Stack
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded-md border ${colors.badge}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expand indicator */}
      <div className={`flex items-center justify-between px-5 md:px-6 py-2.5 border-t border-zinc-200/30 dark:border-white/5 text-zinc-400 dark:text-zinc-600 text-xs transition-colors`}>
        <span className="font-mono text-[10px] uppercase tracking-wider">
          {isExpanded ? "Click to collapse" : "Click to explore"}
        </span>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </div>
    </motion.div>
  );
}
