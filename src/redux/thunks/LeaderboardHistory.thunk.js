import refreshToken from "Utils/RefreshToken";
import { getLeaderboardHistory } from "redux/services/index.service";
import { GET_LEADERBOARD_HISTORY } from 'redux/types';

export default function loadLeaderboardHistory(cgid) {
    return async (dispatch) => {
        const token = await refreshToken();
        if (token) {
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
                    } else if (error.code === 13)
                        console.log(
                            "LEADERBOARD HISTORY THUNK: No Result found!"
                        );
                    else console.log(error);
                });
        }
    };
}
