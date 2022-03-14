import { LOG_OUT, PLAYER_LOG_LEAVE, SHOW_TOAST } from "redux/types";
import { logLeave } from "redux/services/index.service";

export default function loadPlayerLeaveTournamentId(gameScore) {
    return async (dispatch, getState) => {
        const { user } = getState()?.userData;
        const { currentGameInfo } = getState()?.playerTournamentInfo;
        const { extraEarning } = getState()?.playerTournamentInfo;

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
                    dispatch({ type: LOG_OUT });
                    dispatch({
                        type: SHOW_TOAST,
                        payload: {
                            message: "Session Expired! Please login again.",
                        },
                    });
                } else if (error.code === 13)
                    console.log("PLAYER LOG LEAVE THUNK: No Result found!");
                else console.log(error);
            });
    };
}
