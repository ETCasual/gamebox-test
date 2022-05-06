import { PLAYER_HIGH_SCORE } from "redux/types";

const INITIAL_STATE = {
    playersHighScore: [],
};

const playerHighScoreReducer = (esmData = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case PLAYER_HIGH_SCORE:
            return { ...esmData, playersHighScore: payload };

        default:
            return esmData;
    }
};

export default playerHighScoreReducer;
