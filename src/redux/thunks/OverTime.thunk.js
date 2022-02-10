import { OVER_TIME } from "redux/types";

export function loadOverTimeChecker(prizeId) {
    return async (dispatch, getState) => {
        const { overTimePrizes } = getState()?.overTime;

        let data = [...overTimePrizes];
        let idx = data.findIndex(
            (e) => e.prizeId === prizeId && e.status === 2
        );
        if (idx === -1) {
            data.push({
                prizeId,
                status: 2,
            });
            dispatch({ type: OVER_TIME, payload: data });
        }
    };
}

export function loadOverTimeCheckerNormal(
    prizeId,
    ticketRequired,
    latestTickets
) {
    return async (dispatch, getState) => {
        const { overTimePrizes } = getState()?.overTime;

        if (latestTickets.tickets >= ticketRequired) {
            let data = [...overTimePrizes];

            // ADDING STATUS FOR NORMAL ENDING
            let idx = data.findIndex(
                (e) => e?.prizeId === prizeId && e?.status === 1
            );
            if (idx === -1) {
                data.push({
                    prizeId,
                    status: 1,
                    ended: "normal",
                });
                dispatch({ type: OVER_TIME, payload: data });
            }

            // UPDATING STATUS OF OVERTIME TO NORMAL ENDING
            let idxOT = data.findIndex(
                (e) => e.prizeId === prizeId && e.status === 2
            );
            if (idxOT > -1) {
                data[idxOT] = {
                    prizeId,
                    status: 1,
                    ended: "overtime",
                };
                dispatch({ type: OVER_TIME, payload: data });
            }
        }
    };
}
