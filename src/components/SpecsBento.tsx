import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cpu, Camera, BatteryCharging, Cog, ShieldCheck, Code2 } from 'lucide-react';
import { assetUrl } from '../data/robotData';

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    icon: ShieldCheck,
    tag: 'CHASSIS',
    title: 'Шлифованный металл 10.2×10.2 см',
    text: 'Жёсткая триангулярная компоновка с безопасными зазорами 1.8 см и боковыми монтажными пластинами для кастомного обвеса.',
    span: 'lg:col-span-2',
    image: assetUrl('art-shards.webp'),
  },
  {
    icon: Camera,
    tag: 'VISION',
    title: 'Оптический сенсор + OLED',
    text: 'Встроенная камера распознаёт движение и ориентиры, а пиксельный дисплей транслирует живую реакцию робота.',
    span: 'lg:col-span-1',
  },
  {
    icon: Cog,
    tag: 'KINEMATICS',
    title: 'Двойной сервопривод',
    text: 'Спаренные микросервоприводы Acebot и TowerPro с базой 2.8 см обеспечивают плавный наклон и точное позиционирование.',
    span: 'lg:col-span-1',
  },
  {
    icon: BatteryCharging,
    tag: 'POWER',
    title: 'LiPo CityTree 2500 mAh',
    text: 'Силовой отсек 5.5×4.8 см под элемент 103450 (3.7V) даёт до 6 часов активных движений без розетки.',
    span: 'lg:col-span-1',
  },
  {
    icon: Cpu,
    tag: 'PCB v1.0',
    title: 'Собственный контроллер',
    text: 'Трапециевидная плата DIY Robot Controller v1.0 объединяет питание, драйверы и шины расширения на одном модуле.',
    span: 'lg:col-span-1',
  },
  {
    icon: Code2,
    tag: 'OPEN SDK',
    title: 'Программируемый характер',
    text: 'Не просто «кусок железа» — открытый код позволяет задавать собственные сценарии поведения, звуки и мимику.',
    span: 'lg:col-span-3',
    image: assetUrl('art-tri-mesh.webp'),
  },
];

export function SpecsBento() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !ref.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.bento-card', {
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          once: true,
        },
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section id="features" ref={ref} className="relative z-10 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10 sm:mb-14">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-sky-400 mb-3">
            // АРХИТЕКТУРА ONE PRO
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight">
            Инженерия внутри компактного монолита
          </h2>
          <p className="text-slate-300 mt-3 text-base sm:text-lg">
            Каждый миллиметр корпуса спроектирован вокруг реальной компоновки компонентов v1.0 — без
            пустого места и случайных деталей.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {FEATURES.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.tag}
                className={`bento-card surface-card surface-card-hover rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between ${item.span}`}
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt=""
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 w-full h-full object-cover opacity-[0.16] mix-blend-screen"
                  />
                )}
                <div className="relative z-10">
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <div className="w-11 h-11 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-sky-400">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <span className="font-mono text-[11px] tracking-[0.18em] text-slate-400 uppercase px-2.5 py-1 rounded-md border border-white/10 bg-black/40">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                    {item.text}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
