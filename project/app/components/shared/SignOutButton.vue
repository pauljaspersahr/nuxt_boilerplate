<template>
  <Button
    v-if="!loading"
    @click="handleSignOut"
    type="button"
    class="w-full"
    :disabled="loading"
  >
    Sign Out
  </Button>
  <Button v-else disabled class="w-full">
    <Loader2 class="w-4 h-4 mr-2 animate-spin" />
    Signing out...
  </Button>
</template>

<script lang="ts" setup>
import { authClient } from '~/lib/auth.client';
import { Loader2 } from 'lucide-vue-next';

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
