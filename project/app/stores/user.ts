import { defineStore } from 'pinia';
import type { BasicUser } from '~/lib/services/service.types';

export const useUserStore = defineStore('user', () => {
  const user = ref<BasicUser | null>(null);

  const init = async () => {
    if (user.value) return;
    const { $client } = useNuxtApp();
    const { user: user_ } = await $client.user.getBasicUser.query();
    if (user_) user.value = user_;
  };

  const signOut = () => {
    user.value = null;
  };

  return {
    user,
    init,
    signOut,
  };
});
