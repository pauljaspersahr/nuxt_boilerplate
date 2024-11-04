<template>
  <section :id="sectionId" data-aos="fade-up" class="container py-8 md:py-12 lg:py-24">
    <div class="mx-auto grid max-w-7xl gap-16 px-4 sm:gap-y-24 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
      <div class="aspect-w-16 aspect-h-9 relative rounded-xl border">
        <NuxtImg
            class="rounded-xl"
            :src="imageSrc"
            :alt="imageAlt"/>
      </div>
      <div>
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
          {{ title }}
        </h2>
        <p class="mt-6 text-lg/8 text-muted-foreground">
          {{ description }}
        </p>
        <div class="mt-6 grid grid-cols-2 gap-4">
          <div v-for="(feature, index) in featureItems" :key="index" class="rounded-xl border bg-card p-4 text-card-foreground">
            <div class="relative pl-8">
              <div class="font-semibold text-gray-900 dark:text-white">
                <Icon :icon="feature.icon" class="absolute left-0 top-1 size-5 text-primary"/>
                <span>{{ feature.title }}</span>
              </div>
              <div class="leading-6 text-muted-foreground">
                {{ feature.description }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";

const props = defineProps({
  sectionId: {
    type: String,
    default: "features-alt"
  },
  title: {
    type: String,
    default: "Productivity & simplicity"
  },
  description: {
    type: String,
    default: "Enjoy the productivity and simplicity of Nuxt/Vue with UI components that were previously only available for React developers."
  },
  featureItems: {
    type: Array,
    default: () => [
      {
        icon: "radix-icons:moon",
        title: "Shadcn UI components",
        description: "Beautifully designed components for your apps."
      },
      {
        icon: "radix-icons:moon",
        title: "TypeScript support",
        description: "Types implemented within the Vue components."
      },
      {
        icon: "radix-icons:moon",
        title: "SEO & Analytics built-in",
        description: "Google Analytics, Vercel analytics and SEO tools."
      },
      {
        icon: "radix-icons:moon",
        title: "Dark-mode & animations",
        description: "Nice-to-haves taken into account, quality baked-in."
      }
    ]
  },
  imageSrc: {
    type: String,
    default: "images/filestructure.png"
  },
  imageAlt: {
    type: String,
    default: "SaaS"
  }
});
</script>
