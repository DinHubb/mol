// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  modules: ["@nuxt/eslint", "@nuxt/image", "@nuxt/ui", "@nuxtjs/i18n"],
  css: ["~/assets/css/main.css"],

  i18n: {
    locales: [
      { code: "en", name: "English", language: "en-US" },
      { code: "ru", name: "Russia", language: "ru-RU" },
      { code: "tg", name: "Tajik", language: "tg-TJ" },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
    },
    strategy: "prefix",
    defaultLocale: "en",
  },
});
