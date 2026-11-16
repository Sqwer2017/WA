export interface BlueprintNode {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  dimensions: string;
  description: string;
  specs: string[];
  x: number; // percentage on blueprint image
  y: number; // percentage on blueprint image
}

export interface RobotEdition {
  id: 'diy' | 'pro' | 'founders';
  badge: string;
  name: string;
  tagline: string;
  priceRub: number;
  delivery: string;
  featured?: boolean;
  includes: string[];
}

export interface AddonModule {
  id: string;
  name: string;
  priceRub: number;
  note: string;
}

export interface GalleryWork {
  id: string;
  title: string;
  category: 'hardware' | 'blueprint' | 'identity' | 'concept';
  image: string;
  caption: string;
  aspect: 'portrait' | 'square' | 'wide';
}

export const assetUrl = (filename: string) =>
  `${import.meta.env.BASE_URL}images/${filename}`;

export const BLUEPRINT_NODES: BlueprintNode[] = [
  {
    id: 'battery',
    code: 'PWR-01',
    title: 'LiPo Battery Pack CityTree 103450',
    subtitle: 'Высокоёмкий силовой элемент питания',
    dimensions: '5.5 × 4.8 см (отсек)',
    description:
      'Интегрированный литий-полимерный аккумулятор CityTree 103450 (3.7V, 2500mAh) в верхней силовой зоне шасси. Изолированный отсек с зазором 1.8 см защищает плату от перегрева и вибраций.',
    specs: ['Напряжение: 3.7 V', 'Ёмкость: 2500 mAh', 'До 6 часов автономной работы'],
    x: 54,
    y: 26,
  },
  {
    id: 'servos',
    code: 'ACT-02',
    title: 'Dual Micro Servos (Acebot + TowerPro)',
    subtitle: 'Спаренный кинематический привод',
    dimensions: 'Мост 2.8 см · Ход 180°',
    description:
      'Два независимых микросервопривода (Acebot и TowerPro), разнесённых на 2.8 см по центру тяжести. Обеспечивают точный наклон головы, поворот оптического модуля и живую мимику робота.',
    specs: ['2× Micro Servo (Acebot / TowerPro)', 'Плавный ШИМ-контроль 50 Гц', 'Металл/нейлон редуктор'],
    x: 55,
    y: 49,
  },
  {
    id: 'pcb',
    code: 'CTRL-03',
    title: 'DIY Robot Controller PCB v1.0',
    subtitle: 'Главная логическая плата управления',
    dimensions: 'Сужение базы 3.8 см',
    description:
      'Собственная разводка печатной платы v1.0 в трапециевидном отсеке. Объединяет микроконтроллер, силовые ключи для сервоприводов, разъёмы телеметрии и интерфейс для OLED-экрана и камеры.',
    specs: ['Архитектура: Controller v1.0', 'Масштаб чертежа: 1:1', 'Порты расширения I2C / UART / PWM'],
    x: 54,
    y: 69,
  },
  {
    id: 'chassis',
    code: 'FRM-04',
    title: 'Safe Area Frame & Side Plates',
    subtitle: 'Триангулярный силовой каркас',
    dimensions: '10.2 × 10.2 см · Высота ядра 6.7 см',
    description:
      'Компактный контур безопасности 10.2 × 10.2 см с углом скоса 4.5 / 4.8 см и боковыми монтажными пластинами (Side Mounting Plates) для крепления навесной брони, датчиков или стабилизаторов.',
    specs: ['Общий габарит: 10.2 × 10.2 см', 'Внешние зазоры: 1.8 см', 'Модульные боковые пластины'],
    x: 22,
    y: 56,
  },
];

export const ROBOT_EDITIONS: RobotEdition[] = [
  {
    id: 'diy',
    badge: 'ДЛЯ ИНЖЕНЕРОВ',
    name: 'iWA DIY Core Kit',
    tagline: 'Набор для самостоятельной сборки по оригинальному чертежу v1.0',
    priceRub: 4900,
    delivery: 'Отправка комплекта за 5 дней',
    includes: [
      'Фирменная печатная плата PCB Controller v1.0',
      'Два микросервопривода (Acebot + TowerPro)',
      'Полный 1:1 чертёж и 3D-файлы корпуса (STL/STEP)',
      'Боковые монтажные пластины и крепёж',
    ],
  },
  {
    id: 'pro',
    badge: 'ХИТ ПРОДАЖ',
    name: 'iWA ONE PRO',
    tagline: 'Полностью собранный Triangle Bot из шлифованного тёмного металла',
    priceRub: 19900,
    delivery: 'Предзаказ · Партия 2026',
    featured: true,
    includes: [
      'Корпус 10.2×10.2 см из анодированного шлифованного алюминия',
      'OLED-дисплей эмоций + встроенная оптическая камера',
      'Установленный АКБ LiPo CityTree 103450 (2500 mAh)',
      'Откалиброванные приводы и прошивка v1.0 из коробки',
    ],
  },
  {
    id: 'founders',
    badge: 'LIMITED EDITION',
    name: 'Founders Triad Pack',
    tagline: 'Расширенный коллекционный комплект с открытым SDK и доп. модулями',
    priceRub: 27900,
    delivery: 'Индивидуальная сборка · Гравировка серийника',
    includes: [
      'Всё из комплектации iWA ONE PRO',
      'Гравировка уникального номера серии и логотипа iWA',
      'Доступ к SDK кастомных эмоций и сценариев поведения',
      'Запасной АКБ 2500 mAh и боковой стабилизатор',
    ],
  },
];

