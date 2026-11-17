import { useState, useEffect } from 'react';
import { Maximize2, Sun, Moon, X, Ruler, CheckCircle2 } from 'lucide-react';
import { BLUEPRINT_NODES, assetUrl } from '../data/robotData';
import { useApp } from '../context/AppContext';

export function BlueprintExplorer() {
  const { theme } = useApp();
  const [activeId, setActiveId] = useState<string>('battery');
  const [cyberMode, setCyberMode] = useState(() => theme === 'dark');
  const [zoomOpen, setZoomOpen] = useState(false);

  // Sync blueprint sheet automatically when user switches Light/Dark theme
  useEffect(() => {
    setCyberMode(theme === 'dark');
  }, [theme]);

  const activeNode = BLUEPRINT_NODES.find((n) => n.id === activeId) ?? BLUEPRINT_NODES[0];
  const imgSrc = cyberMode ? assetUrl('blueprint-cyber.webp') : assetUrl('blueprint-light.webp');

  useEffect(() => {
    if (!zoomOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setZoomOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [zoomOpen]);

  return (
    <section id="blueprint" className="relative z-10 py-16 sm:py-24 border-y section-alt">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.22em] theme-accent font-semibold mb-3">
              // COMPONENT LAYOUT DRAWING · SCALE 1:1
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold theme-text-primary leading-tight">
              Оригинальный чертёж компоновки v1.0
            </h2>
            <p className="theme-text-secondary mt-3 text-base">
              Нажмите на любую контрольную точку чертежа, чтобы изучить внутреннюю архитектуру,
              габариты отсеков и спецификации узлов.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => setCyberMode((v) => !v)}
              className="min-h-[44px] px-4 py-2 rounded-xl border theme-border theme-subtle hover:border-sky-400 text-sm font-medium theme-text-primary inline-flex items-center gap-2 transition-colors cursor-pointer"
            >
              {cyberMode ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" aria-hidden="true" />
                  <span>Светлый лист</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-sky-500" aria-hidden="true" />
                  <span>Cyber CAD</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setZoomOpen(true)}
              className="min-h-[44px] px-4 py-2 rounded-xl border border-sky-500/40 bg-sky-500/10 hover:bg-sky-500/20 text-sm font-medium theme-accent inline-flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Maximize2 className="w-4 h-4" aria-hidden="true" />
              <span>Увеличить 1:1</span>
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Blueprint Canvas */}
          <div className="lg:col-span-7 surface-card rounded-3xl p-3 sm:p-5">
            <div
              className={`relative rounded-2xl overflow-hidden border theme-border transition-colors duration-300 ${
                cyberMode ? 'bg-[#070B12]' : 'bg-[#F8FAFC]'
              }`}
            >
              <img
                src={imgSrc}
                alt="Чертёж компоновки робота DIY Robot Controller v1.0 в масштабе 1:1 с размерами 10.2×10.2 см"
                className="w-full h-auto block select-none"
              />

              {cyberMode && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-transparent via-sky-400/25 to-transparent animate-blueprint-scan"
                />
              )}

              {BLUEPRINT_NODES.map((node, index) => {
                const isActive = node.id === activeId;
                return (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => setActiveId(node.id)}
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    aria-label={`Выбрать узел ${node.title}`}
                    aria-pressed={isActive}
                    className="absolute -translate-x-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center group cursor-pointer"
                  >
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="absolute w-8 h-8 rounded-full bg-sky-400/40 animate-hotspot-ping"
                      />
                    )}
                    <span
                      className={`relative z-10 w-8 h-8 rounded-full font-mono text-xs font-bold flex items-center justify-center transition-all shadow-lg ${
                        isActive
                          ? 'bg-sky-400 text-[#050507] scale-110 ring-4 ring-sky-400/30'
                          : 'bg-[#050507]/90 text-white border-2 border-white/80 group-hover:border-sky-400 group-hover:scale-105'
                      }`}
                    >
                      {index + 1}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
              {BLUEPRINT_NODES.map((node, idx) => {
                const active = node.id === activeId;
                return (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => setActiveId(node.id)}
                    className={`min-h-[44px] px-3 py-2 rounded-xl border text-left transition-colors cursor-pointer ${
                      active
                        ? 'bg-sky-500/15 border-sky-500/60 theme-text-primary'
                        : 'theme-subtle theme-border theme-text-secondary hover:border-sky-400/40'
                    }`}
                  >
                    <div className="font-mono text-[10px] theme-accent font-semibold">
                      0{idx + 1} · {node.code}
                    </div>
                    <div className="text-xs font-semibold truncate mt-0.5">
                      {node.id === 'battery'
                        ? 'АКБ 2500mAh'
                        : node.id === 'servos'
                          ? '2× Micro Servo'
                          : node.id === 'pcb'
                            ? 'Плата PCB v1.0'
                            : 'Рама 10.2×10.2'}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Synchronized Spec Inspector */}
          <div className="lg:col-span-5 space-y-4">
            <div className="surface-card rounded-3xl p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <span className="font-mono text-xs px-3 py-1 rounded-full bg-sky-500/15 theme-accent border border-sky-500/30 font-semibold">
                  УЗЕЛ · {activeNode.code}
                </span>
                <span className="inline-flex items-center gap-1.5 font-mono text-xs theme-text-secondary">
                  <Ruler className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400" aria-hidden="true" />
                  {activeNode.dimensions}
                </span>
              </div>

              <h3 className="font-display text-2xl font-bold theme-text-primary leading-snug">
                {activeNode.title}
              </h3>
              <p className="text-sm font-medium theme-accent mt-1">{activeNode.subtitle}</p>

              <p className="theme-text-secondary text-sm sm:text-base leading-relaxed mt-5">
                {activeNode.description}
              </p>

              <ul className="mt-6 space-y-2.5 pt-5 border-t theme-border">
                {activeNode.specs.map((s) => (
                  <li key={s} className="flex items-center gap-2.5 text-sm theme-text-primary">
                    <CheckCircle2
                      className="w-4 h-4 text-sky-500 dark:text-sky-400 shrink-0"
                      aria-hidden="true"
                    />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="surface-card rounded-2xl p-5 grid grid-cols-2 gap-4 font-mono text-xs">
              <div>
                <div className="theme-text-muted">ПРОЕКТ</div>
                <div className="theme-text-primary font-semibold mt-0.5">DIY Robot Controller v1.0</div>
              </div>
              <div>
                <div className="theme-text-muted">МАСШТАБ / ДАТА</div>
                <div className="theme-text-primary font-semibold mt-0.5">1:1 · REV 2024–2026</div>
              </div>
              <div>
                <div className="theme-text-muted">БЕЗОПАСНАЯ ЗОНА</div>
                <div className="theme-text-primary font-semibold mt-0.5">10.2 × 10.2 см</div>
              </div>
              <div>
                <div className="theme-text-muted">ВЫСОТА ЯДРА</div>
                <div className="theme-text-primary font-semibold mt-0.5">6.7 см (скос 4.5/4.8)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {zoomOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Увеличенный чертёж DIY Robot Controller v1.0"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setZoomOpen(false)}
        >
          <div
            className="relative max-w-3xl w-full max-h-[92vh] overflow-auto rounded-2xl border border-white/15 bg-[#070B12] p-2 sm:p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setZoomOpen(false)}
              aria-label="Закрыть увеличенный чертёж"
              className="sticky top-2 float-right z-10 w-11 h-11 rounded-full bg-black/80 border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={imgSrc}
              alt="Детальный чертёж робота iWA ONE PRO"
              className="w-full h-auto rounded-xl"
            />
          </div>
        </div>
      )}
    </section>
  );
}
