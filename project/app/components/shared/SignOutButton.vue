<template>
  <LoadingButton
    :loading="loading"
    :enableOn="true"
    buttonText="Sign Out"
    loadingText="Signing out..."
    :onClick="handleSignOut"
  />
</template>

<script lang="ts" setup>
import LoadingButton from '~/components/shared/LoadingButton.vue';
import { authClient } from '~/lib/auth.client';

const loading = ref(false);
const { toast } = useToast();
const userStore = useUserStore();
const { signOut } = userStore;

const props = defineProps<{
  redirect: string;
}>();

const handleSignOut = async () => {
  if (loading.value) return;

  await authClient.signOut(
    {},
    {
      onSuccess: () => {
        signOut();
        navigateTo(props.redirect);
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
