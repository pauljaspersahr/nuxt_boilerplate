<template>
  <header
    class="sticky top-0 z-50 w-full border-b border-border/40 bg-background"
  >
    <div class="container flex h-14 items-center justify-between">
      <NuxtLink :to="homeLink" class="mr-6 flex items-center space-x-2">
        <IconsLogo />
        <span class="font-bold">
          {{ siteName }}
        </span>
      </NuxtLink>
      <div class="flex items-center space-x-2">
        <ModeToggle />
        <div
          :class="buttonVariants({ variant: 'default' })"
          @click="handleSignOut"
          class="cursor-pointer"
        >
          {{ signOutText }}
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import IconsLogo from '@/components/icons/Logo.vue';
import ModeToggle from '@/components/shared/ModeToggle.vue';

const { signOut } = useAuth();

// Define props
const props = defineProps({
  siteName: {
    type: String,
    default: siteConfig.name,
  },
  homeLink: {
    type: String,
    default: '/dashboard',
  },
  signOutText: {
    type: String,
    default: 'Sign Out',
  },
  signOutRedirect: {
    type: String,
    default: '/',
  },
});

const handleSignOut = async () => {
  await signOut({ redirectTo: props.signOutRedirect });
};
</script>
