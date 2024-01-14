export default defineEventHandler(async (event) => {
  const code = getQuery(event).code as string

  // Disable caching for auth
  setHeader(event, 'Cache-Control', `no-cache`);

  const config = useRuntimeConfig();
  const params = new URLSearchParams({
    "client_id": useRuntimeConfig(event).public.discordClientId,
    "client_secret": useRuntimeConfig(event).discordClientSecret,
    "grant_type": "authorization_code",
    "code": code,
    "redirect_uri": useRuntimeConfig(event).public.discordCallbackUrl,
  });

  console.log(params.toString());
  console.log('Test:', useRuntimeConfig(event).public.discordClientId);
  
  await $fetch('https://discord.com/api/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString()
  }).then(async (res: any) => {
    setCookie(event, 'auth_token', res.access_token!, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: res.expires_in,
    });

    setCookie(event, 'refresh_token', res.refresh_token!, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: res.expires_in + 432000, // 5 days longer
    });

    await sendRedirect(event, '/');
  }).catch((err: any) => {
    console.log(err);
    setResponseStatus(event, 500, err.message);
  });
})
