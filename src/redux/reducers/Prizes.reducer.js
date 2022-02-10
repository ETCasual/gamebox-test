import { GET_GAME_RULES, GET_PRIZE } from "redux/types";

const INITIAL_STATE = {
    prizes: {
        featuredData: [],
        premiumData: [],
        dailyData: [],
        automatedEntryData: [],
    },
    gameRulesList: [],
    currentGameRules: {
        score: 0,
        watchAdTickets: 0,
        watchAdExp: 0,
        useGemTickets: 0,
        useGemExp: 0,
        useHowManyGems: 0,
    },
};

const prizesReducer = (esmData = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case GET_PRIZE:
            return {
                ...esmData,
                prizes: payload.prizes,
                gameRulesList: payload.gameRulesList,
            };

        case GET_GAME_RULES:
            let currentGameRules = {
                gameId: 0,
                score: 0,
                watchAdTickets: 0,
                watchAdExp: 0,
                useGemTickets: 0,
                useGemExp: 0,
                useHowManyGems: 0,
            };
            const idx = esmData?.gameRulesList.findIndex(
                (e) => e.gameId === payload
            );
            if (idx > -1) currentGameRules = esmData?.gameRulesList[idx];
            return { ...esmData, currentGameRules };

        default:
            return esmData;
    }
};

export default prizesReducer;
