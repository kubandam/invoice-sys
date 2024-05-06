// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Inovice sys', 
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
      ]
    }
  },
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
  plugins: ['@/plugins/export.ts']
})
