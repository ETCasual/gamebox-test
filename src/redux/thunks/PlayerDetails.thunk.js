import refreshToken from "Utils/RefreshToken";
import { getPlayerDetails } from "redux/services/index.service";
import { PLAYER_DETAILS } from 'redux/types';

export default function loadPlayerDetails(playerId) {
    return async (dispatch) => {
        const token = await refreshToken();
        if (token) {
            return getPlayerDetails(playerId)
                .then((data) => {
                    dispatch({
                        type: PLAYER_DETAILS,
                        payload: data,
                    });
                })
                .catch((error) => {
                    if (error.code === 7) {
                        console.log(error.message);
                    } else if (error.code === 13)
                        console.log("PLAYER DETAILS THUNK: No Result found!");
                    else console.log(error);
                });
        }
    };
}
