<script setup lang="ts">
const { t } = useI18n();
const { tr } = useLocalized();
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

// Из программы радиогруппе нужны только идентификатор и подпись на активном языке
const programItems = computed(() =>
  Object.values(PROGRAMS).map((p) => ({ id: p.id, label: tr(p.title) })),
);

/**
 * Подписи калькулятора — мелкие капсовые метки, а не дефолтные лейблы формы,
 * поэтому UFormField везде получает один и тот же набор переопределений.
 */
const fieldUi = {
  label: "text-dimmed text-xs tracking-wide uppercase",
  help: "text-dimmed mt-2 text-xs leading-relaxed",
  container: "mt-4",
};

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
  <UPageSection
    id="calculator"
    :headline="$t('calc.headline')"
    :title="$t('calc.title')"
    :description="$t('calc.description')"
    class="bg-elevated/40"
  >
    <UPageGrid class="gap-6 sm:grid-cols-1 lg:grid-cols-12">
      <UPageCard class="lg:col-span-5">
        <template #body>
          <UFormField
            :label="$t('calc.program')"
            :ui="{ ...fieldUi, container: 'mt-3' }"
          >
            <URadioGroup
              :model-value="programId"
              :items="programItems"
              value-key="id"
              variant="card"
              indicator="hidden"
              orientation="horizontal"
              :ui="{
                fieldset: 'grid grid-cols-3 gap-2',
                item: 'rounded-xl',
                wrapper: 'items-start text-start',
              }"
              @update:model-value="selectProgram"
            />
          </UFormField>

          <UFormField
            class="mt-8"
            :label="$t('calc.units')"
            :help="
              $t('calc.unitsHint', {
                min: program.minUnits,
                max: number(program.maxUnits),
              })
            "
            :ui="fieldUi"
          >
            <template #hint>
              <UInputNumber
                v-model="units"
                :min="program.minUnits"
                :max="program.maxUnits"
                :step="program.step"
                size="sm"
                class="w-32"
              />
            </template>

            <USlider
              v-model="units"
              :min="program.minUnits"
              :max="program.maxUnits"
              :step="program.step"
            />
          </UFormField>

          <UFormField
            class="mt-8"
            :label="$t('calc.horizon')"
            :hint="$t('calc.yearsShort', { n: years })"
            :ui="{
              ...fieldUi,
              hint: 'text-highlighted text-sm font-semibold tabular-nums',
            }"
          >
            <USlider v-model="years" :min="1" :max="10" :step="1" />

            <template #help>
              {{ $t("calc.monthsShort", { n: program.cycleMonths }) }} ·
              {{ $t("calc.results.cycles") }}: {{ result.cycles }}
            </template>
          </UFormField>

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
        </template>
      </UPageCard>

      <div class="lg:col-span-7">
        <UPageGrid class="gap-4 lg:grid-cols-2">
          <UPageCard
            v-for="tile in tiles"
            :key="tile.key"
            :highlight="tile.accent"
            :class="tile.accent && 'bg-primary/5'"
          >
            <template #body>
              <p class="text-dimmed text-xs">{{ $t(tile.label) }}</p>
              <p
                class="mt-1.5 text-2xl font-bold tabular-nums"
                :class="tile.accent ? 'text-primary' : 'text-highlighted'"
              >
                {{ tile.value }}
              </p>
              <p class="text-dimmed mt-1 text-xs">{{ tile.hint }}</p>
            </template>
          </UPageCard>
        </UPageGrid>

        <UPageCard class="mt-4">
          <template #body>
            <p class="text-highlighted text-sm font-semibold">
              {{ $t("calc.chart.title") }}
            </p>
            <LandingGrowthChart :points="result.points" />
          </template>
        </UPageCard>

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
    </UPageGrid>
  </UPageSection>
</template>
