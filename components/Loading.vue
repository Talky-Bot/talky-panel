<template>
  <div id="login">
    <h1>{{ header }}</h1>
    <br>
    <div id="loader"></div>
    <br>
    <small>{{ action }}</small>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: false,
});

defineProps({
  header: String,
  action: String,
})
</script>

<style>
#login {
  display: flex;
  flex-direction: column;
  align-items: center;
}
#loader {
  border: 10px solid #fff;
  border-top: 10px solid #B388EB;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>