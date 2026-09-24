<script setup lang="ts">
const { t } = useI18n();

useSeoMeta({
  title: () => `${t("brand.name")} — ${t("brand.tagline")}`,
  description: () => t("hero.subtitle"),
  ogTitle: () => t("hero.title"),
  ogDescription: () => t("hero.subtitle"),
});
</script>

<template>
  <UPage>
    <LandingHero />
    <LandingPrograms />
    <LandingCalculator />
    <LandingLifecycle />
    <LandingTransparency />
    <LandingSharia />
    <LandingRisks />
    <LandingFaq />
    <LandingCta />
  </UPage>
</template>
