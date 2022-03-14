import { LIST_GAMES, LOG_OUT, SHOW_TOAST } from "redux/types";
import { getGamesList } from "redux/services/index.service";

export default function loadGamesList() {
    return async (dispatch) => {
        return getGamesList()
            .then((data) => {
                dispatch({
                    type: LIST_GAMES,
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
                    console.log("LIST GAMES THUNK: No Result found!");
                else console.log(error);
            });
    };
}
