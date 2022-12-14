import { GET_CONFIG, LOG_OUT, SHOW_TOAST } from "redux/types";
import { getConfig } from "redux/services/index.service";

export default function loadConfig() {
    return async (dispatch) => {
        return getConfig()
            .then((data) => {
                dispatch({
                    type: GET_CONFIG,
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
                    console.log("CONFIG THUNK: No Result found!");
                else console.log(error);
            });
    };
}
