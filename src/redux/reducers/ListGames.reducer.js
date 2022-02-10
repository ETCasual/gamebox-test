import { LIST_GAMES } from "redux/types";

const INITIAL_STATE = {
    gamesList: [],
};

const listGamesReducer = (esmData = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case LIST_GAMES:
            return { ...esmData, gamesList: payload };

        default:
            return esmData;
    }
};

export default listGamesReducer;
