import firebase from "firebase/app";
import "firebase/messaging";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

if (firebase.apps.length <= 0) firebase.initializeApp(firebaseConfig);

const _firebase = firebase;
const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const faceboookProvider = new firebase.auth.FacebookAuthProvider();
let messaging = null;

const onMessageListener = () =>
    new Promise((resolve) => {
        if (firebase.messaging.isSupported()) {
            messaging = firebase.messaging();
            messaging.onMessage((payload) => {
                resolve(payload);
            });
        }
    });

export {
    auth,
    messaging,
    googleProvider,
    faceboookProvider,
    _firebase,
    onMessageListener,
};
