// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  typescript: {
    strict: true,
    typeCheck: true
  },
  components: true,
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    'nuxt-simple-sitemap',
    'nuxt-simple-robots',
    '@nuxtjs/google-fonts'
  ],
  googleFonts: {
    families: {
      Rubik: true
    }
  },
  pinia: {
    autoImports: ['defineStore', 'acceptHMRUpdate']
  },
  // app: {
  //     pageTransition: { name: 'page', mode: 'out-in' },
  //     layoutTransition: { name: 'layout', mode: 'out-in' },
  // },
  runtimeConfig: {
    indexable: true,
    public: {
      siteUrl: import.meta.env.VITE_PRODUCTION_URL
    }
  },
  i18n: {
    baseUrl: import.meta.env.VITE_PRODUCTION_URL,
    lazy: true,
    vueI18n: './i18n.config.ts',
    langDir: 'locales',
    locales: [
      { code: 'en', iso: 'en-Us', file: 'en.json' },
      { code: 'es', iso: 'es-ES', file: 'es.json' },
      { code: 'fr', iso: 'fr-FR', file: 'fr.json', isCatchallLocale: true }
    ],
    defaultLocale: 'fr',
    detectBrowserLanguage: {
      useCookie: true,
      alwaysRedirect: true,
      cookieKey: 'i18n_redirected'
      // redirectOn: 'root',
    }
  },
  devtools: {
    enabled: true
  }
})
