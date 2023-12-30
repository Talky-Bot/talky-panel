// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Talky',
      htmlAttrs: {
        lang: 'en',
      }
    }
  },

  typescript: {
    shim: false
  },

  css: ['~/assets/main.css'],
  modules: [
    '@nuxt/image',
    '@pinia/nuxt',
  ],

  nitro: {
    preset: 'cloudflare-module'
  },

  pinia: {
    storesDirs: ['./stores/**']
  },

  routeRules: {
    // '/api/*': { cors: true },
  }
})