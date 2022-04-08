import { CURRENT_GAME_DETAILS } from "redux/types";

const INITIAL_STATE = {
    currentGameDetails: {
        gameId: null,
        gameIndex: null,
        gameTitle: null,
        gameIcon: null,
        endTimeStamp: null,
    },
};

const currentGameDetailsReducer = (esmData = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case CURRENT_GAME_DETAILS:
            return { ...esmData, currentGameDetails: payload };

        default:
            return esmData;
    }
};

export default currentGameDetailsReducer;
