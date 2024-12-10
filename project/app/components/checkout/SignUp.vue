<script setup lang="ts">
import SignUpOTP from '@/components/checkout/SignUpOTP.vue';
import Details from '@/components/checkout/Details.vue';
import SelectedPlan from '@/components/checkout/SelectedPlan.vue';
import { Separator } from '@/components/ui/separator';

const userStore = useUserStore();
const { init } = userStore;
const { user } = storeToRefs(userStore);

onMounted(async () => {
  // load user to store, if user is still logged from old session
  init();
});
const loggedIn = computed(() => !!user.value);
</script>

<template>
  <div v-if="loggedIn" class="flex items-center justify-center">
    <Details />
  </div>
  <div
    v-else
    class="flex flex-col sm:flex-row items-center w-full align-middle justify-center"
  >
    <SelectedPlan />
    <Separator
      orientation="vertical"
      class="hidden sm:block h-full self-stretch mx-8"
    />
    <SignUpOTP class="m-0 p-0 w-full" />
  </div>
</template>
