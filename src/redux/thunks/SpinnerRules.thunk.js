import { GET_SPINNER_RULES, LOG_OUT, SHOW_TOAST } from "redux/types";
import { getSpinnerRules } from "redux/services/index.service";

export default function loadSpinnerRules() {
    return async (dispatch) => {
        return getSpinnerRules()
            .then((data) => {
                dispatch({ type: GET_SPINNER_RULES, payload: data });
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
                    console.log("SPINNER RULES THUNK: No Result found!");
                else console.log(error);
            });
    };
}
