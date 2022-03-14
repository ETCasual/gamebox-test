import { GET_WINNERS, LOG_OUT, SHOW_TOAST } from "redux/types";
import { getWinnersList } from "redux/services/index.service";

export default function loadWinners() {
    return async (dispatch) => {
        return getWinnersList()
            .then((data) =>
                dispatch({
                    type: GET_WINNERS,
                    payload: data,
                })
            )
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
                    console.log("WINNERS THUNK: No Result found!");
                else console.log(error);
            });
    };
}
