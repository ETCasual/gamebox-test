import refreshToken from "Utils/RefreshToken";
import { purchaseProcess } from "redux/services/index.service";
import { IA_PURCHASE_REQUEST } from "redux/types";

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

        const token = await refreshToken();
        if (token) {
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
                    } else if (error.code === 13)
                        console.log(
                            "IA PURCHASE REQUEST THUNK: No Result found!"
                        );
                    else console.log(error);
                });
        }
    };
}
