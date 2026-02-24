"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, ArrowDown, CheckCircle2, Copy } from "lucide-react";
import Image from "next/image";

// --- IMPORTAÇÃO DE TODOS OS COMPONENTES ---
import SkillTree from "@/components/SkillTree";
import TerminalProfile from "@/components/Terminal";
import FloatingSpotify from "@/components/FloatingSpotify";
import SpotifyCard from "@/components/SpotifyCard";
import GithubStats from "@/components/GithubStats";

const projects = [
  {
    id: 1,
    title: "Mind Health",
    category: "PLATAFORMA EHEALTH",
    description:
      "Arquitetura robusta para suporte psicológico. Foco em segurança de dados sensíveis, gerenciamento complexo de usuários e rigor acadêmico no desenvolvimento do backend.",
    tags: ["Next.js", "Node.js Architecture", "Security"],
    color: "bg-sky-500",
    textColor: "text-sky-400",
    neonBorder: "border-sky-500/40",
    neonShadow: "shadow-[0_0_20px_rgba(14,165,233,0.2)]",
    badgeBg: "bg-sky-500/10",
    image: "/mindhealth.png",
  },
  {
    id: 2,
    title: "Aviator Clone Pro",
    category: "GAME LOGIC",
    description:
      "Simulador de crash game com foco extremo em matemática e lógica de backend. Sistema transparente de cálculo de multiplicador em tempo real.",
    tags: ["React Advanced", "Game Loop Logic", "Math"],
    color: "bg-emerald-500",
    textColor: "text-emerald-400",
    neonBorder: "border-emerald-500/40",
    neonShadow: "shadow-[0_0_20px_rgba(16,185,129,0.2)]",
    badgeBg: "bg-emerald-500/10",
    image: "/aviator.png",
  },
  {
    id: 3,
    title: "Candangos Shop",
    category: "E-COMMERCE UI/UX",
    description:
      "Vitrine digital focada na jornada do usuário. Implementação de filtros dinâmicos, carrinho de compras otimizado e UI responsiva de alta performance.",
    tags: ["Frontend UX/UI", "Tailwind CSS", "Performance"],
    color: "bg-purple-500",
    textColor: "text-purple-400",
    neonBorder: "border-purple-500/40",
    neonShadow: "shadow-[0_0_20px_rgba(168,85,247,0.2)]",
    badgeBg: "bg-purple-500/10",
    image: "/candangos.png",
  },
  {
    id: 4,
    title: "Gabriela Decorações",
    category: "SEO & PERFORMANCE",
    description:
      "Produto real entregue com foco em otimização para motores de busca (SEO), Core Web Vitals e integração de analytics para monitoramento de tráfego.",
    tags: ["SEO Technical", "Vercel Analytics", "Responsive"],
    color: "bg-orange-500",
    textColor: "text-orange-400",
    neonBorder: "border-orange-500/40",
    neonShadow: "shadow-[0_0_20px_rgba(249,115,22,0.2)]",
    badgeBg: "bg-orange-500/10",
    image: "/gabrieladecora.png",
  },
];

