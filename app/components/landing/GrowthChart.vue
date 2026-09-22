<script setup lang="ts">
import type { CyclePoint } from "#shared/types";

const props = defineProps<{ points: CyclePoint[] }>();

const { currency, currencyCompact, numberCompact } = useFormat();
const { t } = useI18n();

const wrapper = useTemplateRef<HTMLDivElement>("wrapper");
const width = ref(720);
const height = ref(300);
const hovered = ref<number | null>(null);
const showTable = ref(false);

let observer: ResizeObserver | undefined;

onMounted(() => {
  observer = new ResizeObserver(([entry]) => {
    const w = entry?.contentRect.width ?? 720;
    width.value = Math.max(280, w);
    height.value = w < 520 ? 240 : 300;
  });
  if (wrapper.value) observer.observe(wrapper.value);
});

onBeforeUnmount(() => observer?.disconnect());

const compact = computed(() => width.value < 560);

const pad = computed(() => ({
  top: 28,
  right: 12,
  bottom: 30,
  // подписи оси в рублёвом/долларовом компактном формате длинные — место под них
  left: compact.value ? 52 : 78,
}));

const plot = computed(() => ({
  width: Math.max(10, width.value - pad.value.left - pad.value.right),
  height: Math.max(10, height.value - pad.value.top - pad.value.bottom),
}));

/** Округляет шаг сетки до «читаемого» числа, чтобы деления были ровными */
const NICE_STEPS = [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10];

function niceStep(value: number) {
  const exponent = Math.floor(Math.log10(value));
  const base = value / 10 ** exponent;
  const nice = NICE_STEPS.find((step) => base <= step) ?? 10;
  return nice * 10 ** exponent;
}

const maxValue = computed(() => {
  const max = Math.max(...props.points.map((p) => p.total));
  if (max <= 0) return 1;
  return niceStep((max * 1.05) / 4) * 4;
});

const band = computed(() => plot.value.width / props.points.length);
const barWidth = computed(() => Math.min(34, Math.max(6, band.value * 0.6)));

function yOf(value: number) {
  return pad.value.top + plot.value.height * (1 - value / maxValue.value);
}

function xOf(index: number) {
  return pad.value.left + band.value * index + band.value / 2;
}

/** Прямоугольник со скруглённым верхом — «свободный» конец столбца */
function topRounded(x: number, y: number, w: number, h: number, r = 4) {
  const radius = Math.min(r, h, w / 2);
  const bottom = y + h;
  return `M${x},${bottom} L${x},${y + radius} Q${x},${y} ${x + radius},${y} L${x + w - radius},${y} Q${x + w},${y} ${x + w},${y + radius} L${x + w},${bottom} Z`;
}

const bars = computed(() =>
  props.points.map((point, index) => {
    const x = xOf(index) - barWidth.value / 2;
    const baseline = pad.value.top + plot.value.height;
    const capitalTop = yOf(point.capital);
    const totalTop = yOf(point.total);
    const profitHeight = Math.max(0, capitalTop - totalTop - 2);

    return {
      point,
      index,
      x,
      centerX: xOf(index),
      capitalPath:
        profitHeight > 0
          ? `M${x},${baseline} L${x},${capitalTop} L${x + barWidth.value},${capitalTop} L${x + barWidth.value},${baseline} Z`
          : topRounded(x, capitalTop, barWidth.value, baseline - capitalTop),
      profitPath:
        profitHeight > 0
          ? topRounded(x, capitalTop - 2 - profitHeight, barWidth.value, profitHeight)
          : null,
      totalTop,
    };
  }),
);

const gridLines = computed(() =>
  [0, 0.25, 0.5, 0.75, 1].map((ratio) => ({
    ratio,
    y: yOf(maxValue.value * ratio),
    label: compact.value
      ? numberCompact(maxValue.value * ratio)
      : currencyCompact(maxValue.value * ratio),
  })),
);

/** На узких экранах подписываем не каждый цикл, иначе подписи столкнутся */
const labelEvery = computed(() => Math.ceil(props.points.length / (width.value < 520 ? 5 : 10)));

function xLabel(point: CyclePoint) {
  return point.cycle === 0 ? t("calc.chart.start") : String(point.cycle);
}

const active = computed(() => (hovered.value === null ? null : bars.value[hovered.value]));

const tooltipStyle = computed(() => {
  if (!active.value) return {};
  const clampedX = Math.min(Math.max(active.value.centerX, 90), width.value - 90);
  return { left: `${clampedX}px`, top: `${Math.max(8, active.value.totalTop - 12)}px` };
});

const chartLabel = computed(
  () => `${t("calc.chart.title")}: ${currency(props.points[0]!.total)} → ${currency(props.points.at(-1)!.total)}`,
);
</script>