export const CHASSIS_FINISHES = [
  { id: 'obsidian', name: 'Brushed Obsidian', hex: '#14161D', accent: 'Классический тёмный шлифованный металл' },
  { id: 'titanium', name: 'Raw Titanium', hex: '#6B7280', accent: 'Индустриальный светлый сатин' },
  { id: 'stealth', name: 'Matte Stealth', hex: '#09090B', accent: 'Глубокое матовое покрытие без бликов' },
];

export const ADDON_MODULES: AddonModule[] = [
  { id: 'extra-lipo', name: 'Запасной LiPo 2500mAh (103450)', priceRub: 1800, note: '+6 часов автономности' },
  { id: 'magnetic-mount', name: 'Магнитные боковые панели (пара)', priceRub: 2200, note: 'Быстрая замена обвеса' },
  { id: 'usb-dock', name: 'Настольная док-станция Triad', priceRub: 3400, note: 'Магнитная зарядка USB-C' },
];

export const GALLERY_WORKS: GalleryWork[] = [
  {
    id: 'g-one-pro',
    title: 'iWA ONE PRO — Triangle Bot',
    category: 'hardware',
    image: assetUrl('poster-one-pro.webp'),
    caption: 'Финальный облик корпуса: шлифованный металл, пиксельные глаза и оптический сенсор.',
    aspect: 'portrait',
  },
  {
    id: 'g-iron',
    title: 'Not Just A Piece Of Iron..',
    category: 'concept',
    image: assetUrl('poster-iron.webp'),
    caption: 'Ключевой манифест проекта: соединение инженерного чертежа и живого характера робота.',
    aspect: 'portrait',
  },
  {
    id: 'g-blueprint',
    title: 'Component Layout Drawing v1.0',
    category: 'blueprint',
    image: assetUrl('blueprint-cyber.webp'),
    caption: 'Оригинальная компоновка 10.2×10.2 см: питание CityTree, сервоприводы и центральная PCB.',
    aspect: 'portrait',
  },
  {
    id: 'g-tri-bot',
    title: 'Triangular Particle Silhouette',
    category: 'concept',
    image: assetUrl('art-silhouette-tri.webp'),
    caption: 'Геометрический силуэт робота из триадных элементов и световых импульсов.',
    aspect: 'portrait',
  },
  {
    id: 'g-triad-logo',
    title: 'iWA Triad Emblem',
    category: 'identity',
    image: assetUrl('emblem-triad.webp'),
    caption: 'Фирменная триангулярная эмблема бренда iWA — символ устойчивости и баланса.',
    aspect: 'square',
  },
  {
    id: 'g-vortex',
    title: 'Triad Vortex Core',
    category: 'identity',
    image: assetUrl('art-vortex.webp'),
    caption: 'Паттерн калибровки оптического сенсора и визуальная мандала ядра iWA.',
    aspect: 'portrait',
  },
  {
    id: 'g-hex',
    title: 'Hexagonal Neural Mesh',
    category: 'identity',
    image: assetUrl('art-hex-grid.webp'),
    caption: 'Световая сотовая сетка — мотив распределённой архитектуры датчиков.',
    aspect: 'wide',
  },
  {
    id: 'g-bold-bot',
    title: 'Monolith Profile iWA',
    category: 'concept',
    image: assetUrl('art-silhouette-bold.webp'),
    caption: 'Контрастный силуэт автономного модуля с центральным ядром iWA.',
    aspect: 'portrait',
  },
];

export const FAQ_ITEMS = [
  {
    q: 'Что умеет iWA ONE PRO прямо из коробки?',
    a: 'Робот оснащён OLED-экраном для отображения эмоций, встроенной камерой и двумя микросервоприводами (Acebot + TowerPro). Он реагирует на движение и присутствие, наклоняет голову, меняет выражения глаз и работает как умный настольный компаньон или платформа для экспериментов.',
  },
  {
    q: 'Насколько сложно собрать DIY Core Kit самому?',
    a: 'Чертёж Component Layout Drawing v1.0 выполнен в масштабе 1:1 с точными посадочными местами под батарею 103450, сервоприводы и плату. Плата PCB уже разведена — остаётся только соединить шлейфы, закрепить боковые пластины и загрузить базовую прошивку.',
  },
  {
    q: 'Сколько робот держит заряд от встроенного аккумулятора?',
    a: 'Аккумулятор LiPo CityTree 103450 (3.7V, 2500mAh) обеспечивает до 5–6 часов активного взаимодействия с движением сервоприводов и до суток в режиме ожидания на столе.',
  },
  {
    q: 'Можно ли писать свой код и менять поведение робота?',
    a: 'Да! Плата Controller v1.0 открыта для программирования: вы можете настраивать сценарии мимики глаз, углы сервоприводов и обработку изображения с камеры под свои задачи.',
  },
  {
    q: 'Как происходит предзаказ и оплата?',
    a: 'Выберите нужную комплектацию в конфигураторе, оставьте контакт (Telegram или телефон) в форме предзаказа — вы получите уникальный код брони и готовый текст заявки, чтобы согласовать детали сборки и доставки напрямую с создателем проекта.',
  },
];
