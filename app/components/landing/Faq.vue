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
  <section id="faq" class="bg-elevated/40 py-16 sm:py-24">
    <UContainer>
      <div class="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div class="lg:col-span-4">
          <p class="text-primary text-sm font-semibold tracking-wide uppercase">
            {{ $t("faq.headline") }}
          </p>
          <h2
            class="text-highlighted mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl"
          >
            {{ $t("faq.title") }}
          </h2>
        </div>

        <div class="lg:col-span-8">
          <UAccordion
            :items="items"
            :ui="{
              item: 'border-default py-1',
              trigger: 'text-start text-base font-medium py-4',
              body: 'text-muted text-sm leading-relaxed pb-5',
            }"
          />
        </div>
      </div>
    </UContainer>
  </section>
</template>
