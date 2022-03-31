import { GET_PRIZE_POOL_TICKETS, LOG_OUT, SHOW_TOAST } from "redux/types";
import { getPrizeLatestTicketsCollected } from "redux/services/index.service";
// import {
//     loadOverTimeCheckerNormal,
//     loadOverTimeChecker,
// } from "redux/thunks/OverTime.thunk";
import loadPrizes from "redux/thunks/Prizes.thunk";

// GET PRIZE POOL TICKETS - CALLED IN ALL OTHER COMPONENT - TRIGGERS TO ADD OVERTIME STATUS WHEN TICKETS POOL IS FULL
export function loadPrizePoolTickets(prizeId, ignoreCheck, ticketsRequired) {
    return async (dispatch, getState) => {
        const { prizeTicketCollection } = getState()?.prizePoolTickets;

        return getPrizeLatestTicketsCollected(
            prizeId,
            ignoreCheck,
            prizeTicketCollection
        )
            .then((data) => {
                dispatch({ type: GET_PRIZE_POOL_TICKETS, payload: data });
                if (data.tickets >= ticketsRequired) {
                    // CALL PRIZE API
                    let timeOutRef = null;
                    clearTimeout(timeOutRef);
                    timeOutRef = setTimeout(() => {
                        dispatch(loadPrizes());
                    }, 2000);
                }
                //     dispatch(loadOverTimeChecker(data?.prizeId));
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

        return getPrizeLatestTicketsCollected(
            prizeId,
            ignoreCheck,
            prizeTicketCollection
        )
            .then((data) => {
                dispatch({ type: GET_PRIZE_POOL_TICKETS, payload: data });
                const _localPrizes =
                JSON.parse(sessionStorage.getItem("prizeDetailList")) ||
                [];
                if (data?.tickets >= ticketsRequired) {
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
