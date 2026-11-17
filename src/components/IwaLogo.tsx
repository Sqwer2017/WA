import { assetUrl } from '../data/robotData';

interface IwaLogoProps {
  className?: string;
  ring?: boolean;
}

export function IwaLogo({ className = 'w-10 h-10', ring = true }: IwaLogoProps) {
  return (
    <span
      className={`relative inline-flex items-center justify-center rounded-full shrink-0 ${
        ring ? 'ring-1 ring-black/15 dark:ring-white/25 shadow-[0_4px_18px_rgba(0,0,0,0.35)]' : ''
      } ${className}`}
    >
      <img
        src={assetUrl('iwa-logo.webp')}
        alt="iWA Logo"
        className="w-full h-full object-contain rounded-full select-none"
      />
    </span>
  );
}
