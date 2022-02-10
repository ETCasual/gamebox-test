import refreshToken from "Utils/RefreshToken";
import { getGemsList } from "redux/services/index.service";
import { GET_GEMS_LIST } from 'redux/types';

export default function loadGemsList() {
    return async (dispatch) => {
        const token = await refreshToken();
        if (token) {
            return getGemsList()
                .then((data) => {
                    dispatch({
                        type: GET_GEMS_LIST,
                        payload: data,
                    });
                })
                .catch((error) => {
                    if (error.code === 7) {
                        console.log(error.message);
                    } else if (error.code === 13)
                        console.log("GEMS LIST THUNK: No Result found!");
                    else console.log(error);
                });
        }
    };
}
