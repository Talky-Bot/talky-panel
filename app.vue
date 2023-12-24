<template>
  <header>
    <nav>
      <ul class="page-link space-out">
        <li>
          <NuxtLink to="/" class="page-link white-text">
            <b>
              <h1>Talky</h1>
            </b>
          </NuxtLink>
        </li>
        <li>
          <Button icon="/icons/discord.svg" text="Login with Discord" page="/login/" v-if="!loggedIn" />
          
          <div v-if="loggedIn" class=".space-out">
            <p>Username</p>
            <p>Test</p>
          </div>
        </li>
      </ul>
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
const loggedIn = true;

</script>

<style>
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
}
.right-padding {
  padding-right: 40px;
}
</style>