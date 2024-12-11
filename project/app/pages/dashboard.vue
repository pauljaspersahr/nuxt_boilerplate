<script setup lang="ts">
const { $client } = useNuxtApp();
const { data: user } = await $client.user.getUser.useQuery();
</script>

<template>
  <p>{{ user }}</p>
</template>
