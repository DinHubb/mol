<script setup lang="ts">
import type { ProgramId } from "#shared/types";

const { currency, percent, number } = useFormat();
const { programId, selectProgram } = useCalculator();

const icons: Record<ProgramId, string> = {
  cattle: "i-lucide-beef",
  sheep: "i-lucide-rabbit",
  meat: "i-lucide-store",
};

const cards = computed(() =>
  PROGRAM_IDS.map((id) => {
    const program = PROGRAMS[id];
    return {
      id,
      icon: icons[id],
      program,
      entry: program.unitCost + program.platformFee,
      minLot: program.minUnits * (program.unitCost + program.platformFee),
      annual: expectedAnnualReturn(program),
      popular: id === "meat",
    };
  }),
);

function choose(id: ProgramId) {
  selectProgram(id);
  document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" });
}
</script>

<template>
  <section id="programs" class="py-16 sm:py-24">
    <UContainer>
      <div class="max-w-3xl">
        <p class="text-primary text-sm font-semibold tracking-wide uppercase">
          {{ $t("programs.headline") }}
        </p>
        <h2
          class="text-highlighted mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl"
        >
          {{ $t("programs.title") }}
        </h2>
        <p class="text-muted mt-4 text-base leading-relaxed">
          {{ $t("programs.description") }}
        </p>
      </div>

      <!-- subgrid: блоки карточек выравниваются построчно при любой длине текста -->
      <div
        class="mt-12 grid gap-5 lg:grid-cols-3 lg:grid-rows-[repeat(7,auto)]"
      >
        <div
          v-for="card in cards"
          :key="card.id"
          class="ring-default relative flex flex-col rounded-2xl p-6 ring transition lg:row-span-7 lg:grid lg:grid-rows-subgrid"
          :class="
            card.id === programId
              ? 'bg-primary/5 ring-primary ring-2'
              : 'bg-default hover:ring-primary/40'
          "
        >
          <UBadge
            v-if="card.popular"
            :label="$t('programs.labels.popular')"
            color="secondary"
            variant="subtle"
            class="absolute end-6 top-6 rounded-full"
          />

          <span
            class="bg-primary/10 text-primary flex size-11 items-center justify-center rounded-xl"
          >
            <UIcon :name="card.icon" class="size-6" />
          </span>

          <h3 class="text-highlighted mt-5 text-xl font-semibold">
            {{ $t(`programs.items.${card.id}.name`) }}
          </h3>
          <p class="text-primary mt-1 text-sm font-medium">
            {{ $t(`programs.items.${card.id}.subtitle`) }}
          </p>
          <p class="text-muted mt-3 text-sm leading-relaxed">
            {{ $t(`programs.items.${card.id}.description`) }}
          </p>

          <dl
            class="border-default mt-5 grid grid-cols-2 gap-x-4 gap-y-4 border-t pt-5 text-sm"
          >
            <div>
              <dt class="text-dimmed text-xs">
                {{ $t("programs.labels.cycle") }}
              </dt>
              <dd class="text-default mt-0.5 font-semibold tabular-nums">
                {{ $t("calc.monthsShort", { n: card.program.cycleMonths }) }}
              </dd>
            </div>
            <div>
              <dt class="text-dimmed text-xs">
                {{ $t("programs.labels.expected") }}
              </dt>
              <dd class="text-default mt-0.5 font-semibold tabular-nums">
                ≈ {{ percent(card.annual, 0) }}
              </dd>
            </div>
            <div>
              <dt class="text-dimmed text-xs">
                {{ $t("programs.labels.entry") }}
              </dt>
              <dd class="text-default mt-0.5 font-semibold tabular-nums">
                {{ currency(card.entry) }}
              </dd>
            </div>
            <div>
              <dt class="text-dimmed text-xs">
                {{ $t("programs.labels.minLot") }}
              </dt>
              <dd class="text-default mt-0.5 font-semibold tabular-nums">
                {{ currency(card.minLot) }}
                <span class="text-dimmed font-normal">
                  / {{ number(card.program.minUnits) }}
                  {{ $t("programs.labels.head") }}
                </span>
              </dd>
            </div>
          </dl>

          <ul class="mt-5 space-y-2">
            <li
              v-for="point in ['p1', 'p2', 'p3']"
              :key="point"
              class="text-muted flex gap-2 text-sm"
            >
              <UIcon
                name="i-lucide-check"
                class="text-primary mt-0.5 size-4 shrink-0"
              />
              {{ $t(`programs.items.${card.id}.${point}`) }}
            </li>
          </ul>

          <UButton
            class="mt-6"
            block
            :color="card.id === programId ? 'primary' : 'neutral'"
            :variant="card.id === programId ? 'solid' : 'subtle'"
            :label="$t('programs.labels.select')"
            trailing-icon="i-lucide-arrow-right"
            @click="choose(card.id)"
          />
        </div>
      </div>
    </UContainer>
  </section>
</template>
