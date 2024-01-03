const client_id = process.env.DISCORD_CLIENT_ID!;
const client_secret = process.env.DISCORD_CLIENT_SECRET!;
const redirect_uri = process.env.DISCORD_CALLBACK_URL!;

export default defineEventHandler(async (event) => {
  const code = getQuery(event).code as string;

  // Disable caching for auth
  setHeader(event, 'Cache-Control', `no-cache`);

  // Make sure that discord is the one sending the code to the callback
  if (getHeader(event, 'Referer') === 'https://discord.com/') {
    const params = new URLSearchParams({
      "client_id": client_id,
      "client_secret": client_secret,
      "grant_type": "authorization_code",
      "code": code,
      "redirect_uri": redirect_uri,
      "scope": "guilds"
    });
    
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
      setResponseStatus(event, 500, err);
    });
  } else {
    setResponseStatus(event, 401);
  }
})
