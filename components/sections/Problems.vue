<template>
  <section :id="sectionId" data-aos="fade-up" class="py-24 sm:py-32">
    <div class="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-8 text-center">
      <h2 class="text-3xl max-w-[40rem] font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
        {{ title }}
      </h2>
      <p class="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
        {{ description }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
// Define props
const props = defineProps({
  sectionId: {
    type: String,
    default: 'problems',
  },
  title: {
    type: String,
    default: "We've all been there"
  },
  description: {
    type: String,
    default: "Being short on time and wanting to launch a new product. You want to spend your time wisely, but also deliver a quality product. Luckily, we have built the landingpage you've always dreamed of."
  }
});
</script>
