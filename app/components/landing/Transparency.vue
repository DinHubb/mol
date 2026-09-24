<script setup lang="ts">
import type { Localized } from "#shared/types";

interface TransparencyItem {
  icon: string;
  title: Localized;
  text: Localized;
}

/**
 * Тексты карточек живут здесь, а не в i18n: карточка — это единая запись
 * (иконка + три языка), добавление пункта не требует правок трёх локалей.
 */
const ITEMS: TransparencyItem[] = [
  {
    icon: "i-lucide-scan-line",
    title: {
      en: "Every head identified",
      ru: "Идентификация каждой головы",
      tg: "Шиносоии ҳар сар",
    },
    text: {
      en: "A uniquely numbered ear tag, a veterinary passport and a link between that number and your contract.",
      ru: "Ушная бирка с уникальным номером, ветеринарный паспорт и привязка номера к вашему договору.",
      tg: "Нишонаи гӯшӣ бо рақами ягона, шиносномаи байторӣ ва пайванди ин рақам ба шартномаи шумо.",
    },
  },
  {
    icon: "i-lucide-stethoscope",
    title: {
      en: "Veterinary control",
      ru: "Ветеринарный контроль",
      tg: "Назорати байторӣ",
    },
    text: {
      en: "Scheduled examinations, vaccination and quarantine for new animals under the farm's protocol.",
      ru: "Плановые осмотры, вакцинация и карантин новых животных по протоколу хозяйства.",
      tg: "Муоинаи нақшавӣ, эмгузаронӣ ва карантини ҳайвоноти нав тибқи протоколи хоҷагӣ.",
    },
  },
  {
    icon: "i-lucide-shield-check",
    title: {
      en: "Herd insurance",
      ru: "Страхование поголовья",
      tg: "Суғуртаи рама",
    },
    text: {
      en: "Mortality and accidents are covered by a policy; the terms and the deductible are stated in the contract.",
      ru: "Падёж и несчастные случаи покрываются полисом; условия и франшиза прописаны в договоре.",
      tg: "Талафот ва ҳодисаҳо бо полиси суғурта пӯшонида мешаванд; шартҳо ва франшиза дар шартнома оварда шудаанд.",
    },
  },
  {
    icon: "i-lucide-file-text",
    title: {
      en: "Reports in your dashboard",
      ru: "Отчёты в кабинете",
      tg: "Ҳисобот дар кабинет",
    },
    text: {
      en: "Monthly weight gain, photo evidence, cycle costs and sale documents in one place.",
      ru: "Ежемесячный привес, фотофиксация, расходы цикла и акты реализации — в одном месте.",
      tg: "Вазнафзоии моҳона, аксҳо, хароҷоти давра ва санадҳои фурӯш дар як ҷо.",
    },
  },
  {
    icon: "i-lucide-clipboard-check",
    title: {
      en: "Independent headcount",
      ru: "Независимая инвентаризация",
      tg: "Барӯйхатгирии мустақил",
    },
    text: {
      en: "An external contractor recounts the herd and files a report available to every investor in the program.",
      ru: "Пересчёт поголовья внешним подрядчиком с отчётом, доступным всем инвесторам программы.",
      tg: "Ҳисоби дубораи рама аз ҷониби пудратчии беруна бо ҳисоботи дастрас ба ҳамаи сармоягузорони барнома.",
    },
  },
  {
    icon: "i-lucide-landmark",
    title: {
      en: "Segregated funds",
      ru: "Раздельный учёт средств",
      tg: "Ҳисоби ҷудогонаи маблағҳо",
    },
    text: {
      en: "Investor money is accounted for separately from the platform's operating accounts.",
      ru: "Деньги инвесторов учитываются отдельно от операционных счетов платформы.",
      tg: "Маблағи сармоягузорон аз ҳисобҳои амалиётии платформа ҷудо ҳисоб карда мешавад.",
    },
  },
];

const { tr } = useLocalized();
</script>

<template>
  <UPageSection
    id="transparency"
    :headline="$t('transparency.headline')"
    :title="$t('transparency.title')"
    :description="$t('transparency.description')"
    class="bg-elevated/40"
  >
    <UPageGrid>
      <UPageCard
        v-for="item in ITEMS"
        :key="item.title.en"
        :title="tr(item.title)"
        :description="tr(item.text)"
        :icon="item.icon"
        spotlight
        spotlight-color="primary"
        :ui="{
          leading:
            'mb-4 size-10 bg-secondary/15 rounded-lg flex justify-center item-center',
        }"
      />
    </UPageGrid>
  </UPageSection>
</template>
