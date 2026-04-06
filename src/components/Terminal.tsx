"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, X, Minus, Maximize2, FolderGit2, Code2, SendHorizontal, ChevronRight, Github, ExternalLink } from "lucide-react";
import { useSound } from "./SoundContext";

interface HistoryEntry {
  id: number;
  type: "input" | "output" | "system";
  content: React.ReactNode;
  cmd?: string;
}

const COMMANDS = ["help", "neofetch", "skills", "projects", "contact", "whoami", "dir", "cls", "history", "clear", "fortune", "date", "matrix"];

const COMMAND_DESCRIPTIONS = {
  help: "Show all available commands",
  neofetch: "System info with ASCII art",
  skills: "Show technical skills with progress bars",
  projects: "List featured projects",
  contact: "Display contact information",
  whoami: "Show current user info",
  dir: "List directory contents",
  history: "Show command history",
  clear: "Clear terminal screen",
  fortune: "Random dev wisdom",
  date: "Show current date and time",
  matrix: "Enter the Matrix",
};

// ══════════════════════════════════════════════════
//  TypingAnimation — types text char by char
// ══════════════════════════════════════════════════
function TypingText({ text, speed = 12, onDone }: { text: string; speed?: number; onDone?: () => void }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(id);
        setDone(true);
        onDone?.();
      }
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, onDone]);

  return <span className="text-green-400">{displayed}{!done && <span className="animate-pulse">▌</span>}</span>;
}

