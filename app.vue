<template>
  <header>
    <nav class="page-link space-out" width="95%">
      <NuxtLink to="/" class="page-link white-text">
        <b>
          <h1>Talky</h1>
        </b>
      </NuxtLink>

      <ClientOnly>
        <NuxtImg :src="imgUrl" alt="User Icon" v-if="loggedIn" id="pfp"/>
        <Button icon="/icons/discord.svg" text="Login with Discord" :page="loginUrl!" v-else />
      </ClientOnly>
    </nav>
  </header>

  <main>
    <NuxtPage />
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
// Get redirect url for oauth
const { data: loginUrl } = await useFetch('/api/auth/login');

// Check if the user is logged in and handle accordingly. Will either show profile pic or login button. Token will be refreshed if needed
const loggedIn = ref(false)
await useFetch('/api/auth/status', {
  onResponse({ response }) {
    if (response.status === 204) {
      loggedIn.value = true // User is logged in
    } else if (response.status === 302) {
      useFetch('/api/auth/refresh', { // Refresh token
        onResponse({ response }) {
          if (response.status === 200) {
            loggedIn.value = true; // User is logged in
          } else {
            loggedIn.value = false; // User is not logged in
          }
        }
      });
    } else {
      loggedIn.value = false; // User is not logged in
    }
  }
});

console.log(loggedIn.value);

// Get the url for the profile pic
const { data: userInfo }: any = await useFetch('/api/data/session');
const imgUrl = ref(`https://cdn.discordapp.com/avatars/${userInfo.value?.id}/${userInfo.value?.pfp}.webp`);
</script>

<style>
header {
  background-color: #020420D9; /* 85% transparent */
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
  padding-top: 8px;
  backdrop-filter: blur(8px);
}
nav {
  width: 98%;
  margin: auto;
}
main, footer {
  max-width: -moz-fit-content;
  max-width: fit-content;
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
li {
  height: min-content;
}

@media screen and (max-width: 600px) {
  #pfp {
    height: 36px;
  }
}
</style>