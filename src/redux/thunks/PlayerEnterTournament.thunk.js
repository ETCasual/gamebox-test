import refreshToken from "Utils/RefreshToken";
import { logEnter } from "redux/services/index.service";
import { PLAYER_LOG_ENTER } from 'redux/types';

export default function loadPlayerEnterTournamentId(
    prizeId,
    gameId,
    isAdWatched,
    isGemUsed
) {
    return async (dispatch, getState) => {
        const { user } = getState()?.userData;
        const { currentGameInfo } = getState()?.playerTournamentInfo;

        const token = await refreshToken();
        if (token) {
            return logEnter(
                user,
                currentGameInfo,
                prizeId,
                gameId,
                isAdWatched,
                isGemUsed
            )
                .then((data) => {
                    dispatch({
                        type: PLAYER_LOG_ENTER,
                        payload: data,
                    });
                })
                .catch((error) => {
                    if (error.code === 7) {
                        console.log(error.message);
                    } else if (error.code === 13)
                        console.log("PLAYER LOG ENTER THUNK: No Result found!");
                    else console.log(error);
                });
        }
    };
}
