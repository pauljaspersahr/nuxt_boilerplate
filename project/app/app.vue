<script setup lang="ts">
import Toaster from '@/components/ui/toast/Toaster.vue';

import { siteConfig } from '~/config/site';

useSeoMeta({
  title: siteConfig.name,
  description: siteConfig.description,
  twitterCard: 'summary_large_image',
});
</script>

<template>
  <Toaster />

  <SiteHeader />

  <main class="flex-1">
    <NuxtPage />
  </main>

  <SiteFooter />
</template>
