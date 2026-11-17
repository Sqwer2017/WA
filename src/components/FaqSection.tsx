import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '../data/robotData';

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="relative z-10 py-16 sm:py-24 border-t section-alt">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12">
          <p className="font-mono text-xs uppercase tracking-[0.22em] theme-accent font-semibold mb-3">
            // ВОПРОСЫ И ОТВЕТЫ
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold theme-text-primary">
            Частые вопросы о iWA ONE PRO
          </h2>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={item.q} className="surface-card rounded-2xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full min-h-[60px] px-5 sm:px-6 py-4 flex items-center justify-between gap-4 text-left cursor-pointer hover:bg-black/[0.03] dark:hover:bg-white/[0.03] transition-colors"
                >
                  <span className="font-display text-sm sm:text-base font-semibold theme-text-primary">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-sky-500 dark:text-sky-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-sm sm:text-base theme-text-secondary leading-relaxed border-t theme-border">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
