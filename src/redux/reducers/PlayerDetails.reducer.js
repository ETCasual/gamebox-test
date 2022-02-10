import { PLAYER_DETAILS } from "redux/types";

const INITIAL_STATE = {
    playerDetails: {},
};

const playerDetailsReducer = (esmData = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case PLAYER_DETAILS:
            return { ...esmData, playerDetails: payload };

        default:
            return esmData;
    }
};

export default playerDetailsReducer;
