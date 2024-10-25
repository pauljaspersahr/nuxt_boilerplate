// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxtjs/color-mode",
    "nuxt-gtag",
    "nuxt-vercel-analytics",
    "@nuxtjs/robots",
    "@nuxtjs/sitemap",
    "nuxt-og-image",
    "@nuxt/image",
    "@nuxt/test-utils/module",
  ],

  plugins: [{ src: "@/plugins/aos", mode: "client" }],
  ssr: true,

  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
  // fixes shadcn-vue cli problem: https://github.com/radix-vue/shadcn-vue/issues/560#issuecomment-2130900430
  typescript: {
    tsConfig: {
      compilerOptions: {
        baseUrl: ".",
      },
    },
  },

  colorMode: {
    classSuffix: "",
  },
  runtimeConfig: {
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    stripeEndpointSecret: process.env.STRIPE_ENDPOINT_SECRET,
    subscriptionGraceDays: 3,
    initialPlanName: "Free Trial",
    initialPlanActiveMonths: 1,
    databaseUrl:
      process.env.NODE_ENV === "production"
        ? process.env.DATABASE_URL
        : "postgres://myuser:mypassword@localhost:5432/mydatabase",

    public: {
      siteUrl: process.env.SITE_URL || "http://localhost:3000",
    },
  },

  gtag: {
    id: "G-XXXXXXXXXX",
  },
  build: {
    transpile: ["trpc-nuxt"],
  },
  compatibilityDate: "2024-10-21",
});
