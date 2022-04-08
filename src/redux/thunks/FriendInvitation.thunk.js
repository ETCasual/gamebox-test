import { LOG_OUT, SHOW_TOAST } from "redux/types";
import { newUserInvitation } from "redux/services/index.service";
import loadUserDetails from "redux/thunks/UserDetails.thunk";

export default function loadFriendInvitation(inviteCode) {
    return async (dispatch, getState) => {
        const { user } = getState()?.userData;

        return newUserInvitation(user, inviteCode)
            .then(() => {
                loadUserDetails(user, dispatch);
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
                    console.log("FRIEND INVITATION THUNK: No Result found!");
                else console.log(error);
            });
    };
}
