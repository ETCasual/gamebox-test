import {
    LIST_NOTIFICATIONS,
    LIST_WINNER_ANNOUNCEMENT_NOTIFICATIONS,
    LOG_OUT,
    SHOW_TOAST,
} from "redux/types";
import {
    getNotifications,
    getWinnerAnnouncementNotifications,
    UpdateNotificationSeen,
} from "redux/services/index.service";

export function loadNotifications() {
    return async (dispatch, getState) => {
        const { user } = getState()?.userData;

        return getNotifications(user, 1)
            .then((data) => {
                dispatch({ type: LIST_NOTIFICATIONS, payload: data });
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
                    console.log("NOTIFICATIONS THUNK: No Result found!");
                else console.log(error);
            });
    };
}

export function loadInitNotifications() {
    return async (dispatch, getState) => {
        const { user } = getState()?.userData;

        return getWinnerAnnouncementNotifications(user, 2)
            .then((data) => {
                dispatch({
                    type: LIST_WINNER_ANNOUNCEMENT_NOTIFICATIONS,
                    payload: data,
                });

                getNotifications(user, 0)
                    .then((data) => {
                        dispatch({ type: LIST_NOTIFICATIONS, payload: data });
                    })
                    .catch((error) => {
                        if (error.code === 7) {
                            console.log(error.message);
                            dispatch({ type: LOG_OUT });
                            dispatch({
                                type: SHOW_TOAST,
                                payload: {
                                    message:
                                        "Session Expired! Please login again.",
                                },
                            });
                        } else if (error.code === 13)
                            console.log(
                                "NOTIFICATIONS THUNK: No Result found!"
                            );
                        else console.log(error);
                    });
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
                    console.log(
                        "WINNER ANNOUNCEMENT NOTIFICATIONS THUNK: No Result found!"
                    );
                else console.log(error);
            });
    };
}

export function loadWinnerAnnouncementNotifications() {
    return async (dispatch, getState) => {
        const { user } = getState()?.userData;

        return getWinnerAnnouncementNotifications(user, 2)
            .then((data) => {
                dispatch({
                    type: LIST_WINNER_ANNOUNCEMENT_NOTIFICATIONS,
                    payload: data,
                });
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
                    console.log(
                        "WINNER ANNOUNCEMENT NOTIFICATIONS THUNK: No Result found!"
                    );
                else console.log(error);
            });
    };
}

export function loadUpdateNotificationSeen(id) {
    return async (dispatch, getState) => {
        const { user } = getState()?.userData;

        return UpdateNotificationSeen(id, user?.id)
            .then((data) => {
                // console.log(data);
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
                    console.log(
                        "UPDATE NOTIFICATION SEEN THUNK: No Result found!"
                    );
                else console.log(error);
            });
    };
}
