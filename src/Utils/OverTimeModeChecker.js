import getPrizeTicketCollected from "Utils/PrizeTicketCollected";

const OverTimeModeChecker = (
    prizeId,
    ticketsRequired,
    prizeTicketCollection
) => {
    return (
        getPrizeTicketCollected(prizeTicketCollection, prizeId) >=
        ticketsRequired
    );
};

export default OverTimeModeChecker;
