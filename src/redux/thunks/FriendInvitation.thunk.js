import refreshToken from "Utils/RefreshToken";
import { newUserInvitation } from "redux/services/index.service";
import loadUserDetails from "redux/thunks/UserDetails.thunk";
import { INVITE } from "redux/types";

export default function loadFriendInvitation(inviteCode) {
    return async (dispatch, getState) => {
        const { user } = getState()?.userData;

        const token = await refreshToken();
        if (token) {
            return newUserInvitation(user, inviteCode)
                .then(() => {
                    dispatch({
                        type: INVITE,
                    });
                    loadUserDetails(user, dispatch);
                })
                .catch((error) => {
                    if (error.code === 7) {
                        console.log(error.message);
                    } else if (error.code === 13)
                        console.log(
                            "FRIEND INVITATION THUNK: No Result found!"
                        );
                    else console.log(error);
                });
        }
    };
}
