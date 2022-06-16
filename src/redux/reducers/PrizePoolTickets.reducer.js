import { GET_PRIZE_POOL_TICKETS } from "redux/types";

const INITIAL_STATE = {
    prizeTicketCollection: [],
};

const prizePoolTicketsReducer = (
    esmData = INITIAL_STATE,
    { type, payload }
) => {
    switch (type) {
        case GET_PRIZE_POOL_TICKETS:
            let prizeTicketCollection = [...esmData.prizeTicketCollection];
            // IF prizeTicketCollection LIST IS EMPTY THEN ADD THE DATA
            if (prizeTicketCollection.length === 0)
                prizeTicketCollection.push(payload);
            else {
                // CHECK IF PRIZE ID EXISTS IN THE prizeTicketCollection LIST
                const idx = prizeTicketCollection.findIndex(
                    (e) => e.prizeId === payload.prizeId
                );

                // IF PRIZE ID DOESN'T EXIST THEN ADD THE NEW DATA TO THE prizeTicketCollection LIST
                if (idx === -1) {
                    prizeTicketCollection.push(payload);
                }
                // IF PRIZE ID EXISTS AND IF EXISITING TICKETS IS LESS THAN THE
                // NEW API DATA THEN UPDATE WITH NEW DATA

                // SHOULDNT CHECK IF EXISTING TICKETS IS LESS THAN THE NEW API DUE TO REPEATING PRIZE
                else {
                    prizeTicketCollection[idx] = payload;
                }
            }
            return { ...esmData, prizeTicketCollection };

        default:
            return esmData;
    }
};

export default prizePoolTicketsReducer;
