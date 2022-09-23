import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
    getLeaderboardPrizeInfo,
    getLeaderboardList,
} from "Utils/NotificationLeaderboardHistory";
import { timeOptions } from "Utils/Enums";

const NotificationLeaderboard = ({ id, handleCloseLeaderboardHistory }) => {
    const { user } = useSelector((state) => state.userData);
    const { notificationList } = useSelector((state) => state.notifications);
    const { leaderboardHistory } = useSelector(
        (state) => state.leaderboardHistory
    );
    const { leaderRuleRanks } = useSelector((state) => state.leaderboardRanks);

    // DISABLE HTML SCROLL
    useEffect(() => {
        document.documentElement.style.overflowY = "hidden";

        return () => (document.documentElement.style.overflowY = "visible");
    }, []);

    // TODO: Do this when u have VIP

    return (
        <div id="leaderboard-history">
            <div className="col-12 wrapper">
                <div className="row align-items-center justify-content-center">
                    <div className="col-12 col-md-8 col-lg-7 col-xl-4 leaderboard d-flex flex-column">
                        {/* CLOSE BUTTON */}
                        <img
                            onClick={handleCloseLeaderboardHistory}
                            width="36"
                            className="close-button"
                            src={`${window.cdn}buttons/button_close.png`}
                            alt="close-btn"
                        />
                        {/* TOP - PRIZE AND GAME INFO */}
                        <div className="leaderboard-game d-flex flex-md-row align-items-center">
                            <img
                                className="img-fluid game-thumbnail"
                                src={getLeaderboardPrizeInfo(
                                    "gameIcon",
                                    id,
                                    notificationList,
                                    leaderboardHistory,
                                    user?.id
                                )}
                                alt="game"
                            />
                            <div className="col pr-md-1">
                                <p className="prize-name mb-1">
                                    {getLeaderboardPrizeInfo(
                                        "prizeTitle",
                                        id,
                                        notificationList,
                                        leaderboardHistory,
                                        user?.id
                                    )}
                                </p>
                                <div className="w-100 d-flex align-items-center justify-content-between">
                                    <p className="game-name mb-0">
                                        {getLeaderboardPrizeInfo(
                                            "gameTitle",
                                            id,
                                            notificationList,
                                            leaderboardHistory,
                                            user?.id
                                        )}
                                    </p>
                                    <p className="date mb-0">
                                        {new Date(
                                            getLeaderboardPrizeInfo(
                                                "timeStamp",
                                                id,
                                                notificationList,
                                                leaderboardHistory,
                                                user?.id
                                            ) * 1000
                                        ).toDateString()}{" "}
                                        |{" "}
                                        {new Date(
                                            getLeaderboardPrizeInfo(
                                                "timeStamp",
                                                id,
                                                notificationList,
                                                leaderboardHistory,
                                                user?.id
                                            ) * 1000
                                        )
                                            ?.toLocaleTimeString(
                                                "en-GB",
                                                timeOptions
                                            )
                                            ?.replace("AM", "")
                                            ?.replace("PM", "")}
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* MIDDLE - LEADERBOARD HISTORY */}
                        <div className="leaderboard-rank-wrapper px-2 py-1">
                            <div className="leaderboard-rank-layer">
                                {getLeaderboardList(
                                    id,
                                    leaderboardHistory,
                                    leaderRuleRanks,
                                    user?.id
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotificationLeaderboard;
