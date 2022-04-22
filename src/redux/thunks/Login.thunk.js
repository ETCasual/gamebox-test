import {
    UPDATE_USER_WALLET,
    LOGIN_SUCCESS,
    UPDATE_USER_SETTINGS,
    SHOW_TOAST,
    LOGIN_ERROR,
    LOGIN_STATUS,
} from "redux/types";
import {
    addUser,
    compareUserDetails,
    getUserAccountInfoFroyo,
    loginUser,
    userSignIn,
} from "redux/services/index.service";
import { handleConnectWallet } from "Utils/ConnectWallet";
import inviteFriendsReward from "Utils/InviteFriends";

// LOGIN WITH EXISTING TOKEN
export function loadLoginUserWithToken() {
    return async (dispatch) => {
        try {
            const user = await userSignIn();
            if (user.id) {
                sessionStorage.removeItem("errorType");
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: user,
                });

                const _user = await getUserAccountInfoFroyo();
                if (_user.id) {
                    dispatch({
                        type: UPDATE_USER_SETTINGS,
                        payload: await compareUserDetails(user, _user),
                    });
                }
            } else {
                const _user = await getUserAccountInfoFroyo();
                if (_user.id) {
                    const id = await addUser(_user);
                    if (id !== "-1") {
                        localStorage.setItem("isNewUser", true);
                        const user = await userSignIn();
                        if (user.id) {
                            sessionStorage.removeItem("errorType");
                            inviteFriendsReward(user, dispatch);
                            dispatch({
                                type: LOGIN_SUCCESS,
                                payload: user,
                            });
                        }
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
                    sessionStorage.removeItem("errorType");
                    dispatch({
                        type: LOGIN_SUCCESS,
                        payload: user,
                    });

                    const _user = await getUserAccountInfoFroyo();
                    if (_user.id) {
                        dispatch({
                            type: UPDATE_USER_SETTINGS,
                            payload: await compareUserDetails(user, _user),
                        });
                    }
                    history.push("/");
                } else {
                    const _user = await getUserAccountInfoFroyo();
                    if (_user.id) {
                        const id = await addUser(_user);
                        if (id !== "-1")
                            localStorage.setItem("isNewUser", true);
                        const user = await userSignIn();
                        if (user.id) {
                            sessionStorage.removeItem("errorType");
                            inviteFriendsReward(user, dispatch);
                            dispatch({
                                type: LOGIN_SUCCESS,
                                payload: user,
                            });
                            history.push("/");
                        }
                    }
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
export function loadConnectUserWallet(
    toastType,
    walletAddress,
    walletAmount,
    networkId,
    symbol
) {
    return async (dispatch, getState) => {
        const { user } = getState()?.userData;

        const _user = { ...user };
        _user.walletAddress = walletAddress;
        _user.tokenSymbol = symbol;
        _user.tokenBalance = walletAmount;
        _user.network = networkId;

        dispatch({ type: UPDATE_USER_WALLET, payload: _user });

        if (toastType === "wallet_connected") {
            dispatch({
                type: SHOW_TOAST,
                payload: { message: "Wallet Connected!" },
            });
        } else if (toastType === "wallet_disconnected") {
            dispatch({
                type: SHOW_TOAST,
                payload: { message: "Wallet Disconnected!" },
            });
        } else if (toastType === "wrong_network") {
            dispatch({
                type: SHOW_TOAST,
                payload: { message: "Wrong network!" },
            });
        } else if (toastType === "purchase_gems") {
            dispatch({
                type: SHOW_TOAST,
                payload: { message: "Gems Purchased!" },
            });
        } else if (toastType === "check_metamask") {
            dispatch({
                type: SHOW_TOAST,
                payload: { message: "Please check your metamask" },
            });
        }
    };
}

// AUTO CONNET WALLET ON LOAD
export function loadConnectWalletAuto(blockchainNetworks) {
    return async (dispatch) => {
        await handleConnectWallet(dispatch, blockchainNetworks);
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
