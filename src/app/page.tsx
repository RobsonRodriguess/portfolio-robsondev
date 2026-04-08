"use client";

import React, { useState, useEffect } from "react";
import GlitchTitle from "@/components/GlitchTitle";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
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
import AboutMe from "@/components/AboutMe";
import TerminalProfile from "@/components/Terminal";
import FloatingSpotify from "@/components/FloatingSpotify";
import SpotifyCard from "@/components/SpotifyCard";
import GithubStats from "@/components/GithubStats";
import Timeline from "@/components/Timeline";
import { useSound } from "@/components/SoundContext";
import { useLanguage } from "@/components/LanguageContext";
import SpaceShooter from "@/components/SpaceShooter";
import LoadingScreen from "@/components/LoadingScreen";
import ParticleBackground from "@/components/ParticleBackground";
import StatsSection from "@/components/StatsSection";
import ScrollToTop from "@/components/ScrollToTop";

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

function TechCarouselRow({
  techs: rowTechs,
  direction,
  speed,
  gap,
}: {
  techs: typeof techs;
  direction: number;
  speed: number;
  gap: string;
}) {
  const repeated = [...rowTechs, ...rowTechs, ...rowTechs, ...rowTechs, ...rowTechs, ...rowTechs];
  const animName = `marquee-tech-${direction}-${speed}`;

  return (
    <div className="flex" style={{ height: 72 }}>
      <style>{`
        @keyframes ${animName} {
          0% { transform: translateX(${direction === 1 ? '0%' : '-33.33333%'}); }
          100% { transform: translateX(${direction === 1 ? '-33.33333%' : '0%'}); }
        }
      `}</style>
      <motion.div
        className="flex items-center"
        style={{ animation: `${animName} ${speed}s linear infinite` }}
      >
        {repeated.map((tech, index) => (
          <div
            key={index}
            className="flex items-center cursor-pointer group/tech"
            style={{ marginLeft: gap }}
          >
            <div className="relative px-5 py-3.5 rounded-2xl bg-zinc-100/80 dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-white/[0.04] backdrop-blur-sm hover:border-zinc-300 dark:hover:border-white/10 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <tech.icon
                className={`w-8 h-8 text-zinc-400 dark:text-zinc-500 transition-all duration-300 group-hover/tech:scale-125 ${tech.color}`}
              />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

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

const projectMeta = [
  {
    id: 1,
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
  const { t, lang } = useLanguage();
  const { scrollYProgress: globalScroll } = useScroll();
  const scaleX = useSpring(globalScroll, { stiffness: 100, damping: 30, restDelta: 0.001 });

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
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
        }),
      });

      if (res.ok) {
        setFormState("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setFormState("idle");
        alert(lang === 'pt' ? 'Erro ao enviar. Tente novamente.' : 'Error sending. Please try again.');
      }
    } catch {
      setFormState("idle");
      alert(lang === 'pt' ? 'Erro ao enviar. Tente novamente.' : 'Error sending. Please try again.');
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

      <ParticleBackground />

      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-sky-500 to-purple-500 origin-left z-[100] rounded-full shadow-[0_0_12px_rgba(34,197,94,0.4)]"
        style={{ scaleX, opacity: globalScroll }}
      />

      <section className="min-h-screen w-full flex flex-col items-center justify-center relative z-10 px-6 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] bg-zinc-300/50 dark:bg-zinc-800/20 blur-[150px] rounded-full pointer-events-none animate-pulse duration-[7000ms]"></div>
        <motion.div className="relative z-20 text-center flex flex-col items-center w-full max-w-7xl">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-zinc-600 dark:text-zinc-400 uppercase tracking-[0.2em] text-sm md:text-base mb-8 font-mono">
            <span className="text-sky-500 dark:text-sky-400 mr-2">&lt;</span>{t.hero_badge}<span className="text-sky-500 dark:text-sky-400 ml-2">/&gt;</span>
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
              {t.resume_btn}
              <svg className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
            </motion.a>
          </motion.div>

          {/* Tech carousel — dual-row infinite */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-20 w-full relative py-4"
          >
            {/* Top gradient lines */}
            <div className="absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent" />
            <div className="absolute bottom-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

            <div className="overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}>
              {/* Row 1 — left */}
              <TechCarouselRow
                techs={[techs[0], techs[1], techs[2], techs[3], techs[4], techs[5], techs[6], techs[7]]}
                direction={1}
                speed={50}
                gap="40"
              />
              {/* Row 2 — right */}
              <TechCarouselRow
                techs={[techs[8], techs[9], techs[10], techs[11], techs[12], techs[13], techs[14], techs[15]]}
                direction={-1}
                speed={60}
                gap="48"
              />
            </div>
          </motion.div>

        </motion.div>
      </section>

      <AboutMe />

      <section className="relative z-20 py-20 bg-zinc-50 dark:bg-[#0a0a0a] transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="mb-20 md:mb-32">
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-black dark:text-zinc-100">{t.works_title} <span className="text-zinc-300 dark:text-zinc-700 drop-shadow-sm dark:drop-shadow-[0_0_15px_rgba(63,63,70,0.5)]">{t.works_label}</span></h2>
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
              {activeProject + 1} / {projectMeta.length}
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
                    {t.projects[String(projectMeta[activeProject].id)].category}
                  </span>
                </div>

                {/* Live/Source badge */}
                <div className="absolute top-6 right-6 z-10">
                  <span className={`flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] bg-black/60 dark:bg-black/80 text-white border border-white/10 rounded-full backdrop-blur-sm`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${projectMeta[activeProject].isLive ? "bg-green-400 animate-pulse" : "bg-zinc-500"}`} />
                    {projectMeta[activeProject].isLive ? t.live : t.source}
                  </span>
                </div>

                <div className="relative w-full h-full rounded-xl overflow-hidden bg-zinc-100 dark:bg-black">
                  <Image
                    src={projectMeta[activeProject].image}
                    alt={t.projects[String(projectMeta[activeProject].id)].title}
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
                    {t.projects[String(projectMeta[activeProject].id)].title}
                  </h3>
                  <p className="text-zinc-500 dark:text-zinc-400 text-base md:text-lg font-light leading-relaxed max-w-2xl">
                    {t.projects[String(projectMeta[activeProject].id)].description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-6">
                    {projectMeta[activeProject].tags.map((tag) => {
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
                    href={projectMeta[activeProject].link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={playHover}
                    onClick={playClick}
                    className="group/btn inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-zinc-800 dark:text-zinc-100 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
                  >
                    {projectMeta[activeProject].isLive ? t.visit_live : t.view_source}
                    {projectMeta[activeProject].isLive ? (
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
            {projectMeta.map((project, i) => (
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
                  {t.projects[String(project.id)].title}
                </span>
                {i === activeProject && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-zinc-900 dark:bg-zinc-100 rounded-full" />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <StatsSection />
      <TerminalProfile />
      <Timeline />
      <SkillTree />

      {/* Code Rhythm Section */}
      <section className="py-24 bg-zinc-50 dark:bg-[#0a0a0a] relative z-20 overflow-hidden transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative group"
          >
            {/* Animated border gradient */}
            <div className="absolute -inset-[1px] rounded-[2.6rem] bg-gradient-to-br from-green-500/30 via-sky-500/10 to-purple-500/30 opacity-50 group-hover:opacity-100 transition-opacity duration-1000 blur" />
            <div className="absolute -inset-[1px] rounded-[2.6rem] bg-gradient-to-br from-green-500/30 via-sky-500/10 to-purple-500/30 opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />

            <div className="relative bg-zinc-50/80 dark:bg-[#0a0a0a]/90 backdrop-blur-3xl rounded-[2.5rem] p-8 md:p-12 lg:p-16 overflow-hidden border border-zinc-200/50 dark:border-white/5 transition-colors duration-500">
              {/* Animated background orbs */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                  className="absolute -top-20 -left-20 w-96 h-96 bg-green-500/[0.04] rounded-full blur-3xl"
                  animate={{ scale: [1, 1.3, 1], x: [0, 30, 0], y: [0, -20, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute -bottom-32 -right-32 w-80 h-80 bg-purple-500/[0.04] rounded-full blur-3xl"
                  animate={{ scale: [1, 1.4, 1], x: [0, -40, 0], y: [0, 20, 0] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-sky-500/[0.03] rounded-full blur-3xl"
                  animate={{ scale: [1, 1.5, 1], rotate: [0, 90, 180] }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />

                {/* Sound wave lines */}
                <div className="absolute bottom-0 left-0 right-0 h-32 flex items-end justify-center gap-[2px] opacity-[0.03]">
                  {Array.from({ length: 80 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-[2px] bg-gradient-to-t from-green-500 to-sky-500 rounded-full origin-bottom"
                      style={{ height: "100%" }}
                      animate={{ scaleY: [0.15, 0.3 + Math.random() * 0.7, 0.15] }}
                      transition={{ duration: 1.5 + Math.random() * 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.05 }}
                    />
                  ))}
                </div>

                {/* Floating musical notes — cleaner */}
                {["♪", "♫", "♬", "♩"].map((note, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-green-500/[0.05] text-3xl select-none"
                    animate={{
                      y: [-20, -60, -20],
                      x: [0, i % 2 === 0 ? 10 : -10, 0],
                      opacity: [0, 0.3, 0],
                      rotate: [0, i % 2 === 0 ? 15 : -15, 0],
                    }}
                    transition={{
                      duration: 6 + i * 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 1.5,
                    }}
                    style={{ left: `${15 + i * 22}%`, top: `${20 + (i % 2) * 30}%` }}
                  >
                    {note}
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
                {/* Left content */}
                <div className="relative z-10">
                  {/* IN ZONE badge — bigger equalizer */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-3 mb-8"
                  >
                    <div className="relative">
                      <span className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping opacity-30" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.5)]" />
                    </div>
                    <div className="h-8 flex items-end gap-[2.5px]">
                      {Array.from({ length: 12 }).map((_, bar) => (
                        <motion.div
                          key={bar}
                          className="w-[3px] rounded-full bg-gradient-to-t from-green-600 to-green-400"
                          animate={{ height: [4, 10 + Math.sin(bar * 0.6) * 14 + 10, 4] }}
                          transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: bar * 0.08,
                          }}
                        />
                      ))}
                    </div>
                    <span className="text-green-500 font-mono text-[10px] uppercase tracking-widest font-bold">{t.in_zone}</span>
                  </motion.div>

                  {/* Title */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter leading-tight text-black dark:text-white">
                      {t.coding_text} <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-sky-500 to-purple-500 uppercase italic text-3xl md:text-4xl lg:text-5xl">
                        {t.rhythm_text}
                      </span>
                    </h2>
                  </motion.div>

                  {/* Genre pills */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-wrap gap-2.5 mt-6 mb-8"
                  >
                    {[t.genre_pop, t.genre_metal, t.genre_alt, t.genre_indie].map((genre, i) => (
                      <motion.span
                        key={genre}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + i * 0.08 }}
                        whileHover={{ scale: 1.05, borderColor: "rgba(34,197,94,0.4)" }}
                        className="px-4 py-1.5 text-[10px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 border border-zinc-200 dark:border-white/5 rounded-full bg-white/40 dark:bg-white/[0.02] hover:text-green-500 dark:hover:text-green-400 transition-colors duration-300 cursor-default"
                      >
                        {genre}
                      </motion.span>
                    ))}
                  </motion.div>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 }}
                    className="text-zinc-600 dark:text-zinc-400 text-base md:text-lg font-light max-w-md leading-relaxed mb-10 border-l-2 border-green-500/30 pl-6"
                  >
                    {t.coding_rhythm_desc}
                  </motion.p>

                  {/* Stats with mini progress bars */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                    className="flex items-center gap-6 text-xs"
                  >
                    {[
                      { label: t.mood, value: t.mood_val, pct: 85, color: "from-green-500 to-emerald-400" },
                      { label: t.vibe, value: t.vibe_val, pct: 72, color: "from-sky-500 to-cyan-400" },
                      { label: t.output, value: t.output_val, pct: 93, color: "from-purple-500 to-violet-400" },
                    ].map((stat) => (
                      <div key={stat.label} className="flex-1 max-w-[120px]">
                        <div className="text-zinc-400 dark:text-zinc-600 font-mono text-[10px] uppercase tracking-wider mb-1.5">{stat.label}</div>
                        <div className="text-zinc-700 dark:text-zinc-300 font-bold text-sm mb-2">{stat.value}</div>
                        <div className="w-full h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full bg-gradient-to-r ${stat.color} rounded-full`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${stat.pct}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, delay: 1, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </div>

                {/* Right — Spotify */}
                <div className="flex justify-center lg:justify-end relative z-10">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                  >
                    <SpotifyCard />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact / Footer */}
      <footer className="relative z-20 bg-zinc-100 dark:bg-[#050505] pt-32 pb-12 overflow-hidden transition-colors duration-500">
        {/* Animated background */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute bottom-0 left-0 w-[60vw] h-[60vh] bg-gradient-to-tr from-green-500/5 to-transparent blur-[120px] rounded-full"
            animate={{ scale: [1, 1.3, 1], x: [0, 20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-20 right-0 w-[40vw] h-[40vh] bg-gradient-to-bl from-purple-500/3 to-transparent blur-[100px] rounded-full"
            animate={{ scale: [1, 1.4, 1], x: [0, -30, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.02]"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
            {/* Left — Title + Links */}
            <div className="lg:col-span-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative"
              >
                {/* Status badge */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 mb-8"
                >
                  <div className="relative">
                    <span className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping opacity-20" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]" />
                  </div>
                  <span className="text-green-500 font-mono text-[10px] uppercase tracking-widest">{t.available}</span>
                </motion.div>

                {/* Huge title */}
                <h2 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-black dark:text-white leading-[0.85] mb-6">
                  {lang === 'en' ? "LET'S" : "VAMOS"} <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-sky-500 to-purple-500 italic uppercase">
                    {lang === 'en' ? 'Connect.' : 'Conectar.'}
                  </span>
                </h2>

                <p className="text-zinc-600 dark:text-zinc-400 text-lg md:text-xl font-light max-w-md leading-relaxed mb-12 border-l-2 border-green-500/30 pl-6">
                  {lang === 'en'
                    ? 'Based in Brasília, DF. Open to remote projects that challenge conventional logic.'
                    : 'Baseado em Brasília, DF. Aberto a projetos remotos que desafiam a lógica convencional.'}
                </p>

                {/* Social links — vertical list style */}
                <div className="space-y-3 mb-8">
                  {[
                    {
                      icon: <Github className="w-5 h-5" />,
                      label: t.github,
                      sub: '@RobsonRodriguess',
                      url: 'https://github.com/RobsonRodriguess',
                      accent: 'green' as const,
                    },
                    {
                      icon: (
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      ),
                      label: t.linkedin,
                      sub: 'robson-rodrigues',
                      url: 'https://www.linkedin.com/in/robson-rodrigues-dev/',
                      accent: 'sky' as const,
                    },
                    {
                      icon: <MessageCircle className="w-5 h-5" />,
                      label: t.discord,
                      sub: copied ? t.discord_copied : t.discord_copy,
                      url: null,
                      accent: 'indigo' as const,
                      action: () => { handleCopyDiscord(); playClick(); },
                    },
                  ].map((link, i) => {
                    const accentMap = {
                      green: { border: 'border-green-500/30 hover:border-green-500/50', bg: 'hover:bg-green-500/[0.04]', shadow: 'hover:shadow-[0_0_30px_rgba(34,197,94,0.06)]', text: 'group-hover:text-green-500' },
                      sky: { border: 'border-sky-500/30 hover:border-sky-500/50', bg: 'hover:bg-sky-500/[0.04]', shadow: 'hover:shadow-[0_0_30px_rgba(14,165,233,0.06)]', text: 'group-hover:text-sky-500' },
                      indigo: { border: 'border-indigo-500/30 hover:border-indigo-500/50', bg: 'hover:bg-indigo-500/[0.04]', shadow: 'hover:shadow-[0_0_30px_rgba(99,102,241,0.06)]', text: 'group-hover:text-indigo-500' },
                    };
                    const accent = accentMap[link.accent];
                    const Tag = link.url ? 'a' : 'button';

                    return (
                      <motion.div
                        key={link.label}
                        initial={{ opacity: 0, x: -15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                      >
                        <Tag
                          href={link.url || undefined}
                          target={link.url ? '_blank' : undefined}
                          rel={link.url ? 'noopener noreferrer' : undefined}
                          onClick={link.action as React.MouseEventHandler}
                          onMouseEnter={playHover}
                          className={`group flex items-center gap-5 w-full px-6 py-4 bg-white/60 dark:bg-zinc-900/40 border border-zinc-200 dark:border-white/5 ${accent.border} ${accent.bg} ${accent.shadow} rounded-2xl backdrop-blur-sm transition-all duration-500 hover:-translate-y-0.5`}
                        >
                          <div className={`w-11 h-11 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 flex items-center justify-center text-zinc-500 ${accent.text} transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(34,197,94,0.1)]`}>
                            {link.icon}
                          </div>
                          <div className="flex-1 text-left">
                            <div className="text-xs font-bold text-zinc-700 dark:text-zinc-200">{link.label}</div>
                            <div className="text-[10px] text-zinc-400 dark:text-zinc-600 font-mono">{link.sub}</div>
                          </div>
                          <ArrowUpRight className={`w-4 h-4 text-zinc-300 dark:text-zinc-700 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 ${accent.text}`} />
                        </Tag>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* Right — Contact Form */}
            <div className="lg:col-span-6 min-h-[500px] flex">
              <AnimatePresence mode="wait">
                {formState !== "success" ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    className="w-full relative group/form"
                  >
                    {/* Card background with animated border */}
                    <div className="absolute -inset-[1px] rounded-[2.1rem] bg-gradient-to-br from-green-500/20 via-transparent to-sky-500/20 opacity-30 group-hover/form:opacity-60 blur-sm transition-opacity duration-700" />
                    <div className="absolute -inset-[1px] rounded-[2.1rem] bg-gradient-to-br from-green-500/20 via-transparent to-sky-500/20 opacity-30 group-hover/form:opacity-60 transition-opacity duration-700" />

                    <div className="relative bg-white/70 dark:bg-zinc-900/40 backdrop-blur-xl p-8 md:p-10 rounded-[2rem] relative overflow-hidden transition-colors duration-500">
                      {/* Decorative top line */}
                      <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-green-500/40 to-transparent" />
                      {/* Corner accents */}
                      <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-green-500/15 rounded-tl-lg" />
                      <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-green-500/15 rounded-br-lg" />

                      {/* Header */}
                      <div className="flex items-center gap-3 mb-8">
                        <motion.div
                          whileHover={{ rotate: -10, scale: 1.05 }}
                          className="w-11 h-11 rounded-xl bg-gradient-to-br from-green-500/10 to-sky-500/10 flex items-center justify-center border border-green-500/10"
                        >
                          <Send className="w-5 h-5 text-green-500" />
                        </motion.div>
                        <div>
                          <div className="text-sm font-bold text-zinc-800 dark:text-zinc-200">{t.send_title}</div>
                          <div className="text-[10px] text-zinc-400 dark:text-zinc-600 font-mono uppercase tracking-wider">{t.send_subtitle}</div>
                        </div>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          {/* Name */}
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-3">{t.name_label}</label>
                            <div className="relative group/input">
                              <input
                                type="text" name="name" required placeholder={t.name_placeholder}
                                onFocus={playClick}
                                className="w-full bg-zinc-50/80 dark:bg-white/5 border border-zinc-200/80 dark:border-white/10 rounded-2xl px-6 py-4 text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-green-500/50 focus:bg-green-500/[0.02] group-hover/input:border-zinc-300 dark:group-hover/input:border-white/15 transition-all duration-300 font-mono text-sm"
                              />
                            </div>
                          </div>
                          {/* Email */}
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-3">{t.email_label}</label>
                            <div className="relative group/input">
                              <input
                                type="email" name="email" required placeholder={t.email_placeholder}
                                onFocus={playClick}
                                className="w-full bg-zinc-50/80 dark:bg-white/5 border border-zinc-200/80 dark:border-white/10 rounded-2xl px-6 py-4 text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-green-500/50 focus:bg-green-500/[0.02] group-hover/input:border-zinc-300 dark:group-hover/input:border-white/15 transition-all duration-300 font-mono text-sm"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Message */}
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-3">{t.message_label}</label>
                          <textarea
                            name="message" required rows={4} placeholder={t.message_placeholder}
                            onFocus={playClick}
                            className="w-full bg-zinc-50/80 dark:bg-white/5 border border-zinc-200/80 dark:border-white/10 rounded-2xl px-6 py-4 text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-green-500/50 focus:bg-green-500/[0.02] transition-all duration-300 font-mono text-sm resize-none"
                          />
                        </div>

                        {/* Submit */}
                        <motion.button
                          type="submit" disabled={formState === "loading"}
                          onMouseEnter={playHover} onClick={playClick}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          className="relative w-full py-5 overflow-hidden rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-black font-black uppercase tracking-[0.2em] text-xs hover:shadow-[0_10px_40px_rgba(34,197,94,0.2)] dark:hover:shadow-[0_10px_40px_rgba(34,197,94,0.15)] transition-shadow duration-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group/btn"
                        >
                          {/* Shimmer on hover */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000" />
                          <span className="relative">{formState === "loading" ? t.sending_btn : t.send_btn}</span>
                          <Send className="w-4 h-4 relative group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
                        </motion.button>
                      </form>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="w-full relative"
                  >
                    {/* Success card glow */}
                    <div className="absolute -inset-[1px] rounded-[2.6rem] bg-gradient-to-br from-green-500/30 to-emerald-500/20 opacity-40 blur" />
                    <div className="absolute -inset-[1px] rounded-[2.6rem] bg-gradient-to-br from-green-500/30 to-emerald-500/20 opacity-40" />

                    <div className="relative bg-green-50/80 dark:bg-green-500/[0.06] backdrop-blur-xl border border-green-200/80 dark:border-green-500/15 p-10 md:p-14 rounded-[2.5rem] flex flex-col items-center justify-center text-center overflow-hidden transition-colors duration-500">
                      {/* Floating success particles */}
                      {Array.from({ length: 8 }).map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1.5 h-1.5 bg-green-500/30 rounded-full"
                          animate={{
                            y: [0, -30 - i * 10],
                            x: [0, Math.sin(i) * 20],
                            opacity: [0, 0.6, 0],
                          }}
                          transition={{
                            duration: 2 + i * 0.3,
                            repeat: Infinity,
                            ease: "easeOut",
                            delay: i * 0.25,
                          }}
                          style={{
                            left: `${15 + i * 10}%`,
                            bottom: '20%',
                          }}
                        />
                      ))}

                      {/* Animated checkmark */}
                      <motion.div
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                        className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-400 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(34,197,94,0.3)]"
                      >
                        <CheckCircle2 className="w-10 h-10 text-white" strokeWidth={3} />
                      </motion.div>

                      <motion.h3
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white mb-2 uppercase tracking-tight"
                      >
                        {t.success_title}
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-zinc-600 dark:text-zinc-400 font-mono text-sm max-w-[280px]"
                      >
                        {t.success_text}
                      </motion.p>
                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        onClick={() => { setFormState("idle"); playClick(); }}
                        className="mt-8 text-xs font-black uppercase tracking-widest text-green-600 dark:text-green-500 hover:text-black dark:hover:text-white transition-colors"
                      >
                        {t.success_again}
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Divider + GithubStats */}
          <div className="py-12 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3/4 h-px bg-gradient-to-r from-transparent via-zinc-300/50 dark:via-white/10 to-transparent" />
            </div>
            <div className="relative">
              <GithubStats />
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-t border-zinc-300/50 dark:border-white/5 pt-10">
            <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-500 dark:text-zinc-700">
              {t.footer_text}
            </div>
            <button
              onClick={() => { setShowGame(true); playClick(); }}
              onMouseEnter={playHover}
              className="group flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] uppercase text-zinc-600 dark:text-zinc-800 hover:text-green-500 dark:hover:text-green-500 transition-all duration-300 cursor-pointer"
            >
              <Gamepad2 className="w-3 h-3 group-hover:animate-pulse" />
              {t.void_defender}
            </button>
            <div className="text-black dark:text-zinc-800 font-black text-xl italic tracking-tighter cursor-default">
              ROBSON<span className="text-zinc-500 dark:text-zinc-900">.DEV</span>
            </div>
          </div>
        </div>
      </footer>
      <FloatingSpotify />
      <ScrollToTop />

      <AnimatePresence>
        {showGame && <SpaceShooter onClose={() => setShowGame(false)} />}
      </AnimatePresence>
    </motion.main>
    </>
  );
}
