import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
    getLeaderboardPrizeInfo,
    getLeaderboardList,
} from "Utils/NotificationLeaderboardHistory";
import { timeOptions } from "Utils/Enums";
import { defaultUserImage } from "Utils/DefaultImage";
import { useTranslation } from "react-i18next";

const NotificationLeaderboard = ({ id, handleCloseLeaderboardHistory }) => {
    const { user } = useSelector((state) => state.userData);
    const { notificationList } = useSelector((state) => state.notifications);
    const { leaderboardHistory } = useSelector(
        (state) => state.leaderboardHistory
    );
    const { leaderRuleRanks } = useSelector((state) => state.leaderboardRanks);

    const rankIndex =
        leaderboardHistory.findIndex((d) => d.userId === user.id) + 1;
    const { t } = useTranslation();

    // DISABLE HTML SCROLL
    useEffect(() => {
        document.documentElement.style.overflowY = "hidden";

        return () => (document.documentElement.style.overflowY = "visible");
    }, []);

    const getRankTickets = (index) => {
        let value;
        leaderRuleRanks.forEach((el) => {
            if (el.rankFrom <= index + 1) value = el.tickets;
            if (index + 1 >= el.rankTo) value = el.tickets;
        });
        return value;
    };

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
                        <div className="leaderboard-rank-wrapper px-2 pt-1">
                            <div className="leaderboard-rank-layer">
                                {getLeaderboardList(
                                    id,
                                    leaderboardHistory,
                                    leaderRuleRanks,
                                    user?.id
                                )}
                            </div>
                        </div>
                        <div className="leaderboard-user-wrapper">
                            <div className="leader-player-card d-flex align-items-center leader-curr-player-card">
                                <div className="number-holder">
                                    <p clasName="rank-number mb-0">
                                        {rankIndex}
                                    </p>
                                </div>
                                <div className="user-avatar">
                                    {/* PROFILE IMG */}
                                    <div
                                        className={`profile-img d-inline-flex ml-3 ${
                                            user.isVip ? "is-vip" : ""
                                        }`}
                                    >
                                        <span>
                                            <img
                                                className="img-holder"
                                                onError={(e) =>
                                                    defaultUserImage(e)
                                                }
                                                src={
                                                    user.avatarUrl ||
                                                    `${window.cdn}icons/icon_profile.svg`
                                                }
                                                alt="avatar"
                                            />
                                        </span>
                                        <span className="img-frame">
                                            {user.isVip && (
                                                <img
                                                    className="vip-frame"
                                                    src={`${window.cdn}icons/icon_vip_frame_01.png`}
                                                    alt="vip-frame"
                                                />
                                            )}
                                        </span>
                                    </div>
                                </div>

                                <div className="px-2 ml-3">
                                    <p className="player-name">
                                        {t("leaderboard.default.player_name", {
                                            user: user.username,
                                        })}
                                    </p>
                                    <p className="points">
                                        {t("leaderboard.default.points", {
                                            count: user.gameScore,
                                        })}
                                    </p>
                                </div>
                                <div className="tickets ml-auto d-flex align-items-center justify-content-center">
                                    <span>
                                        {getRankTickets(rankIndex - 1) || "0"}{" "}
                                        <img
                                            className="icon ml-1"
                                            src={`${window.cdn}assets/tickets_06.png`}
                                            alt="ticket"
                                        />
                                    </span>
                                </div>
                            </div>
                        </div>
                        {/* BOTTOM - EARNED POINTS */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotificationLeaderboard;
