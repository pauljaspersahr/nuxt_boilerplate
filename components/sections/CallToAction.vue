<template>
  <section :id="sectionId" class="py-24 sm:py-32 bg-slate-300 bg-opacity-10">
    <div data-aos="fade-up" class="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-8 text-center">
      <h2 class="text-3xl font-bold tracking-tight sm:text-3xl md:text-6xl">
        {{ title }}
      </h2>
      <p class="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
        {{ description }}
      </p>
      <NuxtLink :to="buttonLink" :class="cn(buttonVariants({ size: 'lg' }))">
        {{ buttonText }}
        <Icon icon="radix-icons:arrow-right" class="ml-2 size-4"/>
      </NuxtLink>
    </div>
  </section>
</template>

<script lang="ts" setup>
import {cn} from "@/lib/utils";
import {buttonVariants} from "@/components/ui/button";
import {Icon} from "@iconify/vue";

// Define props
const props = defineProps({
  sectionId: {
    type: String,
    default: 'cta'
  },
  title: {
    type: String,
    default: 'Start building in minutes!'
  },
  description: {
    type: String,
    default: 'Low on time and more productive with Nuxt? Don\'t miss out on building an amazing product and start getting customers.'
  },
  buttonText: {
    type: String,
    default: 'Get this template'
  },
  buttonLink: {
    type: String,
    default: '/'
  }
});
</script>
