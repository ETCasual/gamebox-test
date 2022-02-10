import refreshToken from "Utils/RefreshToken";
import { getTotalTickets } from "redux/services/index.service";
import { GET_AUTOMATED_ENTRY_TICKETS } from 'redux/types';

export default function loadAutomatedEntryTickets(scheduledOn, prizeId) {
    return async (dispatch, getState) => {
        const { user } = getState()?.userData;
        
        const token = await refreshToken();
        if (token) {
            getTotalTickets(scheduledOn, prizeId, user)
                .then((data) =>
                    dispatch({
                        type: GET_AUTOMATED_ENTRY_TICKETS,
                        payload: data,
                    })
                )
                .catch((error) => {
                    if (error.code === 7) {
                        console.log(error.message);
                    } else if (error.code === 13)
                        console.log(
                            "AUTOMATED ENTRY TICKETS THUNK: No Result found!"
                        );
                    else console.log(error);
                });
        }
    };
}
