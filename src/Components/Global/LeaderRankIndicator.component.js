import React from "react";

const LeaderRankIndicator = ({ index, type }) => {
    if (type === "lb") {
        // return index === 0 ? (
        //     <img
        //         src={`${window.cdn}icons/leaderboard-ranks_01_gold.png`}
        //         alt="gold"
        //     />
        // ) : index === 1 ? (
        //     <img
        //         src={`${window.cdn}icons/leaderboard-ranks_02_silver.png`}
        //         alt="silver"
        //     />
        // ) : index === 2 ? (
        //     <img
        //         src={`${window.cdn}icons/leaderboard-ranks_03_bronze.png`}
        //         alt="bronze"
        //     />
        // ) : (
        return <p className="rank-number">{index + 1}</p>;
        // );
    } else if (type === "current") {
        // return index === 1 ? (
        //     <img
        //         src={`${window.cdn}icons/leaderboard-ranks_01_gold.png`}
        //         alt="gold"
        //     />
        // ) : index === 2 ? (
        //     <img
        //         src={`${window.cdn}icons/leaderboard-ranks_02_silver.png`}
        //         alt="silver"
        //     />
        // ) : index === 3 ? (
        //     <img
        //         src={`${window.cdn}icons/leaderboard-ranks_03_bronze.png`}
        //         alt="bronze"
        //     />
        // ) : (
        return <p className="rank-number">{index}</p>;
        // );
    }
};

export default LeaderRankIndicator;
