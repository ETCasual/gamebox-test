import {
    addUser,
    getUserAccountInfoFroyo,
    userSignIn,
} from "redux/services/index.service";
import { UPDATE_USER_WALLET_ADDRESS } from "redux/types";

export function loadLoginUser(history) {
    return async (dispatch) => {
        try {
            const user = await userSignIn();
            if (user.id) {
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: user,
                });
                history.push("/");
            } else {
                const _user = await getUserAccountInfoFroyo();
                if (_user.id) {
                    const id = await addUser(_user);
                    if (id !== "-1") {
                        localStorage.setItem("isNewUser", true);
                        const user = await userSignIn();
                        if (user.id) history.push("/");
                    }
                }
                return;
            }
        } catch (error) {
            if (error.code === 7) {
                console.log(error.message);
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
    };
}
