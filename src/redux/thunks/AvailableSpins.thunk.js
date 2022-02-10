import refreshToken from "Utils/RefreshToken";
import { getSpinAvailable } from "redux/services/index.service";
import { GET_SPIN_AVAIALBLE } from "redux/types";

export default function loadAvailableSpins() {
    return async (dispatch, getState) => {
        const { user } = getState()?.userData;
        const { spinner } = getState()?.playerSpinnerInfo;

        const token = await refreshToken();
        if (token) {
            return getSpinAvailable(user, spinner)
                .then((data) => {
                    dispatch({
                        type: GET_SPIN_AVAIALBLE,
                        payload: data,
                    });
                })
                .catch((error) => {
                    if (error.code === 7) {
                        console.log(error.message);
                    } else if (error.code === 13)
                        console.log("AVAILABLE SPINS THUNK: No Result found!");
                    else console.log(error);
                });
        }
    };
}
