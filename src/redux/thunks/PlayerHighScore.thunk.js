import refreshToken from "Utils/RefreshToken";
import { getPlayerHighScore } from "redux/services/index.service";
import { PLAYER_HIGH_SCORE } from 'redux/types';

export default function loadPlayerHighScore(playerId) {
    return async (dispatch) => {
        const token = await refreshToken();
        if (token) {
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
                    } else if (error.code === 13)
                        console.log("PLAYER HIGHSCORE THUNK: No Result found!");
                    else console.log(error);
                });
        }
    };
}
