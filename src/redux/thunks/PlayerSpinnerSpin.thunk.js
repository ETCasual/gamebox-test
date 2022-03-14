import { LOG_OUT, SHOW_TOAST, SPINNER_LOG_SPIN } from "redux/types";
import { logSEnter } from "redux/services/index.service";

export default function loadPlayerSpinnerSpin(prizeId, spinWheel) {
    return async (dispatch, getState) => {
        const { user } = getState()?.userData;
        const { spinner } = getState()?.playerSpinnerInfo;

        // SPINNER ENTER ID
        return logSEnter(user, prizeId, spinner)
            .then((data) => {
                console.log(data);
                dispatch({
                    type: SPINNER_LOG_SPIN,
                    payload: data,
                });
                spinWheel(data);
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
                        "PLAYER SPINNER ENTER THUNK: No Result found!",
                        error.message
                    );
                else console.log(error);
            });
    };
}
