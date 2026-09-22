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
  <section id="lifecycle" class="py-16 sm:py-24">
    <UContainer>
      <div class="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div class="lg:col-span-4">
          <div class="lg:sticky lg:top-24">
            <p
              class="text-primary text-sm font-semibold tracking-wide uppercase"
            >
              {{ $t("lifecycle.headline") }}
            </p>
            <h2
              class="text-highlighted mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl"
            >
              {{ $t("lifecycle.title") }}
            </h2>
            <p class="text-muted mt-4 text-base leading-relaxed">
              {{ $t("lifecycle.description") }}
            </p>
          </div>
        </div>

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
              <p
                class="text-dimmed text-xs font-medium tracking-wide uppercase"
              >
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
      </div>
    </UContainer>
  </section>
</template>
