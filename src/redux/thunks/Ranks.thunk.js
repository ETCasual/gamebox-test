import { GET_RANKS, LOG_OUT, SHOW_TOAST } from "redux/types";
import { getRanks } from "redux/services/index.service";

export default function loadRanks() {
    return async (dispatch) => {
        return getRanks()
            .then((data) => {
                dispatch({ type: GET_RANKS, payload: data });
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
                    console.log("RANKS TUNK: No Result found!");
                else console.log(error);
            });
    };
}
