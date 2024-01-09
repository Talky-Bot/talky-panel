export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'auth_token');
  const refresh = getCookie(event, 'refresh_token');

  // Disable caching for auth
  setHeader(event, 'Cache-Control', `no-cache`);

  if (token && refresh) {
    return 0x0; // Indicates they are authenticated
  } else if (!token && refresh) {
    return 0x1; // Token has expired
  } else {
    return 0x2; // Indicates they are not authenticated
  }
})
