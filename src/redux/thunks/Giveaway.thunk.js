import { LOG_OUT, SHOW_TOAST } from "redux/types";
import { checkGiveaway } from "redux/services/index.service";

export default function loadCheckGiveaway(userId) {
    return async (dispatch) => {
        return checkGiveaway(userId)
            .then((data) => {})
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
                } else if (error.code === 13) {
                    console.log("CHECK GIVEAWAY: No Result found!");
                } else console.log(error);
            });
    };
}
