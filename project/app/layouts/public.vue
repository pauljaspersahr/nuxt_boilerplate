<script setup lang="ts">
import seo from '~/config/seo';
useSeoMeta(seo);
</script>

<template>
  <div>
    <SiteHeader />
    <main class="flex-1">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>
