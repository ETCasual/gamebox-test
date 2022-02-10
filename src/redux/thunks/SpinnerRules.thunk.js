import refreshToken from "Utils/RefreshToken";
import { getSpinnerRules } from "redux/services/index.service";
import { GET_SPINNER_RULES } from "redux/types";

export default function loadSpinnerRules() {
    return async (dispatch) => {
        const token = await refreshToken();
        if (token) {
            getSpinnerRules()
                .then((data) => {
                    dispatch({ type: GET_SPINNER_RULES, payload: data });
                })
                .catch((error) => {
                    if (error.code === 7) {
                        console.log(error.message);
                    } else if (error.code === 13)
                        console.log("SPINNER RULES THUNK: No Result found!");
                    else console.log(error);
                });
        }
    };
}
