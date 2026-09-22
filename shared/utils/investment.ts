import type { CyclePoint, Program, ProgramId, SimulationResult } from "../types";

/**
 * Демонстрационные параметры программ.
 * ВАЖНО: цифры предварительные и служат только для симулятора на лендинге —
 * перед публикацией их нужно заменить на подтверждённую экономику хозяйств.
 */
export const CURRENCY = "USD";

export const PROGRAMS: Record<ProgramId, Program> = {
  cattle: {
    id: "cattle",
    cycleMonths: 9,
    unitCost: 1200,
    platformFee: 35,
    grossMargin: 0.28,
    investorShare: 0.6,
    minUnits: 1,
    maxUnits: 200,
    step: 1,
    defaultUnits: 5,
  },
  sheep: {
    id: "sheep",
    cycleMonths: 6,
    unitCost: 180,
    platformFee: 4,
    grossMargin: 0.19,
    investorShare: 0.6,
    minUnits: 5,
    maxUnits: 2000,
    step: 5,
    defaultUnits: 50,
  },
  meat: {
    id: "meat",
    // торговый цикл без откорма: закуп готовой головы, забой, оптовая реализация мяса
    cycleMonths: 2,
    unitCost: 900,
    platformFee: 15,
    grossMargin: 0.085,
    investorShare: 0.6,
    minUnits: 1,
    maxUnits: 300,
    step: 1,
    defaultUnits: 8,
  },
};

export const PROGRAM_IDS = Object.keys(PROGRAMS) as ProgramId[];

/** Чистая прибыль инвестора с одной головы за один цикл, без учёта комиссии */
export function profitPerUnit(program: Program): number {
  return program.unitCost * program.grossMargin * program.investorShare;
}

/** Ожидаемая доходность в годовых, с учётом комиссии цикла */
export function expectedAnnualReturn(program: Program): number {
  const net = profitPerUnit(program) - program.platformFee;
  const perCycle = net / (program.unitCost + program.platformFee);
  return perCycle * (12 / program.cycleMonths);
}

export interface SimulationInput {
  program: Program;
  units: number;
  years: number;
  reinvest: boolean;
}

/**
 * Считает стоимость портфеля по циклам.
 * Тело капитала (`capital`) остаётся постоянным, прибыль накапливается сверху —
 * так сложенный график читается как «сколько своё, сколько заработано».
 */
export function simulate({ program, units, years, reinvest }: SimulationInput): SimulationResult {
  const entryCost = program.unitCost + program.platformFee;
  const capital = units * entryCost;
  const cycles = Math.max(1, Math.floor((years * 12) / program.cycleMonths));

  let heads = units;
  let cash = 0;
  let fees = units * program.platformFee;
  let withdrawn = 0;

  const points: CyclePoint[] = [
    {
      cycle: 0,
      month: 0,
      units: heads,
      capital,
      profit: 0,
      total: capital,
      fees,
    },
  ];

  for (let cycle = 1; cycle <= cycles; cycle++) {
    const gross = heads * profitPerUnit(program);

    if (reinvest) {
      // Всё поголовье реализовано: возвращается тело + прибыль цикла
      cash += heads * program.unitCost + gross;
      heads = Math.floor(cash / entryCost);
      const reinvested = heads * entryCost;
      fees += heads * program.platformFee;
      cash -= reinvested;
    } else {
      // Прибыль выводится, поголовье выкупается заново — комиссия за новый цикл из прибыли
      const cycleFee = cycle > 1 ? heads * program.platformFee : 0;
      fees += cycleFee;
      withdrawn += gross - cycleFee;
    }

    const assets = heads * program.unitCost + cash + withdrawn;
    points.push({
      cycle,
      month: cycle * program.cycleMonths,
      units: heads,
      capital,
      profit: Math.round(assets - capital),
      total: Math.round(assets),
      fees: Math.round(fees),
    });
  }

  const last = points[points.length - 1]!;
  const months = cycles * program.cycleMonths;
  const multiple = last.total / capital;

  return {
    points,
    capital,
    finalValue: last.total,
    totalProfit: last.profit,
    totalFees: last.fees,
    roi: last.profit / capital,
    annualized: multiple > 0 ? multiple ** (12 / months) - 1 : 0,
    multiple,
    cycles,
    finalUnits: last.units,
  };
}
