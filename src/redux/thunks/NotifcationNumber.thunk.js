import refreshToken from "Utils/RefreshToken";
import { getNotificationNumber } from "redux/services/index.service";
import { GET_NOTIFICATION_NUMBER } from 'redux/types';

export default function loadNotificationNumber() {
    return async (dispatch, getState) => {
        const { user } = getState()?.userData;
        const { notificationNumber } = getState()?.notificationNumber;

        const token = await refreshToken();
        if (token) {
            return getNotificationNumber(user, notificationNumber)
                .then((data) => {
                    dispatch({
                        type: GET_NOTIFICATION_NUMBER,
                        payload: data,
                    });
                })
                .catch((error) => {
                    if (error.code === 7) {
                        console.log(error.message);
                    } else if (error.code === 13)
                        console.log("LEADERBOARD RANK THUNK: No Result found!");
                    else console.log(error);
                });
        }
    };
}
