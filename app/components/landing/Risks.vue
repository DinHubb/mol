<script setup lang="ts">
const items = [
  { key: "market", icon: "i-lucide-trending-down" },
  { key: "bio", icon: "i-lucide-heart-pulse" },
  { key: "liquidity", icon: "i-lucide-hourglass" },
  { key: "fx", icon: "i-lucide-banknote" },
  { key: "ops", icon: "i-lucide-triangle-alert" },
];
</script>

<template>
  <UPageSection
    id="risks"
    :headline="$t('risks.headline')"
    :title="$t('risks.title')"
    :description="$t('risks.description')"
    :ui="{
      container: 'pt-0 sm:pt-0 lg:pt-0',
      wrapper:
        'ring-default bg-default rounded-3xl p-8 ring sm:p-12 lg:grid lg:grid-cols-12 lg:gap-10',
      header: 'lg:col-span-4',
      headline: 'text-warning',
      body: 'mt-10 lg:col-span-8 lg:mt-0',
    }"
  >
    <template #body>
      <ul class="grid gap-5 sm:grid-cols-2">
        <li
          v-for="item in items"
          :key="item.key"
          class="bg-elevated/40 border-default rounded-xl border p-5"
        >
          <p
            class="text-highlighted flex items-center gap-2 text-sm font-semibold"
          >
            <UIcon :name="item.icon" class="text-warning size-4" />
            {{ $t(`risks.items.${item.key}.title`) }}
          </p>
          <p class="text-muted mt-2 text-sm leading-relaxed">
            {{ $t(`risks.items.${item.key}.text`) }}
          </p>
        </li>
      </ul>
    </template>
  </UPageSection>
</template>
