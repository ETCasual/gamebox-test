import { GET_HIGH_SCORE, LOG_OUT, SHOW_TOAST } from "redux/types";
import { getHighScore } from "redux/services/index.service";

export default function loadHighScore() {
    return async (dispatch, getState) => {
        const { user } = getState()?.userData;

        return getHighScore(user)
            .then((data) => {
                dispatch({
                    type: GET_HIGH_SCORE,
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
                    console.log("HIGH SCORE THUNK: No Result found!");
                else console.log(error);
            });
    };
}
