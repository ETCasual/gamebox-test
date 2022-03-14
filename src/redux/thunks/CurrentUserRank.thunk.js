import { GET_CURRENT_USER_RANK, LOG_OUT, SHOW_TOAST } from "redux/types";
import { getCurrentUserRank } from "redux/services/index.service";

export default function loadCurrentUserRank(prizeId, gameId) {
    return async (dispatch, getState) => {
        const { user } = getState()?.userData;
        const { currentUserRank } = getState()?.currentUserRank;

        return getCurrentUserRank(user, prizeId, gameId, currentUserRank)
            .then((data) => {
                dispatch({
                    type: GET_CURRENT_USER_RANK,
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
                    console.log("CURRENT USER RANK THUNK: No Result found!");
                else console.log(error);
            });
    };
}
