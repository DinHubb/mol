import type {
  CyclePoint,
  Program,
  ProgramId,
  SimulationResult,
} from "../types";

/**
 * Демонстрационные параметры программ.
 * ВАЖНО: цифры предварительные и служат только для симулятора на лендинге —
 * перед публикацией их нужно заменить на подтверждённую экономику хозяйств.
 */
export const CURRENCY = "USD";

export const PROGRAMS: Record<ProgramId, Program> = {
  cattle: {
    id: "cattle",
    icon: "i-lucide-beef",
    link: "#calculator",
    title: {
      en: "Cattle fattening",
      ru: "Бычки на откорме",
      tg: "Гӯсолаҳои фарбеҳшаванда",
    },
    subtitle: {
      en: "Longer cycle, larger ticket",
      ru: "Длинный цикл, крупный чек",
      tg: "Давраи дароз, маблағи калон",
    },
    description: {
      en: "Classic beef fattening at a partner feedlot. More capital per head, fewer operations per year, the most straightforward exit.",
      ru: "Классический откорм КРС на площадке партнёра. Больше капитала на голову, меньше операций в году, самая понятная реализация.",
      tg: "Фарбеҳкунии классикии чорвои калон дар майдончаи шарик. Сармояи бештар ба як сар, амалиёти камтар дар як сол ва фурӯши осонтарин.",
    },
    points: [
      {
        en: "9-month cycle, sold in batches",
        ru: "Цикл 9 месяцев, реализация партиями",
        tg: "Давраи 9-моҳа, фурӯш бо дастаҳо",
      },
      {
        en: "Herd insured for the full term",
        ru: "Страхование поголовья на весь срок",
        tg: "Суғуртаи рама дар тамоми мӯҳлат",
      },
      {
        en: "Monthly photo report with weight gain",
        ru: "Ежемесячный фотоотчёт с привесом",
        tg: "Ҳисоботи моҳонаи аксӣ бо вазнафзоӣ",
      },
    ],
    mostChosen: false,
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
    icon: "i-lucide-rabbit",
    link: "#calculator",
    title: {
      en: "Sheep & lambs",
      ru: "Овцы и ягнята",
      tg: "Гӯсфанд ва барра",
    },
    subtitle: {
      en: "Short cycle, low threshold",
      ru: "Короткий цикл, низкий порог",
      tg: "Давраи кӯтоҳ, вуруди арзон",
    },
    description: {
      en: "Grazing and finishing flocks. Faster turnover, easy to start small and to exit at the next settlement.",
      ru: "Отара на выпасе и доращивании. Быстрее оборачивается, проще войти небольшой суммой и выйти после ближайшего расчёта.",
      tg: "Рама дар чаро ва парвариш. Гардиши тезтар, оғози осон бо маблағи хурд ва баромад пас аз ҳисоби наздиктарин.",
    },
    points: [
      {
        en: "6-month cycle",
        ru: "Цикл 6 месяцев",
        tg: "Давраи 6-моҳа",
      },
      {
        en: "Entry from a small lot",
        ru: "Вход от небольшого лота",
        tg: "Вуруд аз лоти хурд",
      },
      {
        en: "Seasonal holiday demand supports sales",
        ru: "Сезонный спрос в праздники повышает сбыт",
        tg: "Талаботи идона фурӯшро дастгирӣ мекунад",
      },
    ],
    mostChosen: false,
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
    icon: "i-lucide-store",
    link: "#calculator",
    title: {
      en: "Meat trading",
      ru: "Мясо на реализацию",
      tg: "Гӯшт барои фурӯш",
    },
    subtitle: {
      en: "Short trading cycle",
      ru: "Короткий торговый цикл",
      tg: "Давраи кӯтоҳи савдо",
    },
    description: {
      en: "Buying a finished animal, halal slaughter and wholesale meat sales. There is no weight to grow — the result rests on the purchase-to-sale spread.",
      ru: "Закуп откормленной головы, халяль-забой и оптовая реализация мяса. Привес не растим — результат зависит от разницы закупочной и отпускной цены.",
      tg: "Хариди чорвои фарбеҳшуда, кушторӣ ва фурӯши яклухти гӯшт. Вазн намепарварем — натиҷа ба фарқи нархи харид ва фурӯш вобаста аст.",
    },
    points: [
      {
        en: "2-month cycle — up to 6 turns a year",
        ru: "Цикл 2 месяца — до 6 оборотов в год",
        tg: "Давраи 2-моҳа — то 6 гардиш дар сол",
      },
      {
        en: "Slaughter and cold chain handled by the partner",
        ru: "Забой и холодовая цепь на стороне партнёра",
        tg: "Кушторӣ ва занҷираи сард аз ҷониби шарик",
      },
      {
        en: "Settlement against invoices and carcass weight",
        ru: "Расчёт по накладным и весу туши",
        tg: "Ҳисоб аз рӯи ҳуҷҷатҳо ва вазни лоша",
      },
    ],
    mostChosen: true,
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
export function simulate({
  program,
  units,
  years,
  reinvest,
}: SimulationInput): SimulationResult {
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