export default function Portfolio() {
  const [formState, setFormState] = useState<"idle" | "loading" | "success">("idle");
  const [copied, setCopied] = useState(false);

  const discordID = "nixagiota";

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
      alert("Erro ao enviar. Tente novamente.");
    }
  }

  return (
    <main className="bg-[#0a0a0a] text-zinc-100 font-sans selection:bg-zinc-800/50 min-h-screen">
      <div className="fixed inset-0 z-[1] opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      <section className="min-h-screen w-full flex flex-col items-center justify-center relative z-10 px-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] bg-zinc-800/20 blur-[150px] rounded-full pointer-events-none animate-pulse duration-[7000ms]"></div>
        <motion.div className="relative z-20 text-center flex flex-col items-center">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-zinc-400 uppercase tracking-[0.2em] text-sm md:text-base mb-8 font-mono">
            <span className="text-sky-400 mr-2">&lt;</span>Software Engineer & Frontend<span className="text-sky-400 ml-2">/&gt;</span>
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-7xl md:text-[9rem] font-black tracking-tighter leading-[0.9] mb-10 drop-shadow-[0_0_30px_rgba(255,255,255,0.05)]">
            ROBSON<span className="text-zinc-800">.</span><br /><span className="text-zinc-700">DEV</span>
          </motion.h1>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }} className="mt-16 flex flex-col items-center gap-4 text-zinc-500">
            <span className="text-xs uppercase tracking-widest font-bold">Start Game</span>
            <ArrowDown className="w-5 h-5 animate-bounce" />
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
                      {project.tags.map((tag) => <span key={tag} className="px-4 py-2 text-xs font-mono text-zinc-400 bg-zinc-900/80 border border-zinc-800 rounded-md">{tag}</span>)}
                    </div>
                    <button className="group/btn inline-flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-zinc-100">
                      Ver Projeto Online <ExternalLink className="w-4 h-4 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                    </button>
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
                <span className="text-green-500 text-xs font-black tracking-[0.3em] uppercase font-mono">Sistema Online</span>
              </motion.div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 text-white leading-tight">SINTONIA PARA <br /> <span className="text-zinc-700 uppercase italic text-4xl md:text-6xl">Programar.</span></h2>
              <p className="text-zinc-400 text-lg md:text-xl font-light max-w-md leading-relaxed mb-10 border-l-2 border-green-500/30 pl-6">
                Meu gosto musical quando estou programando vai de Billie Eilish, Sabrina Carpenter, Linkin Park, Breezee e por aí vai. O ritmo dita a velocidade do código.
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
                VAMOS <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 to-zinc-800 italic uppercase">Conectar.</span>
              </motion.h2>
              <p className="text-zinc-400 text-xl md:text-2xl font-light max-w-xl mb-12 leading-relaxed border-l-2 border-green-500/20 pl-6">
                Atualmente em Brasília, DF. Aberto a projetos remotos que desafiem a lógica convencional.
              </p>
              <div className="space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-700">Onde me encontrar/</h4>
                <div className="flex flex-wrap gap-6 text-zinc-400 font-mono text-sm">
                  <a href="https://github.com/RobsonRodriguess" target="_blank" className="hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-zinc-800 group-hover:bg-green-500 transition-colors"></span> Github
                  </a>
                  <a href="https://www.linkedin.com/in/robson-rodrigues-dev/" target="_blank" className="hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-zinc-800 group-hover:bg-green-500 transition-colors"></span> LinkedIn
                  </a>
                  <button onClick={handleCopyDiscord} className="hover:text-indigo-400 transition-colors flex items-center gap-2 group relative">
                    <span className="w-1 h-1 bg-zinc-800 group-hover:bg-indigo-500 transition-colors"></span> 
                    {copied ? "Nome Copiado!" : "Discord"} <Copy className={`w-3 h-3 ${copied ? 'hidden' : 'block'}`} />
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
                          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Nome</label>
                          <input type="text" name="name" required placeholder="Seu nome" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-zinc-700 focus:outline-none focus:border-green-500/50 transition-colors font-mono text-sm" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Email</label>
                          <input type="email" name="email" required placeholder="seu@email.com" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-zinc-700 focus:outline-none focus:border-green-500/50 transition-colors font-mono text-sm" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Mensagem</label>
                        <textarea name="message" required rows={4} placeholder="Como posso ajudar no seu projeto?" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-zinc-700 focus:outline-none focus:border-green-500/50 transition-colors font-mono text-sm resize-none"></textarea>
                      </div>
                      <button type="submit" disabled={formState === "loading"} className="w-full py-5 bg-green-500 disabled:bg-zinc-700 text-black font-black uppercase tracking-[0.2em] text-xs rounded-2xl hover:bg-white transition-all duration-500 shadow-[0_10px_30px_rgba(34,197,94,0.1)]">
                        {formState === "loading" ? "ENVIANDO..." : "Enviar Mensagem!"}
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full bg-green-500/10 border border-green-500/20 p-10 rounded-[2.5rem] backdrop-blur-xl flex flex-col items-center justify-center text-center">
                    <CheckCircle2 className="w-16 h-16 text-green-500 mb-6" />
                    <h3 className="text-2xl font-black text-white mb-2 uppercase">E-mail enviado!</h3>
                    <p className="text-zinc-400 font-mono text-sm max-w-[280px]">Sua mensagem foi recebida com sucesso. Em breve responderei seu e-mail.</p>
                    <button onClick={() => setFormState("idle")} className="mt-8 text-xs font-black uppercase tracking-widest text-green-500 hover:text-white transition-colors">Enviar outra mensagem</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <div className="py-12 border-t border-white/5 mb-12"><GithubStats /></div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-t border-white/5 pt-10">
            <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-700">© 2026 Desenvolvido por Robson Rodrigues</div>
            <div className="text-zinc-800 font-black text-xl italic tracking-tighter cursor-default">ROBSON<span className="text-zinc-900">.DEV</span></div>
          </div>
        </div>
      </footer>
      <FloatingSpotify />
    </main>
  );
}