import { GET_CLAIMED_PRIZES_LIST } from "redux/types";

const INITIAL_STATE = {
    claimedPrizes: [],
};

const claimedPrizesReducer = (esmData = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case GET_CLAIMED_PRIZES_LIST:
            return { ...esmData, claimedPrizes: payload };

        default:
            return esmData;
    }
};

export default claimedPrizesReducer;
