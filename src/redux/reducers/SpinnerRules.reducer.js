import { GET_SPINNER_RULES } from "redux/types";

const INITIAL_STATE = {
    spinnerRules: [],
};

const spinnerRulesReducer = (esmData = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case GET_SPINNER_RULES:
            return { ...esmData, spinnerRules: payload };

        default:
            return esmData;
    }
};

export default spinnerRulesReducer;
