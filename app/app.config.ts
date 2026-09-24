export default defineAppConfig({
  // https://ui.nuxt.com/getting-started/theme#design-system
  ui: {
    colors: {
      primary: "clay",
      secondary: "sand",
      neutral: "stone",
    },
    card: {
      slots: {
        root: "rounded-2xl",
      },
    },
    pageCard: {
      slots: {
        root: "rounded-2xl",
        // Тема даёт items-start — содержимое карточки сжимается по ширине
        // контента, из-за чего разделители и block-кнопки не на всю карточку.
        wrapper: "items-stretch",
        title: "text-xl",
      },
    },
    pageHero: {
      slots: {
        container: "py-16 sm:py-24 lg:py-24",
      },
    },
    pageSection: {
      slots: {
        container: "lg:py-24",
      },
      variants: {
        orientation: {
          vertical: {
            headline: "justify-start",
            leading: "justify-start",
            title: "text-start",
            description: "text-start text-pretty",
            links: "justify-start",
          },
        },
      },
    },
  },
});
