<template>
  <Loading header="Redirecting to Discord..." :action="action" />
</template>

<script lang="ts" setup>
const cookie = useCookie('state_uuid', {
  maxAge: 300, // 5 minutes
  sameSite: 'strict'
});

const action = ref('Generating uuid for state parameter'); // Since there is nothing identifying the user, we use a random uuid. Will be verified by client on callback
const uuid = crypto.randomUUID();

action.value = 'Saving uuid for state parameter';
cookie.value = uuid;

action.value = 'Sending you to Discord';
await navigateTo("https://discord.com/api/oauth2/authorize?" + new URLSearchParams({
  client_id: useRuntimeConfig().public.discordClientId as string,
  redirect_uri: useRuntimeConfig().public.discordCallbackUrl as string,
  state: uuid,
  response_type: "code",
  scope: "identify guilds",
}).toString(), {
  external: true
});
</script>