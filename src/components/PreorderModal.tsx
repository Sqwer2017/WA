import { useState, useEffect, type FormEvent } from 'react';
import { X, CheckCircle2, Copy, Check } from 'lucide-react';
import {
  ROBOT_EDITIONS,
  CHASSIS_FINISHES,
  ADDON_MODULES,
  type RobotEdition,
} from '../data/robotData';

interface PreorderModalProps {
  open: boolean;
  onClose: () => void;
  selectedEdition: RobotEdition['id'];
  selectedFinish: string;
  selectedAddons: string[];
}

export function PreorderModal({
  open,
  onClose,
  selectedEdition,
  selectedFinish,
  selectedAddons,
}: PreorderModalProps) {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState<{ name?: string; contact?: string }>({});
  const [submittedCode, setSubmittedCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const edition = ROBOT_EDITIONS.find((e) => e.id === selectedEdition) ?? ROBOT_EDITIONS[1];
  const finish = CHASSIS_FINISHES.find((f) => f.id === selectedFinish) ?? CHASSIS_FINISHES[0];
  const addons = ADDON_MODULES.filter((m) => selectedAddons.includes(m.id));
  const totalRub = edition.priceRub + addons.reduce((s, a) => s + a.priceRub, 0);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const nextErrors: { name?: string; contact?: string } = {};
    if (name.trim().length < 2) nextErrors.name = 'Укажите ваше имя (минимум 2 символа).';
    if (contact.trim().length < 3)
      nextErrors.contact = 'Укажите Telegram (@username), телефон или email.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const code = `IWA-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedCode(code);
  };

  const summaryText = [
    `Заявка на предзаказ: ${submittedCode ?? ''}`,
    `Модель: ${edition.name}`,
    `Отделка: ${finish.name}`,
    `Доп. модули: ${addons.length ? addons.map((a) => a.name).join(', ') : 'Нет'}`,
    `Итого: ${totalRub.toLocaleString('ru-RU')} ₽`,
    `Имя: ${name.trim()}`,
    `Контакт: ${contact.trim()}`,
    comment.trim() ? `Комментарий: ${comment.trim()}` : null,
  ]
    .filter(Boolean)
    .join('\n');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback ignored if clipboard unavailable
    }
  };

  const handleResetAndClose = () => {
    setSubmittedCode(null);
    setErrors({});
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="preorder-title"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
      onClick={handleResetAndClose}
    >
      <div
        className="relative w-full max-w-lg surface-card rounded-3xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleResetAndClose}
          aria-label="Закрыть окно предзаказа"
          className="absolute top-4 right-4 w-11 h-11 rounded-full border border-white/15 bg-white/[0.04] text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submittedCode ? (
          <div className="space-y-5 pt-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-400/40 text-emerald-300 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
            </div>

            <div>
              <p className="font-mono text-xs text-sky-400 uppercase tracking-[0.18em]">
                БРОНЬ СФОРМИРОВАНА · {submittedCode}
              </p>
              <h2 id="preorder-title" className="font-display text-2xl font-bold text-white mt-1">
                Конфигурация сохранена!
              </h2>
              <p className="text-sm text-slate-300 mt-2">
                Скопируйте готовую карточку заявки ниже и отправьте её создателю проекта для
                подтверждения сборки и доставки.
              </p>
            </div>

            <pre className="p-4 rounded-2xl bg-black/60 border border-white/10 font-mono text-xs text-slate-200 whitespace-pre-wrap leading-relaxed">
              {summaryText}
            </pre>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleCopy}
                className="flex-1 min-h-[48px] px-5 py-3 rounded-full bg-white text-[#050507] font-bold text-sm hover:bg-sky-300 transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Скопировано!' : 'Скопировать заявку'}</span>
              </button>
              <button
                type="button"
                onClick={handleResetAndClose}
                className="min-h-[48px] px-5 py-3 rounded-full border border-white/20 text-white font-semibold text-sm hover:bg-white/10 transition-colors cursor-pointer"
              >
                Готово
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div className="pr-10">
              <p className="font-mono text-xs text-sky-400 uppercase tracking-[0.18em]">
                ПРЕДЗАКАЗ · iWA ONE PRO
              </p>
              <h2 id="preorder-title" className="font-display text-2xl font-bold text-white mt-1">
                Оформление брони
              </h2>
            </div>

            {/* Selected summary box */}
            <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-1.5 text-sm">
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold text-white">{edition.name}</span>
                <span className="font-mono font-bold text-sky-300">
                  {totalRub.toLocaleString('ru-RU')} ₽
                </span>
              </div>
              <div className="text-xs text-slate-400">
                Корпус: {finish.name}
                {addons.length > 0 ? ` · + ${addons.map((a) => a.name).join(', ')}` : ''}
              </div>
            </div>

            <div>
              <label htmlFor="preorder-name" className="block text-sm font-medium text-slate-200 mb-1.5">
                Ваше имя *
              </label>
              <input
                id="preorder-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Например, Алексей"
                className="w-full min-h-[46px] px-4 rounded-xl bg-black/60 border border-white/15 text-white placeholder:text-slate-500 text-sm focus:border-sky-400 focus:outline-none"
              />
              {errors.name && <p className="text-xs text-rose-400 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="preorder-contact" className="block text-sm font-medium text-slate-200 mb-1.5">
                Telegram, телефон или Email *
              </label>
              <input
                id="preorder-contact"
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="@username или +7 999 000-00-00"
                className="w-full min-h-[46px] px-4 rounded-xl bg-black/60 border border-white/15 text-white placeholder:text-slate-500 text-sm focus:border-sky-400 focus:outline-none"
              />
              {errors.contact && <p className="text-xs text-rose-400 mt-1">{errors.contact}</p>}
            </div>

            <div>
              <label htmlFor="preorder-comment" className="block text-sm font-medium text-slate-200 mb-1.5">
                Пожелания (гравировка, прошивка, доставка)
              </label>
              <textarea
                id="preorder-comment"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Например: нужна кастомная гравировка на корпусе..."
                className="w-full p-3.5 rounded-xl bg-black/60 border border-white/15 text-white placeholder:text-slate-500 text-sm focus:border-sky-400 focus:outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full min-h-[52px] px-6 py-3.5 rounded-full bg-white text-[#050507] font-bold text-base hover:bg-sky-300 transition-colors cursor-pointer"
            >
              Сформировать бронь
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
