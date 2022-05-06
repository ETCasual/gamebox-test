import { GET_HIGH_SCORE } from "redux/types";

const INITIAL_STATE = {
    highScore: [],
};

const highScoreReducer = (esmData = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case GET_HIGH_SCORE:
            return { ...esmData, highScore: payload };

        default:
            return esmData;
    }
};

export default highScoreReducer;
