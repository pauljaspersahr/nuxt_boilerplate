<script setup lang="ts">
import Hero from '@/components/landing/Hero.vue';
import FeaturedOn from '@/components/landing/FeaturedOn.vue';
import Problems from '@/components/landing/Problems.vue';
import Features from '@/components/landing/Features.vue';
import FeaturesTwo from '~/components/landing/FeaturesAlt.vue';
import CallToAction from '@/components/landing/CallToAction.vue';
import Testimonials from '@/components/landing/Testimonials.vue';
import Pricing from '@/components/landing/Pricing.vue';
import FAQ from '@/components/landing/FAQ.vue';
definePageMeta({
  layout: 'public',
});
</script>

<template>
  <Hero />
  <FeaturedOn />
  <Problems />
  <Features />
  <FeaturesTwo />
  <Pricing />
  <FAQ />
  <Testimonials />
  <CallToAction />
</template>
