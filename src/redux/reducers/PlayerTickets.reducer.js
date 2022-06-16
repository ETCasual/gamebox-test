import { GET_PLAYER_TICKETS } from "redux/types";

const INITIAL_STATE = {
    poolTickets: [],
};

const playerTicketsReducer = (esmData = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case GET_PLAYER_TICKETS:
            let poolTickets = [...esmData.poolTickets];
            // IF POOLTICKETS LIST IS EMPTY THEN ADD THE DATA
            if (poolTickets.length === 0) poolTickets.push(payload);
            else {
                // CHECK IF PRIZE ID EXISTS IN THE poolTickets LIST
                const idx = poolTickets.findIndex(
                    (e) => e.prizeId === payload.prizeId
                );

                // IF PRIZE ID DOESN'T EXIST THEN ADD THE NEW DATA TO THE poolTickets LIST
                if (idx === -1) {
                    poolTickets.push(payload);
                }
                // IF PRIZE ID EXISTS AND IF EXISITING TICKETS IS LESS THAN THE
                // NEW API DATA THEN UPDATE WITH NEW DATA
                
                // SHOULDNT CHECK IF EXISTING TICKETS IS LESS THAN THE NEW API DUE TO REPEATING PRIZE
                else {
                    poolTickets[idx] = payload;
                }
            }
            return { ...esmData, poolTickets };

        default:
            return esmData;
    }
};

export default playerTicketsReducer;
