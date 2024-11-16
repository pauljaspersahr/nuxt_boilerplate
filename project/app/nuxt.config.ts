// https://nuxt.com/docs/api/configuration/nuxt-config
const publicRoutes = ['/', '/signup', '/signin'];

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
    'nuxt-og-image',
    '@nuxt/image',
    '@nuxt/test-utils/module',
    'nuxt-aos',
  ],
  ssr: true,
  // routeRules: {
  //   ...publicRoutes.reduce(
  //     (acc, route) => ({
  //       ...acc,
  //       [route]: { prerender: true },
  //     }),
  //     {},
  //   ),
  // },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui',
  },
  aos: {
    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
    initClassName: 'aos-init', // class applied after initialization
    animatedClassName: 'aos-animate', // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 120, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 400, // values from 0 to 3000, with step 50ms
    easing: 'ease', // default easing for AOS animations
    once: false, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
  },
  // fixes shadcn-vue cli problem: https://github.com/radix-vue/shadcn-vue/issues/560#issuecomment-2130900430
  typescript: {
    tsConfig: {
      compilerOptions: {
        baseUrl: '.',
      },
    },
  },
  colorMode: {
    classSuffix: '',
  },
  runtimeConfig: {
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    stripeEndpointSecret: process.env.STRIPE_ENDPOINT_SECRET,
    subscriptionGraceDays: 3,
    initialPlanName: 'Free Trial',
    initialPlanActiveMonths: 1,
    public: {
      siteUrl: process.env.SITE_URL || 'http://localhost:3000',
      auth: {
        redirectUserTo: '/dashboard',
        redirectGuestTo: '/',
      },
      publicRoutes: publicRoutes,
    },
  },
  gtag: {
    id: 'G-XXXXXXXXXX',
  },
  build: {
    transpile: ['trpc-nuxt'],
  },
  nitro: {
    preset: 'aws-lambda',
  },
  pages: true,
  compatibilityDate: '2024-10-21',
});
