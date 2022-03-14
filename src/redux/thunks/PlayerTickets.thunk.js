import { GET_PLAYER_TICKETS, LOG_OUT, SHOW_TOAST } from "redux/types";
import { getPoolTickets } from "redux/services/index.service";

export default function loadPlayerTickets(prizeId, ignoreCheck) {
    return async (dispatch, getState) => {
        const { user } = getState()?.userData;
        const { poolTickets } = getState()?.playerTickets;

        return getPoolTickets(prizeId, ignoreCheck, user, poolTickets)
            .then((data) => {
                dispatch({ type: GET_PLAYER_TICKETS, payload: data });
            })
            .catch((error) => {
                if (error.code === 7) {
                    console.log(error.message);
                    dispatch({ type: LOG_OUT });
                    dispatch({
                        type: SHOW_TOAST,
                        payload: {
                            message: "Session Expired! Please login again.",
                        },
                    });
                } else if (error.code === 13)
                    console.log("PLAYER TICKETS THUNK: No Result found!");
                else console.log(error);
            });
    };
}
