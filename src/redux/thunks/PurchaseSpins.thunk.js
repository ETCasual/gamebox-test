import refreshToken from "Utils/RefreshToken";
import { logSExtra } from "redux/services/index.service";
import { SPINNER_LOG_EXTRA } from "redux/types";

export default function loadPurchaseSpins(isTypeGems) {
    return async (dispatch, getState) => {
        const { user } = getState()?.userData;
        const { spinner } = getState()?.playerSpinnerInfo;

        const token = await refreshToken();
        if (token) {
            return logSExtra(user, spinner, isTypeGems)
                .then((data) =>
                    dispatch({
                        type: SPINNER_LOG_EXTRA,
                        payload: data,
                    })
                )
                .catch((error) => {
                    if (error.code === 7) {
                        console.log(error.message);
                    } else if (error.code === 13)
                        console.log("PURCHASE SPINS THUNK: No Result found!");
                    else console.log(error);
                });
        }
    };
}
