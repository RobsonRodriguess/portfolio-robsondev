"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal as TerminalIcon, Minus, Square, X } from "lucide-react"; 

// Apenas os comandos normais aparecem no Autocomplete! Os segredos não estão aqui.
const AVAILABLE_COMMANDS = [
  "help", 
  "systeminfo", 
  "skills", 
  "projects", 
  "contact", 
  "whoami", 
  "dir", 
  "cls", 
  "color 0a", 
  "color 07"
];

export default function TerminalProfile() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<React.ReactNode[]>([<InitialFetch key="init" />]);
  const [termColor, setTermColor] = useState("text-[#cccccc]"); 
  
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") {
      e.preventDefault(); 
      const currentInput = input.trim().toLowerCase();
      if (!currentInput) return;

      const match = AVAILABLE_COMMANDS.find(cmd => cmd.startsWith(currentInput));
      if (match) {
        setInput(match);
      }
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      
      const cmd = input.trim().toLowerCase();
      let output: React.ReactNode = "";

      if (cmd.startsWith("color")) {
        const colorCode = cmd.split(" ")[1];
        if (colorCode === "0a" || colorCode === "a") {
          setTermColor("text-[#00ff00]");
          output = "";
        } else if (colorCode === "07" || colorCode === "7") {
          setTermColor("text-[#cccccc]");
          output = "";
        } else {
          output = <div className="mt-2 mb-4">Color code not supported. Try 'color 0a' for Matrix or 'color 07' for Default.</div>;
        }
      } 
      else {
        switch (cmd) {
          // --- COMANDOS NORMAIS ---
          case "help":
            output = (
              <div className="mt-2 mb-4 whitespace-pre font-mono">
{`┌────────────────────────────────────────────────────────┐
│                  COMANDOS DISPONÍVEIS                  │
├────────────────────────────────────────────────────────┤
│  systeminfo  - Mostra informações do sistema           │
│  skills      - Lista habilidades técnicas detalhadas   │
│  projects    - Mostra projetos recentes em destaque    │
│  contact     - Informações de contato profissionais    │
│  color       - Muda a cor do terminal (ex: color 0a)   │
│  cls         - Limpa o terminal                        │
│  help        - Mostra esta lista de comandos           │
└────────────────────────────────────────────────────────┘`}
              </div>
            );
            break;
          case "skills":
            output = (
              <div className="mt-2 mb-4 whitespace-pre font-mono">
                <span className="opacity-80">⚡ HABILIDADES TÉCNICAS:</span><br/>
{`
██████████████████████░░ 92% - Tailwind CSS & UI
██████████████████████░░ 88% - React & Next.js
████████████████████░░░░ 82% - TypeScript
██████████████████░░░░░░ 75% - Node.js & Auth
█████████████████░░░░░░░ 70% - PostgreSQL
`}
              </div>
            );
            break;
          case "projects":
            output = (
              <div className="mt-2 mb-4 whitespace-pre font-mono">
                <span className="opacity-80">📁 PROJETOS RECENTES:</span><br/>
{`
[1] Mind Health         - Plataforma eHealth (Next.js, Arquitetura)
[2] Aviator Clone Pro   - Simulador / Game Logic (React, Math)
[3] Candangos Shop      - E-commerce UI/UX (Frontend, Performance)
[4] Gabriela Decorações - Site Institucional (SEO, Vercel Analytics)
`}
              </div>
            );
            break;
          case "contact":
            output = (
              <div className="mt-2 mb-4 whitespace-pre font-mono">
                <span className="opacity-80">📞 INFORMAÇÕES DE CONTATO:</span><br/>
{`
[Github]   github.com/RobsonRodriguess
[Location] Brasília, DF
[Status]   Disponível para novos trabaios
`}
              </div>
            );
            break;
          case "systeminfo":
            output = <InitialFetch />;
            break;
          case "whoami":
            output = (
              <div className="mt-2 mb-4">
                <p>nexus\\robson</p>
                <p className="mt-2">Role: Desenvolvedor Full Stack & Software Engineer</p>
                <p>Education: Análise e Desenvolvimento de Sistemas (IFG)</p>
              </div>
            );
            break;
          case "cls":
            setHistory([]);
            setInput("");
            return;
            
          // --- EASTER EGGS (COMANDOS SECRETOS) ---
          case "sudo":
          case "sudo su":
            output = (
              <div className="mt-2 mb-4 text-red-500 font-bold">
                [ERROR] Usuário não está no arquivo sudoers. Este incidente será reportado.
              </div>
            );
            break;
          case "coffee":
            output = (
              <div className="mt-2 mb-4 whitespace-pre font-mono text-[#d4a373]">
{`
      (  )   (   )  )
       ) (   )  (  (
       ( )  (    ) )
       _____________
      <_____________> ___
      |             |/ _ \\
      |               | | |
      |               |_| |
   ___|             |\\___/
  /    \\___________/    \\
  \\_____________________/
`}
                <br/>
                <span className="text-zinc-300">Transformando cafeína em código... ☕💻</span>
              </div>
            );
            break;
          case "aot":
          case "aot:r":
            output = (
              <div className="mt-2 mb-4 whitespace-pre font-mono text-emerald-400">
{`
⚔️ SHINZOU WO SASAGEYO! ⚔️
`}
              </div>
            );
            break;
          case "":
            output = "";
            break;
          default:
            output = <p className="mt-2 mb-4">'{cmd}' is not recognized as an internal or external command.<br/>Type 'help' to see the list of available commands.</p>;
        }
      }

      setHistory((prev) => [
        ...prev,
        <div key={prev.length} className="mt-2">
          <span className="mr-2 opacity-70">C:\Users\Robson&gt;</span>
          <span>{cmd}</span>
          {output}
        </div>,
      ]);
      setInput("");
    }
  };

  return (
    <section className="py-20 relative z-20 font-mono">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-lg overflow-hidden border border-zinc-700 bg-[#0c0c0c] shadow-[0_10px_40px_rgba(0,0,0,0.8)]"
          onClick={handleTerminalClick}
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-[#1e1e1e] border-b border-black select-none">
            <div className="flex items-center gap-2 px-3 py-2 text-zinc-300 text-xs font-sans">
              <TerminalIcon className="w-4 h-4" />
              <span>Command Prompt - systeminfo</span>
            </div>
            <div className="flex h-full">
              <div className="px-4 py-2 hover:bg-white/10 text-zinc-400 transition-colors cursor-default flex items-center justify-center">
                <Minus className="w-4 h-4" />
              </div>
              <div className="px-4 py-2 hover:bg-white/10 text-zinc-400 transition-colors cursor-default flex items-center justify-center">
                <Square className="w-3 h-3" />
              </div>
              <div className="px-4 py-2 hover:bg-red-500 hover:text-white text-zinc-400 transition-colors cursor-default flex items-center justify-center">
                <X className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Body */}
          <div 
            ref={containerRef}
            className={`p-4 h-[400px] md:h-[450px] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent text-sm md:text-base cursor-text bg-black ${termColor} transition-colors duration-300`}
          >
            {history.map((item, index) => (
              <div key={index}>{item}</div>
            ))}
            
            <div className="flex items-center mt-2">
              <span className="mr-2 opacity-70">C:\Users\Robson&gt;</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleCommand}
                className="flex-1 bg-transparent border-none outline-none text-current font-mono caret-current"
                autoFocus
                spellCheck="false"
                autoComplete="off"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function InitialFetch() {
  return (
    <div className="mb-4">
      <p>Microsoft Windows [Version 10.0.22631.1]</p>
      <p>(c) Microsoft Corporation. All rights reserved.</p>
      <br/>
      <p>Host Name:                 NEXUS-TERMINAL</p>
      <p>OS Name:                   Microsoft Windows 11 Pro</p>
      <p>Registered Owner:          Robson Rodrigues</p>
      <p>System Manufacturer:       Full Stack Web Dev</p>
      <p>System Type:               x64-based PC</p>
      <p>Processor(s):              1 Processor(s) Installed.</p>
      <p>                           [01]: Intel64 Family 6 Model Core i9</p>
      <p>Total Physical Memory:     32,768 MB</p>
      <p>Tech Stack:                React, Next.js, Node.js, TypeScript, NestJS</p>
      <br/>
      <p className="opacity-70">💡 Tip: Type 'help' to see commands. Use TAB to autocomplete.</p>
    </div>
  );
}