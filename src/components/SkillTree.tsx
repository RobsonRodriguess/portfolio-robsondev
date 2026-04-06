"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Atom,
  Database,
  Palette,
  ShieldAlert,
  FileCode2,
  Terminal,
  Server,
  Cloud,
  Layers,
  Globe,
  Cpu,
  Lock,
  Zap,
  Star,
  X,
} from "lucide-react";

// ═══════════════════════════════════════════════
//  Data
// ═══════════════════════════════════════════════
interface Skill {
  id: number;
  name: string;
  tier: string;
  level: number;
  icon: React.ComponentType<any>;
  color: string;
  glowColor: string;
  category: string;
  description: string;
  subskills: string[];
  // Position in constellation (0-1 relative)
  nx: number;
  ny: number;
}

const SKILLS: Skill[] = [
  {
    id: 1, name: "React / Next.js", tier: "LEGENDARY", level: 88,
    icon: Atom, color: "#61DAFB", glowColor: "rgba(97,218,251,0.15)",
    category: "Frontend", description: "Advanced component architecture, SSR/SSG, Server Actions, and state management at scale.",
    subskills: ["Server Components", "State Management", "Performance Tuning", "Hooks Patterns"],
    nx: 0.30, ny: 0.25,
  },
  {
    id: 2, name: "Tailwind & UI Design", tier: "LEGENDARY", level: 92,
    icon: Palette, color: "#06B6D4", glowColor: "rgba(6,182,212,0.15)",
    category: "Frontend", description: "Pixel-perfect interfaces with utility-first CSS, design systems, and motion design.",
    subskills: ["Design Systems", "Motion", "Responsive", "CSS Architecture"],
    nx: 0.55, ny: 0.18,
  },
  {
    id: 3, name: "TypeScript", tier: "EPIC", level: 82,
    icon: FileCode2, color: "#3178C6", glowColor: "rgba(49,120,198,0.15)",
    category: "Language", description: "Strongly typed full-stack applications, advanced generics, and type-safe APIs.",
    subskills: ["Generics", "Type Guards", "Utility Types", "Strict Mode"],
    nx: 0.45, ny: 0.42,
  },
  {
    id: 4, name: "Node.js / NestJS", tier: "EPIC", level: 75,
    icon: ShieldAlert, color: "#5382A1", glowColor: "rgba(83,130,161,0.15)",
    category: "Backend", description: "Enterprise architecture with dependency injection, microservices, and clean code patterns.",
    subskills: ["Dependency Injection", "Guards & Interceptors", "REST APIs", "Clean Architecture"],
    nx: 0.72, ny: 0.35,
  },
  {
    id: 5, name: "PostgreSQL / MySQL", tier: "RARE", level: 70,
    icon: Database, color: "#4169E1", glowColor: "rgba(65,105,225,0.15)",
    category: "Backend", description: "Complex query optimization, relational schema design, and data integrity.",
    subskills: ["Query Optimization", "Schema Design", "Indexing", "Transactions"],
    nx: 0.85, ny: 0.60,
  },
  {
    id: 6, name: "NestJS / Prisma ORM", tier: "RARE", level: 65,
    icon: Terminal, color: "#E0234E", glowColor: "rgba(224,35,78,0.15)",
    category: "Backend", description: "Type-safe database operations with Prisma schema, migrations, and relational queries.",
    subskills: ["Prisma Client", "Migrations", "Relations", "Raw Queries"],
    nx: 0.65, ny: 0.65,
  },
  {
    id: 7, name: "Docker / Nginx", tier: "UNCOMMON", level: 60,
    icon: Cloud, color: "#2496ED", glowColor: "rgba(36,150,237,0.12)",
    category: "DevOps", description: "Containerized deployments, reverse proxy configuration, and production infrastructure.",
    subskills: ["Docker Compose", "Reverse Proxy", "SSL Setup", "Multi-stage Builds"],
    nx: 0.20, ny: 0.55,
  },
  {
    id: 8, name: "Git / GitHub", tier: "UNCOMMON", level: 72,
    icon: Server, color: "#F05032", glowColor: "rgba(240,80,50,0.12)",
    category: "DevOps", description: "Version control mastery, branching strategies, CI/CD pipelines, and code reviews.",
    subskills: ["Branching", "CI/CD", "Code Review", "Rebase/Merge"],
    nx: 0.12, ny: 0.75,
  },
  {
    id: 9, name: "Python", tier: "RARE", level: 65,
    icon: Cpu, color: "#3776AB", glowColor: "rgba(55,118,171,0.15)",
    category: "Language", description: "Scripting, data processing, automation, and backend services with Django/FastAPI.",
    subskills: ["FastAPI", "Data Processing", "Automation", "Scripting"],
    nx: 0.35, ny: 0.72,
  },
  {
    id: 10, name: "Security / Auth", tier: "RARE", level: 62,
    icon: Lock, color: "#22c55e", glowColor: "rgba(34,197,94,0.15)",
    category: "Backend", description: "JWT authentication, role-based access, secure session management, and OWASP best practices.",
    subskills: ["JWT", "RBAC", "Session Security", "OWASP"],
    nx: 0.80, ny: 0.80,
  },
  {
    id: 11, name: "Performance / SEO", tier: "EPIC", level: 80,
    icon: Zap, color: "#f97316", glowColor: "rgba(249,115,22,0.15)",
    category: "Frontend", description: "Core Web Vitals optimization, technical SEO, meta strategies, and analytics.",
    subskills: ["Lighthouse", "Core Web Vitals", "Meta Tags", "Analytics"],
    nx: 0.50, ny: 0.82,
  },
  {
    id: 12, name: "Full-Stack Integration", tier: "LEGENDARY", level: 85,
    icon: Layers, color: "#a855f7", glowColor: "rgba(168,85,247,0.15)",
    category: "Full-Stack", description: "End-to-end application architecture, API design, real-time communication, and deployment.",
    subskills: ["API Design", "WebSockets", "Real-time Data", "Deploy Pipelines"],
    nx: 0.50, ny: 0.55,
  },
];

