<script setup lang="ts">
const points = [
  { key: "mudaraba", icon: "i-lucide-handshake" },
  { key: "riba", icon: "i-lucide-ban" },
  { key: "asset", icon: "i-lucide-package-check" },
  { key: "halal", icon: "i-lucide-link" },
  { key: "board", icon: "i-lucide-scale" },
];
</script>

<template>
  <section id="sharia" class="py-16 sm:py-24">
    <UContainer>
      <div
        class="band-earth ring-default overflow-hidden rounded-3xl p-8 ring sm:p-12"
      >
        <div class="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div class="lg:col-span-5">
            <p
              class="text-primary text-sm font-semibold tracking-wide uppercase"
            >
              {{ $t("sharia.headline") }}
            </p>
            <h2
              class="text-highlighted mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl"
            >
              {{ $t("sharia.title") }}
            </h2>
            <p class="text-muted mt-4 text-base leading-relaxed">
              {{ $t("sharia.description") }}
            </p>

            <div
              class="bg-default/70 ring-default mt-8 flex gap-3 rounded-xl p-4 ring backdrop-blur"
            >
              <UIcon
                name="i-lucide-info"
                class="text-primary mt-0.5 size-4 shrink-0"
              />
              <p class="text-muted text-sm">{{ $t("sharia.note") }}</p>
            </div>
          </div>

          <div class="lg:col-span-7">
            <dl class="grid gap-x-8 gap-y-6 sm:grid-cols-2">
              <div v-for="point in points" :key="point.key">
                <dt
                  class="text-highlighted flex items-center gap-2 text-base font-semibold"
                >
                  <UIcon :name="point.icon" class="text-primary size-4.5" />
                  {{ $t(`sharia.points.${point.key}.title`) }}
                </dt>
                <dd class="text-muted mt-2 text-sm leading-relaxed">
                  {{ $t(`sharia.points.${point.key}.text`) }}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>
