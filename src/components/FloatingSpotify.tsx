"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music2, ExternalLink } from "lucide-react";
import Image from "next/image";

interface SpotifyData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  albumImageUrl?: string;
  songUrl?: string;
}

export default function FloatingSpotify() {
  const [data, setData] = useState<SpotifyData>({ isPlaying: false });
  const [isHovered, setIsHovered] = useState(false);

  // Função para buscar os dados da sua API real
  const fetchNowPlaying = async () => {
    try {
      const res = await fetch("/api/spotify");
      const json = await res.json();
      setData(json);
    } catch (error) {
      console.error("Erro ao buscar Spotify:", error);
    }
  };

  useEffect(() => {
    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 10000); // Atualiza a cada 10 segundos
    return () => clearInterval(interval);
  }, []);

  // Se não estiver tocando nada, o widget fica escondido ou mostra um estado "Offline"
  if (!data.isPlaying) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-6 right-6 z-50 font-sans cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => window.open(data.songUrl, "_blank")}
    >
      <div className="relative group">
        <div className="absolute -inset-1 bg-green-500/20 blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className="relative flex items-center gap-3 md:gap-4 p-2.5 md:p-3 pr-4 md:pr-5 bg-[#121212]/90 backdrop-blur-md border border-zinc-800/50 rounded-2xl shadow-2xl w-[240px] sm:w-[280px] md:w-[320px]">
          
          {/* Capa do Álbum que Gira */}
          <div className="relative w-12 h-12 flex-shrink-0 rounded-full overflow-hidden border border-zinc-700">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="w-full h-full"
            >
              <Image 
                src={data.albumImageUrl || ""} 
                alt={data.title || "Capa"} 
                fill 
                className="object-cover"
              />
            </motion.div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#121212] rounded-full border border-zinc-800"></div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-green-500 font-black">
                Spotify Live
              </span>
            </div>
            <h4 className="text-sm font-bold text-zinc-100 truncate">
              {data.title}
            </h4>
            <p className="text-xs text-zinc-400 truncate">
              {data.artist}
            </p>
          </div>

          <AnimatePresence>
            {isHovered ? (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute right-4"
              >
                <ExternalLink className="w-4 h-4 text-green-500" />
              </motion.div>
            ) : (
              <div className="flex items-end gap-[2px] h-3">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: ["20%", "100%", "20%"] }}
                    transition={{ repeat: Infinity, duration: 0.5 + i * 0.2 }}
                    className="w-1 bg-green-500 rounded-t-sm"
                  />
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}