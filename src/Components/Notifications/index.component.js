import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import NotificationLeaderboardHistory from "Components/Notifications/LeaderboardHistory/LeaderboardHistory.component";
import NotificationFriendInvitation from "Components/Notifications/FriendInvitation/FriendInvitation.component";
import NotificationRankUp from "Components/Notifications/RankUp/RankUp.component";
import WinnerLoader from "Components/Loader/Winner.loader";

import loadLeaderboardHistory from "redux/thunks/LeaderboardHistory.thunk";
import loadLeaderboardRanks from "redux/thunks/LeaderboardRanks.thunk";

import { defaultGameImage } from "Utils/DefaultImage";
import { timeOptions } from "Utils/Enums";

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

    return (
        <section>
            <div className="container-fluid px-0 px-md-3" id="notification">
                {/* NOTIFICATIONS */}
                <div className="row justify-content-center">
                    <div className="col-11 col-md-10 col-lg-8 col-xl-7">
                        <h1 className="mb-0 main-title">Notifications</h1>
                        {noDataLoaded && (
                            <div className="no-result">
                                <p className="title mb-2">
                                    No notifications found yet!
                                </p>
                                <p className="subtitle mt-1 mb-0">
                                    Looks like you've not played for any prizes
                                    yet.
                                </p>
                                <p className="subtitle">
                                    <Link to="/">Click here</Link> to look for
                                    one you like.
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
                                        {notice.list.map((n, idx) => {
                                            return n.type !== "winner" ? (
                                                <div
                                                    key={`n-${idx}`}
                                                    className={`col-12 d-flex align-items-center notification-card px-0`}
                                                    onClick={() =>
                                                        handleOnClickSelectedNotification(
                                                            n
                                                        )
                                                    }
                                                >
                                                    <img
                                                        width={50}
                                                        className="prize-img"
                                                        onError={(e) =>
                                                            defaultGameImage(e)
                                                        }
                                                        src={
                                                            n?.picture
                                                                ? n.picture
                                                                : n.type ===
                                                                  "rankup"
                                                                ? `${window.cdn}assets/notification_level_01.jpg`
                                                                : `${window.cdn}assets/notification_friends_01.jpg`
                                                        }
                                                        alt="icon"
                                                    />
                                                    <div className="w-100">
                                                        {/* PRIZE INFO */}
                                                        <div className="col-12 d-flex align-items-center justify-content-between prize-info mb-2">
                                                            <p className="mb-0">
                                                                {n?.title}
                                                            </p>
                                                            <p className="mb-0">
                                                                {new Date(
                                                                    n?.createdOn *
                                                                        1000
                                                                )?.toDateString()}{" "}
                                                                |{" "}
                                                                {new Date(
                                                                    n?.createdOn *
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
                                                                {n?.description}
                                                            </p>
                                                            <p
                                                                className={`mb-0 d-flex align-items-center ${
                                                                    n?.type ===
                                                                    "winprize"
                                                                        ? "prize"
                                                                        : n?.type ===
                                                                          "tour"
                                                                        ? "tickets"
                                                                        : "gems"
                                                                }`}
                                                            >
                                                                {n?.type ===
                                                                "winprize"
                                                                    ? `You've won`
                                                                    : n?.type ===
                                                                      "tour"
                                                                    ? `+${n?.tickets} tickets`
                                                                    : `+${n?.gem} gems`}
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
            </div>
        </section>
    );
};

export default Index;
