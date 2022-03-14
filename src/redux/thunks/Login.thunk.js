import {
    addUser,
    getUserAccountInfoFroyo,
    loginUser,
    userSignIn,
} from "redux/services/index.service";
import { UPDATE_USER_WALLET_ADDRESS } from "redux/types";

export function loadLoginUserWithToken() {
    return async (dispatch) => {
        try {
            const user = await userSignIn();
            if (user.id) {
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: user,
                });
            } else {
                const _user = await getUserAccountInfoFroyo();
                if (_user.id) {
                    const id = await addUser(_user);
                    if (id !== "-1") {
                        localStorage.setItem("isNewUser", true);
                        await userSignIn();
                    }
                }
                return;
            }
        } catch (error) {
            if (error.code === 7) {
                console.log(error.message);
                dispatch({
                    type: "LOGIN_STATUS",
                    payload: {
                        loading: false,
                        ready: false,
                        noAuth: true,
                    },
                });
                dispatch({
                    type: "SHOW_TOAST",
                    payload: {
                        message: "Session Expired! Please login again.",
                    },
                });
            } else if (error.code === 3) {
                console.log(error.code, error.message);
                dispatch({
                    type: "LOGIN_ERROR",
                    payload: {
                        dispatch,
                        errorType: error.message,
                    },
                });
            } else if (error.code === 13)
                console.log(
                    "LOGIN USER THUNK: No Result found!",
                    error.message
                );
            else console.log(error.message);
        }
    };
}

export function loadLogin(payload, setLoginError) {
    return async (dispatch) => {
        try {
            const { id_token } = await loginUser(payload);
            if (id_token) {
                setLoginError("");
                localStorage.setItem(
                    "froyo-authenticationtoken",
                    `"${id_token}"`
                );
                const user = await userSignIn();
                if (user.id) {
                    dispatch({
                        type: "LOGIN_SUCCESS",
                        payload: user,
                    });
                }
            }
        } catch (error) {
            console.log(error.message);
            setLoginError(
                error.code >= 400 && error.code < 500
                    ? "Invalid Username/Password!"
                    : "Oops! Something went wrong. Please try again."
            );
        }
    };
}

export function loadLoginStatus(status) {
    return async (dispatch) => {
        dispatch({ type: "LOGIN_STATUS", payload: status });
    };
}

export function loadLoginUserWallet(walletAddress) {
    return async (dispatch, getState) => {
        const { user } = getState()?.userData;

        const _user = { ...user };
        _user.walletAddress = walletAddress;
        dispatch({ type: UPDATE_USER_WALLET_ADDRESS, payload: _user });
        dispatch({
            type: "SHOW_TOAST",
            payload: {
                message:
                    walletAddress !== null
                        ? "Wallet Connect."
                        : "Wallet Disconnected.",
            },
        });
    };
}

export function loadWalletError({ code, message }) {
    return async (dispatch) => {
        dispatch({
            type: "SHOW_TOAST",
            payload: {
                message:
                    code === -32002
                        ? "Connect to your MetaMask account!"
                        : message,
            },
        });
    };
}
