import { handleSignOut } from "../../Utils/SignOut";
import {
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    UPDATE_USER_SETTINGS,
    USER_DETAILS,
    CONSUME_USER_GEMS,
    USE_GEMS_FOR_TICKETS,
} from "redux/types";

const INITIAL_STATE = {
    user: {
        id: 0,
        exp: 0,
        gems: 0,
        picture: "",
        username: "",
        email: "",
        phone: "",
        providerUID: "",
        providerId: "",
        subId: "",
        subExpiryDate: "",
        isNotifyAllowed: true,
        isLoggedIn: false,
    },
};

const loginReducer = (esmData = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case LOGIN_SUCCESS:
            return { ...esmData, user: payload };

        case LOGIN_ERROR:
            sessionStorage.setItem("errorType", payload.errorType);
            handleSignOut(payload.dispatch);
            return { ...esmData, user: esmData.user };

        case UPDATE_USER_SETTINGS:
            return { ...esmData, user: payload };

        case USER_DETAILS:
            return { ...esmData, user: payload };

        case CONSUME_USER_GEMS:
            return { ...esmData, user: payload };

        case USE_GEMS_FOR_TICKETS:
            return { ...esmData, user: payload };

        default:
            return esmData;
    }
};

export default loginReducer;
