import { ArrowLeft, Compass, TriangleAlert } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { IwaLogo } from './IwaLogo';

export function NotFoundPage() {
  const { navigate } = useApp();

  return (
    <main className="relative z-10 min-h-[calc(100vh-80px)] pt-28 pb-20 px-4 sm:px-6 flex items-center justify-center">
      <div className="w-full max-w-xl surface-card rounded-3xl p-7 sm:p-12 text-center relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-sky-500/15 blur-[100px]"
        />

        <div className="relative z-10 flex flex-col items-center space-y-6">
          <div className="relative flex items-center justify-center w-32 h-32">
            <svg
              viewBox="0 0 140 140"
              className="absolute inset-0 w-full h-full animate-orbit-slow text-sky-500/45"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="70"
                cy="70"
                r="64"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="10 8"
              />
            </svg>
            <IwaLogo className="w-20 h-20" />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 font-mono text-xs text-amber-500 dark:text-amber-300 font-semibold">
            <TriangleAlert className="w-3.5 h-3.5" aria-hidden="true" />
            <span>ERROR 404 // UNIT_SIGNAL_LOST</span>
          </div>

          <div className="space-y-2">
            <h1 className="font-display text-5xl sm:text-6xl font-extrabold theme-text-primary tracking-tight">
              404
            </h1>
            <p className="font-display text-lg sm:text-xl font-bold theme-text-primary">
              Сектор не найден в памяти робота
            </p>
            <p className="text-sm sm:text-base theme-text-secondary max-w-md mx-auto">
              Возможно, ссылка устарела или в адресе допущена опечатка. Вернитесь на главный экран
              iWA ONE PRO или откройте чертёж v1.0.
            </p>
          </div>

          <div className="w-full p-4 rounded-2xl theme-subtle border theme-border font-mono text-xs theme-text-muted text-left space-y-1">
            <div>&gt; STATUS: ROUTE_NOT_MAPPED</div>
            <div>&gt; CONTROLLER: DIY Robot Controller v1.0 [ONLINE]</div>
            <div>&gt; RECOVERY: REDIRECT_TO_HOME_READY</div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full pt-2">
            <button
              type="button"
              onClick={() => navigate('home')}
              className="flex-1 min-h-[50px] px-6 py-3 rounded-full btn-primary-theme font-bold text-sm inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>Вернуться на главную</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('home', 'blueprint')}
              className="min-h-[50px] px-6 py-3 rounded-full border theme-border theme-subtle hover:border-sky-400 font-semibold text-sm theme-text-primary inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <Compass className="w-4 h-4 text-sky-500" aria-hidden="true" />
              <span>Открыть чертёж</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
