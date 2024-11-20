<script setup lang="ts">
const { $client } = useNuxtApp();

const user = await $client.user.getUser.query();
</script>

<template>
  <p>{{ user }}</p>
</template>
