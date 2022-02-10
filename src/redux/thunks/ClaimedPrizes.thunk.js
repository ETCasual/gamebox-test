import refreshToken from "Utils/RefreshToken";
import { getClaimedPrizesList } from "redux/services/index.service";
import { GET_CLAIMED_PRIZES_LIST } from 'redux/types';

export default function loadClaimedPrizes() {
    return async (dispatch, getState) => {
        const { user } = getState()?.userData;
        
        const token = await refreshToken();
        if (token) {
            return getClaimedPrizesList(user)
                .then((data) => {
                    dispatch({
                        type: GET_CLAIMED_PRIZES_LIST,
                        payload: data,
                    });
                })
                .catch((error) => {
                    if (error.code === 7) {
                        console.log(error.message);
                    } else if (error.code === 13)
                        console.log("CLAIMED PRIZES THUNK: No Result found!");
                    else console.log(error);
                });
        }
    };
}
