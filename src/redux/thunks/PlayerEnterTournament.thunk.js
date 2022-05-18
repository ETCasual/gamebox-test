import { LOG_OUT, PLAYER_LOG_ENTER, SHOW_TOAST } from "redux/types";
import { logEnter } from "redux/services/index.service";

export default function loadPlayerEnterTournamentId(
    prizeId,
    gameId,
    isAdWatched,
    isGemUsed,
    recaptchaToken
) {
    return async (dispatch, getState) => {
        const { user } = getState()?.userData;
        const { currentGameInfo } = getState()?.playerTournamentInfo;

        return logEnter(
            user,
            currentGameInfo,
            prizeId,
            gameId,
            isAdWatched,
            isGemUsed,
            recaptchaToken,
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
                    dispatch({ type: LOG_OUT });
                    dispatch({
                        type: SHOW_TOAST,
                        payload: {
                            message: "Session Expired! Please login again.",
                        },
                    });
                } else if (error.code === 13)
                    console.log("PLAYER LOG ENTER THUNK: No Result found!");
                else console.log(error);
            });
    };
}
