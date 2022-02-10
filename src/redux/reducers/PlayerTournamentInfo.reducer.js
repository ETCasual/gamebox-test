import { PLAYER_LOG_ENTER, PLAYER_LOG_LEAVE } from "redux/types";

const INITIAL_STATE = {
    currentGameInfo: { playerEnterGameId: 0 },
    extraEarning: {
        leaveId: 0,
        experience: 0,
        ticket: 0,
    },
};

const playerTournamentInfoReducer = (
    esmData = INITIAL_STATE,
    { type, payload }
) => {
    switch (type) {
        case PLAYER_LOG_ENTER:
            return { ...esmData, currentGameInfo: payload };

        case PLAYER_LOG_LEAVE:
            return {
                ...esmData,
                extraEarning: payload,
            };

        default:
            return esmData;
    }
};

export default playerTournamentInfoReducer;
