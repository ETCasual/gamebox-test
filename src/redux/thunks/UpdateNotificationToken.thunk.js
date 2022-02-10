import refreshToken from "Utils/RefreshToken";
import { updatePushNotification } from "redux/services/index.service";
import { UPDATE_PUSH_NOTIFICATION } from 'redux/types';

export default function loadNotificationToken(fcmToken) {
    return async (dispatch, getState) => {
        const { user } = getState()?.userData;

        const token = await refreshToken();
        if (token) {
            return updatePushNotification(user, fcmToken)
                .then(() => {
                    dispatch({
                        type: UPDATE_PUSH_NOTIFICATION,
                    });
                })
                .catch((error) => {
                    if (error.code === 7) {
                        console.log(error.message);
                    } else if (error.code === 13)
                        console.log(
                            "UPDATE NOTIFICATION TOKEN THUNK: No Result found!"
                        );
                    else console.log(error);
                });
        }
    };
}
