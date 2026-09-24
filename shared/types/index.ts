export type ProgramId = "cattle" | "sheep" | "meat";

export type Locale = "en" | "ru" | "tg";

/**
 * Строка на всех языках сайта.
 * Тексты программ живут рядом с их экономикой в PROGRAMS, а не в i18n-файлах:
 * добавление программы — это одна запись в константе, без правок трёх локалей.
 */
export type Localized = Record<Locale, string>;

export interface Program {
  id: ProgramId;
  /** Иконка программы в карточке и списках */
  icon: string;
  /**
   * Куда ведёт кнопка карточки. Имя поля взято под будущий ответ бека,
   * пока лендинг одностраничный — это якорь на калькулятор.
   */
  link: string;
  /** Название программы */
  title: Localized;
  /** Короткий поясняющий подзаголовок */
  subtitle: Localized;
  description: Localized;
  /** Чек-лист программы в карточке */
  points: Localized[];
  /** Программу выделяем в списке: ярлык и подсветка карточки */
  mostChosen: boolean;
  /** Длительность одного откормочного цикла, месяцев */
  cycleMonths: number;
  /** Себестоимость одной головы при входе */
  unitCost: number;
  /** Фиксированная комиссия платформы за голову за цикл */
  platformFee: number;
  /** Валовая маржа цикла к себестоимости головы */
  grossMargin: number;
  /** Доля инвестора в прибыли (мудараба) */
  investorShare: number;
  minUnits: number;
  maxUnits: number;
  step: number;
  defaultUnits: number;
}

export interface CyclePoint {
  cycle: number;
  month: number;
  units: number;
  /** Тело вложенного капитала — константа за весь горизонт */
  capital: number;
  /** Накопленная прибыль после комиссий */
  profit: number;
  /** Стоимость портфеля = capital + profit */
  total: number;
  /** Накопленные комиссии платформы */
  fees: number;
}

export interface SimulationResult {
  points: CyclePoint[];
  capital: number;
  finalValue: number;
  totalProfit: number;
  totalFees: number;
  roi: number;
  annualized: number;
  multiple: number;
  cycles: number;
  finalUnits: number;
}
