"use client";

import React, { useState, useEffect } from "react";
import GlitchTitle from "@/components/GlitchTitle";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, CheckCircle2, Copy, Send, ShieldCheck, Cpu, Sigma, LayoutTemplate, Zap, Search, MonitorSmartphone, Gamepad2, ArrowUpRight, MessageCircle } from "lucide-react";
import Image from "next/image";
import {
  SiReact, SiNextdotjs, SiTypescript, SiNodedotjs, 
  SiLua, SiRoblox, SiNestjs, SiPostgresql, 
  SiTailwindcss, SiDocker, SiPython, 
  SiMysql, SiGit, SiNginx, SiPrisma, SiVercel, SiSupabase
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

import SkillTree from "@/components/SkillTree";
import TerminalProfile from "@/components/Terminal";
import FloatingSpotify from "@/components/FloatingSpotify";
import SpotifyCard from "@/components/SpotifyCard";
import GithubStats from "@/components/GithubStats";
import Timeline from "@/components/Timeline";
import { useSound } from "@/components/SoundContext";
import SpaceShooter from "@/components/SpaceShooter";
import LoadingScreen from "@/components/LoadingScreen";

const techs = [
  { name: "REACT", icon: SiReact, color: "hover:text-[#61DAFB]" },
  { name: "NEXT.JS", icon: SiNextdotjs, color: "hover:text-black dark:hover:text-white" },
  { name: "TYPESCRIPT", icon: SiTypescript, color: "hover:text-[#3178C6]" },
  { name: "NODE.JS", icon: SiNodedotjs, color: "hover:text-[#339933]" },
  { name: "LUA", icon: SiLua, color: "hover:text-[#2C2D72]" },
  { name: "ROBLOX STUDIO", icon: SiRoblox, color: "hover:text-black dark:hover:text-[#FFFFFF]" },
  { name: "JAVA", icon: FaJava, color: "hover:text-[#5382A1]" },
  { name: "PYTHON", icon: SiPython, color: "hover:text-[#3776AB]" },
  { name: "NESTJS", icon: SiNestjs, color: "hover:text-[#E0234E]" },
  { name: "POSTGRESQL", icon: SiPostgresql, color: "hover:text-[#4169E1]" },
  { name: "MYSQL", icon: SiMysql, color: "hover:text-[#4479A1]" },
  { name: "SUPABASE", icon: SiSupabase, color: "hover:text-[#3ECF8E]" },
  { name: "PRISMA", icon: SiPrisma, color: "hover:text-black dark:hover:text-[#FFFFFF]" },
  { name: "TAILWIND", icon: SiTailwindcss, color: "hover:text-[#06B6D4]" },
  { name: "DOCKER", icon: SiDocker, color: "hover:text-[#2496ED]" },
  { name: "NGINX", icon: SiNginx, color: "hover:text-[#009639]" },
  { name: "GIT", icon: SiGit, color: "hover:text-[#F05032]" },
];

const tagData: { [key: string]: { icon: React.ElementType; color: string } } = {
  "Next.js": { icon: SiNextdotjs, color: "hover:text-black dark:hover:text-white border-zinc-300 dark:border-white" },
  "Node.js Architecture": { icon: SiNodedotjs, color: "hover:text-[#339933] border-[#339933]" },
  "Security": { icon: ShieldCheck, color: "hover:text-blue-500 dark:hover:text-blue-400 border-blue-500 dark:border-blue-400" },
  "React Advanced": { icon: SiReact, color: "hover:text-[#61DAFB] border-[#61DAFB]" },
  "Game Loop Logic": { icon: Cpu, color: "hover:text-purple-500 dark:hover:text-purple-400 border-purple-500 dark:border-purple-400" },
  "Math": { icon: Sigma, color: "hover:text-yellow-500 dark:hover:text-yellow-400 border-yellow-500 dark:border-yellow-400" },
  "Frontend UX/UI": { icon: LayoutTemplate, color: "hover:text-pink-500 dark:hover:text-pink-400 border-pink-500 dark:border-pink-400" },
  "Tailwind CSS": { icon: SiTailwindcss, color: "hover:text-[#06B6D4] border-[#06B6D4]" },
  "Performance": { icon: Zap, color: "hover:text-orange-500 dark:hover:text-orange-400 border-orange-500 dark:border-orange-400" },
  "SEO Technical": { icon: Search, color: "hover:text-green-600 dark:hover:text-green-400 border-green-600 dark:border-green-400" },
  "Vercel Analytics": { icon: SiVercel, color: "hover:text-black dark:hover:text-white border-zinc-300 dark:border-white" },
  "Responsive": { icon: MonitorSmartphone, color: "hover:text-indigo-500 dark:hover:text-indigo-400 border-indigo-500 dark:border-indigo-400" },
};

const projects = [
  {
    id: 1,
    title: "Mind Health",
    category: "E-HEALTH PLATFORM",
    description: "Robust architecture for psychological support. Hyper-focused on sensitive data security, complex role management, and academic rigor in backend development.",
    tags: ["Next.js", "Node.js Architecture", "Security"],
    color: "bg-sky-500",
    textColor: "text-sky-600 dark:text-sky-400",
    neonBorder: "border-sky-500/40",
    neonShadow: "shadow-[0_0_20px_rgba(14,165,233,0.1)] dark:shadow-[0_0_20px_rgba(14,165,233,0.2)]",
    badgeBg: "bg-sky-500/10",
    image: "/mindhealth.png",
    link: "https://github.com/RobsonRodriguess/Mind-Health",
    isLive: false
  },
  {
    id: 2,
    title: "Aviator Clone Pro",
    category: "REAL-TIME LOGIC",
    description: "Real-time probability simulator with an extreme focus on mathematical modeling and backend logic. Features a transparent, high-frequency multiplier calculation system.",
    tags: ["React Advanced", "Game Loop Logic", "Math"],
    color: "bg-emerald-500",
    textColor: "text-emerald-600 dark:text-emerald-400",
    neonBorder: "border-emerald-500/40",
    neonShadow: "shadow-[0_0_20px_rgba(16,185,129,0.1)] dark:shadow-[0_0_20px_rgba(16,185,129,0.2)]",
    badgeBg: "bg-emerald-500/10",
    image: "/aviator.png",
    link: "https://github.com/RobsonRodriguess/aviator-clone-pro",
    isLive: false
  },
  {
    id: 3,
    title: "Candangos Shop",
    category: "E-COMMERCE UI/UX",
    description: "Digital storefront strictly focused on the user journey. Features dynamic product filtering, an optimized shopping cart state, and high-performance responsive UI.",
    tags: ["Frontend UX/UI", "Tailwind CSS", "Performance"],
    color: "bg-purple-500",
    textColor: "text-purple-600 dark:text-purple-400",
    neonBorder: "border-purple-500/40",
    neonShadow: "shadow-[0_0_20px_rgba(168,85,247,0.1)] dark:shadow-[0_0_20px_rgba(168,85,247,0.2)]",
    badgeBg: "bg-purple-500/10",
    image: "/candangos.png",
    link: "https://candangos-shop.vercel.app/",
    isLive: true
  },
  {
    id: 4,
    title: "Gabriela Decorações",
    category: "SEO & PERFORMANCE",
    description: "Production-ready platform delivered with a heavy focus on Search Engine Optimization (SEO), Core Web Vitals, and active traffic monitoring analytics.",
    tags: ["SEO Technical", "Vercel Analytics", "Responsive"],
    color: "bg-orange-500",
    textColor: "text-orange-600 dark:text-orange-400",
    neonBorder: "border-orange-500/40",
    neonShadow: "shadow-[0_0_20px_rgba(249,115,22,0.1)] dark:shadow-[0_0_20px_rgba(249,115,22,0.2)]",
    badgeBg: "bg-orange-500/10",
    image: "/gabrieladecora.png",
    link: "https://www.gabrieladecoracoes.com.br/",
    isLive: true
  },
];

export default function Portfolio() {
  const [loading, setLoading] = useState(true);
  const [formState, setFormState] = useState<"idle" | "loading" | "success">("idle");
  const [copied, setCopied] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [activeProject, setActiveProject] = useState(0);
  const { playHover, playClick } = useSound();

  // Konami Code Easter Egg
  useEffect(() => {
    const konamiCode = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
    let index = 0;
    const handle = (e: KeyboardEvent) => {
      if (e.key === konamiCode[index]) {
        index++;
        if (index === konamiCode.length) {
          setShowGame(true);
          index = 0;
        }
      } else {
        index = 0;
      }
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, []);

  const discordID = "409017051223556121";

  const handleCopyDiscord = () => {
    navigator.clipboard.writeText(discordID);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("loading");

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "03d48945-cadb-4ede-ab70-925bc6f5444f");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      if (res.ok) {
        setFormState("success");
        (e.target as HTMLFormElement).reset();
      }
    } catch (err) {
      setFormState("idle");
      alert("Error sending. Please try again.");
    }
  }

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      </AnimatePresence>

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="bg-zinc-50 dark:bg-[#0a0a0a] text-zinc-900 dark:text-zinc-100 font-sans selection:bg-zinc-300 dark:selection:bg-zinc-800/50 min-h-screen transition-colors duration-500"
      >
      <div className="fixed inset-0 z-[1] opacity-[0.03] dark:opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      <section className="min-h-screen w-full flex flex-col items-center justify-center relative z-10 px-6 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] bg-zinc-300/50 dark:bg-zinc-800/20 blur-[150px] rounded-full pointer-events-none animate-pulse duration-[7000ms]"></div>
        <motion.div className="relative z-20 text-center flex flex-col items-center w-full max-w-7xl">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-zinc-600 dark:text-zinc-400 uppercase tracking-[0.2em] text-sm md:text-base mb-8 font-mono">
            <span className="text-sky-500 dark:text-sky-400 mr-2">&lt;</span>Software Engineer & Frontend<span className="text-sky-500 dark:text-sky-400 ml-2">/&gt;</span>
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-7xl md:text-[9rem] font-black tracking-tighter leading-[0.9] mb-10 drop-shadow-xl dark:drop-shadow-[0_0_30px_rgba(255,255,255,0.05)] text-black dark:text-white"
          >
            <GlitchTitle />
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-12"
          >
            <motion.a 
              href="/curriculorobson2026.pdf"
              target="_blank"
              onMouseEnter={playHover}
              onClick={playClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-full font-black uppercase tracking-widest text-xs md:text-sm shadow-[0_10px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_30px_rgba(255,255,255,0.15)] hover:shadow-green-500/20 dark:hover:shadow-green-500/30 transition-all duration-300"
            >
              <span className="absolute inset-0 rounded-full border border-zinc-700 dark:border-zinc-200 opacity-50 group-hover:border-green-500 transition-colors duration-300"></span>
              View Resume
              <svg className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
            </motion.a>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-20 w-full overflow-hidden relative carousel-container"
          >
            <style>{`
              @keyframes marquee {
                0% { transform: translateX(0%); }
                100% { transform: translateX(-50%); }
              }
              .animate-marquee {
                display: flex;
                width: max-content;
                animation: marquee 40s linear infinite;
              }
              .carousel-container:hover .animate-marquee {
                animation-play-state: paused;
              }
            `}</style>

            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-zinc-50 dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none transition-colors duration-500"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-zinc-50 dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none transition-colors duration-500"></div>

            <div className="animate-marquee items-center py-4">
              {[...techs, ...techs, ...techs, ...techs].map((tech, index) => (
                <div key={index} className={`flex items-center group/tech px-8 cursor-pointer text-zinc-400 dark:text-zinc-700 transition-all duration-300 ${tech.color}`}>
                  <tech.icon className="w-12 h-12 flex-shrink-0 transition-transform duration-300 group-hover/tech:scale-110 drop-shadow-md" />
                  <span className="max-w-0 overflow-hidden opacity-0 group-hover/tech:max-w-[200px] group-hover/tech:opacity-100 group-hover/tech:ml-4 transition-all duration-500 ease-in-out font-black text-3xl tracking-tighter text-black dark:text-white">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          
          </motion.div>

        </motion.div>
      </section>

      <section className="relative z-20 py-20 bg-zinc-50 dark:bg-[#0a0a0a] transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="mb-20 md:mb-32">
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-black dark:text-zinc-100">Selected <span className="text-zinc-300 dark:text-zinc-700 drop-shadow-sm dark:drop-shadow-[0_0_15px_rgba(63,63,70,0.5)]">Works.</span></h2>
            <div className="w-24 h-1 bg-zinc-300 dark:bg-zinc-800 mt-8 transition-colors duration-500"></div>
          </motion.div>

          {/* Project counter */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-16 md:mb-24"
          >
            <span className="text-6xl md:text-8xl font-black text-zinc-200 dark:text-zinc-800 font-mono">{String(activeProject + 1).padStart(2, "0")}</span>
            <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
            <span className="text-zinc-400 dark:text-zinc-600 font-mono text-xs uppercase tracking-widest">
              {activeProject + 1} / {projects.length}
            </span>
          </motion.div>

          {/* Active project showcase */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -60 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-16 md:mb-24"
            >
              <div className="aspect-[16/9] w-full relative rounded-2xl overflow-hidden border border-zinc-200 dark:border-white/5 bg-white dark:bg-zinc-900/50 p-2 shadow-2xl dark:shadow-[0_20px_80px_rgba(0,0,0,0.5)]">
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 rounded-tl-lg border-zinc-300 dark:border-zinc-700 z-10" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 rounded-br-lg border-zinc-300 dark:border-zinc-700 z-10" />

                {/* Category badge */}
                <div className="absolute top-6 left-6 z-10">
                  <span className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] bg-black/60 dark:bg-black/80 text-white border border-white/10 rounded-full backdrop-blur-sm`}>
                    {projects[activeProject].category}
                  </span>
                </div>

                {/* Live/Source badge */}
                <div className="absolute top-6 right-6 z-10">
                  <span className={`flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] bg-black/60 dark:bg-black/80 text-white border border-white/10 rounded-full backdrop-blur-sm`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${projects[activeProject].isLive ? "bg-green-400 animate-pulse" : "bg-zinc-500"}`} />
                    {projects[activeProject].isLive ? "LIVE" : "SOURCE"}
                  </span>
                </div>

                <div className="relative w-full h-full rounded-xl overflow-hidden bg-zinc-100 dark:bg-black">
                  <Image
                    src={projects[activeProject].image}
                    alt={projects[activeProject].title}
                    fill
                    className="object-cover object-top grayscale-[30%] hover:grayscale-0 transition-all duration-1000"
                  />
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Project details */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`detail-${activeProject}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mb-12"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16">
                {/* Title + description */}
                <div className="lg:col-span-2">
                  <h3 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter text-black dark:text-zinc-100">
                    {projects[activeProject].title}
                  </h3>
                  <p className="text-zinc-500 dark:text-zinc-400 text-base md:text-lg font-light leading-relaxed max-w-2xl">
                    {projects[activeProject].description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-6">
                    {projects[activeProject].tags.map((tag) => {
                      const tagInfo = tagData[tag];
                      if (!tagInfo)
                        return <span key={tag} className="px-3 py-1.5 text-[10px] font-mono text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/5 rounded-full uppercase tracking-wider">{tag}</span>;
                      const Icon = tagInfo.icon;
                      return (
                        <span key={tag} className={`flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-mono text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/5 rounded-full uppercase tracking-wider transition-all duration-300 hover:border-current ${tagInfo.color}`}>
                          <Icon className="w-3 h-3" />
                          {tag}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Action + link */}
                <div className="flex flex-col justify-end items-start lg:items-end lg:text-right">
                  <a
                    href={projects[activeProject].link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={playHover}
                    onClick={playClick}
                    className="group/btn inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-zinc-800 dark:text-zinc-100 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
                  >
                    {projects[activeProject].isLive ? "Visit Live Site" : "View on GitHub"}
                    {projects[activeProject].isLive ? (
                      <ExternalLink className="w-4 h-4 opacity-50 group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-all" />
                    ) : (
                      <Github className="w-4 h-4 opacity-50 group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-all" />
                    )}
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Project navigator */}
          <div className="flex items-center gap-3 flex-wrap justify-center">
            {projects.map((project, i) => (
              <motion.button
                key={project.id}
                onClick={() => { setActiveProject(i); playClick(); }}
                onMouseEnter={playHover}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative group px-6 py-3 rounded-xl border transition-all duration-500 ${
                  i === activeProject
                    ? "border-zinc-400 dark:border-zinc-600 bg-zinc-100 dark:bg-zinc-800/50"
                    : "border-zinc-200 dark:border-zinc-800 bg-transparent hover:border-zinc-300 dark:hover:border-zinc-700"
                }`}
              >
                <span className={`text-[10px] font-black uppercase tracking-[0.15em] transition-colors duration-300 ${
                  i === activeProject
                    ? "text-zinc-900 dark:text-zinc-100"
                    : "text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-600 dark:group-hover:text-zinc-400"
                }`}>
                  {project.title}
                </span>
                {i === activeProject && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-zinc-900 dark:bg-zinc-100 rounded-full" />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <TerminalProfile />
      <Timeline />
      <SkillTree />

      <section className="py-24 bg-zinc-50 dark:bg-[#0a0a0a] relative z-20 overflow-hidden transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative group bg-gradient-to-br from-white/40 to-zinc-200/40 dark:from-zinc-900/40 dark:to-black/40 p-8 md:p-12 lg:p-16 rounded-[2.5rem] border border-zinc-300/50 dark:border-white/5 backdrop-blur-3xl overflow-hidden transition-colors duration-500">

            {/* Animated gradient border on hover */}
            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-r from-green-500/0 via-green-500/0 to-green-500/0 group-hover:from-green-500/20 group-hover:via-sky-500/20 group-hover:to-purple-500/20 transition-all duration-1000" />

            {/* Floating music notes background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {["♪", "♫", "♬", "♩", "♪"].map((note, i) => (
                <motion.div
                  key={i}
                  className="absolute text-green-500/[0.04] text-4xl md:text-6xl select-none"
                  initial={{ y: 0, opacity: 0, rotate: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  animate={{
                    y: [-30, 30],
                    x: [0, i % 2 === 0 ? 15 : -15],
                    rotate: [-8, 8],
                  }}
                  transition={{
                    duration: 5 + i,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.8,
                  }}
                  style={{
                    left: `${10 + i * 20}%`,
                    top: `${15 + (i % 3) * 25}%`,
                  }}
                >
                  {note}
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
              {/* Left content */}
              <div className="relative z-10">
                {/* Sound wave indicator */}
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="flex items-center gap-3 mb-8">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  {/* Mini equalizer bars */}
                  <div className="flex items-end gap-[3px] h-4">
                    {[0, 1, 2, 3, 4].map((bar) => (
                      <motion.div
                        key={bar}
                        className="w-[3px] rounded-full bg-green-500/70"
                        animate={{
                          height: [6, 12 + bar * 3, 6],
                        }}
                        transition={{
                          duration: 0.8 + bar * 0.15,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: bar * 0.1,
                        }}
                      />
                    ))}
                  </div>
                  <span className="text-green-500 font-mono text-[10px] uppercase tracking-widest">In the zone</span>
                </motion.div>

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-3 text-black dark:text-white leading-tight">
                  CODING <br />{" "}
                  <span className="text-zinc-400 dark:text-zinc-700 uppercase italic text-3xl md:text-4xl lg:text-5xl">
                    Rhythm.
                  </span>
                </h2>

                {/* Genre tags */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex flex-wrap gap-2 mb-6"
                >
                  {["Pop", "Metal", "Alt Rock", "Indie"].map((genre) => (
                    <span
                      key={genre}
                      className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 border border-zinc-200 dark:border-white/5 rounded-full bg-white/30 dark:bg-white/[0.02]"
                    >
                      {genre}
                    </span>
                  ))}
                </motion.div>

                <p className="text-zinc-600 dark:text-zinc-400 text-base md:text-lg font-light max-w-md leading-relaxed mb-10 border-l-2 border-green-500/30 pl-6">
                  My musical taste when coding ranges from Billie Eilish and Sabrina Carpenter to 2ZDinizz, Froid, Breezee, and more. The rhythm dictates the speed of the code.
                </p>

                {/* Stats row */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-6 text-xs"
                >
                  <div>
                    <div className="text-zinc-400 dark:text-zinc-600 font-mono text-[10px] uppercase tracking-wider">Mood</div>
                    <div className="text-zinc-700 dark:text-zinc-300 font-bold">🎧 Focused</div>
                  </div>
                  <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-800" />
                  <div>
                    <div className="text-zinc-400 dark:text-zinc-600 font-mono text-[10px] uppercase tracking-wider">Vibe</div>
                    <div className="text-zinc-700 dark:text-zinc-300 font-bold">Flow State</div>
                  </div>
                  <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-800" />
                  <div>
                    <div className="text-zinc-400 dark:text-zinc-600 font-mono text-[10px] uppercase tracking-wider">Output</div>
                    <div className="text-zinc-700 dark:text-zinc-300 font-bold">2x Speed</div>
                  </div>
                </motion.div>
              </div>

              {/* Right - SpotifyCard */}
              <div className="flex justify-center lg:justify-end relative z-10">
                <SpotifyCard />
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-20 bg-zinc-100 dark:bg-[#050505] pt-32 pb-12 border-t border-zinc-300/50 dark:border-white/5 overflow-hidden transition-colors duration-500">
        {/* Background orbs */}
        <div className="absolute bottom-0 left-0 w-[50vw] h-[50vh] bg-green-500/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute top-20 right-10 w-[20vw] h-[20vh] bg-sky-500/3 dark:bg-sky-500/[0.02] blur-[100px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Header section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
            {/* Left — CTA */}
            <div className="lg:col-span-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Online indicator */}
                <div className="flex items-center gap-3 mb-8">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  <span className="text-green-500 font-mono text-[10px] uppercase tracking-widest">Available for work</span>
                </div>

                <h2 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-black dark:text-white leading-[0.85] mb-6">
                  LET'S <br />{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-sky-500 to-purple-500 italic uppercase">
                    Connect.
                  </span>
                </h2>

                <p className="text-zinc-600 dark:text-zinc-400 text-lg md:text-xl font-light max-w-md leading-relaxed mb-12 border-l-2 border-green-500/30 pl-6">
                  Based in Brasília, DF. Open to remote projects that challenge conventional logic.
                </p>

                {/* Social links as cards */}
                <div className="flex flex-wrap gap-4">
                  {/* GitHub */}
                  <a
                    href="https://github.com/RobsonRodriguess"
                    target="_blank"
                    onMouseEnter={playHover}
                    onClick={playClick}
                    className="group flex items-center gap-4 px-5 py-4 bg-white dark:bg-zinc-900/60 border border-zinc-300 dark:border-white/5 rounded-2xl hover:border-green-500/40 dark:hover:border-green-500/30 hover:shadow-[0_0_30px_rgba(34,197,94,0.08)] transition-all duration-500"
                  >
                    <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center group-hover:bg-green-500/10 transition-colors duration-300">
                      <Github className="w-5 h-5 text-zinc-500 group-hover:text-green-500 transition-colors duration-300" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-zinc-700 dark:text-zinc-200">GitHub</div>
                      <div className="text-[10px] text-zinc-400 dark:text-zinc-600 font-mono">@RobsonRodriguess</div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 ml-auto text-zinc-300 dark:text-zinc-700 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/in/robson-rodrigues-dev/"
                    target="_blank"
                    onMouseEnter={playHover}
                    onClick={playClick}
                    className="group flex items-center gap-4 px-5 py-4 bg-white dark:bg-zinc-900/60 border border-zinc-300 dark:border-white/5 rounded-2xl hover:border-sky-500/40 dark:hover:border-sky-500/30 hover:shadow-[0_0_30px_rgba(14,165,233,0.08)] transition-all duration-500"
                  >
                    <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center group-hover:bg-sky-500/10 transition-colors duration-300">
                      <svg className="w-5 h-5 text-zinc-500 group-hover:text-sky-500 transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-zinc-700 dark:text-zinc-200">LinkedIn</div>
                      <div className="text-[10px] text-zinc-400 dark:text-zinc-600 font-mono">robson-rodrigues</div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 ml-auto text-zinc-300 dark:text-zinc-700 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                  </a>

                  {/* Discord */}
                  <button
                    onClick={() => { handleCopyDiscord(); playClick(); }}
                    onMouseEnter={playHover}
                    className="group flex items-center gap-4 px-5 py-4 bg-white dark:bg-zinc-900/60 border border-zinc-300 dark:border-white/5 rounded-2xl hover:border-indigo-500/40 dark:hover:border-indigo-500/30 hover:shadow-[0_0_30px_rgba(99,102,241,0.08)] transition-all duration-500"
                  >
                    <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center group-hover:bg-indigo-500/10 transition-colors duration-300">
                      <MessageCircle className="w-5 h-5 text-zinc-500 group-hover:text-indigo-500 transition-colors duration-300" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-zinc-700 dark:text-zinc-200">Discord</div>
                      <div className="text-[10px] text-zinc-400 dark:text-zinc-600 font-mono">
                        {copied ? "ID Copied! ✓" : "Click to copy ID"}
                      </div>
                    </div>
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Right — Form */}
            <div className="lg:col-span-6 min-h-[500px] flex">
              <AnimatePresence mode="wait">
                {formState !== "success" ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    className="w-full bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-white/5 p-8 md:p-10 rounded-[2rem] shadow-xl dark:shadow-none backdrop-blur-xl relative overflow-hidden transition-colors duration-500"
                  >
                    {/* Top accent gradient */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent"></div>

                    {/* Form header */}
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                        <Send className="w-5 h-5 text-green-500" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-zinc-800 dark:text-zinc-200">Send a message</div>
                        <div className="text-[10px] text-zinc-400 dark:text-zinc-600 font-mono uppercase tracking-wider">I'll respond within 24h</div>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Name</label>
                          <input
                            type="text"
                            name="name"
                            required
                            placeholder="Your name"
                            onFocus={playClick}
                            className="w-full bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-2xl px-6 py-4 text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-green-500/50 focus:bg-green-500/[0.02] transition-all duration-300 font-mono text-sm"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Email</label>
                          <input
                            type="email"
                            name="email"
                            required
                            placeholder="your@email.com"
                            onFocus={playClick}
                            className="w-full bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-2xl px-6 py-4 text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-green-500/50 focus:bg-green-500/[0.02] transition-all duration-300 font-mono text-sm"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Message</label>
                        <textarea
                          name="message"
                          required
                          rows={4}
                          placeholder="How can I help with your project?"
                          onFocus={playClick}
                          className="w-full bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-2xl px-6 py-4 text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-green-500/50 focus:bg-green-500/[0.02] transition-all duration-300 font-mono text-sm resize-none"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={formState === "loading"}
                        onMouseEnter={playHover}
                        onClick={playClick}
                        className="group/btn w-full py-5 bg-zinc-900 dark:bg-white text-white dark:text-black font-black uppercase tracking-[0.2em] text-xs rounded-2xl hover:bg-green-600 dark:hover:bg-green-400 disabled:bg-zinc-400 dark:disabled:bg-zinc-700 transition-all duration-500 shadow-[0_10px_30px_rgba(34,197,94,0.15)] dark:shadow-[0_10px_30px_rgba(255,255,255,0.1)] flex items-center justify-center gap-3"
                      >
                        {formState === "loading" ? "SENDING..." : "SEND MESSAGE"}
                        <Send className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="w-full bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 p-10 rounded-[2.5rem] backdrop-blur-xl flex flex-col items-center justify-center text-center transition-colors duration-500"
                  >
                    <CheckCircle2 className="w-16 h-16 text-green-500 mb-6" />
                    <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-2 uppercase">Email sent!</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 font-mono text-sm max-w-[280px]">Your message was successfully received. I will get back to you shortly.</p>
                    <button
                      onClick={() => { setFormState("idle"); playClick(); }}
                      className="mt-8 text-xs font-black uppercase tracking-widest text-green-600 dark:text-green-500 hover:text-black dark:hover:text-white transition-colors"
                    >
                      Send another message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="py-12 border-t border-zinc-300/50 dark:border-white/5 mb-12">
            <GithubStats />
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-t border-zinc-300/50 dark:border-white/5 pt-10">
            <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-500 dark:text-zinc-700">
              © 2026 Developed by Robson Rodrigues
            </div>
            <button
              onClick={() => { setShowGame(true); playClick(); }}
              onMouseEnter={playHover}
              className="group flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] uppercase text-zinc-600 dark:text-zinc-800 hover:text-green-500 dark:hover:text-green-500 transition-all duration-300 cursor-pointer"
            >
              <Gamepad2 className="w-3 h-3 group-hover:animate-pulse" />
              Void Defender
            </button>
            <div className="text-black dark:text-zinc-800 font-black text-xl italic tracking-tighter cursor-default">
              ROBSON<span className="text-zinc-500 dark:text-zinc-900">.DEV</span>
            </div>
          </div>
        </div>
      </footer>
      <FloatingSpotify />

      <AnimatePresence>
        {showGame && <SpaceShooter onClose={() => setShowGame(false)} />}
      </AnimatePresence>
    </motion.main>
    </>
  );
}