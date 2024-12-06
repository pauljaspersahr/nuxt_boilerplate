<template>
  <section :id="sectionId" data-aos="fade-up" class="container py-8 md:py-12 lg:py-24">
    <div class="mx-auto grid max-w-7xl gap-16 px-4 sm:gap-y-24 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
      <div>
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
          {{ title }}
        </h2>
        <p class="mt-6 text-lg/8 text-muted-foreground">
          {{ description }}
        </p>
        <dl class="mt-6 space-y-4 leading-7">
          <div v-for="(feature, index) in featureItems" :key="index" class="relative pl-8">
            <dt class="font-semibold text-gray-900 dark:text-white">
              <Icon :icon="feature.icon" class="absolute left-0 top-1 size-5 text-primary" />
              <span>{{ feature.title }}</span>
            </dt>
            <dd class="leading-6 text-muted-foreground">
              {{ feature.description }}
            </dd>
          </div>
        </dl>
      </div>
      <div class="rounded-xl p-4 lg:-m-4">
        <div class="aspect-w-16 aspect-h-9 relative rounded-xl border">
          <NuxtImg
              class="rounded-xl"
              :src="imageSrc"
              :alt="imageAlt" />
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
    default: "features"
  },
  title: {
    type: String,
    default: "Fully featured & ready"
  },
  description: {
    type: String,
    default: ""
  },
  featureItems: {
    type: Array,
    default: () => [
      {
        icon: "radix-icons:magic-wand",
        title: "Clone, configure, deploy",
        description: "Vercel support integrated, just a few clicks and you are ready to go!"
      },
      {
        icon: "radix-icons:ruler-square",
        title: "Customization built-in",
        description: "Easily change the color and text variables, or customize yourself."
      },
      {
        icon: "radix-icons:lightning-bolt",
        title: "Spend time building your product",
        description: "All the set-up work is already taken care of. Get right to building!"
      }
    ]
  },
  imageSrc: {
    type: String,
    default: "https://images.unsplash.com/photo-1556155092-490a1ba16284?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  imageAlt: {
    type: String,
    default: "SaaS"
  }
});
</script>
