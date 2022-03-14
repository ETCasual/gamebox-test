import { GET_NOTIFICATION_NUMBER, LOG_OUT, SHOW_TOAST } from "redux/types";
import { getNotificationNumber } from "redux/services/index.service";

export default function loadNotificationNumber() {
    return async (dispatch, getState) => {
        const { user } = getState()?.userData;
        const { notificationNumber } = getState()?.notificationNumber;

        return getNotificationNumber(user, notificationNumber)
            .then((data) => {
                dispatch({
                    type: GET_NOTIFICATION_NUMBER,
                    payload: data,
                });
            })
            .catch((error) => {
                if (error.code === 7) {
                    console.log(error.message);
                    dispatch({ type: LOG_OUT });
                    dispatch({
                        type: SHOW_TOAST,
                        payload: {
                            message: "Session Expired! Please login again.",
                        },
                    });
                } else if (error.code === 13)
                    console.log("LEADERBOARD RANK THUNK: No Result found!");
                else console.log(error);
            });
    };
}
