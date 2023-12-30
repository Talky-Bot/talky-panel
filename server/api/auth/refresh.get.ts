export default defineEventHandler(async (event) => {
  const refresh = getCookie(event, 'refresh_token');
  // Disable caching for auth
  setHeader(event, 'Cache-Control', `no-cache`);

  if (refresh) {
    const params = new URLSearchParams({
      "client_id": process.env.DISCORD_CLIENT_ID!,
      "client_secret": process.env.DISCORD_CLIENT_SECRET!,
      "grant_type": "refresh_token",
      "refresh_token": refresh as string,
    });

    await $fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString()
    }).then((res: any) => {
      setHeader(event, 'Cache-Control', `no-cache`);

      setCookie(event, 'auth_token', res.access_token!, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        expires: new Date(Date.now() + res.expires_in * 1000),
      });
  
      setCookie(event, 'refresh_token', res.refresh_token!, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        expires: new Date(Date.now() + res.expires_in * 1000 + 432000000),
      });
    }).catch((err) => {
      if (err.status === 400) {
        setResponseStatus(event, 400);
      } else {
        setResponseStatus(event, 500);
      }
    });
  } else {
    setResponseStatus(event, 400);
  }
})