<template>
  <figure class="mt-0">
    <figcaption class="flex flex-wrap items-center justify-between gap-3">
      <div class="flex flex-wrap items-center gap-4">
        <span class="text-muted flex items-center gap-2 text-xs">
          <span
            class="size-2.5 rounded-[3px]"
            :style="{ backgroundColor: 'var(--chart-capital)' }"
          />
          {{ $t("calc.chart.capital") }}
        </span>
        <span class="text-muted flex items-center gap-2 text-xs">
          <span class="size-2.5 rounded-[3px]" :style="{ backgroundColor: 'var(--chart-profit)' }" />
          {{ $t("calc.chart.profit") }}
        </span>
      </div>

      <UButton
        size="xs"
        color="neutral"
        variant="ghost"
        :icon="showTable ? 'i-lucide-chevron-up' : 'i-lucide-table'"
        :label="showTable ? $t('calc.chart.hideTable') : $t('calc.chart.showTable')"
        @click="showTable = !showTable"
      />
    </figcaption>

    <div ref="wrapper" class="relative mt-3 w-full">
      <!-- ширина только через CSS: фиксированный атрибут width распирал страницу на узких экранах -->
      <svg
        :height="height"
        :viewBox="`0 0 ${width} ${height}`"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        :aria-label="chartLabel"
        class="block w-full"
      >
        <g>
          <line
            v-for="line in gridLines"
            :key="line.ratio"
            :x1="pad.left"
            :x2="width - pad.right"
            :y1="line.y"
            :y2="line.y"
            stroke="var(--chart-grid)"
            stroke-width="1"
          />
          <text
            v-for="line in gridLines"
            :key="`label-${line.ratio}`"
            :x="pad.left - 8"
            :y="line.y + 4"
            text-anchor="end"
            font-size="11"
            style="fill: var(--ui-text-dimmed)"
          >
            {{ line.label }}
          </text>
        </g>

        <g v-for="bar in bars" :key="bar.index">
          <path :d="bar.capitalPath" :fill="'var(--chart-capital)'" />
          <path v-if="bar.profitPath" :d="bar.profitPath" :fill="'var(--chart-profit)'" />
        </g>

        <text
          v-if="bars.length"
          :x="bars.at(-1)!.centerX"
          :y="bars.at(-1)!.totalTop - 10"
          text-anchor="end"
          font-size="12"
          font-weight="600"
          style="fill: var(--ui-text-highlighted)"
        >
          {{ currencyCompact(points.at(-1)!.total) }}
        </text>

        <g>
          <text
            v-for="bar in bars.filter((b) => b.index % labelEvery === 0 || b.index === bars.length - 1)"
            :key="`x-${bar.index}`"
            :x="bar.centerX"
            :y="height - 10"
            text-anchor="middle"
            font-size="11"
            style="fill: var(--ui-text-dimmed)"
          >
            {{ xLabel(bar.point) }}
          </text>
        </g>

        <rect
          v-for="bar in bars"
          :key="`hit-${bar.index}`"
          :x="bar.centerX - band / 2"
          :y="pad.top"
          :width="band"
          :height="plot.height"
          fill="transparent"
          @mouseenter="hovered = bar.index"
          @mouseleave="hovered = null"
        />

        <line
          v-if="active"
          :x1="active.centerX"
          :x2="active.centerX"
          :y1="pad.top"
          :y2="pad.top + plot.height"
          stroke="var(--ui-text-dimmed)"
          stroke-width="1"
          stroke-dasharray="3 3"
          opacity="0.5"
        />
      </svg>

      <div
        v-if="active"
        class="bg-default ring-default pointer-events-none absolute z-10 w-44 -translate-x-1/2 -translate-y-full rounded-lg p-3 text-xs shadow-lg ring"
        :style="tooltipStyle"
      >
        <p class="text-highlighted font-semibold">
          {{
            active.point.cycle === 0
              ? $t("calc.chart.start")
              : $t("calc.chart.cycle", { n: active.point.cycle })
          }}
        </p>
        <p class="text-dimmed mt-0.5">{{ $t("calc.chart.month", { n: active.point.month }) }}</p>
        <dl class="mt-2 space-y-1">
          <div class="flex items-center justify-between gap-2">
            <dt class="text-muted flex items-center gap-1.5">
              <span
                class="size-2 rounded-[2px]"
                :style="{ backgroundColor: 'var(--chart-capital)' }"
              />
              {{ $t("calc.chart.capital") }}
            </dt>
            <dd class="text-default tabular-nums">{{ currency(active.point.capital) }}</dd>
          </div>
          <div class="flex items-center justify-between gap-2">
            <dt class="text-muted flex items-center gap-1.5">
              <span
                class="size-2 rounded-[2px]"
                :style="{ backgroundColor: 'var(--chart-profit)' }"
              />
              {{ $t("calc.chart.profit") }}
            </dt>
            <dd class="text-default tabular-nums">{{ currency(active.point.profit) }}</dd>
          </div>
          <div class="border-default mt-1 flex items-center justify-between gap-2 border-t pt-1">
            <dt class="text-muted">{{ $t("calc.chart.total") }}</dt>
            <dd class="text-highlighted font-semibold tabular-nums">
              {{ currency(active.point.total) }}
            </dd>
          </div>
        </dl>
      </div>
    </div>

    <div v-if="showTable" class="border-default mt-4 overflow-x-auto rounded-lg border">
      <table class="w-full text-sm">
        <caption class="text-dimmed px-4 py-2 text-start text-xs">
          {{
            $t("calc.chart.tableCaption")
          }}
        </caption>
        <thead class="bg-elevated/50 text-muted text-xs">
          <tr>
            <th scope="col" class="px-4 py-2 text-start font-medium">
              {{ $t("calc.chart.cycleHeader") }}
            </th>
            <th scope="col" class="px-4 py-2 text-end font-medium">
              {{ $t("calc.chart.capital") }}
            </th>
            <th scope="col" class="px-4 py-2 text-end font-medium">{{ $t("calc.chart.profit") }}</th>
            <th scope="col" class="px-4 py-2 text-end font-medium">{{ $t("calc.chart.total") }}</th>
          </tr>
        </thead>
        <tbody class="divide-default divide-y">
          <tr v-for="point in points" :key="point.cycle">
            <td class="text-muted px-4 py-2">
              {{ point.cycle === 0 ? $t("calc.chart.start") : point.cycle }}
            </td>
            <td class="text-default px-4 py-2 text-end tabular-nums">
              {{ currency(point.capital) }}
            </td>
            <td class="text-default px-4 py-2 text-end tabular-nums">
              {{ currency(point.profit) }}
            </td>
            <td class="text-highlighted px-4 py-2 text-end font-medium tabular-nums">
              {{ currency(point.total) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </figure>
</template>
