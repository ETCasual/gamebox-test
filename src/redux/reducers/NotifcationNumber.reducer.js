import { GET_NOTIFICATION_NUMBER, RESET_NOTIFICATION_NUMBER } from "redux/types";

const INITIAL_STATE = {
    notificationNumber: { count: 0 },
};

const notificationNumberReducer = (
    esmData = INITIAL_STATE,
    { type, payload }
) => {
    switch (type) {
        case GET_NOTIFICATION_NUMBER:
            return { ...esmData, notificationNumber: payload };

        case RESET_NOTIFICATION_NUMBER:
            return { ...esmData, notificationNumber: payload };

        default:
            return esmData;
    }
};

export default notificationNumberReducer;
