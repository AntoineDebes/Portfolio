"use client";
import React, { useEffect, useRef } from "react";

type SparklesCoreProps = {
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number; // number of particles per 1000x1000 area
  particleColor?: string;
  className?: string;
};

type Particle = {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  alpha: number;
  alphaV: number;
};

export function SparklesCore({
  background = "transparent",
  minSize = 0.5,
  maxSize = 1.25,
  particleDensity = 900,
  particleColor = "var(--secondary)",
  className,
}: SparklesCoreProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let mounted = true;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const area = (rect.width * rect.height) / (1000 * 1000);
      const count = Math.max(20, Math.floor(area * particleDensity));
      particlesRef.current = Array.from({ length: count }, () =>
        createParticle(rect.width, rect.height)
      );
    };

    const createParticle = (width: number, height: number): Particle => {
      const size = rand(minSize, maxSize);
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        size,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        alpha: Math.random() * 0.8 + 0.2,
        alphaV: (Math.random() - 0.5) * 0.01,
      };
    };

    const rand = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const step = () => {
      if (!mounted) return;
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);
      if (background !== "transparent") {
        ctx.fillStyle = background;
        ctx.fillRect(0, 0, width, height);
      }
      ctx.fillStyle = particleColor;
      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha += p.alphaV;
        if (p.alpha < 0.1 || p.alpha > 1) p.alphaV *= -1;

        if (p.x < -5) p.x = width + 5;
        if (p.x > width + 5) p.x = -5;
        if (p.y < -5) p.y = height + 5;
        if (p.y > height + 5) p.y = -5;

        ctx.globalAlpha = Math.max(0.1, Math.min(1, p.alpha));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(step);
    };

    resize();
    step();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      mounted = false;
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      ro.disconnect();
    };
  }, [background, minSize, maxSize, particleDensity, particleColor]);

  return <canvas ref={canvasRef} className={className} />;
}
