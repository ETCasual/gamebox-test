import { LIST_NOTIFICATIONS, LOG_OUT, SHOW_TOAST } from "redux/types";
import { getNotifications } from "redux/services/index.service";

export default function loadNotifications() {
    return async (dispatch, getState) => {
        const { user } = getState()?.userData;

        return getNotifications(user)
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
