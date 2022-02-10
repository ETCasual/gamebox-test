import { GET_AUTOMATED_ENTRY_TICKETS } from "redux/types";

const INITIAL_STATE = {
    automatedEntryTicket: [],
};

const automatedEntryTicketsReducer = (
    esmData = INITIAL_STATE,
    { type, payload }
) => {
    switch (type) {
        case GET_AUTOMATED_ENTRY_TICKETS:
            return { ...esmData, automatedEntryTicket: payload };

        default:
            return esmData;
    }
};

export default automatedEntryTicketsReducer;
