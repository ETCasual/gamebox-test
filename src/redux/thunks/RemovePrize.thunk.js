import { REMOVE_CURRENT_PRIZE } from "redux/types";

export default function loadRemovePrize(prizeId, prizeType) {
    return async (dispatch) => {
        dispatch({
            type: REMOVE_CURRENT_PRIZE,
            payload: { prizeId, prizeType },
        });
    };
}
