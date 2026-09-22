// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  modules: ["@nuxt/eslint", "@nuxt/image", "@nuxt/ui", "@nuxtjs/i18n"],
  css: ["~/assets/css/main.css"],

  app: {
    baseURL,
    head: {
      htmlAttrs: { lang: "en" },
      link: [{ rel: "icon", href: `${baseURL}favicon.ico` }],
    },
  },

  i18n: {
    locales: [
      { code: "en", name: "English", language: "en-US", file: "en.json" },
      { code: "ru", name: "Русский", language: "ru-RU", file: "ru.json" },
      { code: "tg", name: "Тоҷикӣ", language: "tg-TJ", file: "tg.json" },
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
