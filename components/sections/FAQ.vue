<template>
  <section :id="sectionId" data-aos="fade-up" class="py-20">
    <div class="mx-auto flex max-w-[58rem] flex-col items-center justify-center text-center mb-12">
      <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl mb-6">
        {{ title }}
      </h2>
      <p class="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
        {{ description }}
      </p>
    </div>
    <div class="container max-w-4xl py-2">
      <Accordion type="single" class="w-full" collapsible :default-value="defaultValue">
        <AccordionItem v-for="item in accordionItems" :key="item.value" :value="item.value">
          <AccordionTrigger class="text-lg">{{ item.title }}</AccordionTrigger>
          <AccordionContent class="text-lg text-muted-foreground">
            {{ item.content }}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

// Define props
const props = defineProps({
  sectionId: {
    type: String,
    default: 'faq'
  },
  title: {
    type: String,
    default: 'Frequently Asked Questions'
  },
  description: {
    type: String,
    default: 'Discover answers to common queries about our this template.'
  },
  defaultValue: {
    type: String,
    default: 'item-1'
  },
  accordionItems: {
    type: Array,
    default: () => [
      { value: 'item-1', title: 'Is it compatible with Nuxt 3?', content: 'Yes, our components are fully compatible with Nuxt 3.' },
      { value: 'item-2', title: 'Do you provide support?', content: 'Absolutely! Our dedicated support team is ready to assist you.' },
      { value: 'item-3', title: 'Can I customize the components?', content: 'Of course! Our components are highly customizable to suit your needs.' }
    ]
  }
});
</script>
