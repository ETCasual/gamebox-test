import { GET_RANKS } from "redux/types";

const INITIAL_STATE = {
    ranks: [],
};

const ranksReducer = (esmData = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case GET_RANKS:
            return { ...esmData, ranks: payload };

        default:
            return esmData;
    }
};

export default ranksReducer;
