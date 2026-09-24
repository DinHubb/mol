<script setup lang="ts">
import type { ButtonProps } from "@nuxt/ui";

const { t } = useI18n();

const pills = [
  { key: "sharia", icon: "i-lucide-moon-star" },
  { key: "asset", icon: "i-lucide-package-check" },
  { key: "audit", icon: "i-lucide-clipboard-check" },
  { key: "region", icon: "i-lucide-map-pin" },
];

const stats = [
  {
    label: "hero.stats.cycleLabel",
    value: "hero.stats.cycleValue",
    icon: "i-lucide-calendar-days",
  },
  {
    label: "hero.stats.shareLabel",
    value: "hero.stats.shareValue",
    icon: "i-lucide-split",
  },
  {
    label: "hero.stats.trackLabel",
    value: "hero.stats.trackValue",
    icon: "i-lucide-scan-line",
  },
];

// Демонстрационная выборка для карточки-«реестра» — заменяется данными кабинета
const ledger = [
  { tag: "TJ-04-1182", gain: 42 },
  { tag: "TJ-04-1183", gain: 38 },
  { tag: "TJ-04-1184", gain: 45 },
];

// computed, а не ref: подписи пересчитываются при смене локали
const links = computed<ButtonProps[]>(() => [
  {
    label: t("hero.primary"),
    to: "#calculator",
    icon: "i-lucide-calculator",
  },
  {
    label: t("hero.secondary"),
    to: "#lifecycle",
    color: "neutral",
    variant: "subtle",
    trailingIcon: "i-lucide-arrow-down-right",
  },
]);
</script>

<template>
  <UPageHero
    :title="$t('hero.title')"
    :description="$t('hero.subtitle')"
    :headline="$t('hero.badge')"
    orientation="horizontal"
    class="band-earth"
  >
    <div>
      <div
        class="bg-default ring-default relative rounded-2xl p-5 shadow-xl ring sm:p-6"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-dimmed text-xs tracking-wide uppercase">
              {{ $t("hero.demo.batch") }}
            </p>
            <p class="text-highlighted text-lg font-semibold">
              {{ $t("hero.demo.location") }}
            </p>
          </div>
          <UBadge
            color="success"
            variant="subtle"
            :label="$t('hero.demo.cycleTag')"
            class="rounded-full"
          />
        </div>

        <div class="border-default mt-5 space-y-3 border-t pt-5">
          <div
            v-for="row in ledger"
            :key="row.tag"
            class="flex items-center justify-between gap-3"
          >
            <span class="flex items-center gap-2">
              <span
                class="bg-primary/10 text-primary flex size-8 items-center justify-center rounded-lg"
              >
                <UIcon name="i-lucide-tag" class="size-4" />
              </span>
              <span class="text-default font-mono text-sm">{{ row.tag }}</span>
            </span>
            <span class="text-muted text-sm tabular-nums">{{
              $t("hero.demo.gain", { n: row.gain })
            }}</span>
          </div>
        </div>

        <div class="border-default mt-5 border-t pt-5">
          <div class="text-muted flex items-center justify-between text-xs">
            <span>{{ $t("hero.demo.progress") }}</span>
            <span class="tabular-nums">44%</span>
          </div>
          <div class="bg-elevated mt-2 h-2 w-full overflow-hidden rounded-full">
            <div class="bg-primary h-full rounded-full" style="width: 44%" />
          </div>
        </div>
      </div>

      <dl class="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="bg-default/70 ring-default rounded-xl px-4 py-3 ring backdrop-blur"
        >
          <dt class="text-dimmed flex items-center gap-1.5 text-xs">
            <UIcon :name="stat.icon" class="size-3.5" />
            {{ $t(stat.label) }}
          </dt>
          <dd class="text-highlighted mt-1 text-sm font-semibold">
            {{ $t(stat.value) }}
          </dd>
        </div>
      </dl>
    </div>

    <!-- Слот #footer заменяет футер целиком, поэтому кнопки из links рендерим здесь сами -->
    <template #footer>
      <div class="flex flex-wrap gap-x-6 gap-y-3">
        <UButton
          v-for="(link, idx) in links"
          :key="idx"
          size="xl"
          v-bind="link"
        />
      </div>

      <ul class="mt-8 flex flex-wrap gap-2">
        <li v-for="pill in pills" :key="pill.key">
          <UBadge
            :label="$t(`hero.pills.${pill.key}`)"
            :icon="pill.icon"
            color="neutral"
            variant="outline"
            size="lg"
            class="rounded-full"
            :ui="{ leadingIcon: 'text-primary' }"
          />
        </li>
      </ul>
    </template>
  </UPageHero>
</template>
