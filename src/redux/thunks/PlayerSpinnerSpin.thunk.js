import refreshToken from "Utils/RefreshToken";
import { logSEnter } from "redux/services/index.service";
import { SPINNER_LOG_SPIN } from "redux/types";

export default function loadPlayerSpinnerSpin(prizeId, spinWheel) {
    return async (dispatch, getState) => {
        const { user } = getState()?.userData;
        const { spinner } = getState()?.playerSpinnerInfo;

        const token = await refreshToken();
        if (token) {
            // SPINNER ENTER ID
            return logSEnter(user, prizeId, spinner)
                .then((data) => {
                    dispatch({
                        type: SPINNER_LOG_SPIN,
                        payload: data,
                    });
                    spinWheel(data);
                })
                .catch((error) => {
                    if (error.code === 7) {
                        console.log(error.message);
                    } else if (error.code === 13)
                        console.log(
                            "PLAYER SPINNER ENTER THUNK: No Result found!",
                            error.message
                        );
                    else console.log(error);
                });
        }
    };
}
