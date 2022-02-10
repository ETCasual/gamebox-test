import refreshToken from "Utils/RefreshToken";
import { updateUserSettings } from "redux/services/index.service";
import loadUserDetails from "redux/thunks/UserDetails.thunk";
import { UPDATE_USER_SETTINGS } from "redux/types";

export default function loadUpdateUserSettings(
    username,
    picture,
    isNotifyAllowed
) {
    return async (dispatch, getState) => {
        const { user } = getState()?.userData;

        const token = await refreshToken();
        if (token) {
            return updateUserSettings(user, username, picture, isNotifyAllowed)
                .then((data) => {
                    dispatch({
                        type: "SHOW_TOAST",
                        payload: {
                            message: "Profile Info Updated!",
                        },
                    });
                    dispatch({
                        type: UPDATE_USER_SETTINGS,
                        payload: data,
                    });
                    dispatch(loadUserDetails());
                })
                .catch((error) => {
                    if (error.code === 7) {
                        console.log(error.message);
                    } else if (error.code === 13)
                        console.log(
                            "UPDATE USER SETTINGS THUNK: No Result found!"
                        );
                    else console.log(error);
                });
        }
    };
}
