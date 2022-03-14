import { GET_LEADERBOARD_HISTORY, LOG_OUT, SHOW_TOAST } from "redux/types";
import { getLeaderboardHistory } from "redux/services/index.service";

export default function loadLeaderboardHistory(cgid) {
    return async (dispatch) => {
        return getLeaderboardHistory(cgid)
            .then((data) => {
                dispatch({
                    type: GET_LEADERBOARD_HISTORY,
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
                    console.log("LEADERBOARD HISTORY THUNK: No Result found!");
                else console.log(error);
            });
    };
}
