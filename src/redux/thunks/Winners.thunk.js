import refreshToken from "Utils/RefreshToken";
import { getWinnersList } from "redux/services/index.service";
import { GET_WINNERS } from 'redux/types';

export default function loadWinners() {
    return async (dispatch) => {
        const token = await refreshToken();
        if (token) {
            return getWinnersList()
                .then((data) =>
                    dispatch({
                        type: GET_WINNERS,
                        payload: data,
                    })
                )
                .catch((error) => {
                    if (error.code === 7) {
                        console.log(error.message);
                    } else if (error.code === 13)
                        console.log("WINNERS THUNK: No Result found!");
                    else console.log(error);
                });
        }
    };
}
