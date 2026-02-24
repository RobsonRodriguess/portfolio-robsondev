"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, CheckCircle2, Copy, ShieldCheck, Cpu, Sigma, LayoutTemplate, Zap, Search, MonitorSmartphone } from "lucide-react";
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

const techs = [
  { name: "REACT", icon: SiReact, color: "hover:text-[#61DAFB]" },
  { name: "NEXT.JS", icon: SiNextdotjs, color: "hover:text-white" },
  { name: "TYPESCRIPT", icon: SiTypescript, color: "hover:text-[#3178C6]" },
  { name: "NODE.JS", icon: SiNodedotjs, color: "hover:text-[#339933]" },
  { name: "LUA", icon: SiLua, color: "hover:text-[#2C2D72]" },
  { name: "ROBLOX STUDIO", icon: SiRoblox, color: "hover:text-[#FFFFFF]" },
  { name: "JAVA", icon: FaJava, color: "hover:text-[#5382A1]" },
  { name: "PYTHON", icon: SiPython, color: "hover:text-[#3776AB]" },
  { name: "NESTJS", icon: SiNestjs, color: "hover:text-[#E0234E]" },
  { name: "POSTGRESQL", icon: SiPostgresql, color: "hover:text-[#4169E1]" },
  { name: "MYSQL", icon: SiMysql, color: "hover:text-[#4479A1]" },
  { name: "SUPABASE", icon: SiSupabase, color: "hover:text-[#3ECF8E]" },
  { name: "PRISMA", icon: SiPrisma, color: "hover:text-[#FFFFFF]" },
  { name: "TAILWIND", icon: SiTailwindcss, color: "hover:text-[#06B6D4]" },
  { name: "DOCKER", icon: SiDocker, color: "hover:text-[#2496ED]" },
  { name: "NGINX", icon: SiNginx, color: "hover:text-[#009639]" },
  { name: "GIT", icon: SiGit, color: "hover:text-[#F05032]" },
];

const tagData: { [key: string]: { icon: React.ElementType; color: string } } = {
  "Next.js": { icon: SiNextdotjs, color: "hover:text-white hover:border-white" },
  "Node.js Architecture": { icon: SiNodedotjs, color: "hover:text-[#339933] hover:border-[#339933]" },
  "Security": { icon: ShieldCheck, color: "hover:text-blue-400 hover:border-blue-400" },
  "React Advanced": { icon: SiReact, color: "hover:text-[#61DAFB] hover:border-[#61DAFB]" },
  "Game Loop Logic": { icon: Cpu, color: "hover:text-purple-400 hover:border-purple-400" },
  "Math": { icon: Sigma, color: "hover:text-yellow-400 hover:border-yellow-400" },
  "Frontend UX/UI": { icon: LayoutTemplate, color: "hover:text-pink-400 hover:border-pink-400" },
  "Tailwind CSS": { icon: SiTailwindcss, color: "hover:text-[#06B6D4] hover:border-[#06B6D4]" },
  "Performance": { icon: Zap, color: "hover:text-orange-400 hover:border-orange-400" },
  "SEO Technical": { icon: Search, color: "hover:text-green-400 hover:border-green-400" },
  "Vercel Analytics": { icon: SiVercel, color: "hover:text-white hover:border-white" },
  "Responsive": { icon: MonitorSmartphone, color: "hover:text-indigo-400 hover:border-indigo-400" },
};

const projects = [
  {
    id: 1,
    title: "Mind Health",
    category: "E-HEALTH PLATFORM",
    description: "Robust architecture for psychological support. Hyper-focused on sensitive data security, complex role management, and academic rigor in backend development.",
    tags: ["Next.js", "Node.js Architecture", "Security"],
    color: "bg-sky-500",
    textColor: "text-sky-400",
    neonBorder: "border-sky-500/40",
    neonShadow: "shadow-[0_0_20px_rgba(14,165,233,0.2)]",
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
    textColor: "text-emerald-400",
    neonBorder: "border-emerald-500/40",
    neonShadow: "shadow-[0_0_20px_rgba(16,185,129,0.2)]",
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
    textColor: "text-purple-400",
    neonBorder: "border-purple-500/40",
    neonShadow: "shadow-[0_0_20px_rgba(168,85,247,0.2)]",
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
    textColor: "text-orange-400",
    neonBorder: "border-orange-500/40",
    neonShadow: "shadow-[0_0_20px_rgba(249,115,22,0.2)]",
    badgeBg: "bg-orange-500/10",
    image: "/gabrieladecora.png",
    link: "https://www.gabrieladecoracoes.com.br/",
    isLive: true
  },
];

