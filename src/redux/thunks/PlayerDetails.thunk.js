import { LOG_OUT, PLAYER_DETAILS, SHOW_TOAST } from "redux/types";
import { getPlayerDetails } from "redux/services/index.service";

export default function loadPlayerDetails(playerId) {
    return async (dispatch) => {
        return getPlayerDetails(playerId)
            .then((data) => {
                dispatch({
                    type: PLAYER_DETAILS,
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
                    console.log("PLAYER DETAILS THUNK: No Result found!");
                else console.log(error);
            });
    };
}
