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
  <section id="risks" class="pb-16 sm:pb-24">
    <UContainer>
      <div class="ring-default bg-default rounded-3xl p-8 ring sm:p-12">
        <div class="grid gap-10 lg:grid-cols-12">
          <div class="lg:col-span-4">
            <p
              class="text-warning text-sm font-semibold tracking-wide uppercase"
            >
              {{ $t("risks.headline") }}
            </p>
            <h2
              class="text-highlighted mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl"
            >
              {{ $t("risks.title") }}
            </h2>
            <p class="text-muted mt-4 text-base leading-relaxed">
              {{ $t("risks.description") }}
            </p>
          </div>

          <ul class="grid gap-5 sm:grid-cols-2 lg:col-span-8">
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
        </div>
      </div>
    </UContainer>
  </section>
</template>
