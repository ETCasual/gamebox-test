import { GET_UNCLAIMED_PRIZES_LIST, LOG_OUT, SHOW_TOAST } from "redux/types";
import { getUnclaimedPrizesList } from "redux/services/index.service";

export default function loadUnClaimedPrizes() {
    return async (dispatch, getState) => {
        const { user } = getState()?.userData;

        return getUnclaimedPrizesList(user)
            .then((data) => {
                dispatch({
                    type: GET_UNCLAIMED_PRIZES_LIST,
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
                    console.log("UNCLAIMED PRIZES THUNK: No Result found!");
                else console.log(error);
            });
    };
}
