import { GET_LEADERBOARD_HISTORY } from "redux/types";

const INITIAL_STATE = {
    leaderboardHistory: [],
};

const leaderboardHistoryReducer = (
    esmData = INITIAL_STATE,
    { type, payload }
) => {
    switch (type) {
        case GET_LEADERBOARD_HISTORY:
            return { ...esmData, leaderboardHistory: payload };

        default:
            return esmData;
    }
};

export default leaderboardHistoryReducer;
