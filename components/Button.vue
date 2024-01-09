<template>
  <NuxtLink :to="page" class="page-link">
    <div class="button">
      <NuxtImg :src="icon" id="icon" />
      <p>{{ text }}</p>
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
defineProps<{
  icon?: string
  text?: string
  page?: string
}>()
</script>

<style>
  .button {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    background-color: #B388EB;
    color: black;
    max-width: fit-content;
    max-height: fit-content;
    border-radius: 6px;
  }
  .button:hover {
    background-color: gray;
  }
  #icon {
    width: 24px;
    height: 24px;
  }
</style>