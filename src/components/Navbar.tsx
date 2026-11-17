import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sun, Moon } from 'lucide-react';
import { IwaLogo } from './IwaLogo';
import { useApp } from '../context/AppContext';
import type { CurrencyCode } from '../data/robotData';

interface NavbarProps {
  onOpenPreorder: () => void;
}

const NAV_LINKS = [
  { id: 'features', label: 'Инженерия' },
  { id: 'blueprint', label: 'Чертёж v1.0' },
  { id: 'cases', label: 'Кейсы' },
  { id: 'configurator', label: 'Комплектации' },
  { id: 'gallery', label: 'Галерея' },
];

const CURRENCY_LIST: CurrencyCode[] = ['USD', 'UAH', 'EUR'];

export function Navbar({ onOpenPreorder }: NavbarProps) {
  const { theme, toggleTheme, currency, setCurrency, route, navigate } = useApp();
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

  const handleNavClick = (sectionId: string) => {
    setDrawerOpen(false);
    if (route !== 'home') {
      navigate('home', sectionId);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-xl border-b theme-border shadow-[0_12px_36px_rgba(0,0,0,0.22)]'
          : 'bg-transparent border-b border-transparent'
      }`}
      style={scrolled ? { backgroundColor: 'var(--bg-glass)' } : undefined}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-20 items-center justify-between gap-3">
          <a
            href="#/"
            onClick={(e) => {
              e.preventDefault();
              navigate('home');
            }}
            className="flex items-center gap-3 min-h-[44px] pr-2 rounded-lg"
            aria-label="iWA ONE PRO — На главную"
          >
            <IwaLogo className="w-9 h-9 sm:w-10 sm:h-10" />
            <div className="flex flex-col leading-none">
              <span className="font-display text-sm sm:text-base font-bold tracking-wider theme-text-primary">
                iWA <span className="text-sky-500 dark:text-sky-400">ONE</span>
              </span>
              <span className="font-mono text-[10px] tracking-[0.22em] theme-text-muted uppercase mt-1">
                TRIANGLE BOT
              </span>
            </div>
          </a>

          <nav className="hidden xl:flex items-center gap-1" aria-label="Основная навигация">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => handleNavClick(link.id)}
                className="px-3.5 py-2.5 min-h-[44px] flex items-center text-sm font-medium theme-text-secondary hover:text-sky-500 dark:hover:text-white rounded-lg hover:bg-black/5 dark:hover:bg-white/[0.06] transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Currency Switcher (desktop/tablet) */}
            <div
              className="hidden md:flex items-center gap-1 p-1 rounded-full border theme-border theme-subtle"
              role="group"
              aria-label="Выбор валюты"
            >
              {CURRENCY_LIST.map((code) => {
                const active = currency === code;
                return (
                  <button
                    key={code}
                    type="button"
                    onClick={() => setCurrency(code)}
                    aria-pressed={active}
                    className={`w-9 h-9 flex items-center justify-center rounded-full font-mono text-sm font-bold leading-none transition-all cursor-pointer ${
                      active
                        ? 'bg-sky-500 text-white shadow-[0_0_16px_rgba(14,165,233,0.45)]'
                        : 'theme-text-secondary hover:theme-text-primary hover:bg-white/5'
                    }`}
                  >
                    {code === 'USD' ? '$' : code === 'UAH' ? '₴' : '€'}
                  </button>
                );
              })}
            </div>

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему'}
              className="inline-flex items-center justify-center w-11 h-11 rounded-full border theme-border theme-subtle theme-text-primary hover:border-sky-400 transition-colors cursor-pointer"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-300" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            <button
              type="button"
              onClick={onOpenPreorder}
              className="hidden sm:inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 rounded-full btn-primary-theme font-semibold text-sm cursor-pointer"
            >
              <span>Предзаказ</span>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => setDrawerOpen((v) => !v)}
              className="xl:hidden inline-flex items-center justify-center w-11 h-11 rounded-xl border theme-border theme-subtle theme-text-primary cursor-pointer"
              aria-label={drawerOpen ? 'Закрыть меню' : 'Открыть меню'}
              aria-expanded={drawerOpen}
            >
              {drawerOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile / Tablet Drawer */}
      {drawerOpen && (
        <div
          className="xl:hidden fixed inset-x-0 top-16 h-[calc(100dvh-4rem)] z-50 overflow-y-auto border-t theme-border px-4 py-6 flex flex-col justify-between shadow-2xl"
          style={{ backgroundColor: 'var(--bg-page)' }}
        >
          <div className="space-y-4">
            <nav className="flex flex-col gap-2" aria-label="Мобильная навигация">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => handleNavClick(link.id)}
                  className="flex items-center justify-between min-h-[50px] px-4 rounded-xl border theme-border theme-subtle text-base font-medium theme-text-primary cursor-pointer"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-4 h-4 theme-text-muted" aria-hidden="true" />
                </button>
              ))}
            </nav>

            {/* Currency selector inside mobile drawer */}
            <div className="p-4 rounded-xl border theme-border theme-subtle flex items-center justify-between">
              <span className="text-sm font-medium theme-text-secondary">Валюта цен:</span>
              <div className="flex gap-1.5" role="group" aria-label="Валюта на мобильном">
                {CURRENCY_LIST.map((code) => {
                  const active = currency === code;
                  return (
                    <button
                      key={code}
                      type="button"
                      onClick={() => setCurrency(code)}
                      className={`min-h-[40px] px-3 rounded-lg font-mono text-xs font-bold cursor-pointer ${
                        active
                          ? 'bg-sky-500 text-white'
                          : 'border theme-border theme-text-primary'
                      }`}
                    >
                      {code}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="pt-6 border-t theme-border">
            <button
              type="button"
              onClick={() => {
                setDrawerOpen(false);
                onOpenPreorder();
              }}
              className="w-full min-h-[52px] rounded-full btn-primary-theme font-bold text-base flex items-center justify-center gap-2 cursor-pointer"
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
