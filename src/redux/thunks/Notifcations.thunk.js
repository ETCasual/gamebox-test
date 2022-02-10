import refreshToken from "Utils/RefreshToken";
import { getNotifications } from "redux/services/index.service";
import { LIST_NOTIFICATIONS } from 'redux/types';

export default function loadNotifications() {
    return async (dispatch, getState) => {
        const { user } = getState()?.userData;
        
        const token = await refreshToken();
        if (token) {
            return getNotifications(user)
                .then((data) => {
                    dispatch({ type: LIST_NOTIFICATIONS, payload: data });
                })
                .catch((error) => {
                    if (error.code === 7) {
                        console.log(error.message);
                    } else if (error.code === 13)
                        console.log("NOTIFICATIONS THUNK: No Result found!");
                    else console.log(error);
                });
        }
    };
}
