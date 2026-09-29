"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function AmbientGlow() {
  const [mounted, setMounted] = useState(false);

  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  // Soft lagging spring for atmospheric ambient feel
  const springX = useSpring(mouseX, { damping: 30, stiffness: 80, mass: 0.8 });
  const springY = useSpring(mouseY, { damping: 30, stiffness: 80, mass: 0.8 });

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      className="pointer-events-none fixed top-0 left-0 w-[550px] h-[550px] rounded-full z-0 opacity-20 dark:opacity-25 blur-[120px] transition-opacity duration-700 will-change-transform bg-gradient-to-tr from-sky-500/30 via-emerald-500/20 to-purple-500/30"
    />
  );
}
