import {
    GET_SPIN_AVAIALBLE,
    SPINNER_LOG_EXTRA,
    SPINNER_LOG_SPIN,
} from "redux/types";

const INITIAL_STATE = {
    spinner: {
        enterId: 0,
        freeSpins: 0,
        winAmount: 0,
        winType: "",
    },
};

const playerSpinnerInfoReducer = (
    esmData = INITIAL_STATE,
    { type, payload }
) => {
    switch (type) {
        case SPINNER_LOG_SPIN:
            return { ...esmData, spinner: payload };

        case SPINNER_LOG_EXTRA:
            return { ...esmData, spinner: payload };

        case GET_SPIN_AVAIALBLE:
            return { ...esmData, spinner: payload };

        default:
            return esmData;
    }
};

export default playerSpinnerInfoReducer;
