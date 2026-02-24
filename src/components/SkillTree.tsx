"use client";

import { motion } from "framer-motion";
import { Terminal, Database, Palette, Atom, ShieldAlert, FileCode2 } from "lucide-react";

const skills = [
  {
    id: 1,
    name: "React & Next.js",
    tier: "LEGENDARY",
    level: 88,
    currentXp: "17.600",
    maxXp: "20.000",
    icon: Atom,
    color: "from-orange-500 to-yellow-500",
    shadow: "shadow-[0_0_15px_rgba(249,115,22,0.4)]",
    border: "border-orange-500/40",
    textTier: "text-orange-400",
    bgTier: "bg-orange-500/10",
  },
  {
    id: 2,
    name: "Tailwind CSS & UI",
    tier: "LEGENDARY",
    level: 92,
    currentXp: "18.400",
    maxXp: "20.000",
    icon: Palette,
    color: "from-pink-500 to-rose-500",
    shadow: "shadow-[0_0_15px_rgba(236,72,153,0.4)]",
    border: "border-pink-500/40",
    textTier: "text-pink-400",
    bgTier: "bg-pink-500/10",
  },
  {
    id: 3,
    name: "TypeScript",
    tier: "EPIC",
    level: 82,
    currentXp: "16.400",
    maxXp: "20.000",
    icon: FileCode2,
    color: "from-purple-500 to-indigo-500",
    shadow: "shadow-[0_0_15px_rgba(168,85,247,0.4)]",
    border: "border-purple-500/40",
    textTier: "text-purple-400",
    bgTier: "bg-purple-500/10",
  },
  {
    id: 4,
    name: "Node.js & Auth",
    tier: "EPIC",
    level: 75,
    currentXp: "15.000",
    maxXp: "20.000",
    icon: ShieldAlert,
    color: "from-violet-500 to-fuchsia-500",
    shadow: "shadow-[0_0_15px_rgba(139,92,246,0.4)]",
    border: "border-violet-500/40",
    textTier: "text-violet-400",
    bgTier: "bg-violet-500/10",
  },
  {
    id: 5,
    name: "PostgreSQL",
    tier: "RARE",
    level: 70,
    currentXp: "14.000",
    maxXp: "20.000",
    icon: Database,
    color: "from-teal-400 to-emerald-400",
    shadow: "shadow-[0_0_15px_rgba(45,212,191,0.4)]",
    border: "border-teal-500/40",
    textTier: "text-teal-400",
    bgTier: "bg-teal-500/10",
  },
  {
    id: 6,
    name: "NestJS / Prisma",
    tier: "RARE",
    level: 65,
    currentXp: "13.000",
    maxXp: "20.000",
    icon: Terminal,
    color: "from-cyan-400 to-blue-500",
    shadow: "shadow-[0_0_15px_rgba(34,211,238,0.4)]",
    border: "border-cyan-500/40",
    textTier: "text-cyan-400",
    bgTier: "bg-cyan-500/10",
  },
];

export default function SkillTree() {
  return (
    <section className="py-32 bg-[#0a0a0a] relative z-20 overflow-hidden font-sans">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 drop-shadow-[0_0_10px_rgba(192,132,252,0.3)]"
          >
            SKILL TREE
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 tracking-widest text-sm md:text-base uppercase font-medium"
          >
            &gt; Habilidades de Nível Máximo Desbloqueadas
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative p-6 md:p-8 rounded-2xl bg-zinc-950/50 border ${skill.border} backdrop-blur-sm group hover:bg-zinc-900/80 transition-all duration-500`}
              >
                
                <div className={`absolute -top-3 right-6 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase border ${skill.border} ${skill.bgTier} ${skill.textTier} shadow-lg`}>
                  {skill.tier}
                </div>

                <div className="flex items-center gap-6 mb-6">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-zinc-900 border ${skill.border} ${skill.shadow}`}>
                    <Icon className={`w-6 h-6 ${skill.textTier}`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-end mb-1">
                      <h3 className="text-xl md:text-2xl font-bold text-zinc-100">{skill.name}</h3>
                      <span className={`text-2xl md:text-3xl font-black ${skill.textTier} drop-shadow-[0_0_8px_currentColor]`}>
                        {skill.level}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* AREA DA BARRA DE XP ARRUMADA */}
                <div className="relative mt-4">
                  <div className="w-full h-3 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 + (index * 0.1) }}
                      className={`h-full bg-gradient-to-r ${skill.color} ${skill.shadow} rounded-full relative`}
                    >
                      <div className="absolute top-0 right-0 bottom-0 w-4 bg-white/30 blur-[2px]"></div>
                    </motion.div>
                  </div>
                  
                  <div className="flex justify-between mt-3 text-[10px] md:text-xs font-mono uppercase font-bold tracking-widest">
                    <span className="text-zinc-500">Nível {skill.level}/100</span>
                    <span className={skill.textTier}>
                      {skill.currentXp} <span className="text-zinc-500">/ {skill.maxXp} XP</span>
                    </span>
                  </div>
                </div>

                {/* Detalhes de borda Cyberpunk */}
                <div className={`absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 rounded-tl-lg opacity-50 ${skill.border}`}></div>
                <div className={`absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 rounded-br-lg opacity-50 ${skill.border}`}></div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}