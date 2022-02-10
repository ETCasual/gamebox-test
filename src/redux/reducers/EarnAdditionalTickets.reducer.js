import { UPDATE_EARN_ADDITION_BENEFIT_STATUS } from "redux/types";

const INITIAL_STATE = {
    earnAdditionalBenefitStatus: [],
};

const earnAdditinalBenefitReducer = (
    esmData = INITIAL_STATE,
    { type, payload }
) => {
    switch (type) {
        case UPDATE_EARN_ADDITION_BENEFIT_STATUS:
            return { ...esmData, earnAdditionalBenefitStatus: payload };

        default:
            return esmData;
    }
};

export default earnAdditinalBenefitReducer;
