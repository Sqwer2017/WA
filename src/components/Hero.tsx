import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import {
  ArrowRight,
  Compass,
  Eye,
  Sparkles,
  Box,
  Image as ImageIcon,
  ScanLine,
} from 'lucide-react';
import { assetUrl, type EyeMode } from '../data/robotData';
import { Robot3DViewer } from './Robot3DViewer';

interface HeroProps {
  onOpenPreorder: () => void;
  selectedFinish: string;
}

const EYE_MODES: { id: EyeMode; label: string; status: string }[] = [
  { id: 'neutral', label: 'IDLE', status: 'OLED: Ожидание команды' },
  { id: 'scan', label: 'SCAN', status: 'VISION: Сканирование сцены' },
  { id: 'focus', label: 'TRACK', status: 'SERVO: Слежение 2×PWM' },
  { id: 'happy', label: 'ACTIVE', status: 'CORE: Режим компаньона' },
];

export function Hero({ onOpenPreorder, selectedFinish }: HeroProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [eyeMode, setEyeMode] = useState<EyeMode>('neutral');
  const [viewMode, setViewMode] = useState<'3d' | 'wireframe' | 'photo'>('3d');

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.hero-stagger', {
        y: 28,
        opacity: 0,
        duration: 0.85,
        stagger: 0.09,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      });
      gsap.from('.hero-visual', {
        scale: 0.95,
        opacity: 0,
        duration: 0.95,
        delay: 0.15,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const currentEye = EYE_MODES.find((m) => m.id === eyeMode)!;

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative z-10 pt-24 sm:pt-32 pb-16 sm:pb-24 overflow-hidden"
    >
      {/* Ambient photonic glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[780px] h-[460px] rounded-full bg-sky-500/[0.11] blur-[140px]"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Copy Column */}
          <div className="min-w-0 lg:col-span-6 space-y-6 sm:space-y-7">
            <div className="hero-stagger inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border theme-border theme-subtle backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" aria-hidden="true" />
              <span className="font-mono text-xs uppercase tracking-[0.18em] theme-text-secondary">
                ПРОТОТИП 2026 · DIY CONTROLLER v1.0
              </span>
            </div>

            <div className="hero-stagger space-y-3">
              <p className="font-mono text-xs sm:text-sm uppercase tracking-[0.26em] theme-accent font-semibold">
                // NOT JUST A PIECE OF IRON..
              </p>
              <h1 className="font-display text-4xl sm:text-5xl xl:text-[3.75rem] font-extrabold tracking-tight theme-text-primary leading-[1.06]">
                iWA{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-cyan-400 to-indigo-400">
                  ONE PRO
                </span>
              </h1>
              <p className="font-display text-lg sm:text-2xl font-medium theme-text-secondary">
                Компактный Triangle Bot с живым характером
              </p>
            </div>

            <p className="hero-stagger text-base sm:text-lg theme-text-secondary leading-relaxed max-w-xl">
              Автономный робот в корпусе <strong className="theme-text-primary">10.2 × 10.2 см</strong> из
              шлифованного металла. Живые OLED-эмоции, встроенная оптическая камера, два
              прецизионных микросервопривода и полностью открытая архитектура платы v1.0.
            </p>

            {/* Primary CTAs */}
            <div className="hero-stagger flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
              <button
                type="button"
                onClick={onOpenPreorder}
                className="min-h-[52px] px-7 py-3.5 rounded-full btn-primary-theme font-bold text-base inline-flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <span>Заказать iWA ONE PRO</span>
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </button>

              <a
                href="#blueprint"
                className="min-h-[52px] px-6 py-3.5 rounded-full border theme-border theme-subtle hover:border-sky-400 theme-text-primary font-semibold text-base inline-flex items-center justify-center gap-2.5 transition-colors"
              >
                <Compass className="w-5 h-5 text-sky-500 dark:text-sky-400" aria-hidden="true" />
                <span>Изучить чертёж</span>
              </a>
            </div>

            {/* Key Metrics Strip */}
            <div className="hero-stagger grid grid-cols-3 gap-3 pt-4 border-t theme-border max-w-lg">
              <div>
                <div className="font-mono text-lg sm:text-xl font-bold theme-text-primary">
                  10.2 см
                </div>
                <div className="text-xs theme-text-muted mt-0.5">Габарит шасси</div>
              </div>
              <div>
                <div className="font-mono text-lg sm:text-xl font-bold theme-text-primary">
                  2500 mAh
                </div>
                <div className="text-xs theme-text-muted mt-0.5">LiPo CityTree 3.7V</div>
              </div>
              <div>
                <div className="font-mono text-lg sm:text-xl font-bold theme-text-primary">
                  2× Servo
                </div>
                <div className="text-xs theme-text-muted mt-0.5">Acebot + TowerPro</div>
              </div>
            </div>
          </div>

          {/* Right Interactive 3D & Hardware Viewport */}
          <div className="min-w-0 w-full lg:col-span-6 hero-visual">
            <div className="relative w-full surface-card rounded-3xl p-4 sm:p-6 overflow-hidden">
              {/* Top HUD Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b theme-border">
                <div className="flex items-center gap-2 font-mono text-xs theme-text-secondary">
                  <Eye className="w-4 h-4 text-sky-500 dark:text-sky-400" aria-hidden="true" />
                  <span>{currentEye.status}</span>
                </div>

                {/* View Mode Toggle: 3D / CAD Wireframe / Photo */}
                <div className="flex items-center gap-1 p-1 rounded-xl border theme-border theme-subtle">
                  <button
                    type="button"
                    onClick={() => setViewMode('3d')}
                    aria-pressed={viewMode === '3d'}
                    className={`min-h-[34px] px-2.5 rounded-lg font-mono text-[11px] inline-flex items-center gap-1.5 transition-colors cursor-pointer ${
                      viewMode === '3d'
                        ? 'bg-sky-500 text-white font-semibold'
                        : 'theme-text-secondary hover:theme-text-primary'
                    }`}
                  >
                    <Box className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>3D</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('wireframe')}
                    aria-pressed={viewMode === 'wireframe'}
                    className={`min-h-[34px] px-2.5 rounded-lg font-mono text-[11px] inline-flex items-center gap-1.5 transition-colors cursor-pointer ${
                      viewMode === 'wireframe'
                        ? 'bg-sky-500 text-white font-semibold'
                        : 'theme-text-secondary hover:theme-text-primary'
                    }`}
                  >
                    <ScanLine className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>CAD</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('photo')}
                    aria-pressed={viewMode === 'photo'}
                    className={`min-h-[34px] px-2.5 rounded-lg font-mono text-[11px] inline-flex items-center gap-1.5 transition-colors cursor-pointer ${
                      viewMode === 'photo'
                        ? 'bg-sky-500 text-white font-semibold'
                        : 'theme-text-secondary hover:theme-text-primary'
                    }`}
                  >
                    <ImageIcon className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Фото</span>
                  </button>
                </div>
              </div>

              {/* 3D Canvas or Photo Viewport */}
              <div className="relative rounded-2xl overflow-hidden bg-[#06080E] border border-white/10 h-[360px] sm:h-[430px] flex items-center justify-center">
                {/* Ambient backdrop glow inside viewport */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(56,189,248,0.16),transparent_68%)]"
                />

                {viewMode === 'photo' ? (
                  <img
                    src={assetUrl('hero-hardware.webp')}
                    alt="Прототип корпуса iWA ONE PRO — шлифованный металл, OLED-экран и камера"
                    className="w-full h-full object-cover object-center select-none pointer-events-none"
                  />
                ) : (
                  <Robot3DViewer
                    eyeMode={eyeMode}
                    wireframe={viewMode === 'wireframe'}
                    finishId={selectedFinish}
                  />
                )}

                {/* Hint Pill */}
                <div className="pointer-events-none absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-black/75 backdrop-blur-md border border-white/10 text-[11px] font-mono text-slate-300">
                  <span>
                    {viewMode === 'photo'
                      ? 'РЕНДЕР ПРОТОТИПА ONE PRO'
                      : 'ПОТЯНИТЕ ЧТОБЫ КРУТИТЬ 3D · 360°'}
                  </span>
                  <span className="text-sky-400">UNIT #001</span>
                </div>
              </div>

              {/* Interactive Eye Expression Switcher */}
              <div className="mt-4 pt-3 border-t theme-border">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="flex items-center gap-1.5 text-xs font-medium theme-text-secondary">
                    <Sparkles className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400" aria-hidden="true" />
                    Эмоция на OLED-дисплее:
                  </span>
                  <div className="flex flex-wrap gap-1.5" role="group" aria-label="Переключение эмоций робота">
                    {EYE_MODES.map((m) => {
                      const active = m.id === eyeMode;
                      return (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setEyeMode(m.id)}
                          aria-pressed={active}
                          className={`min-h-[36px] px-3 py-1 rounded-lg font-mono text-xs font-medium transition-colors cursor-pointer ${
                            active
                              ? 'bg-sky-500 text-white font-bold shadow-sm'
                              : 'theme-subtle border theme-border theme-text-secondary hover:theme-text-primary'
                          }`}
                        >
                          {m.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
