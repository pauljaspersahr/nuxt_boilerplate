<template>
  <section :class="['space-y-6 pb-12 pt-16 lg:py-28', sectionClass]">
    <div class="container grid grid-cols-1 gap-16 lg:grid-cols-2">
      <div
        data-aos="fade-up"
        class="flex flex-col items-center md:items-start gap-5 text-center md:text-left"
      >
        <h1
          :class="[
            'mt-8 scroll-m-20 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl',
            headingClass,
          ]"
        >
          {{ heading }}
        </h1>
        <p
          :class="[
            'max-w-[42rem] text-balance leading-normal text-muted-foreground sm:text-xl sm:leading-8',
            textClass,
          ]"
        >
          {{ text }}
        </p>
        <div class="mt-6 flex justify-center space-x-2 md:space-x-4">
          <NuxtLink
            :to="primaryButtonLink"
            :class="cn(buttonVariants({ size: 'lg' }))"
          >
            {{ primaryButtonText }}
            <Icon :icon="primaryButtonIcon" class="ml-2 size-4" />
          </NuxtLink>
          <NuxtLink
            :to="secondaryButtonLink"
            :class="cn(buttonVariants({ variant: 'outline', size: 'lg' }))"
          >
            {{ secondaryButtonText }}
          </NuxtLink>
        </div>
        <div class="flex flex-col items-center gap-2 md:flex-row md:gap-4 mt-4">
          <div class="inline-flex flex-row-reverse justify-end">
            <span
              v-for="(customer, index) in customerImages"
              :key="index"
              :class="[
                'relative inline-flex items-center justify-center flex-shrink-0 rounded-full h-8 w-8 text-sm ring-2 ring-white dark:ring-gray-900 -me-1.5 first:me-0',
              ]"
            >
              <NuxtImg
                :class="[
                  'rounded-full h-8 w-8 text-sm object-cover object-center',
                ]"
                :src="customer"
                alt="Customer"
              />
            </span>
          </div>
          <div class="text-sm text-primary-950/60 text-pretty">
            <b class="mr-1">{{ productsSold }}</b> happy developers
          </div>
          <div class="flex">
            <Icon
              v-for="(star, index) in stars"
              :key="index"
              :icon="star"
              class="size-4 text-primary"
            />
          </div>
        </div>
      </div>
      <div
        data-aos="fade-up"
        data-aos-delay="300"
        class="flex mx-auto max-w-[100%] sm:max-w-[60%] lg:max-w-[90%]"
      >
        <div class="aspect-w-16 aspect-h-9 relative rounded-xl">
          <NuxtImg class="rounded-xl" :src="imageSrc" alt="Hero" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils';
import { buttonVariants } from '~/components/ui/button';
import { Icon } from '@iconify/vue';

const props = defineProps({
  sectionClass: {
    type: String,
    default: '',
  },
  headingClass: {
    type: String,
    default: '',
  },
  heading: {
    type: String,
    default: 'Launch in minutes with Nuxt 3 and Shadcn',
  },
  text: {
    type: String,
    default:
      'Finally a landing page for Nuxt 3 featuring beautifully crafted Shadcn components. Save a full weekend and launch your next product.',
  },
  textClass: {
    type: String,
    default: '',
  },
  primaryButtonLink: {
    type: String,
    default: '#pricing',
  },
  primaryButtonText: {
    type: String,
    default: 'Get this access',
  },
  primaryButtonIcon: {
    type: String,
    default: 'radix-icons:arrow-right',
  },
  secondaryButtonLink: {
    type: String,
    default: '#features',
  },
  secondaryButtonText: {
    type: String,
    default: 'Learn more',
  },
  customerImages: {
    type: Array,
    default: () => [
      'https://i.pravatar.cc/150?img=1',
      'https://i.pravatar.cc/150?img=2',
      'https://i.pravatar.cc/150?img=3',
      'https://i.pravatar.cc/150?img=4',
      'https://i.pravatar.cc/150?img=5',
      'https://i.pravatar.cc/150?img=6',
    ],
  },
  productsSold: {
    type: Number,
    default: 2981,
  },
  stars: {
    type: Array,
    default: () => [
      'radix-icons:star-filled',
      'radix-icons:star-filled',
      'radix-icons:star-filled',
      'radix-icons:star-filled',
      'radix-icons:star',
    ],
  },
  imageSrc: {
    type: String,
    default: 'images/hero.png',
  },
});
</script>
