import { useState, useEffect } from 'react';
import { Maximize2, Sun, Moon, X, Ruler, CheckCircle2 } from 'lucide-react';
import { BLUEPRINT_NODES, assetUrl } from '../data/robotData';

export function BlueprintExplorer() {
  const [activeId, setActiveId] = useState<string>('battery');
  const [cyberMode, setCyberMode] = useState(true);
  const [zoomOpen, setZoomOpen] = useState(false);

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
    <section id="blueprint" className="relative z-10 py-16 sm:py-24 border-y border-white/10 bg-[#08090D]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-sky-400 mb-3">
              // COMPONENT LAYOUT DRAWING · SCALE 1:1
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight">
              Оригинальный чертёж компоновки v1.0
            </h2>
            <p className="text-slate-300 mt-3 text-base">
              Нажмите на любую контрольную точку чертежа, чтобы изучить внутреннюю архитектуру,
              габариты отсеков и спецификации узлов.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => setCyberMode((v) => !v)}
              className="min-h-[44px] px-4 py-2 rounded-xl border border-white/15 bg-white/[0.04] hover:bg-white/[0.1] text-sm font-medium text-white inline-flex items-center gap-2 transition-colors cursor-pointer"
            >
              {cyberMode ? (
                <>
                  <Sun className="w-4 h-4 text-amber-300" aria-hidden="true" />
                  <span>Светлый лист</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-sky-400" aria-hidden="true" />
                  <span>Cyber CAD</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setZoomOpen(true)}
              className="min-h-[44px] px-4 py-2 rounded-xl border border-sky-400/35 bg-sky-400/10 hover:bg-sky-400/20 text-sm font-medium text-sky-200 inline-flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Maximize2 className="w-4 h-4" aria-hidden="true" />
              <span>Увеличить 1:1</span>
            </button>
          </div>
        </div>

        {/* Main Interactive Grid */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Blueprint Canvas */}
          <div className="lg:col-span-7 surface-card rounded-3xl p-3 sm:p-5">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#070B12]">
              <img
                src={imgSrc}
                alt="Чертёж компоновки робота DIY Robot Controller v1.0 в масштабе 1:1 с размерами 10.2×10.2 см"
                className="w-full h-auto block select-none"
              />

              {/* Animated laser scanline in Cyber CAD mode */}
              {cyberMode && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-transparent via-sky-400/20 to-transparent animate-blueprint-scan"
                />
              )}

              {/* Interactive Hotspots */}
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
                    className="absolute -translate-x-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center group cursor-pointer focus-visible:outline-sky-400"
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

            {/* Quick Selector Pills (touch-friendly for phones) */}
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
                        ? 'bg-sky-400/15 border-sky-400/60 text-white'
                        : 'bg-white/[0.03] border-white/10 text-slate-300 hover:bg-white/[0.08]'
                    }`}
                  >
                    <div className="font-mono text-[10px] text-sky-400">
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
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="font-mono text-xs px-3 py-1 rounded-full bg-sky-400/15 text-sky-300 border border-sky-400/30">
                  УЗЕЛ · {activeNode.code}
                </span>
                <span className="inline-flex items-center gap-1.5 font-mono text-xs text-slate-300">
                  <Ruler className="w-3.5 h-3.5 text-sky-400" aria-hidden="true" />
                  {activeNode.dimensions}
                </span>
              </div>

              <h3 className="font-display text-2xl font-bold text-white leading-snug">
                {activeNode.title}
              </h3>
              <p className="text-sm font-medium text-sky-300/90 mt-1">{activeNode.subtitle}</p>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-5">
                {activeNode.description}
              </p>

              <ul className="mt-6 space-y-2.5 pt-5 border-t border-white/10">
                {activeNode.specs.map((s) => (
                  <li key={s} className="flex items-center gap-2.5 text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" aria-hidden="true" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technical Passport Summary */}
            <div className="surface-card rounded-2xl p-5 grid grid-cols-2 gap-4 font-mono text-xs">
              <div>
                <div className="text-slate-400">ПРОЕКТ</div>
                <div className="text-white font-semibold mt-0.5">DIY Robot Controller v1.0</div>
              </div>
              <div>
                <div className="text-slate-400">МАСШТАБ / ДАТА</div>
                <div className="text-white font-semibold mt-0.5">1:1 · REV 2024–2026</div>
              </div>
              <div>
                <div className="text-slate-400">БЕЗОПАСНАЯ ЗОНА</div>
                <div className="text-white font-semibold mt-0.5">10.2 × 10.2 см</div>
              </div>
              <div>
                <div className="text-slate-400">ВЫСОТА ЯДРА</div>
                <div className="text-white font-semibold mt-0.5">6.7 см (скос 4.5/4.8)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 1:1 Lightbox Zoom */}
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
