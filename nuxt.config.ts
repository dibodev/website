// https://nuxt.com/docs/api/configuration/nuxt-config
import { siteUrl } from './utils/app.infos'

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
    '@nuxtjs/plausible',
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
      siteUrl
    }
  },
  i18n: {
    lazy: true,
    strategy: 'prefix',
    langDir: 'locales',
    locales: [
      {
        code: 'fr',
        iso: 'fr-FR',
        file: 'fr.json',
        isCatchallLocale: true
      },
      {
        code: 'en',
        iso: 'en-Us',
        file: 'en.json'
      },
      {
        code: 'es',
        iso: 'es-ES',
        file: 'es.json'
      }
    ],
    defaultLocale: 'fr',
    detectBrowserLanguage: {
      fallbackLocale: 'fr',
      alwaysRedirect: true,
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    }
  },
  devtools: {
    enabled: true
  }
})
