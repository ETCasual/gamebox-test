import _ from "lodash";

const getPoolTickets = (poolTicketsList, prizeId) => {
    let currentPool = poolTicketsList.filter(
        (pool) => pool.prizeId === parseInt(prizeId)
    );
    if (currentPool) return _.maxBy(currentPool, "lastChecked")?.tickets;
    return "-";
};

export default getPoolTickets;
