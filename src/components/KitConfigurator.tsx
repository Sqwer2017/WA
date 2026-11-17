import { Check, Plus, Sparkles, ArrowRight } from 'lucide-react';
import {
  ROBOT_EDITIONS,
  CHASSIS_FINISHES,
  ADDON_MODULES,
  CURRENCIES,
  type RobotEdition,
  type CurrencyCode,
} from '../data/robotData';
import { useApp } from '../context/AppContext';

interface KitConfiguratorProps {
  selectedEdition: RobotEdition['id'];
  onSelectEdition: (id: RobotEdition['id']) => void;
  selectedFinish: string;
  onSelectFinish: (id: string) => void;
  selectedAddons: string[];
  onToggleAddon: (id: string) => void;
  onProceedOrder: () => void;
}

export function KitConfigurator({
  selectedEdition,
  onSelectEdition,
  selectedFinish,
  onSelectFinish,
  selectedAddons,
  onToggleAddon,
  onProceedOrder,
}: KitConfiguratorProps) {
  const { currency, setCurrency, formatPrice } = useApp();

  const edition = ROBOT_EDITIONS.find((e) => e.id === selectedEdition) ?? ROBOT_EDITIONS[1];
  const addonsSumUsd = ADDON_MODULES.filter((m) => selectedAddons.includes(m.id)).reduce(
    (sum, m) => sum + m.priceUsd,
    0,
  );
  const totalUsd = edition.priceUsd + addonsSumUsd;

  return (
    <section id="configurator" className="relative z-10 py-16 sm:py-24 border-t section-alt">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.22em] theme-accent font-semibold mb-3">
              // ВЫБОР КОМПЛЕКТАЦИИ
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold theme-text-primary leading-tight">
              Соберите свой iWA ONE PRO
            </h2>
            <p className="theme-text-secondary mt-3 text-base sm:text-lg">
              От набора DIY для самостоятельной сборки по чертежу v1.0 до полностью готового робота в
              металле с открытым SDK.
            </p>
          </div>

          {/* Inline Currency Pill Bar */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="font-mono text-xs theme-text-muted">Валюта:</span>
            <div
              className="flex items-center p-1 rounded-full border theme-border theme-subtle"
              role="group"
              aria-label="Переключатель валюты в конфигураторе"
            >
              {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => {
                const active = currency === code;
                return (
                  <button
                    key={code}
                    type="button"
                    onClick={() => setCurrency(code)}
                    aria-pressed={active}
                    className={`min-h-[38px] px-3.5 rounded-full font-mono text-xs font-bold transition-colors cursor-pointer ${
                      active
                        ? 'bg-sky-500 text-white shadow-sm'
                        : 'theme-text-secondary hover:theme-text-primary'
                    }`}
                  >
                    {CURRENCIES[code].label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Editions Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
          {ROBOT_EDITIONS.map((item) => {
            const active = item.id === selectedEdition;
            return (
              <div
                key={item.id}
                role="button"
                tabIndex={0}
                onClick={() => onSelectEdition(item.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectEdition(item.id);
                  }
                }}
                aria-pressed={active}
                className={`surface-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between cursor-pointer transition-all duration-300 ${
                  active
                    ? 'border-sky-500 ring-2 ring-sky-500/30 shadow-[0_24px_60px_-20px_rgba(14,165,233,0.28)]'
                    : 'hover:border-sky-400/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span
                      className={`font-mono text-[11px] uppercase tracking-[0.16em] px-2.5 py-1 rounded-full border ${
                        item.featured
                          ? 'bg-sky-500/15 theme-accent border-sky-500/40 font-semibold'
                          : 'theme-subtle theme-text-secondary theme-border'
                      }`}
                    >
                      {item.badge}
                    </span>
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        active ? 'border-sky-500 bg-sky-500 text-white' : 'theme-border'
                      }`}
                    >
                      {active && <Check className="w-3.5 h-3.5 stroke-[3]" aria-hidden="true" />}
                    </div>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold theme-text-primary">
                    {item.name}
                  </h3>
                  <p className="text-sm theme-text-secondary mt-1.5 min-h-[40px]">{item.tagline}</p>

                  <div className="mt-5 pb-5 border-b theme-border">
                    <div className="font-display text-3xl font-extrabold theme-text-primary">
                      {formatPrice(item.priceUsd)}
                    </div>
                    <div className="font-mono text-xs theme-text-muted mt-1">{item.delivery}</div>
                  </div>

                  <ul className="mt-5 space-y-2.5">
                    {item.includes.map((inc) => (
                      <li key={inc} className="flex items-start gap-2.5 text-sm theme-text-primary">
                        <Check
                          className="w-4 h-4 text-sky-500 dark:text-sky-400 shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t theme-border">
                  <span
                    className={`w-full min-h-[44px] rounded-xl font-semibold text-sm flex items-center justify-center transition-colors ${
                      active
                        ? 'btn-primary-theme'
                        : 'theme-subtle theme-text-primary border theme-border'
                    }`}
                  >
                    {active ? 'Выбрано в конфигураторе' : 'Выбрать комплектацию'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Finish + Addons + Live Total Bar */}
        <div className="surface-card rounded-3xl p-6 sm:p-8 grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4 space-y-3">
            <div className="font-mono text-xs uppercase tracking-[0.18em] theme-text-muted">
              1. Отделка корпуса (меняет цвет 3D)
            </div>
            <div className="grid gap-2">
              {CHASSIS_FINISHES.map((f) => {
                const active = f.id === selectedFinish;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => onSelectFinish(f.id)}
                    aria-pressed={active}
                    className={`min-h-[48px] px-3.5 py-2.5 rounded-xl border flex items-center gap-3 text-left transition-colors cursor-pointer ${
                      active
                        ? 'border-sky-500 bg-sky-500/10 theme-text-primary'
                        : 'theme-border theme-subtle theme-text-secondary hover:border-sky-400/40'
                    }`}
                  >
                    <span
                      className="w-6 h-6 rounded-full border border-white/30 shrink-0 shadow-inner"
                      style={{ backgroundColor: f.hex }}
                      aria-hidden="true"
                    />
                    <div className="min-w-0">
                      <div className="text-sm font-semibold theme-text-primary">{f.name}</div>
                      <div className="text-xs theme-text-muted truncate">{f.accent}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-3">
            <div className="font-mono text-xs uppercase tracking-[0.18em] theme-text-muted">
              2. Дополнительные модули
            </div>
            <div className="grid gap-2">
              {ADDON_MODULES.map((mod) => {
                const active = selectedAddons.includes(mod.id);
                return (
                  <button
                    key={mod.id}
                    type="button"
                    onClick={() => onToggleAddon(mod.id)}
                    aria-pressed={active}
                    className={`min-h-[48px] px-3.5 py-2.5 rounded-xl border flex items-center justify-between gap-3 text-left transition-colors cursor-pointer ${
                      active
                        ? 'border-sky-500 bg-sky-500/10 theme-text-primary'
                        : 'theme-border theme-subtle theme-text-secondary hover:border-sky-400/40'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 border ${
                          active
                            ? 'bg-sky-500 border-sky-500 text-white'
                            : 'theme-border theme-text-muted'
                        }`}
                      >
                        {active ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      </span>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold theme-text-primary truncate">
                          {mod.name}
                        </div>
                        <div className="text-xs theme-text-muted">{mod.note}</div>
                      </div>
                    </div>
                    <span className="font-mono text-xs font-semibold theme-accent shrink-0">
                      +{formatPrice(mod.priceUsd)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-3 flex flex-col justify-between p-5 rounded-2xl theme-subtle border theme-border space-y-4">
            <div>
              <div className="flex items-center gap-1.5 font-mono text-xs theme-accent font-semibold">
                <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                <span>ИТОГО ПО СБОРКЕ</span>
              </div>
              <div className="font-display text-3xl font-extrabold theme-text-primary mt-1">
                {formatPrice(totalUsd)}
              </div>
              <div className="text-xs theme-text-muted mt-1">
                {edition.name} · {selectedAddons.length} доп. модулей
              </div>
            </div>

            <button
              type="button"
              onClick={onProceedOrder}
              className="w-full min-h-[52px] px-5 py-3 rounded-full btn-primary-theme font-bold text-sm inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Оформить бронь</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
