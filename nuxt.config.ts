// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    // ...
    '@pinia/nuxt',
  ],
  runtimeConfig: {
    MONGODB_URI: process.env.MONGODB_URI,
  },
  css: [
    '/assets/scss/app.scss', 
  ],
  nitro: {
    plugins: ["@/server/db/index.ts"]
  },
})
