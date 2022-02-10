import { RESET_TOAST, SHOW_TOAST } from "redux/types";

const INITIAL_STATE = {
    toasty: {
        message: "",
    },
};

const ToastyReducer = (esmData = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case SHOW_TOAST:
            return { ...esmData, toasty: payload };

        case RESET_TOAST:
            return {
                ...esmData,
                toasty: {
                    message: "",
                },
            };

        default:
            return esmData;
    }
};

export default ToastyReducer;
