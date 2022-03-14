import { GET_GEMS_LIST, LOG_OUT, SHOW_TOAST } from "redux/types";
import { getGemsList } from "redux/services/index.service";

export default function loadGemsList() {
    return async (dispatch) => {
        return getGemsList()
            .then((data) => {
                dispatch({
                    type: GET_GEMS_LIST,
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
                    console.log("GEMS LIST THUNK: No Result found!");
                else console.log(error);
            });
    };
}
