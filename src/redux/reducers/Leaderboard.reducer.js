import { GET_LEADERBOARD } from "redux/types";
import _ from "lodash";

const INITIAL_STATE = {
    leaderboard: [],
};

const leaderboardReducer = (esmData = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case GET_LEADERBOARD:
            let sortedLeaderboard = _.orderBy(
                payload,
                ["gameScore", "leaveTimeStamp"],
                ["desc", "asc"]
            );
            return { ...esmData, leaderboard: sortedLeaderboard };

        default:
            return esmData;
    }
};

export default leaderboardReducer;
