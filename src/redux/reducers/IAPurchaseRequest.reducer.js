import { IA_PURCHASE_REQUEST } from "redux/types";

const INITIAL_STATE = {};

const IAPurchaseReducer = (esmData = INITIAL_STATE, { type }) => {
    switch (type) {
        case IA_PURCHASE_REQUEST:
            return { ...esmData };

        default:
            return esmData;
    }
};

export default IAPurchaseReducer;
