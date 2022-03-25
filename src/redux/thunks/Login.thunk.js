import {
    UPDATE_USER_WALLET,
    LOGIN_SUCCESS,
    SHOW_TOAST,
    LOGIN_ERROR,
    LOGIN_STATUS,
} from "redux/types";
import {
    addUser,
    getUserAccountInfoFroyo,
    loginUser,
    userSignIn,
} from "redux/services/index.service";
import { handleConnectWallet } from "Utils/ConnectWallet";

// LOGIN WITH EXISTING TOKEN
export function loadLoginUserWithToken() {
    return async (dispatch) => {
        try {
            const user = await userSignIn();
            if (user.id) {
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: user,
                });
            } else {
                const _user = await getUserAccountInfoFroyo();
                if (_user.id) {
                    const id = await addUser(_user);
                    if (id !== "-1") {
                        localStorage.setItem("isNewUser", true);
                        const user = await userSignIn();
                        dispatch({
                            type: LOGIN_SUCCESS,
                            payload: user,
                        });
                    }
                }
            }
        } catch (error) {
            if (error.code === 7) {
                console.log(error.message);
                dispatch({
                    type: LOGIN_STATUS,
                    payload: {
                        loading: false,
                        ready: false,
                        noAuth: true,
                    },
                });
                dispatch({
                    type: SHOW_TOAST,
                    payload: {
                        message: "Session Expired! Please login again.",
                    },
                });
            } else if (error.code === 3) {
                console.log(error.code, error.message);
                dispatch({
                    type: LOGIN_ERROR,
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

// LOGIN WITH EMAIL & PASSWORD
export function loadLogin(payload, setLoginError, history) {
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
                        type: LOGIN_SUCCESS,
                        payload: user,
                    });
                    history.push("/");
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

// LOGIN STATUS - AUTH, LOADING, READY
export function loadLoginStatus(status) {
    return async (dispatch) => {
        dispatch({ type: LOGIN_STATUS, payload: status });
    };
}

// REQUEST TO CONNECT TO WALLET
export function loadConnectUserWallet(walletAddress, walletAmount, networkId) {
    return async (dispatch, getState) => {
        const { user } = getState()?.userData;

        const _user = { ...user };
        _user.walletAddress = walletAddress;
        _user.tokenBalance = walletAmount;
        _user.network = networkId;

        dispatch({ type: UPDATE_USER_WALLET, payload: _user });

        dispatch({
            type: SHOW_TOAST,
            payload: {
                message:
                    walletAddress !== null &&
                    walletAmount !== null &&
                    networkId !== null
                        ? "Wallet Connected."
                        : walletAddress === null &&
                          walletAmount === null &&
                          networkId === "Wrong Network!"
                        ? "Wrong Network!"
                        : "Wallet Disconnected.",
            },
        });
    };
}

// AUTO CONNET WALLET ON LOAD
export function loadConnectWalletAuto() {
    return async (dispatch) => {
        await handleConnectWallet(dispatch);
    };
}

export function loadConnectWalletAutoError({ code, message }) {
    return async (dispatch) => {
        dispatch({
            type: SHOW_TOAST,
            payload: {
                message:
                    code === -32002
                        ? "Connect to your MetaMask account!"
                        : message,
            },
        });
    };
}
