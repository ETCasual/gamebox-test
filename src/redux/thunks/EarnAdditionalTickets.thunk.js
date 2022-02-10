import updateEarnAdditionalTicketsList from "Utils/UpdateEarnAdditionalTicketsList";
import { UPDATE_EARN_ADDITION_BENEFIT_STATUS } from "redux/types";

export function loadEarnAdditionalBenefitStatus(data) {
    return async (dispatch) => {
        dispatch({
            type: UPDATE_EARN_ADDITION_BENEFIT_STATUS,
            payload: data,
        });
    };
}

export function removeEarnAdditionalBenefitStatus(prizeId) {
    return async (dispatch, getStatus) => {
        const { earnAdditionalBenefitStatus } = getStatus().earnAdditional;

        if (earnAdditionalBenefitStatus.length > 0) {
            const data = updateEarnAdditionalTicketsList(
                earnAdditionalBenefitStatus,
                prizeId
            );
            if (data)
                dispatch({
                    type: UPDATE_EARN_ADDITION_BENEFIT_STATUS,
                    payload: data,
                });
        }
    };
}
