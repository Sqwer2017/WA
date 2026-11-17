import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import {
  formatMoney,
  type CurrencyCode,
  type ThemeMode,
  type OrderRecord,
} from '../data/robotData';

export type AppRoute = 'home' | 'thanks' | '404';

interface AppContextValue {
  theme: ThemeMode;
  toggleTheme: () => void;
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  formatPrice: (usd: number) => string;
  route: AppRoute;
  navigate: (next: AppRoute, sectionId?: string) => void;
  lastOrder: OrderRecord | null;
  setLastOrder: (order: OrderRecord) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

function resolveRouteFromLocation(): AppRoute {
  const hash = window.location.hash.replace(/^#/, '');
  if (hash.startsWith('/thanks')) return 'thanks';
  if (hash.startsWith('/404')) return '404';
  if (hash === '' || hash === '/' || hash.startsWith('/#')) return 'home';

  // If user typed unknown hash path like #/unknown
  if (hash.startsWith('/')) return '404';
  return 'home';
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem('iwa-theme');
      return saved === 'light' ? 'light' : 'dark';
    } catch {
      return 'dark';
    }
  });

  const [currency, setCurrencyState] = useState<CurrencyCode>(() => {
    try {
      const saved = localStorage.getItem('iwa-currency') as CurrencyCode | null;
      return saved === 'RUB' || saved === 'EUR' || saved === 'USD' ? saved : 'USD';
    } catch {
      return 'USD';
    }
  });

  const [route, setRoute] = useState<AppRoute>(() => resolveRouteFromLocation());
  const [lastOrder, setLastOrder] = useState<OrderRecord | null>(() => {
    try {
      const raw = sessionStorage.getItem('iwa-last-order');
      return raw ? (JSON.parse(raw) as OrderRecord) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'light');
    root.classList.add(theme);
    try {
      localStorage.setItem('iwa-theme', theme);
    } catch {
      // ignore storage failure
    }
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', theme === 'dark' ? '#040508' : '#edf1f7');
    }
  }, [theme]);

  useEffect(() => {
    const onHashChange = () => setRoute(resolveRouteFromLocation());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  const setCurrency = (c: CurrencyCode) => {
    setCurrencyState(c);
    try {
      localStorage.setItem('iwa-currency', c);
    } catch {
      // ignore
    }
  };

  const formatPrice = (usd: number) => formatMoney(usd, currency);

  const navigate = (next: AppRoute, sectionId?: string) => {
    setRoute(next);
    if (next === 'home') {
      window.history.replaceState(null, '', `${window.location.pathname}#/`);
      if (sectionId) {
        setTimeout(() => {
          document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        }, 60);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (next === 'thanks') {
      window.location.hash = '/thanks';
      window.scrollTo({ top: 0, behavior: 'auto' });
    } else {
      window.location.hash = '/404';
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  };

  const saveOrder = (order: OrderRecord) => {
    setLastOrder(order);
    try {
      sessionStorage.setItem('iwa-last-order', JSON.stringify(order));
    } catch {
      // ignore
    }
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        currency,
        setCurrency,
        formatPrice,
        route,
        navigate,
        lastOrder,
        setLastOrder: saveOrder,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
