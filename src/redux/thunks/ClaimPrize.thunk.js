import { CLAIM_PRIZE, LOG_OUT, SHOW_TOAST } from "redux/types";
import { processClaim } from "redux/services/index.service";

export default function loadClaimPrize(
    winnerId,
    claimData,
    successSubmissionCallback
) {
    return async (dispatch, getState) => {
        const { user } = getState()?.userData;

        return processClaim(user, winnerId, claimData)
            .then((data) => {
                const fnCallbackSubmission = successSubmissionCallback();
                if (data === 1) {
                    fnCallbackSubmission();
                    dispatch({
                        type: CLAIM_PRIZE,
                    });
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
