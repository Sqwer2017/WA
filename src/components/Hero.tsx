import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowRight, Compass, Eye, Sparkles, BatteryCharging, Layers } from 'lucide-react';
import { assetUrl } from '../data/robotData';

interface HeroProps {
  onOpenPreorder: () => void;
}

type EyeMode = 'neutral' | 'scan' | 'focus' | 'happy';

const EYE_MODES: { id: EyeMode; label: string; status: string }[] = [
  { id: 'neutral', label: 'IDLE', status: 'OLED: Ожидание команды' },
  { id: 'scan', label: 'SCAN', status: 'VISION: Поиск объектов' },
  { id: 'focus', label: 'TRACK', status: 'SERVO: Слежение 2×PWM' },
  { id: 'happy', label: 'ACTIVE', status: 'CORE: Режим компаньона' },
];

export function Hero({ onOpenPreorder }: HeroProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [eyeMode, setEyeMode] = useState<EyeMode>('neutral');
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.hero-stagger', {
        y: 28,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      });
      gsap.from('.hero-visual', {
        scale: 0.94,
        opacity: 0,
        duration: 1.0,
        delay: 0.2,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: -ny * 8, ry: nx * 10 });
  };

  const resetTilt = () => setTilt({ rx: 0, ry: 0 });

  const currentEye = EYE_MODES.find((m) => m.id === eyeMode)!;

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative z-10 pt-24 sm:pt-32 pb-16 sm:pb-24 overflow-hidden"
    >
      {/* Ambient radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[780px] h-[460px] rounded-full bg-sky-500/[0.09] blur-[130px]"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Copy Column */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-7">
            <div className="hero-stagger inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" aria-hidden="true" />
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-slate-200">
                ПРОТОТИП 2026 · DIY CONTROLLER v1.0
              </span>
            </div>

            <div className="hero-stagger space-y-3">
              <p className="font-mono text-xs sm:text-sm uppercase tracking-[0.26em] text-sky-400">
                // NOT JUST A PIECE OF IRON..
              </p>
              <h1 className="font-display text-4xl sm:text-5xl xl:text-[3.75rem] font-extrabold tracking-tight text-white leading-[1.06]">
                iWA <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-sky-300">ONE PRO</span>
              </h1>
              <p className="font-display text-lg sm:text-2xl font-medium text-slate-300">
                Компактный Triangle Bot с живым характером
              </p>
            </div>

            <p className="hero-stagger text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
              Автономный настольный робот в корпусе <strong className="text-white">10.2 × 10.2 см</strong> из
              шлифованного металла. Пиксельный OLED-взгляд, встроенная оптическая камера, два
              прецизионных микросервопривода и полностью открытая архитектура платы v1.0.
            </p>

            {/* Primary CTAs */}
            <div className="hero-stagger flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
              <button
                type="button"
                onClick={onOpenPreorder}
                className="min-h-[52px] px-7 py-3.5 rounded-full bg-white text-[#050507] font-bold text-base inline-flex items-center justify-center gap-2.5 hover:bg-sky-300 transition-colors shadow-[0_0_30px_rgba(255,255,255,0.2)] cursor-pointer"
              >
                <span>Заказать iWA ONE PRO</span>
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </button>

              <a
                href="#blueprint"
                className="min-h-[52px] px-6 py-3.5 rounded-full border border-white/20 bg-white/[0.04] hover:bg-white/[0.1] text-white font-semibold text-base inline-flex items-center justify-center gap-2.5 transition-colors"
              >
                <Compass className="w-5 h-5 text-sky-400" aria-hidden="true" />
                <span>Изучить чертёж</span>
              </a>
            </div>

            {/* Key Metrics Strip */}
            <div className="hero-stagger grid grid-cols-3 gap-3 pt-4 border-t border-white/10 max-w-lg">
              <div>
                <div className="font-mono text-lg sm:text-xl font-bold text-white">10.2 см</div>
                <div className="text-xs text-slate-400 mt-0.5">Габарит шасси</div>
              </div>
              <div>
                <div className="font-mono text-lg sm:text-xl font-bold text-white">2500 mAh</div>
                <div className="text-xs text-slate-400 mt-0.5">LiPo CityTree 3.7V</div>
              </div>
              <div>
                <div className="font-mono text-lg sm:text-xl font-bold text-white">2× Servo</div>
                <div className="text-xs text-slate-400 mt-0.5">Acebot + TowerPro</div>
              </div>
            </div>
          </div>

          {/* Right Interactive Hardware Column */}
          <div className="lg:col-span-6 hero-visual">
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={resetTilt}
              className="relative surface-card rounded-3xl p-4 sm:p-6 overflow-hidden"
              style={{
                transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
                transition: 'transform 0.25s ease-out',
              }}
            >
              {/* Top HUD Bar */}
              <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-white/10">
                <div className="flex items-center gap-2 font-mono text-xs text-slate-300">
                  <Eye className="w-4 h-4 text-sky-400" aria-hidden="true" />
                  <span>{currentEye.status}</span>
                </div>
                <span className="font-mono text-[11px] px-2.5 py-1 rounded-full bg-sky-400/15 text-sky-300 border border-sky-400/30">
                  UNIT #001
                </span>
              </div>

              {/* Hardware Photo + Interactive OLED Eye Simulation Overlay */}
              <div className="relative rounded-2xl overflow-hidden bg-[#050507] aspect-[4/4.6] sm:aspect-[4/4.2] flex items-center justify-center">
                <img
                  src={assetUrl('hero-hardware.webp')}
                  alt="Крупный план робота iWA ONE PRO — корпус из шлифованного металла, OLED-экран с глазами и оптическая камера"
                  className="w-full h-full object-cover object-center select-none pointer-events-none"
                />

                {/* Interactive OLED simulation badge aligned cleanly as a live telemetry preview */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[#050507]/85 backdrop-blur-md border border-white/15">
                  <div className="w-12 h-7 rounded-md bg-black border border-white/20 flex items-center justify-center gap-2 px-1.5">
                    {eyeMode === 'neutral' && (
                      <>
                        <span className="w-3 h-1.5 bg-white rounded-[1px]" />
                        <span className="w-3 h-1.5 bg-white rounded-[1px]" />
                      </>
                    )}
                    {eyeMode === 'scan' && (
                      <>
                        <span className="w-3 h-0.5 bg-sky-400 rounded-full animate-pulse" />
                        <span className="w-3 h-0.5 bg-sky-400 rounded-full animate-pulse" />
                      </>
                    )}
                    {eyeMode === 'focus' && (
                      <>
                        <span className="w-2.5 h-2.5 bg-white rounded-full" />
                        <span className="w-2.5 h-2.5 bg-white rounded-full" />
                      </>
                    )}
                    {eyeMode === 'happy' && (
                      <>
                        <span className="w-2.5 h-2.5 border-t-2 border-white rounded-t-full mt-1" />
                        <span className="w-2.5 h-2.5 border-t-2 border-white rounded-t-full mt-1" />
                      </>
                    )}
                  </div>
                  <div className="leading-tight">
                    <div className="font-mono text-[10px] text-slate-400 uppercase">OLED Эмоция</div>
                    <div className="font-mono text-xs font-semibold text-white">{currentEye.label}</div>
                  </div>
                </div>

                {/* Bottom floating specs */}
                <div className="hidden sm:flex absolute bottom-3 left-3 right-3 items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl bg-[#050507]/85 backdrop-blur-md border border-white/10">
                  <div className="flex items-center gap-2 text-xs text-slate-200">
                    <Layers className="w-4 h-4 text-sky-400" aria-hidden="true" />
                    <span>Анодированный металл</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-200">
                    <BatteryCharging className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                    <span>3.7V · 2500 mAh</span>
                  </div>
                </div>
              </div>

              {/* Interactive Eye Expression Switcher */}
              <div className="mt-4 pt-3 border-t border-white/10">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="flex items-center gap-1.5 text-xs font-medium text-slate-300">
                    <Sparkles className="w-3.5 h-3.5 text-sky-400" aria-hidden="true" />
                    Тест эмоций OLED-дисплея:
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
                              ? 'bg-white text-[#050507] font-bold'
                              : 'bg-white/[0.06] text-slate-300 hover:bg-white/15 hover:text-white'
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
