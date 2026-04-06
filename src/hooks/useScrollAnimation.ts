"use client";

import { useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { useRef } from "react";

export function useScrollProgress() {
  const { scrollYProgress } = useScroll();
  return useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
}

export function useParallax(distance = 100) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-distance, distance]);
  return { ref, y };
}

export function useFadeSlide(direction: "up" | "down" | "left" | "right" = "up", distance = 60) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 0.8, 1]);
  const y = direction === "up" ? useTransform(scrollYProgress, [0, 1], [distance, 0]) : useTransform(scrollYProgress, [0, 1], [0, 0]);
  const x = direction === "left" ? useTransform(scrollYProgress, [0, 1], [distance, 0]) : direction === "right" ? useTransform(scrollYProgress, [0, 1], [-distance, 0]) : useTransform(scrollYProgress, [0, 1], [0, 0]);

  return { ref, opacity, y, x };
}

export function useScaleIn(minScale = 0.8) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [minScale, 1]);
  return { ref, opacity, scale };
}

export function useStickyText(maxSize = 4, minScale = 0.6) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, minScale]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8], [1, 0.5, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  return { ref, scale, opacity, y };
}

export function useHorizontalScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -3]);
  return { ref, x, rotate };
}
