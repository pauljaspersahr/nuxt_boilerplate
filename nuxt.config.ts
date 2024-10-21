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
    // "@nuxtjs/supabase",
    "@nuxt/image",
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
  colorMode: {
    classSuffix: "",
  },
  runtimeConfig: {
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
  // supabase: {
  //   redirect: false,
  //   redirectOptions: {
  //     login: "/signin",
  //     callback: "/confirm",
  //   },
  // },
});
