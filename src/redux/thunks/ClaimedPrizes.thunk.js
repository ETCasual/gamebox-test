import { GET_CLAIMED_PRIZES_LIST, LOG_OUT, SHOW_TOAST } from "redux/types";
import { getClaimedPrizesList } from "redux/services/index.service";

export default function loadClaimedPrizes() {
    return async (dispatch, getState) => {
        const { user } = getState()?.userData;

        return getClaimedPrizesList(user)
            .then((data) => {
                dispatch({
                    type: GET_CLAIMED_PRIZES_LIST,
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
                    console.log("CLAIMED PRIZES THUNK: No Result found!");
                else console.log(error);
            });
    };
}
