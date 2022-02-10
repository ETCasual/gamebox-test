import { RESET_NOTIFICATION_NUMBER } from "redux/types";

export default function loadResetNotificationNumber() {
    return async (dispatch, getState) => {
        let { notificationNumber } = getState()?.notificationNumber;
        notificationNumber = { ...notificationNumber, count: 0 };

        dispatch({
            type: RESET_NOTIFICATION_NUMBER,
            payload: notificationNumber,
        });
    };
}
