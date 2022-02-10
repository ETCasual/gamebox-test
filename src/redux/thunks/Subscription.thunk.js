import refreshToken from "Utils/RefreshToken";
import {
    cancelSubscription,
    reActivateSubscription,
} from "redux/services/index.service";
import { getSubscriptionList } from "redux/services/index.service";
import {
    REACTIVATE_SUBSCRIPTION,
    GET_SUBSCRIPTION_LIST,
    CANCEL_SUBSCRIPTION,
} from "redux/types";

export function loadReActivateSubscription() {
    return async (dispatch, getState) => {
        const { user } = getState()?.userData;

        const token = await refreshToken();
        if (token) {
            return reActivateSubscription(user)
                .then(() => {
                    dispatch({
                        type: REACTIVATE_SUBSCRIPTION,
                    });
                })
                .catch((error) => {
                    if (error.code === 7) {
                        console.log(error.message);
                    } else if (error.code === 13)
                        console.log(
                            "REACTIVATE SUBSCRIPTION THUNK: No Result found!"
                        );
                    else console.log(error);
                });
        }
    };
}

export function loadCancelSubscription(expiryDate) {
    return async (dispatch, getState) => {
        const { user } = getState()?.userData;

        const token = await refreshToken();
        if (token) {
            return cancelSubscription(user, expiryDate)
                .then(() => {
                    dispatch({
                        type: CANCEL_SUBSCRIPTION,
                    });
                })
                .catch((error) => {
                    if (error.code === 7) {
                        console.log(error.message);
                    } else if (error.code === 13)
                        console.log(
                            "CANCEL SUBSCRIPTION THUNK: No Result found!"
                        );
                    else console.log(error);
                });
        }
    };
}

export function loadSubscriptionList() {
    return async (dispatch) => {
        const token = await refreshToken();
        if (token) {
            return getSubscriptionList()
                .then((data) => {
                    dispatch({
                        type: GET_SUBSCRIPTION_LIST,
                        payload: data,
                    });
                })
                .catch((error) => {
                    if (error.code === 7) {
                        console.log(error.message);
                    } else if (error.code === 13)
                        console.log(
                            "SUBSCRIPTION LIST THUNK: No Result found!"
                        );
                    else console.log(error);
                });
        }
    };
}
