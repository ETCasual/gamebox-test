import refreshToken from "Utils/RefreshToken";
import { getPrizes } from "redux/services/index.service";
import { GET_PRIZE } from "redux/types";

export default function loadPrizes() {
    return async (dispatch) => {
        const token = await refreshToken();
        if (token) {
            return getPrizes()
                .then(({ prizes, gameRulesList }) => {
                    dispatch({
                        type: GET_PRIZE,
                        payload: {
                            prizes,
                            gameRulesList,
                        },
                    });
                })
                .catch((error) => {
                    if (error.code === 7) {
                        console.log(error.message);
                    } else if (error.code === 13)
                        console.log("PRIZES THUNK: No Result found!");
                    else console.log(error);
                });
        }
    };
}
