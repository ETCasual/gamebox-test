import refreshToken from "Utils/RefreshToken";
import { GET_PRIZE_POOL_TICKETS } from "redux/types";
import { getPrizeLatestTicketsCollected } from "redux/services/index.service";
import {
    loadOverTimeCheckerNormal,
    loadOverTimeChecker,
} from "redux/thunks/OverTime.thunk";

// GET PRIZE POOL TICKETS - CALLED IN ALL OTHER COMPONENT - TRIGGERS TO ADD OVERTIME STATUS WHEN TICKETS POOL IS FULL
export default function loadPrizePoolTickets(
    prizeId,
    ignoreCheck,
    ticketsRequired
) {
    return async (dispatch, getState) => {
        const { prizeTicketCollection } = getState()?.prizePoolTickets;

        const token = await refreshToken();
        if (token) {
            return getPrizeLatestTicketsCollected(
                prizeId,
                ignoreCheck,
                prizeTicketCollection
            )
                .then((data) => {
                    dispatch({ type: GET_PRIZE_POOL_TICKETS, payload: data });
                    if (data.tickets >= ticketsRequired)
                        dispatch(loadOverTimeChecker(data?.prizeId));
                })
                .catch((error) => {
                    if (error.code === 7) {
                        console.log(error.message);
                    } else if (error.code === 13)
                        console.log(
                            "PRIZE POOL TICKETS THUNK: No Result found!"
                        );
                    else console.log(error);
                });
        }
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
        const token = await refreshToken();
        if (token) {
            return getPrizeLatestTicketsCollected(
                prizeId,
                ignoreCheck,
                prizeTicketCollection
            )
                .then((data) => {
                    dispatch({ type: GET_PRIZE_POOL_TICKETS, payload: data });
                    dispatch(
                        loadOverTimeCheckerNormal(
                            prizeId,
                            ticketsRequired,
                            data
                        )
                    );
                })
                .catch((error) => {
                    if (error.code === 7) {
                        console.log(error.message);
                    } else if (error.code === 13)
                        console.log(
                            "PRIZE POOL TICKETS THUNK: No Result found!"
                        );
                    else console.log(error);
                });
        }
    };
}
