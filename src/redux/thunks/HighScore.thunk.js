import refreshToken from "Utils/RefreshToken";
import { getHighScore } from "redux/services/index.service";
import { GET_HIGH_SCORE } from 'redux/types';

export default function loadHighScore() {
    return async (dispatch, getState) => {
        const { user } = getState()?.userData;

        const token = await refreshToken();
        if (token) {
            return getHighScore(user)
                .then((data) => {
                    dispatch({
                        type: GET_HIGH_SCORE,
                        payload: data,
                    });
                })
                .catch((error) => {
                    if (error.code === 7) {
                        console.log(error.message);
                    } else if (error.code === 13)
                        console.log("HIGH SCORE THUNK: No Result found!");
                    else console.log(error);
                });
        }
    };
}
