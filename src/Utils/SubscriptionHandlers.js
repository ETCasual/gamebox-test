import axios from "axios";

const findActiveSubscription = async (subId) => {
    try {
        const { data } = await axios.get(
            `${process.env.REACT_APP_STRIPE_ENDPOINT}/get_sub?sub_id=${subId}`
        );
        if (data?.id.length > 0) return data;
        return false;
    } catch (error) {
        console.log(error);
    }
};

const cancelSubscription = async (subId) => {
    try {
        const { data } = await axios.post(
            `${process.env.REACT_APP_STRIPE_ENDPOINT}/cancel`,
            {
                subscription_id: subId,
            }
        );
        if (data?.response?.cancel_at_period_end > 0) return data;
        return false;
    } catch (ex) {
        console.log("Cancel Subscription ID not found!", ex.message);
    }
};

const reActivateSubscription = async (subId) => {
    try {
        const { data } = await axios.post(
            `${process.env.REACT_APP_STRIPE_ENDPOINT}/activate`,
            {
                subscription_id: subId,
            }
        );
        if (!data?.response?.cancel_at_period_end) return data;
        return false;
    } catch (ex) {
        console.log("Re-Activate Subscription ID not found!", ex.message);
    }
};

export { findActiveSubscription, cancelSubscription, reActivateSubscription };
