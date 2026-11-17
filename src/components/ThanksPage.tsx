import { useState } from 'react';
import { CheckCircle2, Copy, Check, ArrowLeft, Compass } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { IwaLogo } from './IwaLogo';

export function ThanksPage() {
  const { lastOrder, navigate } = useApp();
  const [copied, setCopied] = useState(false);

  const summaryText = lastOrder
    ? [
        `Заявка на предзаказ: ${lastOrder.code}`,
        `Модель: ${lastOrder.editionName}`,
        `Отделка корпуса: ${lastOrder.finishName}`,
        `Доп. модули: ${lastOrder.addons.length ? lastOrder.addons.join(', ') : 'Без доп. модулей'}`,
        `Итого (${lastOrder.currency}): ${lastOrder.totalFormatted}`,
        `Имя: ${lastOrder.customerName}`,
        `Контакт: ${lastOrder.contact}`,
        lastOrder.comment ? `Комментарий: ${lastOrder.comment}` : null,
      ]
        .filter(Boolean)
        .join('\n')
    : 'Демо-просмотр страницы благодарности iWA ONE PRO.';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // ignore clipboard errors
    }
  };

  return (
    <main className="relative z-10 min-h-[calc(100vh-80px)] pt-28 pb-20 px-4 sm:px-6 flex items-center justify-center">
      <div className="w-full max-w-2xl surface-card rounded-3xl p-6 sm:p-10 relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-emerald-500/10 blur-[100px]"
        />

        <div className="relative z-10 space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
            </div>
            <IwaLogo className="w-12 h-12" />
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-emerald-500 dark:text-emerald-400 font-semibold">
              // RESERVATION CONFIRMED · {lastOrder?.code ?? 'IWA-2026'}
            </p>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold theme-text-primary mt-2">
              Спасибо за заявку!
            </h1>
            <p className="theme-text-secondary mt-3 text-sm sm:text-base leading-relaxed">
              Ваш предзаказ на <strong className="theme-text-primary">iWA ONE PRO</strong> успешно
              сформирован. Скопируйте карточку брони ниже и отправьте её создателю проекта, чтобы
              зафиксировать место в очереди сборки.
            </p>
          </div>

          {lastOrder && (
            <div className="grid sm:grid-cols-3 gap-3 p-4 rounded-2xl theme-subtle border theme-border text-xs font-mono">
              <div>
                <div className="theme-text-muted">КОД БРОНИ</div>
                <div className="theme-text-primary font-bold mt-0.5">{lastOrder.code}</div>
              </div>
              <div>
                <div className="theme-text-muted">МОДЕЛЬ</div>
                <div className="theme-text-primary font-bold mt-0.5">{lastOrder.editionName}</div>
              </div>
              <div>
                <div className="theme-text-muted">СУММА ({lastOrder.currency})</div>
                <div className="theme-accent font-bold mt-0.5">{lastOrder.totalFormatted}</div>
              </div>
            </div>
          )}

          <pre className="p-4 sm:p-5 rounded-2xl theme-subtle border theme-border font-mono text-xs theme-text-primary whitespace-pre-wrap leading-relaxed">
            {summaryText}
          </pre>

          <div className="grid sm:grid-cols-3 gap-3 text-xs theme-text-secondary pt-2">
            <div className="p-3.5 rounded-xl border theme-border theme-subtle">
              <div className="font-mono font-bold theme-accent mb-1">01 · ПРОВЕРКА</div>
              Подтверждаем наличие корпуса и сервоприводов.
            </div>
            <div className="p-3.5 rounded-xl border theme-border theme-subtle">
              <div className="font-mono font-bold theme-accent mb-1">02 · СБОРКА</div>
              Калибруем OLED-экран, оптику и LiPo 2500mAh.
            </div>
            <div className="p-3.5 rounded-xl border theme-border theme-subtle">
              <div className="font-mono font-bold theme-accent mb-1">03 · ОТПРАВКА</div>
              Высылаем трек-номер и базовую прошивку SDK.
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={handleCopy}
              className="flex-1 min-h-[50px] px-6 py-3 rounded-full btn-primary-theme font-bold text-sm inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Скопировано в буфер!' : 'Скопировать заявку'}</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('home')}
              className="min-h-[50px] px-6 py-3 rounded-full border theme-border theme-subtle hover:border-sky-400 font-semibold text-sm theme-text-primary inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>На главную</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('home', 'blueprint')}
              className="min-h-[50px] px-5 py-3 rounded-full border theme-border theme-subtle hover:border-sky-400 font-semibold text-sm theme-text-primary inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <Compass className="w-4 h-4 text-sky-500" aria-hidden="true" />
              <span>Чертёж</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
