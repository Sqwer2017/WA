import { ArrowUpRight } from 'lucide-react';
import { IwaLogo } from './IwaLogo';
import { assetUrl } from '../data/robotData';

interface FooterProps {
  onOpenPreorder: () => void;
}

export function Footer({ onOpenPreorder }: FooterProps) {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#050507] pt-14 pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Final Call-To-Action Banner */}
        <div className="surface-card rounded-3xl p-7 sm:p-10 lg:p-12 mb-12 relative overflow-hidden flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <img
            src={assetUrl('art-hex-grid.webp')}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 w-full h-full object-cover opacity-[0.18] mix-blend-screen"
          />
          <div className="relative z-10 max-w-xl">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-sky-400 mb-2">
              // NOT JUST A PIECE OF IRON..
            </p>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white leading-tight">
              Готовы забрать своего Triangle Bot?
            </h2>
            <p className="text-slate-300 mt-3 text-sm sm:text-base">
              Оставьте бронь на первую партию iWA ONE PRO или DIY Core Kit — мы свяжемся,
              подтвердим комплектацию и отправим статус сборки.
            </p>
          </div>
          <div className="relative z-10 shrink-0 w-full lg:w-auto">
            <button
              type="button"
              onClick={onOpenPreorder}
              className="w-full lg:w-auto min-h-[54px] px-8 py-4 rounded-full bg-white text-[#050507] font-bold text-base hover:bg-sky-300 transition-colors inline-flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <span>Забронировать iWA ONE PRO</span>
              <ArrowUpRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10 text-xs sm:text-sm text-slate-400">
          <div className="flex items-center gap-3">
            <IwaLogo className="w-8 h-8" showTriad />
            <div>
              <span className="font-display font-bold text-white">iWA Robotics</span>
              <span className="mx-2 text-white/25">·</span>
              <span className="font-mono text-xs">ONE PRO / DIY Controller v1.0</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <a href="#features" className="hover:text-white transition-colors min-h-[44px] flex items-center">
              Инженерия
            </a>
            <a href="#blueprint" className="hover:text-white transition-colors min-h-[44px] flex items-center">
              Чертёж
            </a>
            <a href="#configurator" className="hover:text-white transition-colors min-h-[44px] flex items-center">
              Комплектации
            </a>
            <a href="#gallery" className="hover:text-white transition-colors min-h-[44px] flex items-center">
              Галерея
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
