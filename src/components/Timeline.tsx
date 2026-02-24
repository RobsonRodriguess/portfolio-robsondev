"use client";

import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Cloud, ChevronRight } from "lucide-react";

const timelineData = [
  {
    id: 1,
    year: "2026 - Present",
    title: "Cloud Architecture & DevOps",
    company: "Continuous Learning",
    description: "Focusing on enterprise scalability and infrastructure. Actively pursuing Azure Fundamentals (AZ-900) and ITIL v4 certifications to align robust Fullstack development with IT service management best practices.",
    icon: Cloud,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
  },
  {
    id: 2,
    year: "2023 - 2027",
    title: "Systems Analysis and Development",
    company: "Instituto Federal de Goiás (IFG)",
    description: "Undergraduate student with a strong foundation in software engineering, algorithms, and complex systems. Defended the 'Mind Health' eHealth platform as the final capstone project (TCC), architecting a secure backend with Next.js and Node.js.",
    icon: GraduationCap,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
  },
  {
    id: 3,
    year: "2025 - 2026",
    title: "Full Stack Freelance Developer",
    company: "Independent / Remote",
    description: "Architected and deployed production-ready applications for real clients. Delivered 'Candangos Shop' (e-commerce UI/UX) and 'Gabriela Decorações', implementing rigorous SEO strategies, Core Web Vitals optimization, and Vercel Analytics integration.",
    icon: Briefcase,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    border: "border-purple-500/30",
  },
];

export default function Timeline() {
  return (
    <section className="py-24 bg-white dark:bg-[#050505] relative z-20 transition-colors duration-500 font-sans">
      <div className="max-w-4xl mx-auto px-6">
        
        <div className="mb-20">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black tracking-tighter text-black dark:text-white mb-4"
          >
            CAREER <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 to-zinc-600 dark:from-zinc-500 dark:to-zinc-700 italic">Timeline.</span>
          </motion.h2>
          <div className="w-20 h-1 bg-green-500 rounded-full"></div>
        </div>

        <div className="relative border-l border-zinc-200 dark:border-zinc-800 ml-4 md:ml-6 space-y-16 transition-colors duration-500">
          {timelineData.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative pl-8 md:pl-12 group"
              >
                {/* Timeline Node (Circle with Icon) */}
                <div className={`absolute -left-[20px] top-0 w-10 h-10 rounded-full border-4 border-white dark:border-[#050505] ${item.bg} flex items-center justify-center transition-colors duration-500`}>
                  <Icon className={`w-4 h-4 ${item.color}`} />
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                  <h3 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">
                    {item.title}
                  </h3>
                  <span className="inline-block px-3 py-1 mt-2 md:mt-0 text-xs font-bold font-mono tracking-widest uppercase rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 w-max border border-zinc-200 dark:border-zinc-800 transition-colors duration-500">
                    {item.year}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 mb-4 text-sm font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                  <ChevronRight className="w-4 h-4 text-green-500" />
                  {item.company}
                </div>

                <div className={`p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/50 shadow-sm dark:shadow-none hover:border-green-500/30 dark:hover:border-green-500/30 transition-all duration-300`}>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-light text-base md:text-lg">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}