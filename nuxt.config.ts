// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@nuxtjs/color-mode',
    'nuxt-gtag',
    'nuxt-vercel-analytics',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    "nuxt-og-image",
    '@nuxt/image'
  ],
  plugins: [{ src: "@/plugins/aos", mode: "client" }],
  ssr: true,
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },
  colorMode: {
    classSuffix: ''
  },
  runtimeConfig: {
    // The private keys which are only available within server-side
    apiSecret: '123',
    // Keys within public, will be also exposed to the client-side
    public: {
      siteUrl: 'http://localhost:3000'
    }
  },
  gtag: {
    id: 'G-XXXXXXXXXX'
  }
})