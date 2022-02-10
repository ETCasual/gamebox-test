import refreshToken from "Utils/RefreshToken";
import { getExchangeRate } from "redux/services/index.service";
import { GET_EXCHANGE_RATE } from "redux/types";

export default function loadExchangeRate() {
    return async (dispatch) => {
        const token = await refreshToken();
        if (token) {
            getExchangeRate()
                .then((data) => {
                    dispatch({
                        type: GET_EXCHANGE_RATE,
                        payload: data,
                    });
                })
                .catch((error) => {
                    if (error.code === 7) {
                        console.log(error.message);
                    } else if (error.code === 13)
                        console.log("EXCHANGE RATE THUNK: No Result found!");
                    else console.log(error);
                });
        }
    };
}
