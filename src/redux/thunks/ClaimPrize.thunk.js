import refreshToken from "Utils/RefreshToken";
import { processClaim } from "redux/services/index.service";
import { CLAIM_PRIZE } from "redux/types";

export default function loadClaimPrize(
    winnerId,
    claimData,
    successSubmissionCallback
) {
    return async (dispatch, getState) => {
        const { user } = getState()?.userData;

        const token = await refreshToken();
        if (token) {
            processClaim(user, winnerId, claimData)
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
                    } else if (error.code === 13)
                        console.log("CLAIM PRIZE THUNK: No Result found!");
                    else console.log(error);
                });
        }
    };
}
