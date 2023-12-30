export default defineEventHandler(async (event) => {
  setCookie(event, 'auth_token', '', { maxAge: -1 })
  setCookie(event, 'refresh_token', '', { maxAge: -1 })
  sendRedirect(event, '/')
})
