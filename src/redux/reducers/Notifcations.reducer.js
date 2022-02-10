import { LIST_NOTIFICATIONS } from "redux/types";
import _ from "lodash";

const INITIAL_STATE = {
    notificationList: [],
};

const notificationReducer = (esmData = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case LIST_NOTIFICATIONS:
            const sortedArray = _.orderBy(
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
            return { ...esmData, notificationList: sortedArray };

        default:
            return esmData;
    }
};

export default notificationReducer;
