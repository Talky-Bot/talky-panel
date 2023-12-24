// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  typescript: {
    shim: false
  },

  css: ['~/assets/main.css'],
  modules: ["@nuxt/image"],

  nitro: {
    preset: 'cloudflare-module'
  }
})