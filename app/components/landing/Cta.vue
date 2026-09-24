<template>
  <UPageSection
    id="cta"
    :title="$t('cta.title')"
    :description="$t('cta.description')"
    :ui="{
      wrapper: 'band-earth ring-default rounded-3xl px-8 py-14 ring sm:px-12',
      title: 'mx-auto text-center',
      description: 'mx-auto max-w-2xl text-center',
    }"
  >
    <template #footer>
      <div class="flex flex-wrap items-center justify-center gap-3">
        <UButton
          size="xl"
          :label="$t('cta.primary')"
          icon="i-lucide-send"
          to="#cta"
        />
        <UButton
          size="xl"
          color="neutral"
          variant="subtle"
          :label="$t('cta.secondary')"
          icon="i-simple-icons-telegram"
          to="#cta"
        />
      </div>

      <p class="text-dimmed mt-5 text-center text-xs">{{ $t("cta.note") }}</p>
    </template>
  </UPageSection>
</template>
