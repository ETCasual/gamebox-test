import { LOG_OUT, SHOW_TOAST, USER_DETAILS } from "redux/types";
import { getUserDetails } from "redux/services/index.service";

export default function loadUserDetails() {
    return async (dispatch, getState) => {
        const { user } = getState()?.userData;

        return getUserDetails(user)
            .then((data) =>
                dispatch({
                    type: USER_DETAILS,
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
                    console.log("USER DETAILS THUNK: No Result found!");
                else console.log(error);
            });
    };
}
