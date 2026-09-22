<script setup lang="ts">
const { t } = useI18n();
const { currency, percent, number } = useFormat();
const {
  programId,
  program,
  units,
  years,
  reinvest,
  result,
  selectProgram,
  clampUnits,
} = useCalculator();

watch(program, (p) => {
  units.value = clampUnits(units.value, p);
});

const entryPerHead = computed(
  () => program.value.unitCost + program.value.platformFee,
);

const tiles = computed(() => [
  {
    key: "final",
    label: "calc.results.final",
    value: currency(result.value.finalValue),
    hint: t("calc.results.finalHint", {
      years: t("calc.yearsShort", { n: years.value }),
    }),
    accent: true,
  },
  {
    key: "profit",
    label: "calc.results.profit",
    value: currency(result.value.totalProfit),
    hint: `${t("calc.results.roi")}: ${percent(result.value.roi, 0)}`,
  },
  {
    key: "annual",
    label: "calc.results.annual",
    value: `≈ ${percent(result.value.annualized, 1)}`,
    hint: t("calc.results.cycles") + `: ${result.value.cycles}`,
  },
  {
    key: "fees",
    label: "calc.results.fees",
    value: currency(result.value.totalFees),
    hint: `${t("calc.results.heads")}: ${number(result.value.finalUnits)}`,
  },
]);
</script>

<template>
  <section id="calculator" class="bg-elevated/40 py-16 sm:py-24">
    <UContainer>
      <div class="max-w-3xl">
        <p class="text-primary text-sm font-semibold tracking-wide uppercase">
          {{ $t("calc.headline") }}
        </p>
        <h2
          class="text-highlighted mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl"
        >
          {{ $t("calc.title") }}
        </h2>
        <p class="text-muted mt-4 text-base leading-relaxed">
          {{ $t("calc.description") }}
        </p>
      </div>

      <div class="mt-12 grid gap-6 lg:grid-cols-12">
        <div class="bg-default ring-default rounded-2xl p-6 ring lg:col-span-5">
          <p class="text-dimmed text-xs font-medium tracking-wide uppercase">
            {{ $t("calc.program") }}
          </p>
          <div class="mt-3 grid grid-cols-3 gap-2">
            <button
              v-for="id in PROGRAM_IDS"
              :key="id"
              type="button"
              class="ring-default rounded-xl px-3 py-3 text-start text-sm ring transition"
              :class="
                id === programId
                  ? 'bg-primary/10 ring-primary text-highlighted ring-2 font-semibold'
                  : 'text-muted hover:bg-elevated/60'
              "
              @click="selectProgram(id)"
            >
              {{ $t(`programs.items.${id}.name`) }}
            </button>
          </div>

          <div class="mt-8">
            <div class="flex items-end justify-between gap-4">
              <label
                class="text-dimmed text-xs font-medium tracking-wide uppercase"
              >
                {{ $t("calc.units") }}
              </label>
              <UInputNumber
                v-model="units"
                :min="program.minUnits"
                :max="program.maxUnits"
                :step="program.step"
                size="sm"
                class="w-32"
              />
            </div>
            <USlider
              v-model="units"
              class="mt-4"
              :min="program.minUnits"
              :max="program.maxUnits"
              :step="program.step"
            />
            <p class="text-dimmed mt-2 text-xs">
              {{
                $t("calc.unitsHint", {
                  min: program.minUnits,
                  max: number(program.maxUnits),
                })
              }}
            </p>
          </div>

          <div class="mt-8">
            <div class="flex items-end justify-between gap-4">
              <label
                class="text-dimmed text-xs font-medium tracking-wide uppercase"
              >
                {{ $t("calc.horizon") }}
              </label>
              <span class="text-highlighted text-sm font-semibold tabular-nums">
                {{ $t("calc.yearsShort", { n: years }) }}
              </span>
            </div>
            <USlider
              v-model="years"
              class="mt-4"
              :min="1"
              :max="10"
              :step="1"
            />
            <p class="text-dimmed mt-2 text-xs">
              {{ $t("calc.monthsShort", { n: program.cycleMonths }) }} ·
              {{ $t("calc.results.cycles") }}: {{ result.cycles }}
            </p>
          </div>

          <div class="border-default mt-8 border-t pt-6">
            <USwitch v-model="reinvest" :label="$t('calc.reinvest')" />
            <p class="text-dimmed mt-2 text-xs leading-relaxed">
              {{ reinvest ? $t("calc.reinvestOn") : $t("calc.reinvestOff") }}
            </p>
          </div>

          <div class="bg-elevated/60 mt-8 rounded-xl p-4">
            <p class="text-dimmed text-xs">{{ $t("calc.results.entry") }}</p>
            <p class="text-highlighted mt-1 text-2xl font-bold tabular-nums">
              {{ currency(result.capital) }}
            </p>
            <p class="text-dimmed mt-1 text-xs">
              {{
                $t("calc.results.entryHint", {
                  units: number(units),
                  price: currency(entryPerHead),
                  cost: currency(program.unitCost),
                  fee: currency(program.platformFee),
                })
              }}
            </p>
          </div>
        </div>

        <div class="lg:col-span-7">
          <div class="grid gap-4 sm:grid-cols-2">
            <div
              v-for="tile in tiles"
              :key="tile.key"
              class="ring-default rounded-2xl p-5 ring"
              :class="
                tile.accent ? 'bg-primary/5 ring-primary/40' : 'bg-default'
              "
            >
              <p class="text-dimmed text-xs">{{ $t(tile.label) }}</p>
              <p
                class="mt-1.5 text-2xl font-bold tabular-nums"
                :class="tile.accent ? 'text-primary' : 'text-highlighted'"
              >
                {{ tile.value }}
              </p>
              <p class="text-dimmed mt-1 text-xs">{{ tile.hint }}</p>
            </div>
          </div>

          <div class="bg-default ring-default mt-4 rounded-2xl p-5 ring sm:p-6">
            <p class="text-highlighted text-sm font-semibold">
              {{ $t("calc.chart.title") }}
            </p>
            <LandingGrowthChart :points="result.points" />
          </div>

          <div
            class="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <p class="text-dimmed max-w-xl text-xs leading-relaxed">
              {{ $t("calc.disclaimer") }}
            </p>
            <UButton
              to="#cta"
              size="lg"
              :label="$t('calc.results.cta')"
              trailing-icon="i-lucide-arrow-right"
              class="shrink-0"
            />
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>
