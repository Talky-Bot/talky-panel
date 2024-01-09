<template>
  <div id="error">
    <h1 id="code">{{ error?.statusCode }}</h1>
    <p>{{ error?.message }}</p>
    <p>{{ error?.description }}</p>
    <br>
    <Button icon="/icons/home.svg" text="Home Page" page="/" />
  </div>
</template>

<script lang="ts" setup>
defineProps({
  error: Object
})
</script>

<style>
#error {
  display: flex;
  flex-direction: column;
  align-items: center;
}
#code {
  font-size: 100px;
}
</style>