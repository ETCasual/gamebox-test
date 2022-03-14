import { GET_SPIN_AVAIALBLE, LOG_OUT, SHOW_TOAST } from "redux/types";
import { getSpinAvailable } from "redux/services/index.service";

export default function loadAvailableSpins() {
    return async (dispatch, getState) => {
        const { user } = getState()?.userData;
        const { spinner } = getState()?.playerSpinnerInfo;

        return getSpinAvailable(user, spinner)
            .then((data) => {
                dispatch({
                    type: GET_SPIN_AVAIALBLE,
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
                    console.log("AVAILABLE SPINS THUNK: No Result found!");
                else console.log(error);
            });
    };
}
