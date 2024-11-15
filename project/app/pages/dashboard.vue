<script setup lang="ts">
const auth = useAuth();

const { sesstion } = auth;
</script>

<template>
  <p>
    {{ session }}
  </p>
</template>
