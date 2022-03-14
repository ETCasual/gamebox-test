import { GET_GAME_RULES } from "redux/types";

export default function loadCurrentGameRules(gameId) {
    return async (dispatch) => {
        dispatch({
            type: GET_GAME_RULES,
            payload: gameId,
        });
    };
}
