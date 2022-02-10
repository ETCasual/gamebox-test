import { GET_EXCHANGE_RATE } from "redux/types";

const INITIAL_STATE = {
    ipInfo: {},
    exchangeRate: {
        amount: "",
        base: "",
        date: "",
        rates: "",
    },
};

const exchangeRateReducer = (esmData = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case GET_EXCHANGE_RATE:
            return {
                ...esmData,
                exchangeRate: payload.exchangeRate,
                ipInfo: payload.ipInfo,
            };

        default:
            return esmData;
    }
};

export default exchangeRateReducer;
