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
        <LoadingButton
          :loading="loading"
          :enableOn="true"
          buttonText="Sing Out"
          loadingText="Signing out..."
          :onClick="handleSignOut"
        />
      </div>
    </div>
  </header>
</template>

<script setup>
import LoadingButton from '~/components/shared/LoadingButton.vue';
import { siteConfig } from '@/config/site';
import IconsLogo from '@/components/icons/Logo.vue';
import ModeToggle from '@/components/shared/ModeToggle.vue';
import { authClient } from '~/lib/auth.client';

const { toast } = useToast();

const loading = ref(false);

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
  if (loading.value) return;

  await authClient.signOut(
    {},
    {
      onSuccess: () => {
        navigateTo(props.signOutRedirect);
      },
      onError: (ctx) => {
        toast({
          title: 'Uh oh! Something went wrong.',
          description: ctx.error.message,
          variant: 'destructive',
        });
      },
      onRequest: () => {
        loading.value = true;
      },
      onResponse: () => {
        loading.value = false;
      },
    },
  );
};
</script>
