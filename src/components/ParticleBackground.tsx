"use client";

import { useRef, useEffect, useCallback } from "react";
import { useTheme } from "next-themes";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  radius: number;
}

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -99999, y: -99999, active: false });
  const animRef = useRef<number>(0);
  const { theme: _theme } = useTheme();

  const initParticles = useCallback(
    (width: number, height: number) => {
      const isMobile = width < 768;
      const count = isMobile ? 16 : 45;
      const particles: Particle[] = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          size: Math.random() * 1.6 + 0.6,
          opacity: Math.random() * 0.5 + 0.1,
          radius: count,
        });
      }
      return particles;
    },
    []
  );

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let isMobile = false;
    const resize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particlesRef.current = initParticles(canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };
    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };
    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      window.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    }

    const CONNECTION_DISTANCE = 110;
    const MOUSE_RADIUS = 160;

    let isRunning = true;

    const animate = () => {
      if (!isRunning || !canvas || !ctx) return;

      const isDark = document.documentElement.classList.contains("dark");
      const color = isDark ? "255, 255, 255" : "0, 0, 0";
      const dotOpacityBase = isDark ? 0.12 : 0.08;
      const lineColor = isDark ? "200, 200, 200" : "0, 0, 0";

      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const hasMouse = !isMobile && mouseRef.current.active;

      const particles = particlesRef.current;
      const pLen = particles.length;

      for (let i = 0; i < pLen; i++) {
        const p = particles[i];
        if (hasMouse) {
          const dx = p.x - mx;
          const dy = p.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_RADIUS) {
            const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
            p.vx += (dx / dist) * force * 0.04;
            p.vy += (dy / dist) * force * 0.04;
          }
        }

        p.vx *= 0.998;
        p.vy *= 0.998;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${p.opacity * dotOpacityBase * 6})`;
        ctx.fill();
      }

      // Draw connections only on desktop to save mobile battery and avoid long frame times
      if (!isMobile) {
        for (let i = 0; i < pLen; i++) {
          for (let j = i + 1; j < pLen; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < CONNECTION_DISTANCE) {
              const opacity = (1 - dist / CONNECTION_DISTANCE) * 0.05;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.strokeStyle = `rgba(${lineColor}, ${opacity})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }

        if (hasMouse) {
          const gradient = ctx.createRadialGradient(mx, my, 0, mx, my, MOUSE_RADIUS);
          gradient.addColorStop(0, `rgba(34, 197, 94, 0.04)`);
          gradient.addColorStop(1, `rgba(34, 197, 94, 0)`);
          ctx.beginPath();
          ctx.arc(mx, my, MOUSE_RADIUS, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animRef.current);
      } else {
        animRef.current = requestAnimationFrame(animate);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      isRunning = false;
      cancelAnimationFrame(animRef.current);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="hidden md:block fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.8 }}
    />
  );
}
