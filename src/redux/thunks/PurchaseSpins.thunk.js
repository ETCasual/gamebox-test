import { LOG_OUT, SHOW_TOAST, SPINNER_LOG_EXTRA } from "redux/types";
import { logSExtra } from "redux/services/index.service";

export default function loadPurchaseSpins(isTypeGems) {
    return async (dispatch, getState) => {
        const { user } = getState()?.userData;
        const { spinner } = getState()?.playerSpinnerInfo;

        return logSExtra(user, spinner, isTypeGems)
            .then((data) =>
                dispatch({
                    type: SPINNER_LOG_EXTRA,
                    payload: data,
                })
            )
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
                    console.log("PURCHASE SPINS THUNK: No Result found!");
                else console.log(error);
            });
    };
}
