import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
    getLeaderboardPrizeInfo,
    getLeaderboardList,
} from "Utils/NotificationLeaderboardHistory";
import { timeOptions } from "Utils/Enums";

const NotificationLeaderboard = ({
    id,
    notificationList,
    leaderboardHistory,
    leaderRuleRanks,
    handleCloseLeaderboardHistory,
}) => {
    const { user } = useSelector((state) => state.userData);

    // DISABLE HTML SCROLL
    useEffect(() => {
        document.documentElement.style.overflowY = "hidden";

        return () => (document.documentElement.style.overflowY = "visible");
    }, []);

    return (
        <div id="leaderboard-history">
            <div className="col-12 wrapper">
                <div className="row align-items-center justify-content-center">
                    <div className="col-12 col-md-8 col-lg-7 col-xl-4 leaderboard d-flex flex-column">
                        {/* CLOSE BUTTON */}
                        <img
                            onClick={handleCloseLeaderboardHistory}
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
                                                "en-us",
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
                        {/* BOTTOM - EARNED POINTS */}
                        <div className="earned-points p-4">
                            {/* LEVEL MULTIPLIER */}
                            <div className="d-flex align-items-center justify-content-between mb-3 leaderboard-level">
                                <p className="mb-0">Level Multiplier</p>
                                <p className="tickets mb-0 text-right">
                                    {getLeaderboardPrizeInfo(
                                        "levelMultiplier",
                                        id,
                                        notificationList,
                                        leaderboardHistory,
                                        user?.id
                                    ) > 0
                                        ? `+${getLeaderboardPrizeInfo(
                                              "levelMultiplier",
                                              id,
                                              notificationList,
                                              leaderboardHistory,
                                              user?.id
                                          )}`
                                        : "-"}{" "}
                                    tickets
                                </p>
                            </div>
                            {/* VIP */}
                            {getLeaderboardPrizeInfo(
                                "vipMultiplier",
                                id,
                                notificationList,
                                leaderboardHistory,
                                user?.id
                            ) > 0 && (
                                <div className="d-flex align-items-center justify-content-between mb-3 leaderboard-level">
                                    <p className="mb-0">VIP Privilege</p>
                                    <p className="tickets mb-0 text-right">
                                        {getLeaderboardPrizeInfo(
                                            "vipMultiplier",
                                            id,
                                            notificationList,
                                            leaderboardHistory,
                                            user?.id
                                        ) > 0
                                            ? `+${getLeaderboardPrizeInfo(
                                                  "vipMultiplier",
                                                  id,
                                                  notificationList,
                                                  leaderboardHistory,
                                                  user?.id
                                              )}`
                                            : "-"}{" "}
                                        tickets
                                    </p>
                                </div>
                            )}

                            {/* LINE SEPARATOR */}
                            <div className="line" />

                            {/* EXP */}
                            <div className="d-flex align-items-center justify-content-between leaderboard-exp">
                                <p className="mb-0">Experience points</p>
                                <p className="exp mb-0 text-right">
                                    {getLeaderboardPrizeInfo(
                                        "exp",
                                        id,
                                        notificationList,
                                        leaderboardHistory,
                                        user?.id
                                    ) > 0
                                        ? `+${getLeaderboardPrizeInfo(
                                              "exp",
                                              id,
                                              notificationList,
                                              leaderboardHistory,
                                              user?.id
                                          )}`
                                        : "-"}{" "}
                                    exp
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotificationLeaderboard;
