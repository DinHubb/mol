<script setup lang="ts">
import type { AccordionItem } from "@nuxt/ui";

const { t } = useI18n();
const keys = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8"];

const items = computed<AccordionItem[]>(() =>
  keys.map((key) => ({
    label: t(`faq.items.${key}.q`),
    content: t(`faq.items.${key}.a`),
  })),
);
</script>

<template>
  <UPageSection
    id="faq"
    :headline="$t('faq.headline')"
    :title="$t('faq.title')"
    class="bg-elevated/40"
    :ui="{
      container: 'lg:grid-cols-12 lg:gap-16',
      wrapper: 'lg:col-span-4',
    }"
  >
    <UAccordion
      :items="items"
      class="lg:col-span-8"
      :ui="{
        item: 'border-default py-1',
        trigger: 'text-start text-base font-medium py-4',
        body: 'text-muted text-sm leading-relaxed pb-5',
      }"
    />
  </UPageSection>
</template>
