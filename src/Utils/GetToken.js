export function getToken() {
    const token = localStorage.getItem("froyo-authenticationtoken")
        ? localStorage.getItem("froyo-authenticationtoken")?.replaceAll('"', "")
        : null;
    return token;
}

export function getRefreshToken() {
    const refreshToken = localStorage.getItem("froyo-refreshtoken")
        ? localStorage.getItem("froyo-refreshtoken")?.replaceAll('"', "")
        : null;
    return refreshToken;
}