export default function Portfolio() {
  const [formState, setFormState] = useState<"idle" | "loading" | "success">("idle");
  const [copied, setCopied] = useState(false);

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
    <main className="bg-[#0a0a0a] text-zinc-100 font-sans selection:bg-zinc-800/50 min-h-screen">
      <div className="fixed inset-0 z-[1] opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      <section className="min-h-screen w-full flex flex-col items-center justify-center relative z-10 px-6 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] bg-zinc-800/20 blur-[150px] rounded-full pointer-events-none animate-pulse duration-[7000ms]"></div>
        <motion.div className="relative z-20 text-center flex flex-col items-center w-full max-w-7xl">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-zinc-400 uppercase tracking-[0.2em] text-sm md:text-base mb-8 font-mono">
            <span className="text-sky-400 mr-2">&lt;</span>Software Engineer & Frontend<span className="text-sky-400 ml-2">/&gt;</span>
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-7xl md:text-[9rem] font-black tracking-tighter leading-[0.9] mb-10 drop-shadow-[0_0_30px_rgba(255,255,255,0.05)]">
            ROBSON<span className="text-zinc-800">.</span><br /><span className="text-zinc-700">DEV</span>
          </motion.h1>
          
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

            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none"></div>

            <div className="animate-marquee items-center py-4">
              {[...techs, ...techs, ...techs, ...techs].map((tech, index) => (
                <div key={index} className={`flex items-center group/tech px-8 cursor-pointer text-zinc-700 transition-all duration-300 ${tech.color}`}>
                  <tech.icon className="w-12 h-12 flex-shrink-0 transition-transform duration-300 group-hover/tech:scale-110 drop-shadow-md" />
                  <span className="max-w-0 overflow-hidden opacity-0 group-hover/tech:max-w-[200px] group-hover/tech:opacity-100 group-hover/tech:ml-4 transition-all duration-500 ease-in-out font-black text-3xl tracking-tighter">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
        
          </motion.div>

        </motion.div>
      </section>

      <section className="relative z-20 py-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="mb-32 md:mb-48">
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-zinc-100">Selected <span className="text-zinc-700 drop-shadow-[0_0_15px_rgba(63,63,70,0.5)]">Works.</span></h2>
            <div className="w-24 h-1 bg-zinc-800 mt-8"></div>
          </motion.div>
          <div className="flex flex-col gap-32 md:gap-64">
            {projects.map((project, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div key={project.id} initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: "easeOut" }} className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-12 md:gap-24`}>
                  <div className="w-full md:w-3/5 group">
                    <div className={`relative w-full aspect-video rounded-2xl overflow-hidden border ${project.neonBorder} bg-zinc-900/50 p-2 md:p-3 ${project.neonShadow} transition-all duration-700 hover:scale-[1.01]`}>
                      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 rounded-tl-lg opacity-80 border-zinc-700"></div>
                      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 rounded-br-lg opacity-80 border-zinc-700"></div>
                      <div className="relative w-full h-full rounded-xl overflow-hidden bg-black">
                        <Image src={project.image} alt={project.title} fill className="object-cover object-top grayscale-[60%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-[1.03]" />
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-2/5 flex flex-col justify-center">
                    <h3 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter text-zinc-100">{project.title}</h3>
                    <p className="text-zinc-400 text-lg md:text-xl mb-8 font-light leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-3 mb-12">
                      {project.tags.map((tag) => {
                        const tagInfo = tagData[tag];
                        if (!tagInfo) return <span key={tag} className="px-4 py-2 text-xs font-mono text-zinc-400 bg-zinc-900/80 border border-zinc-800 rounded-md">{tag}</span>;
                        const Icon = tagInfo.icon;
                        return (
                          <span key={tag} className={`flex items-center gap-2 px-4 py-2 text-xs font-mono text-zinc-400 bg-zinc-900/80 border border-zinc-800 rounded-md transition-colors duration-300 ${tagInfo.color}`}>
                            <Icon className="w-4 h-4" />
                            {tag}
                          </span>
                        );
                      })}
                    </div>
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group/btn inline-flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-zinc-100 hover:text-white transition-colors cursor-pointer"
                    >
                      {project.isLive ? "View Live Project" : "View Source Code"}
                      {project.isLive ? (
                        <ExternalLink className="w-4 h-4 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                      ) : (
                        <Github className="w-4 h-4 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                      )}
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <TerminalProfile />
      <SkillTree />

      <section className="py-24 bg-[#0a0a0a] relative z-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center bg-gradient-to-br from-zinc-900/40 to-black/40 p-10 md:p-16 rounded-[3rem] border border-white/5 backdrop-blur-3xl relative overflow-hidden">
            <div className="relative z-10">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} className="flex items-center gap-3 mb-8">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
              
              </motion.div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 text-white leading-tight">CODING <br /> <span className="text-zinc-700 uppercase italic text-4xl md:text-6xl">Rhythm.</span></h2>
              <p className="text-zinc-400 text-lg md:text-xl font-light max-w-md leading-relaxed mb-10 border-l-2 border-green-500/30 pl-6">
                My musical taste when coding ranges from Billie Eilish and Sabrina Carpenter to Linkin Park, Breezee, and more. The rhythm dictates the speed of the code.
              </p>
            </div>
            <div className="flex justify-center lg:justify-end relative z-10">
              <SpotifyCard />
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-20 bg-[#050505] pt-32 pb-12 border-t border-white/5 overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[50vw] h-[50vh] bg-green-500/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
            <div className="lg:col-span-6">
              <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-[0.85] mb-10">
                LET'S <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 to-zinc-800 italic uppercase">Connect.</span>
              </motion.h2>
              <p className="text-zinc-400 text-xl md:text-2xl font-light max-w-xl mb-12 leading-relaxed border-l-2 border-green-500/20 pl-6">
                I am from Brasília, DF. Open to remote projects that challenge conventional logic.
              </p>
              <div className="space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-700">Where to find me/</h4>
                <div className="flex flex-wrap gap-6 text-zinc-400 font-mono text-sm">
                  <a href="https://github.com/RobsonRodriguess" target="_blank" className="hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-zinc-800 group-hover:bg-green-500 transition-colors"></span> Github
                  </a>
                  <a href="https://www.linkedin.com/in/robson-rodrigues-dev/" target="_blank" className="hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-zinc-800 group-hover:bg-green-500 transition-colors"></span> LinkedIn
                  </a>
                  <button onClick={handleCopyDiscord} className="hover:text-indigo-400 transition-colors flex items-center gap-2 group relative">
                    <span className="w-1 h-1 bg-zinc-800 group-hover:bg-indigo-500 transition-colors"></span> 
                    {copied ? "ID Copied!" : "Discord"} <Copy className={`w-3 h-3 ${copied ? 'hidden' : 'block'}`} />
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 min-h-[450px] flex">
              <AnimatePresence mode="wait">
                {formState !== "success" ? (
                  <motion.div key="form" exit={{ opacity: 0, scale: 0.95 }} className="w-full bg-zinc-900/20 border border-white/5 p-8 md:p-10 rounded-[2.5rem] backdrop-blur-xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Name</label>
                          <input type="text" name="name" required placeholder="Your name" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-zinc-700 focus:outline-none focus:border-green-500/50 transition-colors font-mono text-sm" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Email</label>
                          <input type="email" name="email" required placeholder="your@email.com" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-zinc-700 focus:outline-none focus:border-green-500/50 transition-colors font-mono text-sm" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Message</label>
                        <textarea name="message" required rows={4} placeholder="How can I help with your project?" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-zinc-700 focus:outline-none focus:border-green-500/50 transition-colors font-mono text-sm resize-none"></textarea>
                      </div>
                      <button type="submit" disabled={formState === "loading"} className="w-full py-5 bg-green-500 disabled:bg-zinc-700 text-black font-black uppercase tracking-[0.2em] text-xs rounded-2xl hover:bg-white transition-all duration-500 shadow-[0_10px_30px_rgba(34,197,94,0.1)]">
                        {formState === "loading" ? "SENDING..." : "Send Message"}
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full bg-green-500/10 border border-green-500/20 p-10 rounded-[2.5rem] backdrop-blur-xl flex flex-col items-center justify-center text-center">
                    <CheckCircle2 className="w-16 h-16 text-green-500 mb-6" />
                    <h3 className="text-2xl font-black text-white mb-2 uppercase">Email sent!</h3>
                    <p className="text-zinc-400 font-mono text-sm max-w-[280px]">Your message was successfully received. I will get back to you shortly.</p>
                    <button onClick={() => setFormState("idle")} className="mt-8 text-xs font-black uppercase tracking-widest text-green-500 hover:text-white transition-colors">Send another message</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <div className="py-12 border-t border-white/5 mb-12"><GithubStats /></div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-t border-white/5 pt-10">
            <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-700">© 2026 Developed by Robson Rodrigues</div>
            <div className="text-zinc-800 font-black text-xl italic tracking-tighter cursor-default">ROBSON<span className="text-zinc-900">.DEV</span></div>
          </div>
        </div>
      </footer>
      <FloatingSpotify />
    </main>
  );
}