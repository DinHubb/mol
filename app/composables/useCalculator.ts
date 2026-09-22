import type { ProgramId } from "#shared/types";

export function useCalculator() {
  const programId = useState<ProgramId>("calc-program", () => "cattle");
  const units = useState<number>("calc-units", () => PROGRAMS.cattle.defaultUnits);
  const years = useState<number>("calc-years", () => 3);
  const reinvest = useState<boolean>("calc-reinvest", () => true);

  const program = computed(() => PROGRAMS[programId.value]);

  const result = computed(() =>
    simulate({
      program: program.value,
      units: clampUnits(units.value, program.value),
      years: years.value,
      reinvest: reinvest.value,
    }),
  );

  function clampUnits(value: number, p = program.value) {
    const rounded = Math.round((Number(value) || p.minUnits) / p.step) * p.step;
    return Math.min(p.maxUnits, Math.max(p.minUnits, rounded));
  }

  function selectProgram(id: ProgramId) {
    programId.value = id;
    units.value = PROGRAMS[id].defaultUnits;
  }

  return { programId, program, units, years, reinvest, result, selectProgram, clampUnits };
}
