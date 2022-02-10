import { GET_HIGH_SCORE } from "redux/types";

const INITIAL_STATE = {
    highScore: [],
};

const highScoreReducer = (esmData = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case GET_HIGH_SCORE:
            const result = [];
            payload.forEach((element) => {
                let idx = result.findIndex(
                    (e) => e.gameTitle === element.gameTitle
                );
                if (idx === -1) result.push(element);
                else if (idx > -1 && element.gameScore > result[idx].gameScore)
                    result[idx].gameScore = element.gameScore;
            });
            return { ...esmData, highScore: result };

        default:
            return esmData;
    }
};

export default highScoreReducer;
