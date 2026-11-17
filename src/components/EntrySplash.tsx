import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { IwaLogo } from './IwaLogo';

interface EntrySplashProps {
  onDone: () => void;
}

const BOOT_LOGS = [
  'SYSTEM BOOT // iWA ONE PRO TRIANGLE BOT',
  'CHECKING POWER: LiPo CityTree 3.7V 2500mAh [OK]',
  'CALIBRATING SERVOS: ACEBOT + TOWERPRO [OK]',
  'MOUNTING OPTICS & OLED INTERFACE [READY]',
];

export function EntrySplash({ onDone }: EntrySplashProps) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setProgress(100);
      const t = setTimeout(() => onDone(), 200);
      return () => clearTimeout(t);
    }

    const start = performance.now();
    const duration = 1650;
    let raf = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (elapsed < duration) {
        raf = requestAnimationFrame(tick);
      } else {
        setExiting(true);
        setTimeout(() => onDone(), 480);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  const handleSkip = () => {
    setExiting(true);
    setTimeout(() => onDone(), 250);
  };

  const logIdx = Math.min(BOOT_LOGS.length - 1, Math.floor((progress / 100) * BOOT_LOGS.length));

  return (
    <div
      role="status"
      aria-label="Загрузка интерфейса iWA ONE PRO"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center px-6 bg-[#040508] text-white transition-all duration-500 ${
        exiting ? 'opacity-0 scale-[1.03] pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Subtle geometric radial grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-tech-grid opacity-40"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute w-[420px] h-[420px] rounded-full bg-sky-500/15 blur-[120px]"
      />

      {/* Orbital Logo Core */}
      <div className="relative flex items-center justify-center w-52 h-52 sm:w-60 sm:h-60 mb-8">
        {/* Outer rotating triangle ring */}
        <svg
          viewBox="0 0 220 220"
          className="absolute inset-0 w-full h-full animate-orbit-slow text-sky-400/50"
          fill="none"
          aria-hidden="true"
        >
          <circle
            cx="110"
            cy="110"
            r="102"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="8 10"
          />
          <polygon
            points="110,12 198,164 22,164"
            stroke="rgba(255,255,255,0.22)"
            strokeWidth="1.2"
          />
        </svg>

        {/* Counter-rotating dashed reticle */}
        <svg
          viewBox="0 0 220 220"
          className="absolute inset-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)] animate-orbit-reverse text-white/30"
          fill="none"
          aria-hidden="true"
        >
          <circle
            cx="110"
            cy="110"
            r="84"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="24 14 4 14"
          />
        </svg>

        <IwaLogo className="w-28 h-28 sm:w-32 sm:h-32 relative z-10 shadow-[0_0_50px_rgba(56,189,248,0.35)]" />
      </div>

      {/* Telemetry & Progress */}
      <div className="relative z-10 w-full max-w-sm text-center space-y-4">
        <div className="font-display text-xl sm:text-2xl font-bold tracking-wider">
          iWA <span className="text-sky-400">ONE PRO</span>
        </div>

        <p className="font-mono text-[11px] sm:text-xs text-sky-300/90 tracking-wider min-h-[18px]">
          {BOOT_LOGS[logIdx]}
        </p>

        <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-sky-400 via-cyan-300 to-white transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between font-mono text-[11px] text-slate-400">
          <span>CORE v1.0</span>
          <span>{progress}%</span>
        </div>
      </div>

      <button
        type="button"
        onClick={handleSkip}
        className="relative z-10 mt-8 min-h-[44px] px-5 py-2 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/10 font-mono text-xs text-slate-300 hover:text-white inline-flex items-center gap-2 transition-colors cursor-pointer"
      >
        <span>Пропустить заставку</span>
        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
      </button>
    </div>
  );
}
