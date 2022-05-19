import { LOG_OUT, SHOW_TOAST } from "redux/types";
import { processClaim } from "redux/services/index.service";
import loadClaimedPrizes from "redux/thunks/ClaimedPrizes.thunk";
import { loadUnClaimedPrizes } from "redux/thunks/UnClaimedPrizes.thunk";

export default function loadClaimPrize(winnerId, userId, hash, walletAddress) {
    return async (dispatch) => {
        return processClaim(winnerId, userId, hash, walletAddress)
            .then((data) => {
                if (data === 1) {
                    dispatch(loadClaimedPrizes());
                    dispatch(loadUnClaimedPrizes());
                }
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
                    console.log("CLAIM PRIZE THUNK: No Result found!");
                else console.log(error);
            });
    };
}
