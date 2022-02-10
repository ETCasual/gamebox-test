import getPrizeTicketCollected from "Utils/PrizeTicketCollected";

export default function getPrizeProgress(
    prizeTicketCollection,
    prizeId,
    ticketsRequired,
    overTime
) {
    return (
        parseFloat(
            !overTime
                ? Math.abs(
                      (getPrizeTicketCollected(prizeTicketCollection, prizeId) /
                          ticketsRequired) *
                          100
                  ).toFixed(1)
                : 100
        ) || 0
    );
}
