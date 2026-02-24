"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GitBranch, Star, Users, Code2 } from 'lucide-react';

export default function GithubStats() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch('/api/github')
      .then(res => res.json())
      .then(data => setStats(data));
  }, []);

  const statCards = [
    { label: 'Repositórios', value: stats?.public_repos || '0', icon: GitBranch, color: 'text-sky-400' },
    { label: 'Followers', value: stats?.followers || '0', icon: Users, color: 'text-purple-400' },
    { label: 'Stars Totais', value: stats?.total_stars || '0', icon: Star, color: 'text-yellow-400' },
    { label: 'Stack Principal', value: 'TS / Next.js', icon: Code2, color: 'text-emerald-400' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-5xl mx-auto">
      {statCards.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-zinc-900/40 border border-white/5 p-6 rounded-2xl backdrop-blur-sm hover:border-white/10 transition-colors group"
        >
          <item.icon className={`w-5 h-5 ${item.color} mb-4 opacity-70 group-hover:opacity-100 transition-opacity`} />
          <div className="text-2xl font-black text-white mb-1 font-mono">
            {item.value}
          </div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold">
            {item.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}