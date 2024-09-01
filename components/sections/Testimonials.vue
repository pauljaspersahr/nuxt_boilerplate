<template>
  <section :id="sectionId" data-aos="fade-up" class="py-24 sm:py-32">
    <div class="mx-auto flex max-w-[58rem] flex-col items-center justify-center text-center mb-16">
      <div class="text-primary mb-4 font-semibold">{{ sectionTitle }}</div>
      <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl mb-6">
        {{ title }}
      </h2>
      <p class="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
        {{ description }}
      </p>
    </div>
    <div class="container flex max-w-7xl flex-col gap-10 sm:gap-y-16">
      <div class="column-1 gap-5 space-y-5 md:columns-2 lg:columns-3 xl:columns-4">
        <Testimonial v-for="(testimonial, index) in testimonials" :key="index" :testimonial="testimonial" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Testimonial from '@/components/shared/Testimonial.vue';

// Define props
const props = defineProps({
  sectionId: {
    type: String,
    default: 'testimonials',
  },
  sectionTitle: {
    type: String,
    default: 'Testimonials'
  },
  title: {
    type: String,
    default: 'What People Are Saying'
  },
  description: {
    type: String,
    default: 'Discover how others have benefited from our Nuxt 3 template and start building with confidence.'
  },
  testimonials: {
    type: Array,
    default: () => [
      {
        name: "Alice Johnson",
        content: "This landing page is amazing! It's beautifully designed and has everything I need.",
        avatar: "https://i.pravatar.cc/150?img=11",
        position: "Marketing Manager"
      },
      {
        name: "Bob Smith",
        content: "Thanks to this landing page template, I've saved so much time building my website!",
        avatar: "https://i.pravatar.cc/150?img=12",
        position: "Freelancer"
      },
      {
        name: "Charlie Brown",
        content: "Finally, someone built a Nuxt 3 template with Shadcn! It's exactly what I've been looking for.",
        avatar: "https://i.pravatar.cc/150?img=13",
        position: "Web Developer"
      },
      {
        name: "Diana Clark",
        content: "I can't get used to Next.js, but this Nuxt 3 template with Shadcn is a game-changer for me!",
        avatar: "https://i.pravatar.cc/150?img=15",
        position: "UX Designer"
      },
      {
        name: "Ethan Turner",
        content: "I've already made money with this landing page! It's so fast and easy to use. This template has helped me increase my revenue significantly. The design is top-notch and the code is clean and efficient. I highly recommend it to anyone looking to boost their online presence.",
        avatar: "https://i.pravatar.cc/150?img=14",
        position: "Entrepreneur"
      },
      {
        name: "Fiona Martinez",
        content: "In just a week, I've seen a significant increase in conversions after using this landing page. The attention to detail in the design really sets it apart from other templates I've used before. It's intuitive and user-friendly, making it easy for visitors to navigate and engage with my content. I'm extremely satisfied with the results!",
        avatar: "https://i.pravatar.cc/150?img=16",
        position: "Business Owner"
      }
    ]
  }
});
</script>
