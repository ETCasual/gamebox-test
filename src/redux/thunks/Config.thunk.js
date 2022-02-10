import refreshToken from "Utils/RefreshToken";
import { getConfig } from "redux/services/index.service";
import { GET_CONFIG } from "redux/types";

export default function loadConfig() {
    return async (dispatch) => {
        const token = await refreshToken();
        if (token) {
            return getConfig()
                .then((data) => {
                    dispatch({
                        type: GET_CONFIG,
                        payload: data,
                    });
                })
                .catch((error) => {
                    if (error.code === 7) {
                        console.log(error.message);
                    } else if (error.code === 13)
                        console.log("CONFIG THUNK: No Result found!");
                    else console.log(error);
                });
        }
    };
}
