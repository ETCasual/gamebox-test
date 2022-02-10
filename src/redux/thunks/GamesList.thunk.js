import refreshToken from "Utils/RefreshToken";
import { getGamesList } from "redux/services/index.service";
import { LIST_GAMES } from "redux/types";

export default function loadGamesList() {
    return async (dispatch) => {
        const token = await refreshToken();
        if (token) {
            return getGamesList()
                .then((data) => {
                    dispatch({
                        type: LIST_GAMES,
                        payload: data,
                    });
                })
                .catch((error) => {
                    if (error.code === 7) {
                        console.log(error.message);
                    } else if (error.code === 13)
                        console.log("LIST GAMES THUNK: No Result found!");
                    else console.log(error);
                });
        }
    };
}
