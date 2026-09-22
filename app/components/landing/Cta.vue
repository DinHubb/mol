<template>
  <section id="cta" class="py-16 sm:py-24">
    <UContainer>
      <div
        class="band-earth ring-default rounded-3xl px-8 py-14 text-center ring sm:px-12"
      >
        <h2
          class="text-highlighted mx-auto max-w-2xl text-3xl font-bold tracking-tight text-balance sm:text-4xl"
        >
          {{ $t("cta.title") }}
        </h2>
        <p class="text-muted mx-auto mt-4 max-w-2xl text-base leading-relaxed">
          {{ $t("cta.description") }}
        </p>

        <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
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

        <p class="text-dimmed mt-5 text-xs">{{ $t("cta.note") }}</p>
      </div>
    </UContainer>
  </section>
</template>
