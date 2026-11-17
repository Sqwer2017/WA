import { useState, useEffect, type FormEvent } from 'react';
import { X } from 'lucide-react';
import {
  ROBOT_EDITIONS,
  CHASSIS_FINISHES,
  ADDON_MODULES,
  type RobotEdition,
} from '../data/robotData';
import { useApp } from '../context/AppContext';

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
  const { currency, formatPrice, setLastOrder, navigate } = useApp();
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState<{ name?: string; contact?: string }>({});

  const edition = ROBOT_EDITIONS.find((e) => e.id === selectedEdition) ?? ROBOT_EDITIONS[1];
  const finish = CHASSIS_FINISHES.find((f) => f.id === selectedFinish) ?? CHASSIS_FINISHES[0];
  const addons = ADDON_MODULES.filter((m) => selectedAddons.includes(m.id));
  const totalUsd = edition.priceUsd + addons.reduce((s, a) => s + a.priceUsd, 0);
  const totalFormatted = formatPrice(totalUsd);

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
    setLastOrder({
      code,
      editionName: edition.name,
      finishName: finish.name,
      addons: addons.map((a) => a.name),
      totalFormatted,
      currency,
      customerName: name.trim(),
      contact: contact.trim(),
      comment: comment.trim(),
      createdAt: new Date().toLocaleString('ru-RU'),
    });

    setName('');
    setContact('');
    setComment('');
    setErrors({});
    onClose();
    navigate('thanks');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="preorder-title"
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg surface-card rounded-3xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Закрыть окно предзаказа"
          className="absolute top-4 right-4 w-11 h-11 rounded-full border theme-border theme-subtle theme-text-primary flex items-center justify-center hover:border-sky-400 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div className="pr-10">
            <p className="font-mono text-xs theme-accent font-semibold uppercase tracking-[0.18em]">
              ПРЕДЗАКАЗ · iWA ONE PRO ({currency})
            </p>
            <h2 id="preorder-title" className="font-display text-2xl font-bold theme-text-primary mt-1">
              Оформление брони
            </h2>
          </div>

          {/* Selected summary box */}
          <div className="p-4 rounded-2xl theme-subtle border theme-border space-y-1.5 text-sm">
            <div className="flex items-center justify-between gap-2">
              <span className="font-semibold theme-text-primary">{edition.name}</span>
              <span className="font-mono font-bold theme-accent">{totalFormatted}</span>
            </div>
            <div className="text-xs theme-text-muted">
              Корпус: {finish.name}
              {addons.length > 0 ? ` · + ${addons.map((a) => a.name).join(', ')}` : ''}
            </div>
          </div>

          <div>
            <label htmlFor="preorder-name" className="block text-sm font-medium theme-text-primary mb-1.5">
              Ваше имя *
            </label>
            <input
              id="preorder-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Например, Алексей"
              className="w-full min-h-[46px] px-4 rounded-xl theme-input text-sm focus:border-sky-400 focus:outline-none"
            />
            {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="preorder-contact" className="block text-sm font-medium theme-text-primary mb-1.5">
              Telegram, телефон или Email *
            </label>
            <input
              id="preorder-contact"
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="@username или +1 / +7 ..."
              className="w-full min-h-[46px] px-4 rounded-xl theme-input text-sm focus:border-sky-400 focus:outline-none"
            />
            {errors.contact && <p className="text-xs text-rose-500 mt-1">{errors.contact}</p>}
          </div>

          <div>
            <label htmlFor="preorder-comment" className="block text-sm font-medium theme-text-primary mb-1.5">
              Пожелания (гравировка, прошивка, доставка)
            </label>
            <textarea
              id="preorder-comment"
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Например: нужна кастомная гравировка на корпусе..."
              className="w-full p-3.5 rounded-xl theme-input text-sm focus:border-sky-400 focus:outline-none resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full min-h-[52px] px-6 py-3.5 rounded-full btn-primary-theme font-bold text-base cursor-pointer"
          >
            Подтвердить предзаказ
          </button>
        </form>
      </div>
    </div>
  );
}
