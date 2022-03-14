import { GET_LEADERBOARD_RANK, LOG_OUT, SHOW_TOAST } from "redux/types";
import { getLeaderboardRank } from "redux/services/index.service";

export default function loadLeaderboardRanks(typeId) {
    return async (dispatch, getState) => {
        const { leaderRuleRanks } = getState()?.leaderboardRanks;

        return getLeaderboardRank(typeId, leaderRuleRanks)
            .then((data) => {
                dispatch({
                    type: GET_LEADERBOARD_RANK,
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
                    console.log("LEADERBOARD RANK THUNK: No Result found!");
                else console.log(error);
            });
    };
}
