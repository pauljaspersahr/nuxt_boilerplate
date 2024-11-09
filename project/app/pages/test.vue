<script setup lang="ts">
import { authClient } from "~/lib/auth/auth.client";
const session = ref<any>(null);

onMounted(async () => {
  const { data } = await authClient.useSession(useFetch);
  session.value = data ?? null;
  console.log(data);
});
</script>

<template>
  <p>
    {{ session }}
  </p>
</template>
