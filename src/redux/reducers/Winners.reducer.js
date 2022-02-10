import { GET_WINNERS } from "redux/types";

const INITIAL_STATE = {
    winners: [],
};

const winnersReducer = (esmData = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case GET_WINNERS:
            return { ...esmData, winners: payload };

        default:
            return esmData;
    }
};

export default winnersReducer;
