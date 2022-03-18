import {
    addUser,
    getUserAccountInfoFroyo,
    loginUser,
    userSignIn,
} from "redux/services/index.service";
import { UPDATE_USER_WALLET } from "redux/types";
import tokenABI from "Utils/TokenABI";
import Web3 from "web3";

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

export function loadLoginUserWallet(walletAddress, walletAmount) {
    return async (dispatch, getState) => {
        const { user } = getState()?.userData;

        const _user = { ...user };
        _user.walletAddress = walletAddress;
        _user.tokenBalance = walletAmount;
        dispatch({ type: UPDATE_USER_WALLET, payload: _user });
        dispatch({
            type: "SHOW_TOAST",
            payload: {
                message:
                    walletAddress !== null
                        ? "Wallet Connected."
                        : "Wallet Disconnected.",
            },
        });
    };
}

export function loadWallet() {
    return async (dispatch, getState) => {
        const web3 = new Web3(window.ethereum);

        const walletAddress = (await web3.eth.getAccounts())[0];
        if (walletAddress) {
            const tokenContract = new web3.eth.Contract(
                tokenABI,
                process.env.REACT_APP_CONTRACT_ADDRESS
            );
            const tokenBalance = web3.utils.fromWei(
                await tokenContract.methods.balanceOf(walletAddress).call()
            );

            const { user } = getState()?.userData;
            const _user = { ...user };
            _user.walletAddress = walletAddress;
            _user.tokenBalance = tokenBalance;

            dispatch({ type: UPDATE_USER_WALLET, payload: _user });
            dispatch({
                type: "SHOW_TOAST",
                payload: {
                    message:
                        walletAddress !== null
                            ? "Wallet Connected."
                            : "Wallet Disconnected.",
                },
            });
        }
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
