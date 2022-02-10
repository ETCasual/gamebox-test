import refreshToken from "Utils/RefreshToken";
import { getCurrentUserRank } from "redux/services/index.service";
import { GET_CURRENT_USER_RANK } from "redux/types";

export default function loadCurrentUserRank(prizeId, gameId) {
    return async (dispatch, getState) => {
        const { user } = getState()?.userData;
        const { currentUserRank } = getState()?.currentUserRank;

        const token = await refreshToken();
        if (token) {
            return getCurrentUserRank(user, prizeId, gameId, currentUserRank)
                .then((data) => {
                    dispatch({
                        type: GET_CURRENT_USER_RANK,
                        payload: data,
                    });
                })
                .catch((error) => {
                    if (error.code === 7) {
                        console.log(error.message);
                    } else if (error.code === 13)
                        console.log(
                            "CURRENT USER RANK THUNK: No Result found!"
                        );
                    else console.log(error);
                });
        }
    };
}
