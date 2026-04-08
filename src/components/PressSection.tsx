"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Newspaper,
  ExternalLink,
  Award,
  Quote,
  Calendar,
  MapPin,
  GraduationCap,
  Brain,
  Sparkles,
  ChevronRight,
  Heart,
} from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/components/LanguageContext";

/* ─── i18n ─── */
const TEXTS = {
  pt: {
    badge: "Na Mídia",
    title: "Reconhecimento",
    titleHighlight: "Acadêmico",
    subtitle: "Quando tecnologia e propósito se encontram, o impacto é notícia.",
    articleLabel: "MATÉRIA DESTAQUE",
    articleTitle:
      "Tecnologia a serviço da saúde mental é destaque no I Seminário de Pesquisa e TCC do curso de TADS",
    articleSource: "Portal IFG — Instituto Federal de Goiás",
    articleDate: "Janeiro de 2025",
    articleLocation: "Campus Formosa, GO",
    articleQuote:
      "O trabalho apresentou a plataforma Mind Health, uma solução web desenvolvida para promover a saúde mental e oferecer apoio a pessoas com transtornos mentais, unindo tecnologia e cuidado humano.",
    articleDescription:
      "O TCC de Robson Kauã e Daniel de Sousa foi destaque no I Seminário de Pesquisa e TCC do curso de Tecnologia em Análise e Desenvolvimento de Sistemas do IFG Campus Formosa. O projeto Mind Health foi reconhecido por utilizar tecnologia moderna (React, Next.js, Node.js) para criar uma plataforma que conecta pessoas a recursos de saúde mental.",
    readArticle: "Ler matéria completa",
    projectLabel: "Projeto apresentado",
    projectName: "Mind Health",
    projectDesc: "Plataforma web para promoção da saúde mental",
    photoCaption: "Apresentação do TCC no I Seminário de Pesquisa — IFG Campus Formosa",
    orientador: "Orientador",
    banca: "Banca Avaliadora",
  },
  en: {
    badge: "In The Press",
    title: "Academic",
    titleHighlight: "Recognition",
    subtitle: "When technology and purpose meet, the impact makes the news.",
    articleLabel: "FEATURED ARTICLE",
    articleTitle:
      "Technology serving mental health is highlighted at the 1st Research & Thesis Seminar of the TADS program",
    articleSource: "IFG Portal — Federal Institute of Goiás",
    articleDate: "January 2025",
    articleLocation: "Campus Formosa, GO",
    articleQuote:
      "The project presented the Mind Health platform, a web solution developed to promote mental health and offer support to people with mental disorders, combining technology and human care.",
    articleDescription:
      "Robson Kauã and Daniel de Sousa's thesis was featured at the 1st Research and Thesis Seminar of the Technology in Systems Analysis and Development program at IFG Campus Formosa. The Mind Health project was recognized for using modern technology (React, Next.js, Node.js) to create a platform connecting people to mental health resources.",
    readArticle: "Read full article",
    projectLabel: "Featured project",
    projectName: "Mind Health",
    projectDesc: "Web platform for mental health promotion",
    photoCaption: "Thesis presentation at the 1st Research Seminar — IFG Campus Formosa",
    orientador: "Advisor",
    banca: "Evaluation Committee",
  },
};

const ARTICLE_URL =
  "https://www.ifg.edu.br/ultimas-noticias-campus-formosa/45130-tecnologia-a-servico-da-saude-mental-e-destaque-no-i-seminario-de-pesquisa-e-tcc-do-curso-de-tads";

