<script setup lang="ts">
const items = [
  { key: "tag", icon: "i-lucide-scan-line" },
  { key: "vet", icon: "i-lucide-stethoscope" },
  { key: "insurance", icon: "i-lucide-shield-check" },
  { key: "reports", icon: "i-lucide-file-text" },
  { key: "audit", icon: "i-lucide-clipboard-check" },
  { key: "custody", icon: "i-lucide-landmark" },
];
</script>

<template>
  <section id="transparency" class="bg-elevated/40 py-16 sm:py-24">
    <UContainer>
      <div class="max-w-3xl">
        <p class="text-primary text-sm font-semibold tracking-wide uppercase">
          {{ $t("transparency.headline") }}
        </p>
        <h2
          class="text-highlighted mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl"
        >
          {{ $t("transparency.title") }}
        </h2>
        <p class="text-muted mt-4 text-base leading-relaxed">
          {{ $t("transparency.description") }}
        </p>
      </div>

      <div class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="item in items"
          :key="item.key"
          class="bg-default ring-default rounded-2xl p-6 ring"
        >
          <span
            class="bg-secondary/15 text-secondary flex size-10 items-center justify-center rounded-lg"
          >
            <UIcon :name="item.icon" class="size-5" />
          </span>
          <h3 class="text-highlighted mt-4 text-base font-semibold">
            {{ $t(`transparency.items.${item.key}.title`) }}
          </h3>
          <p class="text-muted mt-2 text-sm leading-relaxed">
            {{ $t(`transparency.items.${item.key}.text`) }}
          </p>
        </div>
      </div>
    </UContainer>
  </section>
</template>
