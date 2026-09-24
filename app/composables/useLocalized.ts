import type { Locale, Localized } from "#shared/types";

/**
 * Тексты программ хранятся в константе PROGRAMS, а не в i18n-файлах,
 * поэтому язык из них выбираем вручную по активной локали.
 */
export function useLocalized() {
  const { locale } = useI18n();

  const tr = (value: Localized) => value[locale.value as Locale] ?? value.en;

  return { tr };
}
