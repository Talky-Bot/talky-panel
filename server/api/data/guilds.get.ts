interface Guild {
  id: string;
  name: string;
  icon: string;
}

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'auth_token');

  if (!token) {
    setResponseStatus(event, 401);
  } else {
    let servers = new Array<any>();
    let data: Array<any> = await $fetch('https://discord.com/api/users/@me/guilds', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).catch((err: any) => {
      return err;
    }) as Array<any>;

    data.forEach((guild: any) => {
      servers.push({
        id: guild.id,
        name: guild.name,
        icon: guild.icon,
      })
    })

    return servers;
  }
})
