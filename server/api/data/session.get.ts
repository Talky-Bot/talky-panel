export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'auth_token');

  if (!token) setResponseStatus(event, 401);
  
  let data = undefined;

  await $fetch('https://discord.com/api/oauth2/@me', {
    headers: {
      'Authorization': `Bearer ${token}`
    },
  }).then((res: any) => {
    console.log(res)
    const { user } = res
    console.log(user)
    data = {
      id: user.id,
      username: user.username,
      pfp: user.avatar
    }
  }).catch((err: any) => {
    setResponseStatus(event, 401);
  });

  if (data) return data;
})
