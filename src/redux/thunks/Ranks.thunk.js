import refreshToken from "Utils/RefreshToken";
import { getRanks } from "redux/services/index.service";
import { GET_RANKS } from 'redux/types';

export default function loadRanks() {
    return async (dispatch) => {
        const token = await refreshToken();
        if (token) {
            return getRanks()
                .then((data) => {
                    dispatch({ type: GET_RANKS, payload: data });
                })
                .catch((error) => {
                    if (error.code === 7) {
                        console.log(error.message);
                    } else if (error.code === 13)
                        console.log("RANKS TUNK: No Result found!");
                    else console.log(error);
                });
        }
    };
}