export default function PressSection() {
  const { lang } = useLanguage();
  const t = TEXTS[lang];
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section className="relative z-20 py-24 md:py-32 overflow-hidden transition-colors duration-500">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(251,191,36,0.05) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
          animate={{ scale: [1, 1.2, 1], y: [0, -30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(59,130,246,0.04) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
          animate={{ scale: [1, 1.3, 1], x: [0, 40, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-5 md:px-8 relative z-10">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-20"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/60 dark:bg-white/5 border border-zinc-200/80 dark:border-white/10 backdrop-blur-xl mb-8 shadow-sm"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Newspaper className="w-4 h-4 text-amber-500" />
            </motion.div>
            <span className="text-xs font-semibold tracking-widest uppercase text-zinc-500 dark:text-zinc-400">
              {t.badge}
            </span>
          </motion.div>

          {/* Title */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-zinc-900 dark:text-white mb-4 leading-[1.1]">
            {t.title}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400">
              {t.titleHighlight}
            </span>
          </h2>

          <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base max-w-lg leading-relaxed">
            {t.subtitle}
          </p>
        </motion.div>

        {/* ── Article Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="group/card"
        >
          {/* Outer glow on hover */}
          <div className="relative">
            <div className="absolute -inset-[1px] rounded-[2.1rem] bg-gradient-to-br from-amber-500/15 via-transparent to-rose-500/15 opacity-0 group-hover/card:opacity-100 blur-sm transition-opacity duration-1000" />
            <div className="absolute -inset-[1px] rounded-[2.1rem] bg-gradient-to-br from-amber-500/10 via-transparent to-rose-500/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-1000" />

            <div className="relative rounded-[2rem] overflow-hidden bg-white/80 dark:bg-white/[0.02] backdrop-blur-2xl border border-zinc-200/60 dark:border-white/[0.06] shadow-sm group-hover/card:shadow-xl transition-all duration-700">
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 opacity-70" />

              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* ── Photo Side ── */}
                <div className="lg:col-span-5 relative overflow-hidden">
                  <div className="relative h-72 sm:h-80 lg:h-full min-h-[320px]">
                    {/* Skeleton loader */}
                    {!imageLoaded && (
                      <div className="absolute inset-0 bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
                    )}
                    <Image
                      src="/tcc-presentation.jpg"
                      alt={t.photoCaption}
                      fill
                      className={`object-cover object-top transition-all duration-700 group-hover/card:scale-105 ${
                        imageLoaded ? "opacity-100" : "opacity-0"
                      }`}
                      onLoad={() => setImageLoaded(true)}
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 dark:to-black/30 hidden lg:block" />

                    {/* Bottom label on image */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/15 backdrop-blur-md border border-white/20">
                          <Calendar className="w-3 h-3 text-white/80" />
                          <span className="text-[10px] font-bold text-white/90 uppercase tracking-wider">
                            {t.articleDate}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/15 backdrop-blur-md border border-white/20">
                          <MapPin className="w-3 h-3 text-white/80" />
                          <span className="text-[10px] font-bold text-white/90 uppercase tracking-wider">
                            {t.articleLocation}
                          </span>
                        </div>
                      </div>
                      <p className="text-[10px] text-white/60 font-medium">
                        {t.photoCaption}
                      </p>
                    </div>
                  </div>
                </div>

                {/* ── Content Side ── */}
                <div className="lg:col-span-7 p-7 md:p-10 flex flex-col">
                  {/* Article label */}
                  <div className="flex items-center gap-2 mb-5">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/20">
                      <Award className="w-3.5 h-3.5 text-amber-500" />
                      <span className="text-[10px] font-black uppercase tracking-[0.15em] text-amber-600 dark:text-amber-400">
                        {t.articleLabel}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg md:text-xl font-black text-zinc-900 dark:text-white leading-snug mb-3 tracking-tight">
                    {t.articleTitle}
                  </h3>

                  {/* Source */}
                  <div className="flex items-center gap-2 mb-5">
                    <GraduationCap className="w-4 h-4 text-zinc-400" />
                    <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                      {t.articleSource}
                    </span>
                  </div>

                  {/* Quote */}
                  <div className="relative mb-6">
                    <div className="absolute -left-1 top-0 bottom-0 w-[3px] rounded-full bg-gradient-to-b from-amber-400 to-rose-400 opacity-50" />
                    <div className="pl-5 relative">
                      <Quote className="absolute -top-1 -left-0.5 w-4 h-4 text-amber-400/30" />
                      <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed italic">
                        {t.articleQuote}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6">
                    {t.articleDescription}
                  </p>

                  {/* Project + People tags */}
                  <div className="flex flex-wrap gap-3 mb-6">
                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500/5 border border-emerald-500/15">
                      <Brain className="w-3.5 h-3.5 text-emerald-500" />
                      <div>
                        <div className="text-[9px] uppercase tracking-widest font-bold text-zinc-400 dark:text-zinc-500">
                          {t.projectLabel}
                        </div>
                        <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                          {t.projectName}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-500/5 border border-blue-500/15">
                      <GraduationCap className="w-3.5 h-3.5 text-blue-500" />
                      <div>
                        <div className="text-[9px] uppercase tracking-widest font-bold text-zinc-400 dark:text-zinc-500">
                          {t.orientador}
                        </div>
                        <div className="text-xs font-bold text-blue-600 dark:text-blue-400">
                          Prof. Afrânio Neto
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-purple-500/5 border border-purple-500/15">
                      <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                      <div>
                        <div className="text-[9px] uppercase tracking-widest font-bold text-zinc-400 dark:text-zinc-500">
                          {t.banca}
                        </div>
                        <div className="text-xs font-bold text-purple-600 dark:text-purple-400">
                          Prof. Marcos Araújo & Profa. Uyara Ferreira
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mt-auto pt-4 border-t border-zinc-200/40 dark:border-white/[0.04]">
                    <motion.a
                      href={ARTICLE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 4 }}
                      className="inline-flex items-center gap-2.5 text-sm font-bold text-zinc-700 dark:text-zinc-200 hover:text-amber-600 dark:hover:text-amber-400 transition-colors group/link"
                    >
                      <ExternalLink className="w-4 h-4" />
                      {t.readArticle}
                      <ChevronRight className="w-4 h-4 opacity-0 -ml-2 group-hover/link:opacity-100 group-hover/link:ml-0 transition-all duration-300" />
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
