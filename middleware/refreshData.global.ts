export default defineNuxtRouteMiddleware(async (to, from) => {
    const data = userData();
    await callOnce(data.checkLogin);
    await callOnce(data.updateInfo);
})
