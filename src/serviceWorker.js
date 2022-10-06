export async function register() {
    if (!navigator.serviceWorker) return;
    try {
        const { active } = await navigator.serviceWorker.register("./sw.js");
        if (active?.state === "activated")
            console.log("PWA ServiceWorker registration Successful!");
    } catch (error) {
        console.error("PWA ServiceWorker registration failed: ", error);
    }
}

export async function fcmRegister() {
    if (!navigator.serviceWorker) return;
    try {
        const { active } = await navigator.serviceWorker.register(
            "./firebase-messaging-sw.js"
        );
        if (active?.state === "activated")
            console.log("FCM ServiceWorker registration Successful!");
    } catch (error) {
        console.error("FCM ServiceWorker registration failed: ", error);
    }
}
