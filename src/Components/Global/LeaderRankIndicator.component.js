import React from "react";

const LeaderRankIndicator = ({ index, type }) => {
    return <p className="rank-number mb-0">{type === "lb" ? index + 1 : index}</p>;
};

export default LeaderRankIndicator;
