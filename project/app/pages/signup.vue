<script lang="ts" setup>
definePageMeta({
  layout: 'public',
  auth: {
    only: 'guest',
    redirectUserTo: '/dashboard',
  },
});
const onSuccess = () => {
  navigateTo('/dashboard');
};
</script>

<template>
  <div class="h-screen flex justify-center items-center">
    <SignUpOTP :onSuccess="onSuccess" />
  </div>
</template>
