import { GET_BLOCK_CHAIN_NETWORKS } from "redux/types";

const INITIAL_STATE = {
    blockchainNetworks: [],
};

const blockchainNetworksReducer = (
    esmData = INITIAL_STATE,
    { type, payload }
) => {
    switch (type) {
        case GET_BLOCK_CHAIN_NETWORKS:
            return { ...esmData, blockchainNetworks: payload };

        default:
            return esmData;
    }
};

export default blockchainNetworksReducer;
