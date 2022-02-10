import refreshToken from "Utils/RefreshToken";
import { CONSUME_USER_GEMS } from "redux/types";

export default function loadConsumeUserGems(consumeAmount) {
    return async (dispatch, getState) => {
        const { user } = getState()?.userData;

        const token = await refreshToken();
        if (token) {
            let _user = { ...user, gems: user.gems - consumeAmount };
            dispatch({
                type: CONSUME_USER_GEMS,
                payload: _user,
            });
        }
    };
}
