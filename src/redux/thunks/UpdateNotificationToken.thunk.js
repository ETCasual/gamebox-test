import { LOG_OUT, SHOW_TOAST, UPDATE_PUSH_NOTIFICATION } from "redux/types";
import { updatePushNotification } from "redux/services/index.service";

export default function loadNotificationToken(fcmToken) {
    return async (dispatch, getState) => {
        const { user } = getState()?.userData;

        return updatePushNotification(user, fcmToken)
            .then(() => {
                dispatch({
                    type: UPDATE_PUSH_NOTIFICATION,
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
                    console.log(
                        "UPDATE NOTIFICATION TOKEN THUNK: No Result found!"
                    );
                else console.log(error);
            });
    };
}
