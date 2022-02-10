import { GET_CONFIG } from "redux/types";

const INITIAL_STATE = {
    config: {
        gemsPerInvite: "",
        adsPerGame: "",
        daysToClaimPrize: "",
        freeSpinPerDay: "",
        useGems: "",
        watchAds: "",
        useGemsSpin: "",
        watchAdsSpin: "",
    },
};

const configReducer = (esmData = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case GET_CONFIG:
            return { ...esmData, config: payload };

        default:
            return esmData;
    }
};

export default configReducer;
