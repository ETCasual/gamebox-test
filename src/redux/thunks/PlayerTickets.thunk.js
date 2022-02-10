import refreshToken from "Utils/RefreshToken";
import { getPoolTickets } from "redux/services/index.service";
import { GET_PLAYER_TICKETS } from 'redux/types';

export default function loadPlayerTickets(prizeId, ignoreCheck) {
    return async (dispatch, getState) => {
        const { user } = getState()?.userData;
        const { poolTickets } = getState()?.playerTickets;

        const token = await refreshToken();
        if (token) {
            return getPoolTickets(prizeId, ignoreCheck, user, poolTickets)
                .then((data) => {
                    dispatch({ type: GET_PLAYER_TICKETS, payload: data });
                })
                .catch((error) => {
                    if (error.code === 7) {
                        console.log(error.message);
                    } else if (error.code === 13)
                        console.log("PLAYER TICKETS THUNK: No Result found!");
                    else console.log(error);
                });
        }
    };
}
