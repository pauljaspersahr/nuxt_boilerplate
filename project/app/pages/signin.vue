<script lang="ts" setup>
definePageMeta({
  auth: {
    only: "guest",
    redirectUserTo: "/dashboard",
  },
});
</script>

<template>
  <div class="h-screen flex justify-center items-center">
    <SignIn />
  </div>
</template>
