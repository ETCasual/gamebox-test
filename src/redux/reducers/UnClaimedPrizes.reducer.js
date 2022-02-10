import { GET_UNCLAIMED_PRIZES_LIST } from "redux/types";

const INITIAL_STATE = {
    unClaimedPrizes: [],
};

const unClaimedPrizesReducer = (esmData = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case GET_UNCLAIMED_PRIZES_LIST:
            return { ...esmData, unClaimedPrizes: payload };

        default:
            return esmData;
    }
};

export default unClaimedPrizesReducer;
