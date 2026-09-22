const INTL_LOCALES: Record<string, string> = {
  en: "en-US",
  ru: "ru-RU",
  tg: "ru-RU", // у Intl нет данных для tg-TJ — разметка чисел совпадает с ru
};

export function useFormat() {
  const { locale } = useI18n();
  const tag = computed(() => INTL_LOCALES[locale.value] ?? "en-US");

  const currency = (value: number, digits = 0) =>
    new Intl.NumberFormat(tag.value, {
      style: "currency",
      currency: CURRENCY,
      maximumFractionDigits: digits,
      minimumFractionDigits: 0,
    }).format(value);

  // trailingZeroDisplay обязателен: без него Node и браузер форматируют «3,0 тыс.» по-разному
  // и ломают гидрацию SSR-разметки графика
  const currencyCompact = (value: number) =>
    new Intl.NumberFormat(tag.value, {
      style: "currency",
      currency: CURRENCY,
      notation: "compact",
      maximumFractionDigits: 1,
      trailingZeroDisplay: "stripIfInteger",
    }).format(value);

  const numberCompact = (value: number) =>
    new Intl.NumberFormat(tag.value, {
      notation: "compact",
      maximumFractionDigits: 1,
      trailingZeroDisplay: "stripIfInteger",
    }).format(value);

  const percent = (value: number, digits = 1) =>
    new Intl.NumberFormat(tag.value, {
      style: "percent",
      maximumFractionDigits: digits,
    }).format(value);

  const number = (value: number) => new Intl.NumberFormat(tag.value).format(value);

  return { currency, currencyCompact, numberCompact, percent, number, tag };
}
