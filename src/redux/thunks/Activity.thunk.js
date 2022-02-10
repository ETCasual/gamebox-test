import refreshToken from "Utils/RefreshToken";
import { getLogGList } from "redux/services/index.service";
import { GET_ACTIVITIES } from "redux/types";

export default function loadActivity() {
    return async (dispatch, getState) => {
        const { user } = getState()?.userData;
        const { prizes } = getState()?.prizes;

        const token = await refreshToken();
        if (token) {
            return getLogGList(user, prizes)
                .then((data) => {
                    dispatch({
                        type: GET_ACTIVITIES,
                        payload: data,
                    });
                })
                .catch((error) => {
                    if (error.code === 7) {
                        console.log(error.message);
                    } else if (error.code === 13)
                        console.log("ACTIVITY THUNK: No Result found!");
                    else console.log(error);
                });
        }
    };
}
