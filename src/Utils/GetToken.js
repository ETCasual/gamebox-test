export default function getToken() {
    const token = localStorage.getItem("froyo-authenticationtoken")
        ? localStorage.getItem("froyo-authenticationtoken")?.replaceAll('"', "")
        : null;
    return token;
}
