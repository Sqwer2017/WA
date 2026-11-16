import { useState, useEffect } from 'react';
import { Expand, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GALLERY_WORKS, type GalleryWork } from '../data/robotData';

const FILTERS: { id: 'all' | GalleryWork['category']; label: string }[] = [
  { id: 'all', label: 'Все материалы' },
  { id: 'hardware', label: 'Прототип' },
  { id: 'blueprint', label: 'Чертёж' },
  { id: 'concept', label: 'Концепты' },
  { id: 'identity', label: 'Айдентика iWA' },
];

export function ConceptGallery() {
  const [filter, setFilter] = useState<'all' | GalleryWork['category']>('all');
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const visible =
    filter === 'all' ? GALLERY_WORKS : GALLERY_WORKS.filter((g) => g.category === filter);

  useEffect(() => {
    if (lightboxIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIdx(null);
      if (e.key === 'ArrowRight') setLightboxIdx((i) => (i === null ? null : (i + 1) % visible.length));
      if (e.key === 'ArrowLeft')
        setLightboxIdx((i) => (i === null ? null : (i - 1 + visible.length) % visible.length));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIdx, visible.length]);

  const currentItem = lightboxIdx !== null ? visible[lightboxIdx] : null;

  return (
    <section id="gallery" className="relative z-10 py-16 sm:py-24 border-t border-white/10 bg-[#07080C]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-sky-400 mb-3">
              // DESIGN & PROTOTYPE ARCHIVE
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight">
              От первых концептов к iWA ONE PRO
            </h2>
            <p className="text-slate-300 mt-3 text-base">
              Визуальная вселенная проекта: фирменная геометрия триад, прототип металлического
              корпуса и эволюция айдентики.
            </p>
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap gap-2" role="group" aria-label="Фильтр галереи">
            {FILTERS.map((f) => {
              const active = filter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => {
                    setFilter(f.id);
                    setLightboxIdx(null);
                  }}
                  aria-pressed={active}
                  className={`min-h-[44px] px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                    active
                      ? 'bg-white text-[#050507] font-bold'
                      : 'bg-white/[0.04] border border-white/10 text-slate-300 hover:bg-white/[0.1]'
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {visible.map((work, idx) => (
            <button
              key={work.id}
              type="button"
              onClick={() => setLightboxIdx(idx)}
              className="group surface-card surface-card-hover rounded-2xl overflow-hidden text-left flex flex-col cursor-pointer"
            >
              <div className="relative w-full aspect-[4/5] bg-black overflow-hidden">
                <img
                  src={work.image}
                  alt={work.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent to-transparent opacity-70" />
                <span className="absolute top-3 right-3 w-10 h-10 rounded-full bg-black/70 border border-white/20 text-white flex items-center justify-center opacity-85 group-hover:opacity-100 group-hover:bg-white group-hover:text-black transition-all">
                  <Expand className="w-4 h-4" aria-hidden="true" />
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-sm sm:text-base font-bold text-white">
                    {work.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1.5 line-clamp-2">
                    {work.caption}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {currentItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={currentItem.title}
          className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxIdx(null)}
        >
          <div
            className="relative max-w-4xl w-full surface-card rounded-3xl p-4 sm:p-6 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLightboxIdx(null)}
              aria-label="Закрыть просмотр"
              className="absolute top-3 right-3 z-10 w-11 h-11 rounded-full bg-black/80 border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative w-full flex items-center justify-center max-h-[70vh] overflow-hidden rounded-2xl bg-black">
              <img
                src={currentItem.image}
                alt={currentItem.title}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>

            <div className="w-full flex items-center justify-between gap-4 mt-4 pt-4 border-t border-white/10">
              <div>
                <h3 className="font-display text-base sm:text-lg font-bold text-white">
                  {currentItem.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-0.5">{currentItem.caption}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() =>
                    setLightboxIdx((i) =>
                      i === null ? null : (i - 1 + visible.length) % visible.length,
                    )
                  }
                  aria-label="Предыдущее фото"
                  className="w-11 h-11 rounded-full border border-white/20 bg-white/[0.06] text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setLightboxIdx((i) => (i === null ? null : (i + 1) % visible.length))
                  }
                  aria-label="Следующее фото"
                  className="w-11 h-11 rounded-full border border-white/20 bg-white/[0.06] text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
