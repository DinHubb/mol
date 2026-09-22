export type ProgramId = "cattle" | "sheep" | "meat";

export interface Program {
  id: ProgramId;
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
