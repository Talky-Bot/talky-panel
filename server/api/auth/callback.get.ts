export default defineEventHandler(async (event) => {
  const code = getQuery(event).code as string;

  // Disable caching for auth
  setHeader(event, 'Cache-Control', `no-cache`);

  // Make sure that discord is the one sending the code to the callback
  if (getHeader(event, 'Referer') === 'https://discord.com/') {
    const params = new URLSearchParams({
      "client_id": process.env.DISCORD_CLIENT_ID!,
      "client_secret": process.env.DISCORD_CLIENT_SECRET!,
      "grant_type": "authorization_code",
      "code": code,
      "redirect_uri": "https://localhost:3000/api/auth/callback",
      "scope": "guilds"
    });
    
    const response: any = await $fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString()
    });
  
    setCookie(event, 'auth_token', response.access_token as string, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      expires: new Date(Date.now() + response.expires_in * 1000),
    });
  
    setCookie(event, 'refresh_token', response.refresh_token as string, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      expires: new Date(Date.now() + response.expires_in * 1000 + 432000000),
    })
  
    await sendRedirect(event, '/');
  } else {
    setResponseStatus(event, 401);
  }
})
