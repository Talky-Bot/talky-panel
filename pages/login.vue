<template>
  <div>
    
  </div>
</template>

<script lang="ts" setup>
const packet = useFetch('/api/login/login');
console.log(packet.execute.apply);
</script>