// ══════════════════════════════════════════════════
//  WelcomeAnimation
// ══════════════════════════════════════════════════
function InitialWelcome({ onDone }: { onDone: () => void }) {
  const lines = [
    { text: "Microsoft Windows [Version 10.0.22631.1]", color: "text-zinc-400" },
    { text: "(c) Microsoft Corporation. All rights reserved.", color: "text-zinc-500" },
    { text: "", color: "" },
    { text: "Welcome to NEXUS TERMINAL v2.0", color: "text-green-400" },
    { text: "Type 'help' for available commands", color: "text-zinc-500" },
    { text: "", color: "" },
  ];

  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    if (lineIndex >= lines.length) {
      onDone();
      return;
    }
    const timeout = setTimeout(() => setLineIndex(prev => prev + 1), 200);
    return () => clearTimeout(timeout);
  }, [lineIndex, lines.length, onDone]);

  return (
    <div className="mb-3">
      {lines.slice(0, lineIndex).map((line, i) => (
        <div key={i} className={line.color}>{line.text}</div>
      ))}
      {lineIndex < lines.length && lines[lineIndex].color && (
        <TypingText text={lines[lineIndex].text} speed={8} />
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════
//  Neofetch Output
// ══════════════════════════════════════════════════
function NeofetchOutput() {
  const [visibleLines, setVisibleLines] = useState(0);
  const totalLines = 10;

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      setVisibleLines(i);
      if (i >= totalLines) clearInterval(id);
    }, 80);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="my-3 flex flex-col md:flex-row gap-4 md:gap-6">
      {/* ASCII Art */}
      <div className="flex-shrink-0 font-mono text-xs leading-tight text-green-400 select-none">
        <pre className="text-[11px] md:text-xs">
{`    ████████╗██╗   ██╗██╗    ██╗███████╗
    ╚══██╔══╝██║   ██║██║    ██║██╔════╝
       ██║   ██║   ██║██║ █╗ ██║█████╗
       ██║   ██║   ██║██║███╗██║██╔══╝
       ██║   ╚██████╔╝╚███╔███╔╝███████╗
       ╚═╝    ╚═════╝  ╚══╝╚══╝ ╚══════╝`}
        </pre>
      </div>
      {/* Info */}
      <div className="text-xs md:text-sm space-y-0.5">
        {[
          ["OS:", "NEXUS Portfolio Framework", "text-cyan-400"],
          ["Host:", "Robson Rodrigues", "text-white"],
          ["Uptime:", "2+ years of experience", "text-white"],
          ["Kernel:", "Next.js 15 / TypeScript 5", "text-white"],
          ["Shell:", "React 19 + Framer Motion", "text-white"],
          ["Theme:", "Minimal Dark / Neon Accents", "text-white"],
          ["CPU:", "Full Stack Engineering", "text-white"],
          ["Memory:", "32GB / Unlimited Potential", "text-white"],
          ["Stack:", "React, Next.js, Node, Python", "text-white"],
          ["Status:", "Open for opportunities", "text-green-400"],
        ].map(([label, val, color], i) => (
          <div key={i} className={i >= visibleLines ? "opacity-0" : "opacity-100 transition-opacity duration-100"}>
            {i < visibleLines && (
              <>
                <span className={`font-bold ${color}`}>{(label as string).padEnd(7)}</span>
                <span className="text-white">{val}</span>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════
//  SkillBars Output
// ══════════════════════════════════════════════════
function SkillsOutput() {
  const skills = [
    { name: "Tailwind CSS & UI", level: 92, color: "bg-cyan-400" },
    { name: "React & Next.js", level: 88, color: "bg-green-400" },
    { name: "TypeScript", level: 82, color: "bg-blue-400" },
    { name: "Node.js Architecture", level: 75, color: "bg-yellow-400" },
    { name: "PostgreSQL", level: 70, color: "bg-purple-400" },
    { name: "Python", level: 65, color: "bg-orange-400" },
    { name: "Docker & DevOps", level: 60, color: "bg-pink-400" },
  ];

  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => setAnimating(false), 1500);
  }, []);

  return (
    <div className="my-3 space-y-2">
      <div className="text-green-400 font-bold mb-2">⚡ TECHNICAL SKILLS:</div>
      {skills.map((s, i) => (
        <div key={s.name} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
          <span className="text-zinc-400 text-xs font-mono w-44 shrink-0">{s.name.padEnd(22)}</span>
          <div className="flex-1 h-4 bg-zinc-800 rounded-sm overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: animating ? "0%" : `${s.level}%` }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: "easeOut" }}
              className={`h-full ${s.color} rounded-sm`}
            />
          </div>
          <span className="text-zinc-500 text-xs font-mono w-8 text-right">{s.level}%</span>
        </div>
      ))}
      <div className="mt-3 text-zinc-600 text-xs">Tip: Also proficient in Python, Docker, Nginx & more.</div>
    </div>
  );
}

// ══════════════════════════════════════════════════
//  Projects Output
// ══════════════════════════════════════════════════
function ProjectsOutput() {
  const projects = [
    { id: 1, name: "Mind Health", type: "E-Health Platform", tech: "Next.js, Architecture", status: "private", color: "text-sky-400" },
    { id: 2, name: "Aviator Clone Pro", type: "Real-Time Logic", tech: "React, Math", status: "open", color: "text-emerald-400" },
    { id: 3, name: "Candangos Shop", type: "E-Commerce UI/UX", tech: "Frontend, Performance", status: "open", color: "text-purple-400" },
    { id: 4, name: "Gabriela Decorações", type: "SEO & Performance", tech: "Vercel Analytics", status: "open", color: "text-orange-400" },
  ];

  return (
    <div className="my-3 space-y-3">
      <div className="text-green-400 font-bold">📁 FEATURED PROJECTS:</div>
      {projects.map((p) => (
        <div key={p.id} className="pl-3 border-l-2 border-zinc-700 py-1">
          <div className="flex items-center gap-2">
            <span className={`${p.color} font-bold text-sm`}>[{p.id}] {p.name}</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${p.status === "open" ? "bg-green-500/10 text-green-400" : "bg-zinc-700 text-zinc-400"}`}>
              {p.status}
            </span>
          </div>
          <div className="text-zinc-500 text-xs mt-0.5">{p.type}</div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-zinc-600 text-[10px] font-mono">{p.tech}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ══════════════════════════════════════════════════
//  Contact Output
// ══════════════════════════════════════════════════
function ContactOutput() {
  return (
    <div className="my-3 space-y-1">
      <div className="text-green-400 font-bold mb-2">📞 CONTACT INFORMATION:</div>
      <div className="space-y-1 text-sm">
        <div className="flex items-center gap-3">
          <span className="text-cyan-400 font-mono text-xs w-20">GitHub</span>
          <span className="text-zinc-300">github.com/RobsonRodriguess</span>
          <ExternalLink className="w-3 h-3 text-zinc-600" />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-cyan-400 font-mono text-xs w-20">Location</span>
          <span className="text-zinc-300">Brasília, DF — Brazil</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-cyan-400 font-mono text-xs w-20">Status</span>
          <span className="text-green-400">Available for opportunities</span>
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════
//  Fortune Quotes
// ══════════════════════════════════════════════════
const FORTUNES = [
  "\"Talk is cheap. Show me the code.\" — Linus Torvalds",
  "\"First, solve the problem. Then, write the code.\" — John Johnson",
  "\"The best error message is the one that never shows up.\" — Thomas Fuchs",
  "\"Code is like humor. When you have to explain it, it's bad.\" — Cory House",
  "\"Experience is the name everyone gives to their mistakes.\" — Oscar Wilde (about debugging)",
  "\"It works on my machine.\" — Every developer, ever.",
  "\"There are only 10 types of people: those who understand binary and those who don't.\"",
  "\"A SQL query walks into a bar, sees two tables, and asks... 'Can I JOIN you?'\"",
];

const MATRIX_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()アイウエオカキクケコサシスセソ";

export default function TerminalProfile() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [welcomeDone, setWelcomeDone] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [histIndex, setHistIndex] = useState(-1);
  const [isMinimized, setIsMinimized] = useState(true);
  const idRef = useRef(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { playClick } = useSound();

  useEffect(() => {
    containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: "smooth" });
  }, [history]);

  // Auto-focus on input when terminal opens
  useEffect(() => {
    if (!isMinimized && welcomeDone) {
      inputRef.current?.focus();
    }
  }, [isMinimized, welcomeDone]);

  const addEntry = (entry: Omit<HistoryEntry, "id">) => {
    setHistory(prev => [...prev, { ...entry, id: ++idRef.current }]);
  };

  const handleWelcomeDone = useCallback(() => {
    setWelcomeDone(true);
    idRef.current++;
    setHistory(prev => [...prev, { id: idRef.current, type: "output", content: <NeofetchOutput key="neofetch" /> }]);
  }, []);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    playClick();

    if (e.key === "Tab") {
      e.preventDefault();
      const currentInput = input.trim().toLowerCase();
      if (!currentInput) return;
      const match = COMMANDS.find(cmd => cmd.startsWith(currentInput));
      if (match) { setInput(match); return; }
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0 && histIndex < commandHistory.length - 1) {
        const newIdx = histIndex + 1;
        setHistIndex(newIdx);
        setInput(commandHistory[commandHistory.length - 1 - newIdx]);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIndex > 0) {
        const newIdx = histIndex - 1;
        setHistIndex(newIdx);
        setInput(commandHistory[commandHistory.length - 1 - newIdx]);
      } else {
        setHistIndex(-1);
        setInput("");
      }
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      const cmd = input.trim().toLowerCase();
      if (cmd) {
        setCommandHistory(prev => [...prev, cmd]);
        setHistIndex(-1);
      }
      addEntry({ type: "input", content: null, cmd });

      let output: React.ReactNode = "";
      switch (cmd) {
        case "help":
          output = (
            <div className="my-3">
              <div className="text-green-400 font-bold mb-2">📋 AVAILABLE COMMANDS:</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-xs md:text-sm">
                {COMMANDS.map(c => (
                  <div key={c} className="flex items-center gap-2 py-0.5">
                    <ChevronRight className="w-3 h-3 text-green-500 shrink-0" />
                    <span className="text-cyan-400 font-mono w-20">{c}</span>
                    <span className="text-zinc-500">{COMMAND_DESCRIPTIONS[c as keyof typeof COMMAND_DESCRIPTIONS]}</span>
                  </div>
                ))}
              </div>
            </div>
          );
          break;

        case "neofetch":
        case "systeminfo":
          output = <NeofetchOutput key="neofetch" />;
          break;

        case "skills":
          output = <SkillsOutput key="skills" />;
          break;

        case "projects":
          output = <ProjectsOutput key="projects" />;
          break;

        case "contact":
          output = <ContactOutput key="contact" />;
          break;

        case "whoami":
          output = (
            <div className="my-3 space-y-1">
              <span className="text-cyan-400 font-mono">nexus</span>
              <span className="text-zinc-500">@</span>
              <span className="text-green-400 font-mono">robson</span>
              <br />
              <div className="text-zinc-400 text-sm mt-2">Role: Full Stack Developer & Software Engineer</div>
              <div className="text-zinc-400 text-sm">Education: Systems Analysis and Development (IFG)</div>
            </div>
          );
          break;

        case "dir":
          output = (
            <div className="my-3 text-xs md:text-sm">
              <div className="text-zinc-500 mb-1">Directory of C:\Users\Robson\portfolio</div>
              <div className="space-y-0.5">
                <div><span className="text-cyan-400 font-mono">D</span>  <span className="text-zinc-400">components/</span></div>
                <div><span className="text-cyan-400 font-mono">D</span>  <span className="text-zinc-400">public/</span></div>
                <div><span className="text-yellow-400 font-mono">F</span>  <span className="text-zinc-400">page.tsx</span>  <span className="text-zinc-600 pl-4">Portfolio main layout</span></div>
                <div><span className="text-yellow-400 font-mono">F</span>  <span className="text-zinc-400">globals.css</span>  <span className="text-zinc-600 pl-2">Custom styles</span></div>
                <div><span className="text-yellow-400 font-mono">F</span>  <span className="text-zinc-400">layout.tsx</span>  <span className="text-zinc-600 pl-2">Root layout</span></div>
              </div>
              <div className="text-zinc-600 text-xs mt-2">5 files, 2 directories</div>
            </div>
          );
          break;

        case "history":
          output = (
            <div className="my-3 text-sm">
              <div className="text-green-400 font-bold mb-1">⏱ COMMAND HISTORY:</div>
              {commandHistory.length === 0 ? (
                <div className="text-zinc-600">No commands yet.</div>
              ) : (
                <div className="space-y-0.5">
                  {commandHistory.map((c, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-zinc-600 font-mono w-6 text-right">{i + 1}</span>
                      <span className="text-zinc-400 font-mono">{c}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
          break;

        case "date":
          output = <div className="my-3 text-sm text-zinc-300">{new Date().toLocaleString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" })}</div>;
          break;

        case "fortune":
          output = <div className="my-3 text-sm text-yellow-400/80 italic">"{FORTUNES[Math.floor(Math.random() * FORTUNES.length)]}"</div>;
          break;

        case "clear":
        case "cls":
          setHistory([]);
          setInput("");
          return;

        case "sudo":
        case "sudo su":
          output = <div className="my-3 text-red-400 font-bold">[ERROR] User is not in the sudoers file. This incident will be reported.</div>;
          break;

        case "coffee":
          output = (
            <div className="my-3 whitespace-pre font-mono text-amber-700 dark:text-[#d4a373] text-xs">
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
  \\_____________________/`}
              <br />
              <span className="text-zinc-400 text-sm">Converting caffeine into code... ☕</span>
            </div>
          );
          break;

        case "aot":
        case "aot:r":
          output = <div className="my-3 text-emerald-400 font-mono text-sm font-bold">⚔️ SHINZOU WO SASAGEYO! ⚔️</div>;
          break;

        case "matrix":
          output = (
            <div className="my-3 overflow-hidden">
              <div className="h-32 overflow-hidden relative bg-black/40 rounded">
                {Array.from({ length: 15 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute font-mono text-[10px] text-green-500/60 whitespace-nowrap"
                    style={{ left: `${(i / 15) * 100}%` }}
                    initial={{ top: "-20%" }}
                    animate={{ top: "120%" }}
                    transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 2, ease: "linear" }}
                  >
                    {Array.from({ length: 20 }, () => MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]).join("\n")}
                  </motion.div>
                ))}
              </div>
              <div className="text-green-500/60 text-xs mt-1 text-center font-mono">Follow the white rabbit...</div>
            </div>
          );
          break;

        case "":
          output = null;
          break;

        default:
          output = (
            <div className="my-3">
              <span className="text-red-400">Command not found:</span> <span className="text-yellow-400 font-mono">'{cmd}'</span>
              <br />
              <span className="text-zinc-500 text-xs">Type <span className="text-cyan-400 font-mono">help</span> for available commands.</span>
            </div>
          );
      }

      if (output) addEntry({ type: "output", content: output });
      setInput("");
    }
  };

  return (
    <section className="py-20 relative z-20 font-mono bg-zinc-50 dark:bg-[#0a0a0a] transition-colors duration-500">
      <div className="max-w-4xl mx-auto px-6">
        <AnimatePresence>
          {isMinimized ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsMinimized(false)}
                className="group flex items-center gap-3 px-6 py-3 bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-xl hover:border-green-500/40 dark:hover:border-green-500/30 hover:shadow-[0_0_20px_rgba(34,197,94,0.1)] transition-all duration-300"
              >
                <TerminalIcon className="w-5 h-5 text-zinc-500 dark:text-zinc-600 group-hover:text-green-500 transition-colors" />
                <span className="text-zinc-500 dark:text-zinc-600 group-hover:text-zinc-300 dark:group-hover:text-zinc-200 text-sm transition-colors">
                  Open Terminal
                </span>
                <span className="text-zinc-400 dark:text-zinc-700 text-xs font-mono">NEXUS</span>
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="terminal"
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.3 }}
              className="rounded-xl overflow-hidden border border-zinc-300 dark:border-zinc-800/60 bg-white dark:bg-[#0c0c0c] shadow-2xl dark:shadow-[0_10px_60px_rgba(0,0,0,0.8)]"
            >
              {/* Title bar */}
              <div className="flex items-center justify-between bg-zinc-200 dark:bg-[#1a1a1a] border-b border-zinc-300 dark:border-zinc-800 select-none">
                <div className="flex items-center gap-3 px-4 py-2.5">
                  <div className="flex gap-1.5">
                    <button className="w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff3b30] transition-colors" />
                    <button className="w-3 h-3 rounded-full bg-[#febc2e] hover:bg-[#f5a623] transition-colors" />
                    <button className="w-3 h-3 rounded-full bg-[#28c840] hover:bg-[#1db954] transition-colors" />
                  </div>
                  <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-500 text-xs font-sans">
                    <TerminalIcon className="w-3.5 h-3.5" />
                    <span>NEXUS Terminal</span>
                    <span className="text-zinc-400 dark:text-zinc-700">— robson@nexus</span>
                  </div>
                </div>
                <button
                  onClick={() => { setIsMinimized(true); setHistory([]); setInput(""); }}
                  className="px-3 py-1.5 hover:bg-zinc-300 dark:hover:bg-white/5 text-zinc-400 transition-colors mr-2"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Terminal body */}
              <div
                ref={containerRef}
                className="p-4 h-[450px] md:h-[500px] overflow-y-auto bg-black text-sm md:text-base scroll-smooth"
                onClick={() => inputRef.current?.focus()}
                style={{ scrollbarWidth: "thin", scrollbarColor: "#333 transparent" }}
              >
                {!welcomeDone && <InitialWelcome onDone={handleWelcomeDone} />}

                {history.map((entry) => (
                  <div key={entry.id}>
                    {entry.type === "input" && (
                      <div className="flex items-center mt-2">
                        <span className="text-cyan-400 mr-1.5 text-xs">robson</span>
                        <span className="text-zinc-600 mr-1.5 text-xs">@</span>
                        <span className="text-green-400 mr-1.5 text-xs">nexus</span>
                        <span className="text-zinc-500 mr-1.5 text-xs">❯</span>
                        <span className="text-zinc-300">{entry.cmd}</span>
                      </div>
                    )}
                    {entry.type === "output" && (
                      <div className="text-zinc-300">
                        {entry.content}
                      </div>
                    )}
                    {entry.type === "system" && (
                      <div className="text-zinc-500 italic text-xs">{entry.content}</div>
                    )}
                  </div>
                ))}

                {/* Input line */}
                {welcomeDone && (
                  <div className="flex items-center mt-2">
                    <span className="text-cyan-400 mr-1.5 text-xs">robson</span>
                    <span className="text-zinc-600 mr-1.5 text-xs">@</span>
                    <span className="text-green-400 mr-1.5 text-xs">nexus</span>
                    <span className="text-zinc-500 mr-1.5 text-xs">❯</span>
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleCommand}
                      className="flex-1 bg-transparent border-none outline-none text-zinc-200 font-mono caret-green-400 text-sm"
                      autoFocus
                      spellCheck="false"
                      autoComplete="off"
                      placeholder="..."
                    />
                  </div>
                )}
              </div>

              {/* Status bar */}
              <div className="flex items-center justify-between bg-zinc-100 dark:bg-[#141414] border-t border-zinc-300 dark:border-zinc-800 px-3 py-1 text-[10px] text-zinc-500 dark:text-zinc-600 font-sans">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <FolderGit2 className="w-3 h-3" />
                    main
                  </span>
                  <span>0 errors</span>
                </div>
                <div className="flex items-center gap-3">
                  <span>UTF-8</span>
                  <span>PowerShell</span>
                  <span className="text-zinc-400 dark:text-zinc-700">NEXUS v2.0</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