// Connections: which skills link to which
const CONNECTIONS: [number, number][] = [
  [1, 2], [1, 3], [1, 12], [2, 11], [3, 4],
  [3, 12], [4, 5], [4, 6], [5, 6], [5, 10],
  [6, 12], [7, 8], [7, 12], [8, 9], [9, 10],
  [9, 12], [10, 12], [11, 12], [3, 11],
];

const TIER_RANKS: Record<string, number> = {
  LEGENDARY: 4, EPIC: 3, RARE: 2, UNCOMMON: 1, COMMON: 0,
};

// ═══════════════════════════════════════════════
//  Floating particles for background
// ═══════════════════════════════════════════════
function ParticleField() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-[2px] h-[2px] bg-zinc-400/20 dark:bg-zinc-500/20 rounded-full"
          style={{
            left: `${(i * 37 + 13) % 100}%`,
            top: `${(i * 53 + 7) % 100}%`,
          }}
          animate={{
            opacity: [0.1, 0.6, 0.1],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 4 + (i % 4) * 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════
//  Main component
// ═══════════════════════════════════════════════
export default function SkillTree() {
  const [selected, setSelected] = useState<Skill | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ w: 0, h: 0 });

  // Measure container for node positioning
  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerSize({ w: rect.width, h: rect.height });
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Stats
  const totalSkills = SKILLS.length;
  const avgLevel = Math.round(SKILLS.reduce((a, s) => a + s.level, 0) / totalSkills);
  const legendary = SKILLS.filter(s => s.tier === "LEGENDARY").length;
  const epic = SKILLS.filter(s => s.tier === "EPIC").length;

  // Connected skills for hovered skill
  const getConnectedIds = useCallback((id: number) => {
    const ids = new Set<number>();
    CONNECTIONS.forEach(([a, b]) => {
      if (a === id) ids.add(b);
      if (b === id) ids.add(a);
    });
    return ids;
  }, []);

  return (
    <section className="py-24 bg-zinc-50 dark:bg-[#0a0a0a] relative z-20 overflow-hidden font-sans transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter text-black dark:text-zinc-100 mb-3">
            SKILL <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 to-zinc-600 dark:from-zinc-500 dark:to-zinc-700 italic">Constellation.</span>
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 tracking-widest text-xs md:text-sm uppercase">
            &gt; interconnected abilities — click to explore
          </p>

          {/* Summary stats */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-6 md:gap-10 mt-8"
          >
            {[
              { label: "Skills", value: totalSkills },
              { label: "Avg Level", value: avgLevel },
              { label: "Legendary", value: legendary },
              { label: "Epic", value: epic },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-black text-zinc-800 dark:text-zinc-200">{stat.value}</div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-600">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Constellation canvas */}
        <div
          ref={containerRef}
          className="relative w-full h-[500px] md:h-[650px] rounded-3xl bg-white dark:bg-zinc-950/40 border border-zinc-200 dark:border-white/5 overflow-hidden"
        >
          <ParticleField />

          {/* SVG connections */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {CONNECTIONS.map(([a, b], i) => {
              const skillA = SKILLS.find(s => s.id === a)!;
              const skillB = SKILLS.find(s => s.id === b)!;
              const isConnected = hoveredId === a || hoveredId === b;
              const isDimmed = hoveredId !== null && !isConnected;

              return (
                <motion.line
                  key={i}
                  x1={skillA.nx * containerSize.w}
                  y1={skillA.ny * containerSize.h}
                  x2={skillB.nx * containerSize.w}
                  y2={skillB.ny * containerSize.h}
                  stroke={
                    isConnected
                      ? `${skillA.color}60`
                      : "rgba(113,113,122,0.12)"
                  }
                  strokeWidth={isConnected ? 2 : 1}
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3 + i * 0.08 }}
                  style={{
                    filter: isConnected ? `drop-shadow(0 0 4px ${skillA.color}40)` : "none",
                    opacity: isDimmed ? 0.05 : undefined,
                  }}
                />
              );
            })}
          </svg>

          {/* Skill nodes */}
          {SKILLS.map((skill, i) => {
            const isHovered = hoveredId === skill.id;
            const connectedIds = hoveredId !== null ? getConnectedIds(hoveredId) : new Set();
            const isConnected = connectedIds.has(skill.id);
            const isDimmed = hoveredId !== null && !isHovered && !isConnected;
            const nodeRadius = 12 + (skill.level / 100) * 16;

            return (
              <motion.div
                key={skill.id}
                className="absolute"
                style={{
                  left: `${skill.nx * 100}%`,
                  top: `${skill.ny * 100}%`,
                  transform: "translate(-50%, -50%)",
                  zIndex: isHovered ? 50 : isDimmed ? 5 : 10,
                  opacity: isDimmed ? 0.2 : 1,
                }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: isDimmed ? 0.2 : 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.2 + i * 0.05,
                  type: "spring",
                  y: {
                    duration: 3 + (i % 3),
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.3,
                  },
                  scale: { type: "spring", stiffness: 400, damping: 25 },
                }}
                whileHover={{ scale: 1.15 }}
              >
                {/* Glow ring */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    boxShadow: [
                      `0 0 ${nodeRadius}px ${skill.glowColor}`,
                      `0 0 ${nodeRadius * 2}px ${skill.glowColor}`,
                      `0 0 ${nodeRadius}px ${skill.glowColor}`,
                    ],
                  }}
                  transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                />

                {/* Node */}
                <div
                  className="relative flex items-center justify-center rounded-full border-2 transition-colors duration-300"
                  style={{
                    width: nodeRadius * 2,
                    height: nodeRadius * 2,
                    borderColor: isHovered ? skill.color : `${skill.color}40`,
                    backgroundColor: isHovered ? `${skill.color}20` : "transparent",
                  }}
                >
                  <skill.icon
                    className="transition-colors duration-300"
                    style={{
                      width: nodeRadius * 0.7,
                      height: nodeRadius * 0.7,
                      color: isHovered ? skill.color : `${skill.color}60`,
                    }}
                  />
                </div>

                {/* Label */}
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 text-center whitespace-nowrap"
                  style={{ top: nodeRadius * 2 + 6 }}
                  animate={{ opacity: isHovered ? 1 : 0.6 }}
                >
                  <div className={`text-xs font-bold tracking-tight transition-colors duration-300 ${isHovered ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-500 dark:text-zinc-500"}`}>
                    {skill.name}
                  </div>
                  <div className="text-[10px] font-mono" style={{ color: skill.color }}>
                    {skill.level}% — {skill.tier}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Skill detail modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-zinc-100 dark:bg-zinc-950 border border-zinc-300 dark:border-white/5 rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Color accent bar */}
              <div className="h-1.5 w-full" style={{ backgroundColor: selected.color }} />

              <div className="p-6 md:p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${selected.color}15` }}
                    >
                      <selected.icon className="w-6 h-6" style={{ color: selected.color }} />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">{selected.name}</h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${selected.color}15`, color: selected.color }}>
                          {selected.tier}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-500">{selected.category}</span>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => setSelected(null)} className="text-zinc-400 hover:text-zinc-200 transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Level circle */}
                <div className="flex items-center gap-6 mb-6">
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                      <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(113,113,122,0.2)" strokeWidth="4" />
                      <circle
                        cx="40" cy="40" r="34" fill="none"
                        stroke={selected.color} strokeWidth="4"
                        strokeLinecap="round"
                        strokeDasharray={`${(selected.level / 100) * 214} 214`}
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-xl font-black text-zinc-800 dark:text-zinc-200">
                      {selected.level}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{selected.description}</p>
                  </div>
                </div>

                {/* Subskills */}
                <div className="space-y-3">
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Abilities Unlocked</div>
                  {selected.subskills.map((sub, i) => (
                    <motion.div
                      key={sub}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.08 }}
                      className="flex items-center gap-3"
                    >
                      <Star className="w-3.5 h-3.5 flex-shrink-0" style={{ color: selected.color }} />
                      <span className="text-sm text-zinc-500 dark:text-zinc-400">{sub}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Connections */}
                <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-white/5">
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-2">Connected Skills</div>
                  <div className="flex flex-wrap gap-2">
                    {CONNECTIONS
                      .filter(([a, b]) => a === selected.id || b === selected.id)
                      .map(([a, b]) => {
                        const otherId = a === selected.id ? b : a;
                        const other = SKILLS.find(s => s.id === otherId)!;
                        return (
                          <button
                            key={other.id}
                            onClick={() => setSelected(other)}
                            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-200/50 dark:bg-zinc-900/50 border border-zinc-300 dark:border-white/5 text-xs text-zinc-500 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-white/10 transition-colors"
                          >
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: other.color }} />
                            {other.name.split("/")[0].trim()}
                          </button>
                        );
                      })}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
