import { GET_ACTIVITIES } from "redux/types";

const INITIAL_STATE = {
    activity: [],
};

const activityReducer = (esmData = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case GET_ACTIVITIES:
            return { ...esmData, activity: payload };

        default:
            return esmData;
    }
};

export default activityReducer;
