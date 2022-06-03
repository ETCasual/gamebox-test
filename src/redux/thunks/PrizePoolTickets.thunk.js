import {
    GET_PRIZE_POOL_TICKETS,
    LOG_OUT,
    PRIZE_ENDED,
    SHOW_TOAST,
} from "redux/types";
import { getPrizeLatestTicketsCollected } from "redux/services/index.service";
import loadPrizes from "redux/thunks/Prizes.thunk";
import { loadNotifications } from "redux/thunks/Notifcations.thunk";

// GET PRIZE POOL TICKETS - CALLED IN ALL OTHER COMPONENT - TRIGGERS TO ADD OVERTIME STATUS WHEN TICKETS POOL IS FULL
export function loadPrizePoolTickets(prizeId, ignoreCheck, ticketsRequired) {
    return async (dispatch, getState) => {
        const { prizeTicketCollection } = getState()?.prizePoolTickets;
        const offsetTimeStamp = getState()?.config.config.offsetTimestamp;

        const nowTimeStamp = () => Date.now() + offsetTimeStamp;

        let payload = null;

        if (!ignoreCheck) {
            const existingIndex = prizeTicketCollection.findIndex(
                (e) => e.prizeId === prizeId
            );
            if (existingIndex > -1) {
                //check if got existing data that's retrieved within last 5 seconds, as we don't allow spam to server

                // lastChecked timestamp
                //console.log(poolTickets[existingIndex].lastChecked);
                let diff =
                    (nowTimeStamp() -
                        prizeTicketCollection[existingIndex].lastChecked) /
                    1000;
                if (diff < 5) {
                    //if smaller than 5 seconds, then do nothing and skip this api
                    //console.log("skip");
                    payload = prizeTicketCollection[existingIndex];
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
            loader = getPrizeLatestTicketsCollected(prizeId);
        } else {
            loader = new Promise((resolve) => resolve(payload));
        }

        return loader
            .then((data) => {
                data.lastChecked = nowTimeStamp();
                dispatch({
                    type: GET_PRIZE_POOL_TICKETS,
                    payload: data,
                });
                if (data.tickets >= ticketsRequired) {
                    // CALL WINNER TYPE NOTIFICATIONS
                    dispatch(loadNotifications());

                    // CALL PRIZE API TO UPDATE OVERTIME STATUS
                    let timeOutRef = null;
                    clearTimeout(timeOutRef);
                    timeOutRef = setTimeout(() => {
                        dispatch(loadPrizes());
                    }, 3000);
                }
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
                    console.log("PRIZE POOL TICKETS THUNK: No Result found!");
                else console.log(error);
            });
    };
}

// PRIZE END CHECKER WITH LATEST TICKETS - CALLED ONLY IN GLOBAL TIMER
export function loadPrizePoolTicketsWithOvertime(
    prizeId,
    ignoreCheck,
    ticketsRequired
) {
    return async (dispatch, getState) => {
        const { prizeTicketCollection } = getState()?.prizePoolTickets;
        const offsetTimeStamp = getState()?.config.config.offsetTimestamp;

        const nowTimeStamp = () => Date.now() + offsetTimeStamp;

        let payload = null;

        if (!ignoreCheck) {
            const existingIndex = prizeTicketCollection.findIndex(
                (e) => e.prizeId === prizeId
            );
            if (existingIndex > -1) {
                //check if got existing data that's retrieved within last 5 seconds, as we don't allow spam to server

                // lastChecked timestamp
                //console.log(poolTickets[existingIndex].lastChecked);
                let diff =
                    (nowTimeStamp() -
                        prizeTicketCollection[existingIndex].lastChecked) /
                    1000;
                if (diff < 5) {
                    //if smaller than 5 seconds, then do nothing and skip this api
                    //console.log("skip");
                    payload = prizeTicketCollection[existingIndex];
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
            loader = getPrizeLatestTicketsCollected(prizeId);
        } else {
            loader = new Promise((resolve) => resolve(payload));
        }

        return loader
            .then((data) => {
                data.lastChecked = nowTimeStamp();
                dispatch({ type: GET_PRIZE_POOL_TICKETS, payload: data });
                const _localPrizes =
                    JSON.parse(sessionStorage.getItem("prizeDetailList")) || [];
                if (data?.tickets >= ticketsRequired) {
                    // CALL WINNER TYPE NOTIFICATIONS
                    dispatch(loadNotifications());

                    // UPDATING LOCAL PRIZE LIST THAT CURRENT PRIZE IS COMPLETED
                    let idx = _localPrizes.findIndex(
                        (e) => e.prizeId === data?.prizeId
                    );
                    if (idx > -1) {
                        _localPrizes[idx].completed = true;
                        sessionStorage.setItem(
                            "prizeDetailList",
                            JSON.stringify(_localPrizes)
                        );

                        // 2ND OR 3RD TIER PRIZE ENDED MODAL
                        if (
                            window.location.pathname.includes(
                                "/gamebox/prize/"
                            ) ||
                            window.location.pathname.includes(
                                "/gamebox22/prize/"
                            )
                        ) {
                            dispatch({ type: PRIZE_ENDED, payload: true });
                        }
                    }
                }
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
                    console.log("PRIZE POOL TICKETS THUNK: No Result found!");
                else console.log(error);
            });
    };
}
