<template>
  <Loading header="Logging In..." :action="action" />
</template>

<script lang="ts" setup>
definePageMeta({
  layout: false,
});
const action = ref('Verifying State');
const route = useRoute();

const state = route.query.state;
const code = route.query.code;
const storedStateHash = useCookie('state_uuid');

if (storedStateHash === undefined) {
  await navigateTo('/login');
} else if (storedStateHash.value == state) {
  const params = new URLSearchParams({
    code: code as string,
  });

  useCookie('state_uuid', {
    maxAge: -1 // Delete the cookie
  });

  await useFetch(`/api/auth/callback?${params.toString()}`, {
    method: 'GET',
  }).then(async () => {
    const data = userData();
    data.loggedIn = true;
    await data.updateInfo();

    await navigateTo('/');
  }).catch(async () => {
    action.value = 'Login error, redirecting to try again';
    await navigateTo('/login');
  });
} else {
  action.value = 'Login blocked, redirecting to try again';
  await navigateTo('/login');
}
</script>