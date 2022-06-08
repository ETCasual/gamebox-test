import { GET_PLAYER_TICKETS, LOG_OUT, SHOW_TOAST } from "redux/types";
import { getPoolTickets } from "redux/services/index.service";

export default function loadPlayerTickets(prizeId, ignoreCheck) {
    return async (dispatch, getState) => {
        const { user } = getState()?.userData;
        const { poolTickets } = getState()?.playerTickets;
        const offsetTimeStamp = getState()?.config.config.offsetTimestamp;

        const nowTimeStamp = () => Date.now() + offsetTimeStamp;

        let payload = null;

        if (!ignoreCheck) {
            const existingIndex = poolTickets.findIndex(
                (e) => e.prizeId === prizeId
            );
            if (existingIndex > -1) {
                //check if got existing data that's retrieved within last 5 seconds, as we don't allow spam to server

                // lastChecked timestamp
                //console.log(esmData.poolTickets[existingIndex].lastChecked);
                let diff =
                    (nowTimeStamp() - poolTickets[existingIndex].lastChecked) /
                    1000;
                if (diff < 5) {
                    //if smaller than 5 seconds, then do nothing and skip this api
                    // console.log("skip");
                    payload = poolTickets[existingIndex];
                }
            } else {
                // setting this tempData immediately so that a very fast scrolling doesn't spam at the very first time visitng the page
                payload = {
                    prizeId,
                    tickets: 0,
                };
            }
        }

        let loader = null;
        if (!payload) {
            loader = getPoolTickets(prizeId, user);
        } else {
            loader = new Promise((resolve) => resolve(payload));
        }

        return loader
            .then((data) => {
                data.lastChecked = nowTimeStamp();
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
