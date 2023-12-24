export default defineEventHandler(async (event) => {
  const cookieName = 'auth_token';
  const cookies = parseCookies(event);

  // if (cookieName in cookies) {
  //   return await sendRedirect(event, '/dashboard', 302);
  // } else {
  //   event.node.res.writeHead(302, {
  //     Location: 'https://discord.com/api/oauth2/authorize?client_id=1169824108255645819&response_type=code&redirect_uri=https%3A%2F%2F127.0.0.1%3A3000&scope=guilds',
  //   })
  // }
  event.node.res.writeHead(302, {
    Location: 'https://discord.com/api/oauth2/authorize?client_id=1169824108255645819&response_type=code&redirect_uri=https%3A%2F%2F127.0.0.1%3A3000&scope=guilds',
  });
  event.node.res.end();
})
