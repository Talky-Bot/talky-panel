<template>
  <div id="feature-group" :class="{ 'switch': shouldSwitch }">
    <NuxtImg :src="icon" :alt="alt" class="max-height"/>
    <div id="info-box">
      <h1>{{ heading }} <span class="light-blue">{{ coloredHeading }}</span></h1>
      <h2>{{ description }}</h2>
      <slot :class="{ buttons: true, 'move-right': shouldSwitch }"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  icon?: string;
  alt?: string;
  heading?: string;
  coloredHeading?: string;
  description?: string;
  shouldSwitch?: boolean;
}>()
</script>

<style>
  #feature-group {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    padding: 10px;
  }
  #info-box {
    max-width: 30%;
  }
  .switch {
    flex-direction: row-reverse;
    text-align: right;
  }
  .move-right {
    display: flex;
    justify-content: flex-endC;
  }
  .max-height {
    width: 30%;
    max-width: 100%;
  }

  /* Media Query for smaller screens */
  @media screen and (max-width: 600px) {
    #feature-group {
      flex-direction: column;
    }
    #info-box {
      max-width: 100%; /* Take up full width on smaller screens */
      text-align: center;
    }
    .max-height {
      width: 100%; /* Take up full width on smaller screens */
    }
  }
</style>
