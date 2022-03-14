import { IA_PURCHASE_REQUEST, LOG_OUT, SHOW_TOAST } from "redux/types";
import { purchaseProcess } from "redux/services/index.service";

export default function loadIAPurchaseRequest(
    secret,
    paymentId,
    itemTypeId,
    itemId,
    price,
    subId = ""
) {
    return async (dispatch, getState) => {
        const { user } = getState()?.userData;

        return purchaseProcess(
            user,
            secret,
            itemTypeId,
            itemId,
            paymentId,
            price,
            subId
        )
            .then(() => {
                dispatch({
                    type: IA_PURCHASE_REQUEST,
                });
            })
            .catch((error) => {
                if (error.code === 7) {
                    console.log(error.message);
                    dispatch({ type: LOG_OUT });
                    dispatch({
                        type: SHOW_TOAST,
                        payload: {
                            message: "Session Expired! Please login again.",
                        },
                    });
                } else if (error.code === 13)
                    console.log("IA PURCHASE REQUEST THUNK: No Result found!");
                else console.log(error);
            });
    };
}
