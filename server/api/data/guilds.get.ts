export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'auth_token');

  if (!token) {
    setResponseStatus(event, 401);
  } else {
    const data = await $fetch('https://discord.com/api/users/@me/guilds', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }
})
