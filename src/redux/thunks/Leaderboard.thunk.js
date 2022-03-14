import { GET_LEADERBOARD, LOG_OUT, SHOW_TOAST } from "redux/types";
import { getLeaderboardResult } from "redux/services/index.service";

export default function loadLeaderboard(prizeId, gameId) {
    return async (dispatch) => {
        return getLeaderboardResult(prizeId, gameId)
            .then((data) => {
                dispatch({
                    type: GET_LEADERBOARD,
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
                    console.log("LEADERBOARD THUNK: No Result found!");
                else console.log(error);
            });
    };
}
