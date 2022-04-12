import {
    LIST_NOTIFICATIONS,
    LIST_WINNER_ANNOUNCEMENT_NOTIFICATIONS,
} from "redux/types";
import _ from "lodash";

const INITIAL_STATE = {
    notificationList: [],
    winnerAnnouncementNotificationList: [],
};

const notificationReducer = (esmData = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case LIST_NOTIFICATIONS:
            const _n_sortedArray = _.orderBy(
                payload,
                [
                    (item) => {
                        const nestedItem = _.get(item, "list");
                        item["list"] = _.orderBy(
                            nestedItem,
                            "createdOn",
                            "desc"
                        );
                        return item;
                    },
                ],
                "desc"
            );
            return { ...esmData, notificationList: _n_sortedArray };

        case LIST_WINNER_ANNOUNCEMENT_NOTIFICATIONS:
            const _w_sortedArray = _.orderBy(
                payload,
                [
                    (item) => {
                        const nestedItem = _.get(item, "list");
                        item["list"] = _.orderBy(
                            nestedItem,
                            "createdOn",
                            "desc"
                        );
                        return item;
                    },
                ],
                "desc"
            );
            return {
                ...esmData,
                winnerAnnouncementNotificationList: _w_sortedArray,
            };

        default:
            return esmData;
    }
};

export default notificationReducer;
