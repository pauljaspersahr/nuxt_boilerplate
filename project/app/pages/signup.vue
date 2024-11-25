<script lang="ts" setup>
definePageMeta({
  layout: 'public',
  auth: {
    only: 'guest',
    redirectUserTo: '/dashboard',
  },
});
</script>

<template>
  <div class="h-screen flex justify-center items-center">
    <SignUpOTP />
  </div>
</template>
