import { CLAIM_PRIZE } from "redux/types";

const INITIAL_STATE = {};

const claimPrizeReducer = (esmData = INITIAL_STATE, { type }) => {
    switch (type) {
        case CLAIM_PRIZE:
            return { ...esmData };

        default:
            return esmData;
    }
};

export default claimPrizeReducer;
