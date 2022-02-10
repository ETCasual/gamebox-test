import refreshToken from "Utils/RefreshToken";
import { getLeaderboardResult } from "redux/services/index.service";
import { GET_LEADERBOARD } from 'redux/types';

export default function loadLeaderboard(prizeId, gameId) {
    return async (dispatch) => {
        const token = await refreshToken();
        if (token) {
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
                    } else if (error.code === 13)
                        console.log("LEADERBOARD THUNK: No Result found!");
                    else console.log(error);
                });
        }
    };
}
