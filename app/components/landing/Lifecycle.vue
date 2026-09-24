<script setup lang="ts">
const steps = [
  { key: "s1", icon: "i-lucide-file-signature" },
  { key: "s2", icon: "i-lucide-tag" },
  { key: "s3", icon: "i-lucide-activity" },
  { key: "s4", icon: "i-lucide-truck" },
  { key: "s5", icon: "i-lucide-wallet" },
];
</script>

<template>
  <UPageSection
    id="lifecycle"
    :headline="$t('lifecycle.headline')"
    :title="$t('lifecycle.title')"
    :description="$t('lifecycle.description')"
    :ui="{
      container: 'lg:grid-cols-12 lg:gap-16',
      wrapper: 'lg:col-span-4',
      header: 'lg:sticky lg:top-24',
    }"
  >
    <ol class="relative lg:col-span-8">
      <li
        v-for="(step, index) in steps"
        :key="step.key"
        class="relative flex gap-5 pb-10 last:pb-0"
      >
        <span
          v-if="index < steps.length - 1"
          class="bg-default absolute start-5.5 top-12 bottom-0 w-px"
          aria-hidden="true"
        />
        <span
          class="bg-primary/10 text-primary ring-default relative flex size-11 shrink-0 items-center justify-center rounded-xl ring"
        >
          <UIcon :name="step.icon" class="size-5" />
        </span>
        <div class="pt-1">
          <p class="text-dimmed text-xs font-medium tracking-wide uppercase">
            {{ String(index + 1).padStart(2, "0") }}
          </p>
          <h3 class="text-highlighted mt-1 text-lg font-semibold">
            {{ $t(`lifecycle.steps.${step.key}.title`) }}
          </h3>
          <p class="text-muted mt-2 text-sm leading-relaxed">
            {{ $t(`lifecycle.steps.${step.key}.text`) }}
          </p>
        </div>
      </li>
    </ol>
  </UPageSection>
</template>
