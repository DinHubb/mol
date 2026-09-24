<script setup lang="ts">
import type { Program } from "#shared/types";

const { t } = useI18n();
const { tr } = useLocalized();
const { currency, percent, number } = useFormat();
const { selectProgram } = useCalculator();

/** Экономика программы в виде подписей карточки */
function metrics(program: Program) {
  const entry = program.unitCost + program.platformFee;

  return [
    {
      label: t("programs.labels.cycle"),
      value: t("calc.monthsShort", { n: program.cycleMonths }),
    },
    {
      label: t("programs.labels.expected"),
      value: `≈ ${percent(expectedAnnualReturn(program), 0)}`,
    },
    {
      label: t("programs.labels.entry"),
      value: currency(entry),
    },
    {
      label: t("programs.labels.minLot"),
      value: currency(program.minUnits * entry),
      hint: `/ ${number(program.minUnits)} ${t("programs.labels.head")}`,
    },
  ];
}
</script>

<template>
  <UPageSection
    id="programs"
    :title="$t('programs.title')"
    :description="$t('programs.description')"
    :headline="$t('programs.headline')"
  >
    <UPageGrid>
      <UPageCard
        v-for="program in PROGRAMS"
        :key="program.id"
        :icon="program.icon"
        :highlight="program.mostChosen"
        :ui="{
          leadingIcon: 'size-8',
          body: 'flex flex-col',
          leading: 'mb-4',
        }"
        :class="program.mostChosen ? 'bg-primary/5' : 'hover:ring-primary/40'"
      >
        <UBadge
          v-if="program.mostChosen"
          :label="$t('programs.labels.mostChosen')"
          color="secondary"
          variant="subtle"
          class="absolute inset-e-6 top-6 rounded-full"
        />

        <template #body>
          <div class="flex-1">
            <h3 class="text-highlighted text-xl font-semibold text-pretty">
              {{ tr(program.title) }}
            </h3>
            <p class="text-primary mt-1 text-sm font-medium">
              {{ tr(program.subtitle) }}
            </p>
            <p class="text-muted mt-2 text-sm leading-relaxed">
              {{ tr(program.description) }}
            </p>
          </div>

          <dl
            class="border-default mt-4 grid grid-cols-2 gap-4 border-t pt-4 text-sm"
          >
            <div v-for="metric in metrics(program)" :key="metric.label">
              <dt class="text-dimmed text-xs">{{ metric.label }}</dt>
              <dd class="text-default mt-0.5 font-semibold tabular-nums">
                {{ metric.value }}
                <span v-if="metric.hint" class="text-dimmed font-normal">
                  {{ metric.hint }}
                </span>
              </dd>
            </div>
          </dl>

          <ul class="text-muted mt-8 space-y-2 text-sm">
            <li
              v-for="point in program.points"
              :key="point.en"
              class="flex gap-2"
            >
              <UIcon
                name="i-lucide-check"
                class="text-primary mt-0.5 size-4 shrink-0"
              />
              {{ tr(point) }}
            </li>
          </ul>
        </template>

        <template #footer>
          <UButton
            block
            size="xl"
            :to="program.link"
            :color="program.mostChosen ? 'primary' : 'neutral'"
            :variant="program.mostChosen ? 'solid' : 'subtle'"
            class="mt-4"
            :label="$t('programs.labels.select')"
            trailing-icon="i-lucide-arrow-right"
            @click="selectProgram(program.id)"
          />
        </template>
      </UPageCard>
    </UPageGrid>
  </UPageSection>
</template>
