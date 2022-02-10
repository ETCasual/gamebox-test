import { OVER_TIME } from "redux/types";

const INITIAL_STATE = {
    overTimePrizes: [],
};

const overTimeReducer = (esmData = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case OVER_TIME:
            return { ...esmData, overTimePrizes: payload };

        default:
            return esmData;
    }
};

export default overTimeReducer;
