<script setup lang="ts">
import seo from "~/config/seo";
useSeoMeta(seo);
</script>

<template>
  <div>
    <main class="flex-1">
      <slot />
    </main>
  </div>
</template>
