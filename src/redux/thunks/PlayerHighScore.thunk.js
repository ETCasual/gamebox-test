import { LOG_OUT, PLAYER_HIGH_SCORE, SHOW_TOAST } from "redux/types";
import { getPlayerHighScore } from "redux/services/index.service";

export default function loadPlayerHighScore(playerId) {
    return async (dispatch) => {
        return getPlayerHighScore(playerId)
            .then((data) => {
                dispatch({
                    type: PLAYER_HIGH_SCORE,
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
                    console.log("PLAYER HIGHSCORE THUNK: No Result found!");
                else console.log(error);
            });
    };
}
