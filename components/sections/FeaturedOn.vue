<template>
  <section :id="sectionId" data-aos="fade-up" class="container py-8 md:py-12">
    <div class="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
      <h2
          class="text-sm font-bold uppercase tracking-tight text-muted-foreground"
      >
        {{ title }}
      </h2>
      <div class="mt-4 flex flex-wrap items-center justify-center gap-10 gap-y-8 lg:gap-16">
        <a
            v-for="(item, index) in items"
            :key="index"
            :href="item.href"
            target="_blank"
            class="duration-250 flex flex-col items-center transition text-muted-foreground hover:text-foreground"
        >
          <component :is="item.logo" class="h-[2rem]" />
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Producthunt from "~/components/icons/Producthunt.vue";
import Hackernews from "~/components/icons/Hackernews.vue";
import Reddit from "~/components/icons/Reddit.vue";

// Define props
const props = defineProps({
  sectionId: {
    type: String,
    default: "featured-on"
  },
  title: {
    type: String,
    default: "Featured on"
  },
  items: {
    type: Array,
    default: () => [
      {
        href: "#",
        logo: Producthunt
      },
      {
        href: "#",
        logo: Hackernews
      },
      {
        href: "#",
        logo: Reddit
      }
    ]
  }
});
</script>
