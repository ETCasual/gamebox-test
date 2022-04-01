import { LOG_OUT, SHOW_TOAST, GET_BLOCK_CHAIN_NETWORKS } from "redux/types";
import { getBlockchainNetworks } from "redux/services/index.service";

export default function loadBlockchainNetworks() {
    return async (dispatch) => {
        return getBlockchainNetworks()
            .then((data) => {
                dispatch({
                    type: GET_BLOCK_CHAIN_NETWORKS,
                    payload: data,
                });
            })
            .catch((error) => {
                if (error.code === 7) {
                    console.log(error.message);
                    dispatch({ type: LOG_OUT });
                    dispatch({
                        type: SHOW_TOAST,
                        payload: {
                            message: "Session Expired! Please login again.",
                        },
                    });
                } else if (error.code === 13)
                    console.log("BLOCK CHAIN NETWORKS THUNK: No Result found!");
                else console.log(error);
            });
    };
}
