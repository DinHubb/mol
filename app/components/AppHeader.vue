<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const { t } = useI18n();
const { locale, locales, setLocale } = useI18n();
const localePath = useLocalePath();

const items = computed<NavigationMenuItem[]>(() => [
  { label: t("nav.programs"), to: "#programs" },
  { label: t("nav.calculator"), to: "#calculator" },
  { label: t("nav.how"), to: "#lifecycle" },
  { label: t("nav.transparency"), to: "#transparency" },
  { label: t("nav.faq"), to: "#faq" },
]);

const localeItems = computed(() =>
  locales.value.map((l) => ({
    label: typeof l === "string" ? l : l.name || l.code,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSelect: () => setLocale((typeof l === "string" ? l : l.code) as any),
    checked: (typeof l === "string" ? l : l.code) === locale.value,
    type: "checkbox" as const,
  })),
);
</script>

<template>
  <!-- `to` вместо NuxtLink в слоте: UHeader сам оборачивает заголовок в <a> -->
  <UHeader
    :to="localePath('/')"
    :ui="{ root: 'border-default/60 bg-default/80 backdrop-blur' }"
  >
    <template #title>
      <span class="flex items-center gap-2.5">
        <BrandMark :size="30" />
        <span class="flex flex-col leading-none">
          <span class="text-base font-bold tracking-tight">{{ $t("brand.name") }}</span>
          <span class="text-muted mt-0.5 text-[11px]">{{ $t("brand.tagline") }}</span>
        </span>
      </span>
    </template>

    <UNavigationMenu :items="items" variant="link" />

    <template #right>
      <UDropdownMenu :items="localeItems" :content="{ align: 'end' }">
        <UButton
          color="neutral"
          variant="ghost"
          icon="i-lucide-languages"
          :aria-label="$t('nav.language')"
          :label="locale.toUpperCase()"
          class="hidden sm:inline-flex"
        />
        <UButton
          color="neutral"
          variant="ghost"
          icon="i-lucide-languages"
          :aria-label="$t('nav.language')"
          class="sm:hidden"
        />
      </UDropdownMenu>

      <UColorModeButton :aria-label="$t('nav.toggleTheme')" />

      <UButton to="#cta" :label="$t('nav.cta')" class="hidden lg:inline-flex" />
    </template>

    <template #body>
      <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
      <UButton to="#cta" :label="$t('nav.cta')" block class="mt-4" />
    </template>
  </UHeader>
</template>
