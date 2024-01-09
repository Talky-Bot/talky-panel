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
    shim: false,
    strict: true,
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
    '/': { prerender: true },
    '/api/**': { cors: true },
    '/login/**': { ssr: false, prerender: true }, // Disable ssr for login so that the state parameter can be generated and verified on the client
  },

  runtimeConfig: {
    DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET!,
    public: {
      DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID!,
      DISCORD_CALLBACK_URL: process.env.DISCORD_CALLBACK_URL!,
    }
  }
})