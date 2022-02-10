import _ from "lodash";

const getPrizeTicketCollected = (prizeTicketCollection, prizeId) => {
    let currentPrize = prizeTicketCollection.filter(
        (pool) => pool.prizeId === parseInt(prizeId)
    );
    if (currentPrize) return _.maxBy(currentPrize, "tickets")?.tickets || 0;
    return "-";
};

export default getPrizeTicketCollected;
