import { useState } from 'react';
import { Bot, Video, ShieldAlert, Network, ArrowUpRight, Cpu } from 'lucide-react';
import { FUTURE_CASES } from '../data/robotData';

const CASE_ICONS = [Bot, Video, ShieldAlert, Network];

export function FutureCases() {
  const [activeIdx, setActiveIdx] = useState(0);
  const current = FUTURE_CASES[activeIdx];
  const ActiveIcon = CASE_ICONS[activeIdx] ?? Bot;

  return (
    <section id="cases" className="relative z-10 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10 sm:mb-14">
          <p className="font-mono text-xs uppercase tracking-[0.22em] theme-accent font-semibold mb-3">
            // ROADMAP & FUTURE USE CASES
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold theme-text-primary leading-tight">
            Кейсы будущего: во что вырастет iWA
          </h2>
          <p className="theme-text-secondary mt-3 text-base sm:text-lg">
            Открытая платформа v1.0 закладывает фундамент для новых сценариев — от личного
            AI-ассистента на столе до синхронизированного роя модульных роботов.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Case Selector List */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {FUTURE_CASES.map((item, idx) => {
              const Icon = CASE_ICONS[idx] ?? Bot;
              const active = idx === activeIdx;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  aria-pressed={active}
                  className={`surface-card rounded-2xl p-4 sm:p-5 text-left transition-all cursor-pointer flex items-start gap-4 ${
                    active
                      ? 'border-sky-500 ring-2 ring-sky-500/25'
                      : 'hover:border-sky-400/40'
                  }`}
                >
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      active
                        ? 'bg-sky-500 text-white'
                        : 'theme-subtle border theme-border text-sky-500 dark:text-sky-400'
                    }`}
                  >
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                      <span className="font-mono text-[10px] tracking-[0.16em] theme-text-muted">
                        {item.phase}
                      </span>
                      <span
                        className={`font-mono text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                          active
                            ? 'bg-sky-500/20 theme-accent'
                            : 'theme-subtle theme-text-secondary'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                    <h3 className="font-display text-sm sm:text-base font-bold theme-text-primary">
                      {item.title}
                    </h3>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Active Case Detail Card */}
          <div className="lg:col-span-7 surface-card rounded-3xl p-6 sm:p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-sky-500/10 blur-[80px]"
            />

            <div className="relative z-10 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/15 border border-sky-500/30 font-mono text-xs theme-accent font-semibold">
                  <ActiveIcon className="w-4 h-4" aria-hidden="true" />
                  <span>{current.phase}</span>
                </div>
                <span className="font-mono text-xs px-3 py-1 rounded-full border theme-border theme-subtle theme-text-secondary">
                  СТАТУС: {current.status}
                </span>
              </div>

              <div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold theme-text-primary leading-snug">
                  {current.title}
                </h3>
                <p className="text-sm sm:text-base font-medium theme-accent mt-1.5">
                  {current.subtitle}
                </p>
              </div>

              <p className="text-sm sm:text-base theme-text-secondary leading-relaxed">
                {current.description}
              </p>

              {/* Hardware tags used */}
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.18em] theme-text-muted mb-2.5">
                  Задействованные узлы iWA:
                </div>
                <div className="flex flex-wrap gap-2">
                  {current.hardwareUse.map((hw) => (
                    <span
                      key={hw}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border theme-border theme-subtle text-xs font-medium theme-text-primary"
                    >
                      <Cpu className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400" aria-hidden="true" />
                      {hw}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Metrics + CTA */}
            <div className="relative z-10 mt-8 pt-6 border-t theme-border flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <div className="grid grid-cols-3 gap-4 flex-1">
                {current.metrics.map((m) => (
                  <div key={m.label}>
                    <div className="font-mono text-base sm:text-lg font-bold theme-text-primary">
                      {m.value}
                    </div>
                    <div className="text-[11px] theme-text-muted">{m.label}</div>
                  </div>
                ))}
              </div>

              <a
                href="#configurator"
                className="min-h-[44px] px-5 py-2.5 rounded-full border theme-border theme-subtle hover:border-sky-400 font-semibold text-sm theme-text-primary inline-flex items-center justify-center gap-2 shrink-0 transition-colors"
              >
                <span>Выбрать базу</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
