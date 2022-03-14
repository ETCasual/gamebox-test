import { USE_GEMS_FOR_TICKETS } from "redux/types";

export default function loadConsumeUserGemsTickets(consumeAmount) {
    return async (dispatch, getState) => {
        const { user } = getState()?.userData;

        let _user = { ...user, gems: user?.gems - consumeAmount };
        dispatch({
            type: USE_GEMS_FOR_TICKETS,
            payload: _user,
        });
    };
}
