export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'auth_token');

  if (!token) setResponseStatus(event, 401);
  
  let data = undefined;

  await $fetch('https://discord.com/api/oauth2/@me', {
    headers: {
      'Authorization': `Bearer ${token}`
    },
  }).then((res: any) => {
    const { user } = res
    data = {
      id: user.id,
      username: user.username,
      pfp: user.avatar
    }

    setHeader(event, 'Cache-Control', `max-age=30`); // Cache the data since it's not very likely to change
  }).catch((err: any) => {
    setResponseStatus(event, 401);
  });

  if (data) return data;
})
