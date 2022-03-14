import { GET_ACTIVITIES, LOG_OUT, SHOW_TOAST } from "redux/types";
import { getLogGList } from "redux/services/index.service";

export default function loadActivity() {
    return async (dispatch, getState) => {
        const { user } = getState()?.userData;
        const { prizes } = getState()?.prizes;

        return getLogGList(user, prizes)
            .then((data) => {
                dispatch({
                    type: GET_ACTIVITIES,
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
                    console.log("ACTIVITY THUNK: No Result found!");
                else console.log(error);
            });
    };
}
