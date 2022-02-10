import { PLAYER_HIGH_SCORE } from "redux/types";
import _ from "lodash";

const INITIAL_STATE = {
    playersHighScore: [],
};

const playerHighScoreReducer = (esmData = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case PLAYER_HIGH_SCORE:
            const playerHighScoreList = _(payload)
                .orderBy(["gameTitle", "gameScore"], ["asc", "desc"])
                .uniqBy("gameTitle")
                .value();
            return { ...esmData, playersHighScore: playerHighScoreList };

        default:
            return esmData;
    }
};

export default playerHighScoreReducer;
