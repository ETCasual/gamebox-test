import refreshToken from "Utils/RefreshToken";
import { getLeaderboardRank } from "redux/services/index.service";
import { GET_LEADERBOARD_RANK } from "redux/types";

export default function loadLeaderboardRanks(typeId) {
    return async (dispatch, getState) => {
        const { leaderRuleRanks } = getState()?.leaderboardRanks;

        const token = await refreshToken();
        if (token) {
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
                    } else if (error.code === 13)
                        console.log("LEADERBOARD RANK THUNK: No Result found!");
                    else console.log(error);
                });
        }
    };
}
