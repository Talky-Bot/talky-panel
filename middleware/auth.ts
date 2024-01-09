export default defineNuxtRouteMiddleware(async (to, from) => {
    const data = userData();
    await data.checkLogin();

    if (!data.loggedIn) {
        return await navigateTo('/login');
    }
})
