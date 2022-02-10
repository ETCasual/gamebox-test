import { REMOVE_CURRENT_PRIZE } from "redux/types";
import { PRIZE_CATEGORY_NAME } from "Utils/Enums";

const INITIAL_STATE = {
    prizes: {
        featuredData: [],
        premiumData: [],
        dailyData: [],
        automatedEntryData: [],
    },
};

const removePrizeReducer = (esmData = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case REMOVE_CURRENT_PRIZE:
            let prizes = esmData.prizes;
            let currentPrize = prizes[PRIZE_CATEGORY_NAME[payload.prizeType]];
            let prizeIdx = currentPrize.findIndex(
                (e) => e.prizeId === payload.prizeId
            );
            if (prizeIdx > -1) currentPrize.splice(prizeIdx, 1);
            return { ...esmData, prizes };

        default:
            return esmData;
    }
};

export default removePrizeReducer;
