import {
    GET_SUBSCRIPTION_LIST,
    REACTIVATE_SUBSCRIPTION,
    CANCEL_SUBSCRIPTION,
} from "redux/types";

const INITIAL_STATE = {
    subscription: [],
};

const subscriptionReducer = (esmData = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case REACTIVATE_SUBSCRIPTION:
            return { ...esmData };

        case CANCEL_SUBSCRIPTION:
            return { ...esmData };

        case GET_SUBSCRIPTION_LIST:
            return { ...esmData, subscription: payload };

        default:
            return esmData;
    }
};

export default subscriptionReducer;
