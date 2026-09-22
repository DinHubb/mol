<script setup lang="ts">
const { t } = useI18n();

const columns = computed(() => [
  {
    label: t("footer.product"),
    children: [
      { label: t("footer.links.programs"), to: "#programs" },
      { label: t("footer.links.calculator"), to: "#calculator" },
      { label: t("footer.links.how"), to: "#lifecycle" },
    ],
  },
  {
    label: t("footer.company"),
    children: [
      { label: t("footer.links.partners"), to: "#cta" },
      { label: t("footer.links.contacts"), to: "#cta" },
      { label: t("footer.links.careers"), to: "#cta" },
    ],
  },
  {
    label: t("footer.legal"),
    children: [
      { label: t("footer.links.terms"), to: "#" },
      { label: t("footer.links.privacy"), to: "#" },
      { label: t("footer.links.risk"), to: "#risks" },
    ],
  },
]);
</script>

<template>
  <UFooter :ui="{ top: 'border-b border-default' }">
    <template #top>
      <UContainer class="py-10">
        <div class="grid gap-10 lg:grid-cols-4">
          <div class="max-w-sm">
            <div class="flex items-center gap-2.5">
              <BrandMark :size="28" />
              <span class="text-base font-bold tracking-tight">{{ $t("brand.name") }}</span>
            </div>
            <p class="text-muted mt-3 text-sm">{{ $t("footer.about") }}</p>
          </div>

          <div v-for="column in columns" :key="column.label">
            <p class="text-highlighted text-sm font-semibold">{{ column.label }}</p>
            <ul class="mt-3 space-y-2">
              <li v-for="child in column.children" :key="child.label">
                <ULink :to="child.to" class="text-muted hover:text-default text-sm">
                  {{ child.label }}
                </ULink>
              </li>
            </ul>
          </div>
        </div>

        <p class="text-dimmed mt-10 max-w-3xl text-xs leading-relaxed">
          {{ $t("footer.disclaimer") }}
        </p>
      </UContainer>
    </template>

    <template #left>
      <p class="text-muted text-sm">
        © {{ new Date().getFullYear() }} {{ $t("brand.name") }}. {{ $t("footer.rights") }}
      </p>
    </template>

    <template #right>
      <UButton
        icon="i-simple-icons-telegram"
        color="neutral"
        variant="ghost"
        to="#cta"
        aria-label="Telegram"
      />
      <UButton
        icon="i-simple-icons-whatsapp"
        color="neutral"
        variant="ghost"
        to="#cta"
        aria-label="WhatsApp"
      />
      <UButton
        icon="i-lucide-mail"
        color="neutral"
        variant="ghost"
        to="#cta"
        aria-label="Email"
      />
    </template>
  </UFooter>
</template>
