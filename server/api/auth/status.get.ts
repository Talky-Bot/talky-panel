export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'auth_token');
  const refresh = getCookie(event, 'refresh_token');

  // Disable caching for auth
  setHeader(event, 'Cache-Control', `no-cache`);

  if (token && refresh) {
    setResponseStatus(event, 204); // Indicates they are authenticated, send 204 cause no content is being sent
  } else if (!token && refresh) {
    await $fetch('/api/auth/refresh');
    sendRedirect(event, '/api/auth/refresh');  // Token has expired, try to refresh
  } else {
    setResponseStatus(event, 401, "login"); // Indicates they are not authenticated, client will try to login
  }
})
