import { useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  angle: number;
  spin: number;
  alpha: number;
  filled: boolean;
}

export function TriParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useApp();
  const themeRef = useRef(theme);
  themeRef.current = theme;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = 0;
    let height = 0;
    let rafId = 0;
    let particles: Particle[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = width < 768 ? 16 : 32;
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.32,
        vy: -0.14 - Math.random() * 0.24,
        size: 4 + Math.random() * 13,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.009,
        alpha: 0.1 + Math.random() * 0.2,
        filled: Math.random() > 0.72,
      }));
    };

    const drawTriangle = (p: Particle, isLight: boolean) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.beginPath();
      const r = p.size;
      for (let i = 0; i < 3; i++) {
        const a = (i * Math.PI * 2) / 3 - Math.PI / 2;
        const px = Math.cos(a) * r;
        const py = Math.sin(a) * r;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      if (p.filled) {
        ctx.fillStyle = isLight
          ? `rgba(2, 132, 199, ${p.alpha * 0.45})`
          : `rgba(56, 189, 248, ${p.alpha * 0.5})`;
        ctx.fill();
      } else {
        ctx.strokeStyle = isLight
          ? `rgba(15, 23, 42, ${p.alpha * 0.65})`
          : `rgba(255, 255, 255, ${p.alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      ctx.restore();
    };

    const render = () => {
      const isLight = themeRef.current === 'light';
      ctx.clearRect(0, 0, width, height);

      // Subtle neural constellation lines between nearby triangles
      const maxDist = width < 768 ? 110 : 145;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        if (!prefersReduced) {
          a.x += a.vx;
          a.y += a.vy;
          a.angle += a.spin;
          if (a.y < -30) {
            a.y = height + 30;
            a.x = Math.random() * width;
          }
          if (a.x < -30) a.x = width + 30;
          if (a.x > width + 30) a.x = -30;
        }

        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * (isLight ? 0.08 : 0.1);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = isLight
              ? `rgba(2, 132, 199, ${lineAlpha})`
              : `rgba(56, 189, 248, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        drawTriangle(a, isLight);
      }

      if (!prefersReduced) {
        rafId = requestAnimationFrame(render);
      }
    };

    resize();
    render();
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 opacity-75"
    />
  );
}
