import { GET_GEMS_LIST } from "redux/types";

const INITIAL_STATE = {
    gemsList: [],
};

const gemsListReducer = (esmData = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case GET_GEMS_LIST:
            return { ...esmData, gemsList: payload };

        default:
            return esmData;
    }
};

export default gemsListReducer;
