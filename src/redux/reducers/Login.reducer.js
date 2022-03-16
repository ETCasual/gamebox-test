import {
    LOGIN_STATUS,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    UPDATE_USER_SETTINGS,
    USER_DETAILS,
    CONSUME_USER_GEMS,
    USE_GEMS_FOR_TICKETS,
    UPDATE_USER_WALLET,
} from "redux/types";

const INITIAL_STATE = {
    user: {
        id: null,
        exp: 0,
        gems: 0,
        picture: "",
        username: "",
        email: "",
        isNotifyAllowed: true,
        status: null,
        walletAddress: null,
        walletAmount: null,
    },
    loginStatus: {
        loading: false,
        ready: false,
        noAuth: false,
    },
};

const loginReducer = (esmData = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case LOGIN_STATUS:
            return { ...esmData, loginStatus: payload };

        case LOGIN_SUCCESS:
            return { ...esmData, user: payload };

        case LOGIN_ERROR:
            sessionStorage.setItem("errorType", payload.errorType);
            return {
                ...esmData,
                user: { ...esmData.user, status: payload.errorType },
            };

        case UPDATE_USER_SETTINGS:
            return { ...esmData, user: payload };

        case USER_DETAILS:
            return { ...esmData, user: payload };

        case CONSUME_USER_GEMS:
            return { ...esmData, user: payload };

        case USE_GEMS_FOR_TICKETS:
            return { ...esmData, user: payload };

        case UPDATE_USER_WALLET:
            return { ...esmData, user: payload };

        default:
            return esmData;
    }
};

export default loginReducer;
