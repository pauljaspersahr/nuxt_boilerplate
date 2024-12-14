<template>
  <div class="relative min-h-screen w-full flex flex-col">
    <GradientBackground />
    <div class="relative z-10 flex flex-col min-h-screen">
      <SiteHeader />
      <main class="flex-1">
        <slot />
      </main>
      <SiteFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
import seo from '~/config/seo';
import GradientBackground from '~/components/GradientBackground.vue';

useSeoMeta(seo);
</script>
