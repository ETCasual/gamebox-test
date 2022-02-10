import refreshToken from "Utils/RefreshToken";
import { GET_GAME_RULES } from "redux/types";

export default function loadCurrentGameRules(gameId) {
    return async (dispatch) => {
        const token = await refreshToken();
        if (token) {
            dispatch({
                type: GET_GAME_RULES,
                payload: gameId,
            });
        }
    };
}
