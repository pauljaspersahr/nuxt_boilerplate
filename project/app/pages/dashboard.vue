<script setup lang="ts">
definePageMeta({
  auth: {
    only: 'user',
    redirectGuestTo: '/',
  },
});
const { $client } = useNuxtApp();
const { user } = await $client.user.getUser.query();
</script>

<template>
  <p>{{ user }}</p>
</template>
