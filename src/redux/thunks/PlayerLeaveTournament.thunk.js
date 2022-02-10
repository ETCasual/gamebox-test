import refreshToken from "Utils/RefreshToken";
import { logLeave } from "redux/services/index.service";
import { PLAYER_LOG_LEAVE } from 'redux/types';

export default function loadPlayerLeaveTournamentId(gameScore) {
    return async (dispatch, getState) => {
        const { user } = getState()?.userData;
        const { currentGameInfo } = getState()?.playerTournamentInfo;
        const { extraEarning } = getState()?.playerTournamentInfo;

        const token = await refreshToken();
        if (token) {
            logLeave(user, currentGameInfo, gameScore, extraEarning)
                .then((data) => {
                    dispatch({
                        type: PLAYER_LOG_LEAVE,
                        payload: data,
                    });
                })
                .catch((error) => {
                    if (error.code === 7) {
                        console.log(error.message);
                    } else if (error.code === 13)
                        console.log("PLAYER LOG LEAVE THUNK: No Result found!");
                    else console.log(error);
                });
        }
    };
}
