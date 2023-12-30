const redirect_url = "https://discord.com/api/oauth2/authorize?" + new URLSearchParams({
  client_id: process.env.DISCORD_CLIENT_ID!,
  redirect_uri: process.env.DISCORD_CALLBACK_URL!,
  response_type: "code",
  scope: "identify guilds",
}).toString();


export default defineEventHandler(async (event) => {
  return redirect_url;
})
