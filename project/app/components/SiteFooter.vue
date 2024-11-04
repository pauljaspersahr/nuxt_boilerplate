<template>
  <footer class="border-t py-6 md:px-8 md:py-0">
    <div
      class="container grid grid-cols-1 gap-6 py-14 sm:grid-cols-2 md:grid-cols-5"
    >
      <div
        class="col-span-5 xl:col-span-2 flex justify-center md:justify-start items-start flex-col space-y-2"
      >
        <NuxtLink :to="homeLink" class="mr-6 flex items-center space-x-2">
          <IconsLogo />
          <span class="font-bold">
            {{ siteName }}
          </span>
        </NuxtLink>
        <p class="md:max-w-[75%] leading-normal text-muted-foreground">
          {{ siteDescription }}
        </p>
      </div>
      <div v-for="section in footerSections" :key="section.title">
        <span class="text-sm font-medium text-foreground">
          {{ section.title }}
        </span>
        <ul class="mt-4 list-inside space-y-3">
          <li v-for="link in section.items" :key="link.title">
            <NuxtLink
              :to="link.href"
              class="text-sm text-muted-foreground hover:text-primary"
            >
              {{ link.title }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>

    <div class="border-t">
      <div
        class="container flex flex-col items-center justify-between gap-4 py-6 md:flex-row"
      >
        <p
          class="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left"
        >
          Built with love in Nuxt 3 with{{ " " }}
          <a
            href="https://www.shadcn-vue.com"
            target="_blank"
            rel="noreferrer"
            class="font-medium underline underline-offset-4"
          >
            Shadcn UI </a
          >.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import IconsLogo from "@/components/icons/Logo.vue";
import { siteConfig } from "@/config/site";
import { footerSections } from "@/config/navigation";

// Define props
const props = defineProps({
  siteName: {
    type: String,
    default: () => siteConfig.name,
  },
  siteDescription: {
    type: String,
    default: () => siteConfig.description,
  },
  homeLink: {
    type: String,
    default: "/",
  },
  footerSections: {
    type: Array,
    default: () => footerSections,
  },
});
</script>
