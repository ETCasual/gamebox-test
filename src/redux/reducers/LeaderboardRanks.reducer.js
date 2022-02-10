import { GET_LEADERBOARD_RANK } from "redux/types";

const INITIAL_STATE = {
    leaderRuleRanks: [
        {
            exp: "",
            gameId: "",
            rankFrom: "",
            rankTo: "",
            ticket: "",
        },
    ],
};

const leaderboardRanksReducer = (esmData = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case GET_LEADERBOARD_RANK:
            return { ...esmData, leaderRuleRanks: payload };

        default:
            return esmData;
    }
};

export default leaderboardRanksReducer;
