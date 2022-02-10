import jwt_decode from "jwt-decode";
import { _firebase } from "../firebase";

// RENEW TOKEN
export default async function refreshToken() {
    if (_firebase.apps.length <= 0) window.location.href = "/";

    const token = sessionStorage.getItem("token");
    const decoded = jwt_decode(token);
    if (Date.now() >= decoded?.exp * 1000) {
        console.log("Token expired!");
        let newToken = await _firebase.auth().currentUser.getIdToken(true);
        console.log("Got new token!");
        sessionStorage.setItem("token", newToken);
        return newToken;
    }
    return token;
}
