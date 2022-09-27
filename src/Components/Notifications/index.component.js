// REACT, REDUX & 3RD PARTY LIBRARIES
import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// COMPONENTS
import NotificationLeaderboardHistory from "Components/Notifications/LeaderboardHistory/LeaderboardHistory.component";
import NotificationFriendInvitation from "Components/Notifications/FriendInvitation/FriendInvitation.component";
import NotificationRankUp from "Components/Notifications/RankUp/RankUp.component";
import ThumbnailMedia from "Components/Global/ThumbnailMedia.component";

import WinnerLoader from "Components/Loader/Winner.loader";

import loadLeaderboardHistory from "redux/thunks/LeaderboardHistory.thunk";
import loadLeaderboardRanks from "redux/thunks/LeaderboardRanks.thunk";

// HELPER FUNCTION
import { defaultGameImage } from "Utils/DefaultImage";
import { timeOptions } from "Utils/Enums";
import { useTranslation, Trans } from "react-i18next";

const Index = () => {
    const dispatch = useDispatch();
    const { notificationList } = useSelector((state) => state.notifications);
    const { leaderboardHistory } = useSelector(
        (state) => state.leaderboardHistory
    );
    const { leaderRuleRanks } = useSelector((state) => state.leaderboardRanks);

    const [noDataLoaded, setNoDataLoaded] = useState(false);
    const [notificationData, setNotificationData] = useState([]);
    const [isSelectedNotificationShown, setIsSelectedNotificationShown] =
        useState(null);

    const history = useHistory();

    let timeOutRef = useRef(null);

    // STAY TUNED
    useEffect(() => {
        clearTimeout(timeOutRef.current);
        timeOutRef.current = setTimeout(() => {
            notificationData.forEach((n) => {
                const status = getListExists(n.list);
                setNoDataLoaded(!status);
            });
        }, 7000);

        return () => {
            clearTimeout(timeOutRef.current);
            timeOutRef.current = null;
        };
    }, [notificationData]);

    useEffect(() => {
        if (isSelectedNotificationShown?.gameId > 0)
            dispatch(loadLeaderboardRanks(isSelectedNotificationShown?.gameId));
        if (isSelectedNotificationShown?.cgId > 0)
            dispatch(loadLeaderboardHistory(isSelectedNotificationShown?.cgId));
    }, [
        dispatch,
        isSelectedNotificationShown?.cgId,
        isSelectedNotificationShown?.gameId,
    ]);

    useEffect(() => {
        setNotificationData(notificationList);
    }, [notificationList]);

    function getListExists(list) {
        const data = list.filter((e) => e?.type !== "winner");
        if (data.length > 0) return true;
        return false;
    }

    const handleOnClickSelectedNotification = (data) => {
        if (data?.type === "winprize") history.push("/profile/rewards");

        setIsSelectedNotificationShown({
            ...data,
            status: true,
        });
    };

    const handleCloseLeaderboardHistory = () => {
        setIsSelectedNotificationShown((prev) => ({ ...prev, status: false }));
    };

    const { t } = useTranslation();

    return (
        <section id="notification">
            <div className="container-fluid px-0">
                {/* NOTIFICATIONS */}
                <div className="col-12 col-md-10 col-lg-8 mx-auto content-min-height">
                    <h1 className="main-title mb-0">
                        {t("notification.title")}
                    </h1>
                    {noDataLoaded && (
                        <div className="no-result">
                            <p className="title mb-2">
                                {t("notification.no_data.title")}
                            </p>
                            <p className="subtitle mt-1 mb-0">
                                {t("notification.no_data.subtitle")}
                            </p>
                            <p className="subtitle">
                                <Trans i18nKey="notification.no_data.cta">
                                    <Link to="/">0</Link>1
                                </Trans>
                            </p>
                        </div>
                    )}
                    {!noDataLoaded && (
                        <>
                            {notificationData?.map((notice, i) => (
                                <React.Fragment key={`notification-${i}`}>
                                    {!getListExists(notice?.list) && (
                                        <WinnerLoader />
                                    )}
                                    {getListExists(notice?.list) && (
                                        <p
                                            className={`${
                                                i === 0
                                                    ? "mt-primary"
                                                    : "mt-secondary"
                                            } month-year mb-4`}
                                        >
                                            {notice?.monthYear}
                                        </p>
                                    )}

                                    {notice.list.map((item, idx) => {
                                        return item.type !== "winner" ? (
                                            <div
                                                key={`n-${idx}`}
                                                className={`col-12 d-flex align-items-center notification-card px-0`}
                                                onClick={() =>
                                                    handleOnClickSelectedNotification(
                                                        item
                                                    )
                                                }
                                            >
                                                {/* THUMBNAIL MEDIA */}
                                                <ThumbnailMedia
                                                    url={
                                                        item?.picture
                                                            ? item.picture
                                                            : item.type ===
                                                              "rankup"
                                                            ? `${window.cdn}assets/notification_level_01.jpg`
                                                            : `${window.cdn}assets/notification_friends_01.jpg`
                                                    }
                                                    isPlayVideo={true}
                                                    onError={(e) =>
                                                        defaultGameImage(e)
                                                    }
                                                />

                                                <div className="w-100">
                                                    {/* PRIZE INFO */}
                                                    <div className="col-12 d-flex align-items-center justify-content-between prize-info mb-2">
                                                        <p className="mb-0">
                                                            {item?.title}
                                                        </p>
                                                        <p className="mb-0">
                                                            {new Date(
                                                                item?.createdOn *
                                                                    1000
                                                            )?.toDateString()}{" "}
                                                            |{" "}
                                                            {new Date(
                                                                item?.createdOn *
                                                                    1000
                                                            )
                                                                ?.toLocaleTimeString(
                                                                    "en-GB",
                                                                    timeOptions
                                                                )
                                                                ?.replace(
                                                                    "AM",
                                                                    ""
                                                                )
                                                                ?.replace(
                                                                    "PM",
                                                                    ""
                                                                )}
                                                        </p>
                                                    </div>
                                                    {/* TOURNAMENT OR INVITE INFO */}
                                                    <div
                                                        className={`col-12 d-flex align-items-center justify-content-between noti-info`}
                                                    >
                                                        <p className="mb-0 d-flex align-items-center title">
                                                            {item?.description}
                                                        </p>
                                                        <p
                                                            className={`mb-0 d-flex align-items-center ${
                                                                item?.type ===
                                                                "winprize"
                                                                    ? "prize"
                                                                    : item?.type ===
                                                                      "tour"
                                                                    ? "tickets"
                                                                    : "gems"
                                                            }`}
                                                        >
                                                            {item?.type ===
                                                            "winprize"
                                                                ? `You've won`
                                                                : item?.type ===
                                                                  "tour"
                                                                ? `+${item?.tickets}`
                                                                : `+${item?.gem} gems`}

                                                            {item?.type ===
                                                            "tour" ? (
                                                                <img
                                                                    className="icon ml-1"
                                                                    src={`${window.cdn}assets/tickets_06.png`}
                                                                    alt="ticket"
                                                                />
                                                            ) : (
                                                                ""
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            ""
                                        );
                                    })}
                                </React.Fragment>
                            ))}
                        </>
                    )}
                    {/* LEADERBOARD HISTORY */}
                    {isSelectedNotificationShown?.status &&
                        isSelectedNotificationShown?.type === "tour" && (
                            <NotificationLeaderboardHistory
                                id={isSelectedNotificationShown?.cgId}
                                notificationList={notificationList}
                                leaderboardHistory={leaderboardHistory}
                                leaderRuleRanks={leaderRuleRanks}
                                handleCloseLeaderboardHistory={
                                    handleCloseLeaderboardHistory
                                }
                            />
                        )}

                    {/* FRIEND INVITATION */}
                    {isSelectedNotificationShown?.status &&
                        isSelectedNotificationShown?.type === "invite" && (
                            <NotificationFriendInvitation
                                id={isSelectedNotificationShown?.id}
                                createdOn={
                                    isSelectedNotificationShown?.createdOn
                                }
                                notificationList={notificationList}
                                setIsSelectedNotificationShown={
                                    setIsSelectedNotificationShown
                                }
                            />
                        )}

                    {/* RANK UP NOTIFICATION */}
                    {isSelectedNotificationShown?.status &&
                        isSelectedNotificationShown?.type === "rankup" && (
                            <NotificationRankUp
                                isSelectedNotificationShown={
                                    isSelectedNotificationShown
                                }
                                setIsSelectedNotificationShown={
                                    setIsSelectedNotificationShown
                                }
                            />
                        )}
                </div>
            </div>
        </section>
    );
};

export default Index;
