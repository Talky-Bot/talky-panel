<template>
  <div>
    <h1>Hello, <b>{{ data.username }}</b></h1>
    <h3>Which server do you want to modify settings for?</h3>
    <p>{{ data.servers }}</p>
  </div>
</template>

<script lang="ts" setup>
const data = userData();
await callOnce(data.updateInfo);
await callOnce(data.updateServers);

definePageMeta({
  middleware: ['auth']
})
</script>