import { INVITE } from "redux/types";

const INITIAL_STATE = {};

const friendInvitationReducer = (esmData = INITIAL_STATE, { type }) => {
    switch (type) {
        case INVITE:
            return { ...esmData };

        default:
            return esmData;
    }
};

export default friendInvitationReducer;
