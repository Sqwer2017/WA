import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Cpu } from 'lucide-react';
import { IwaLogo } from './IwaLogo';

interface NavbarProps {
  onOpenPreorder: () => void;
}

const NAV_LINKS = [
  { href: '#features', label: 'Инженерия' },
  { href: '#blueprint', label: 'Чертёж v1.0' },
  { href: '#configurator', label: 'Комплектации' },
  { href: '#gallery', label: 'Галерея' },
  { href: '#faq', label: 'FAQ' },
];

export function Navbar({ onOpenPreorder }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050507]/85 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.6)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-20 items-center justify-between gap-4">
          <a
            href="#top"
            className="flex items-center gap-3 min-h-[44px] pr-2 rounded-lg focus-visible:outline-sky-400"
            aria-label="iWA ONE PRO — Наверх"
          >
            <IwaLogo className="w-9 h-9 sm:w-10 sm:h-10 shrink-0" />
            <div className="flex flex-col leading-none">
              <span className="font-display text-sm sm:text-base font-bold tracking-wider text-white">
                iWA <span className="text-sky-400">ONE</span>
              </span>
              <span className="font-mono text-[10px] tracking-[0.22em] text-slate-400 uppercase mt-1">
                TRIANGLE BOT
              </span>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Основная навигация">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3.5 py-2.5 min-h-[44px] flex items-center text-sm font-medium text-slate-300 hover:text-white rounded-lg hover:bg-white/[0.05] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] font-mono text-[11px] text-slate-300">
              <Cpu className="w-3.5 h-3.5 text-sky-400" aria-hidden="true" />
              <span>PCB v1.0</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
            </div>

            <button
              type="button"
              onClick={onOpenPreorder}
              className="hidden sm:inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 rounded-full bg-white text-[#050507] font-semibold text-sm hover:bg-sky-300 transition-colors cursor-pointer"
            >
              <span>Предзаказ</span>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => setDrawerOpen((v) => !v)}
              className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-xl border border-white/15 bg-white/[0.04] text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label={drawerOpen ? 'Закрыть меню' : 'Открыть меню'}
              aria-expanded={drawerOpen}
            >
              {drawerOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {drawerOpen && (
        <div className="lg:hidden fixed inset-0 top-16 z-30 bg-[#050507]/96 backdrop-blur-2xl border-t border-white/10 px-4 py-6 flex flex-col justify-between">
          <nav className="flex flex-col gap-2" aria-label="Мобильная навигация">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setDrawerOpen(false)}
                className="flex items-center justify-between min-h-[52px] px-4 rounded-xl border border-white/10 bg-white/[0.03] text-base font-medium text-white active:bg-white/10"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-4 h-4 text-slate-400" aria-hidden="true" />
              </a>
            ))}
          </nav>

          <div className="pt-6 border-t border-white/10 space-y-3">
            <button
              type="button"
              onClick={() => {
                setDrawerOpen(false);
                onOpenPreorder();
              }}
              className="w-full min-h-[52px] rounded-full bg-white text-[#050507] font-bold text-base flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Оформить предзаказ</span>
              <ArrowUpRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
