import { GET_CURRENT_USER_RANK } from "redux/types";

const INITIAL_STATE = {
    currentUserRank: { rank: "-" },
};

const currentUserRankReducer = (esmData = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case GET_CURRENT_USER_RANK:
            return { ...esmData, currentUserRank: payload };

        default:
            return esmData;
    }
};

export default currentUserRankReducer;
