importScripts("https://www.gstatic.com/firebasejs/8.6.7/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.6.7/firebase-messaging.js");

// FIREBASE
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);
if (firebase.messaging.isSupported()) {
    const messaging = firebase.messaging();
    messaging.onBackgroundMessage(function (payload) {
        console.log("Received background message ", payload);

        if (payload?.data?.title && payload?.data?.body) {
            const notificationTitle = payload.data.title;
            const notificationOptions = {
                body: payload.data.body,
            };

            self.registration.showNotification(
                notificationTitle,
                notificationOptions
            );
        }
    });
}
