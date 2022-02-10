import refreshToken from "Utils/RefreshToken";
import { getUnclaimedPrizesList } from "redux/services/index.service";
import { GET_UNCLAIMED_PRIZES_LIST } from 'redux/types';

export default function loadUnClaimedPrizes() {
    return async (dispatch, getState) => {
        const { user } = getState()?.userData;
        const token = await refreshToken();
        if (token) {
            return getUnclaimedPrizesList(user)
                .then((data) => {
                    dispatch({
                        type: GET_UNCLAIMED_PRIZES_LIST,
                        payload: data,
                    });
                })
                .catch((error) => {
                    if (error.code === 7) {
                        console.log(error.message);
                    } else if (error.code === 13)
                        console.log("UNCLAIMED PRIZES THUNK: No Result found!");
                    else console.log(error);
                });
        }
    };
}
