<template>
  <header
    class="sticky top-0 z-50 w-[90%] mx-auto mt-1 rounded-full border-b border-none shadow-sm bg-white/30 backdrop-filter backdrop-blur-md bg-opacity-0"
  >
    <div class="container flex h-14 items-center justify-between">
      <NuxtLink :to="homeLink" class="mr-6 flex items-center space-x-2">
        <IconsLogo />
        <span class="font-bold">
          {{ siteName }}
        </span>
      </NuxtLink>
      <MainNav />
      <div class="flex items-center space-x-2">
        <ModeToggle />
        <NuxtLink :to="signInLink">
          <div :class="buttonVariants({ variant: 'outlineTransparent' })">
            {{ signInText }}
          </div>
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup>
import MainNav from '~/components/Navbar.vue';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import IconsLogo from '@/components/icons/Logo.vue';
import ModeToggle from '~/components/shared/ModeToggle.vue';

// Define props
const props = defineProps({
  siteName: {
    type: String,
    default: siteConfig.name,
  },
  homeLink: {
    type: String,
    default: '/',
  },
  signInLink: {
    type: String,
    default: '/signin',
  },
  signUpLink: {
    type: String,
    default: '/signup',
  },
  signInText: {
    type: String,
    default: 'Sign In',
  },
  signUpText: {
    type: String,
    default: 'Sign Up',
  },
});
</script>
