<template>
  <header>
    <nav class="page-link space-out" width="95%">
      <NuxtLink to="/" class="page-link white-text">
        <b>
          <h1>Talky</h1>
        </b>
      </NuxtLink>

      <NuxtImg :src="imgUrl" alt="User Icon" id="pfp" v-if="data.loggedIn" />
      <Button icon="/icons/discord.svg" text="Login with Discord" page="/login" v-else />
    </nav>
  </header>

  <main>
    <slot></slot>
  </main>

  <hr>
  <footer>
    <b>
      <h1>Talky</h1>
    </b>
    <p>Open sourced under MIT License</p>
    <p>View project on Github</p>
  </footer>
</template>

<script lang="ts" setup>
const data = userData();
// Get the url for the profile pic
const imgUrl = ref(`https://cdn.discordapp.com/avatars/${data.id}/${data.pfpHash}.webp`);
</script>

<style>
header {
  background-color: #020420D9; /* 85% transparent */
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
  backdrop-filter: blur(8px);
}
nav {
  width: 98%;
  margin: auto;
}
main, footer {
  max-width: 1431.2px;
  margin: auto;
}
footer {
  text-align: center;
}
.space-out {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#pfp {
  border-radius: 50%;
  height: 48px;
}

@media screen and (max-width: 600px) {
  #pfp {
    height: 36px;
  }
}
</style>