import { LIST_NOTIFICATIONS, LOG_OUT, SHOW_TOAST } from "redux/types";
import { getNotifications, UpdateNotificationSeen } from "redux/services/index.service";

export function loadNotifications(notiType) {
    return async (dispatch, getState) => {
        const { user } = getState()?.userData;

        return getNotifications(user, notiType)
            .then((data) => {
                dispatch({ type: LIST_NOTIFICATIONS, payload: data });
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
                    console.log("NOTIFICATIONS THUNK: No Result found!");
                else console.log(error);
            });
    };
}

export function loadUpdateNotificationSeen(id) {
    return async (dispatch, getState) => {
        const { user } = getState()?.userData;

        return UpdateNotificationSeen(id, user?.id)
            .then((data) => {
                console.log(data);
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
                        "UPDATE NOTIFICATION SEEN THUNK: No Result found!"
                    );
                else console.log(error);
            });
    };
}
