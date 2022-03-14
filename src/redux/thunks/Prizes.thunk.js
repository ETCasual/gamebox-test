import { GET_PRIZE, LOG_OUT, SHOW_TOAST } from "redux/types";
import { getPrizes } from "redux/services/index.service";

export default function loadPrizes() {
    return async (dispatch) => {
        return getPrizes()
            .then(({ prizes, gameRulesList }) => {
                dispatch({
                    type: GET_PRIZE,
                    payload: {
                        prizes,
                        gameRulesList,
                    },
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
                    console.log("PRIZES THUNK: No Result found!");
                else console.log(error);
            });
    };
}
