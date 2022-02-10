import { UPDATE_PUSH_NOTIFICATION } from "redux/types";

const INITIAL_STATE = {};

const updateNotificationTokenReducer = (esmData = INITIAL_STATE, { type }) => {
    switch (type) {
        case UPDATE_PUSH_NOTIFICATION:
            return { ...esmData };

        default:
            return esmData;
    }
};

export default updateNotificationTokenReducer;
