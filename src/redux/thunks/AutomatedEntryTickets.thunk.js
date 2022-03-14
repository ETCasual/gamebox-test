import { GET_AUTOMATED_ENTRY_TICKETS, LOG_OUT, SHOW_TOAST } from "redux/types";
import { getTotalTickets } from "redux/services/index.service";

export default function loadAutomatedEntryTickets(scheduledOn, prizeId) {
    return async (dispatch, getState) => {
        const { user } = getState()?.userData;

        return getTotalTickets(scheduledOn, prizeId, user)
            .then((data) =>
                dispatch({
                    type: GET_AUTOMATED_ENTRY_TICKETS,
                    payload: data,
                })
            )
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
                    console.log(
                        "AUTOMATED ENTRY TICKETS THUNK: No Result found!"
                    );
                else console.log(error);
            });
    };
}
