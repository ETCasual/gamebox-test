import React from "react";
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

    return (
        <div id="leaderboard-history">
            <div className="col-12 wrapper">
                <div className="row align-items-center justify-content-center">
                    <div className="col-12 col-md-8 col-lg-7 col-xl-5 leaderboard d-flex flex-column">
                        {/* BACK BUTTON */}
                        <img
                            onClick={handleCloseLeaderboardHistory}
                            className="close-button"
                            width="38"
                            src={`${window.cdn}art_assets/buttons/button_close_01.png`}
                            alt="close-btn"
                        />
                        {/* TOP - PRIZE AND GAME INFO */}
                        <div className="leaderboard-game d-flex flex-md-row align-items-end">
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
                                <p className="prize-name mb-1 mb-md-2">
                                    {getLeaderboardPrizeInfo(
                                        "prizeTitle",
                                        id,
                                        notificationList,
                                        leaderboardHistory,
                                        user?.id
                                    )}
                                </p>
                                <p className="mb-0 game-name">
                                    {getLeaderboardPrizeInfo(
                                        "gameTitle",
                                        id,
                                        notificationList,
                                        leaderboardHistory,
                                        user?.id
                                    )}
                                </p>
                                <p className="date mt-2 mb-1 d-block d-md-none">
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
                            <div className="d-none d-md-block col-md-4 text-right p-0">
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
                        <div className="earned-points">
                            {/* LEVEL MULTIPLIER */}
                            <div className="d-flex align-items-center justify-content-between mb-3 leaderboard-level">
                                <p className="mb-0">Level Multiplier</p>
                                <div className="tickets ml-auto d-flex align-items-center justify-content-center py-2 px-3">
                                    <span>
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
                                            : "-"}
                                    </span>
                                    <img
                                        className="ml-1"
                                        width="24"
                                        src={`${window.cdn}art_assets/icons/tickets.png`}
                                        alt="tickets"
                                    />
                                </div>
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
                                    <div className="tickets ml-auto d-flex align-items-center justify-content-center py-2 px-1">
                                        <span>
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
                                                : "-"}
                                        </span>
                                        <img
                                            className="ml-1"
                                            width="24"
                                            src={`${window.cdn}art_assets/icons/tickets.png`}
                                            alt="exp"
                                        />
                                    </div>
                                </div>
                            )}
                            {/* EXP */}
                            <div className="d-flex align-items-center justify-content-between leaderboard-exp">
                                <p className="mb-0">Experience points</p>
                                <div className="tickets ml-auto d-flex align-items-center justify-content-center py-2 px-1">
                                    <span>
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
                                            : "-"}
                                    </span>
                                    <img
                                        className="ml-1"
                                        width="24"
                                        src={`${window.cdn}art_assets/icons/exp_01.png`}
                                        alt="exp"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotificationLeaderboard;
