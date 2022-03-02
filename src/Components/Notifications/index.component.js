import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import NotificationLeaderboardHistory from "Components/Notifications/LeaderboardHistory/LeaderboardHistory.component";
import NotificationFriendInvitation from "Components/Notifications/FriendInvitation/FriendInvitation.component";
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
        useState({
            status: false,
            cgId: 0,
            typeId: 0,
            type: "",
            createdOn: 0,
        });

    let timeOutRef = useRef(null);

    // STAY TUNED
    useEffect(() => {
        clearTimeout(timeOutRef.current);
        timeOutRef.current = setTimeout(() => {
            if (notificationData.length <= 0) setNoDataLoaded(true);
        }, 7000);
        return () => {
            clearTimeout(timeOutRef.current);
            timeOutRef.current = null;
        };
    }, [notificationData]);

    useEffect(() => {
        if (isSelectedNotificationShown.typeId > 0)
            dispatch(loadLeaderboardRanks(isSelectedNotificationShown.typeId));
        if (isSelectedNotificationShown.cgId > 0)
            dispatch(loadLeaderboardHistory(isSelectedNotificationShown.cgId));
    }, [
        dispatch,
        isSelectedNotificationShown.cgId,
        isSelectedNotificationShown.typeId,
    ]);

    useEffect(() => {
        setNotificationData(notificationList);
    }, [notificationList]);

    const getListExists = (list) => {
        const data = list.filter(
            (e) => e?.type === "tour" || e?.type === "invite"
        );
        if (data.length > 0) return true;
        return false;
    };

    const handleOnClickSelectedNotification = (
        cgId,
        typeId,
        type,
        createdOn
    ) => {
        setIsSelectedNotificationShown((prev) => ({
            ...prev,
            status:
                (cgId > 0 && typeId > 0 && type === "tour") ||
                (cgId === 0 && typeId > 0 && type === "invite")
                    ? true
                    : false,
            cgId,
            typeId,
            type,
            createdOn,
        }));
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
                                    You're All Caught Up!
                                </p>
                                <p className="subtitle mt-1 mb-0">
                                    You've seen all notifications
                                </p>
                            </div>
                        )}
                        {!noDataLoaded && (
                            <>
                                {notificationData.length <= 0 && (
                                    <WinnerLoader />
                                )}
                                {notificationData?.map((notice, i) => (
                                    <React.Fragment key={`notification-${i}`}>
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
                                            return n.type === "tour" ||
                                                n.type === "invite" ? (
                                                <div
                                                    key={`n-${idx}`}
                                                    className={`col-12 d-flex align-items-center notification-card px-0 mb-4`}
                                                    onClick={() =>
                                                        n?.type === "tour"
                                                            ? handleOnClickSelectedNotification(
                                                                  n?.cgId,
                                                                  n?.gameId,
                                                                  n?.type,
                                                                  n?.createdOn,
                                                                  idx
                                                              )
                                                            : n?.type ===
                                                              "invite"
                                                            ? handleOnClickSelectedNotification(
                                                                  n?.cgId,
                                                                  n?.id,
                                                                  n?.type,
                                                                  n?.createdOn,
                                                                  idx
                                                              )
                                                            : null
                                                    }
                                                >
                                                    <img
                                                        width={50}
                                                        className="prize-img"
                                                        onError={
                                                            defaultGameImage
                                                        }
                                                        src={
                                                            n.type === "tour"
                                                                ? n?.picture
                                                                : `${window.cdn}illustrations/friends_03.jpg`
                                                        }
                                                        alt="icon"
                                                    />
                                                    <div className="w-100">
                                                        {/* PRIZE INFO */}
                                                        <div className="col-12 d-flex align-items-center justify-content-between prize-info mb-2">
                                                            <p className="mb-0">
                                                                {n?.type ===
                                                                "tour"
                                                                    ? n?.title
                                                                    : "Friend Invite"}
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
                                                                        "en-us",
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
                                                            className={`col-12 d-flex align-items-center justify-content-between ${
                                                                n?.type ===
                                                                "tour"
                                                                    ? "game-info"
                                                                    : "invite-info"
                                                            }`}
                                                        >
                                                            <p className="mb-0 d-flex align-items-center title">
                                                                {n?.type ===
                                                                "tour"
                                                                    ? n?.description
                                                                    : "Invite Redemption"}
                                                            </p>
                                                            <p
                                                                className={`mb-0 d-flex align-items-center ${
                                                                    n?.type ===
                                                                    "tour"
                                                                        ? "tickets"
                                                                        : "gems"
                                                                }`}
                                                            >
                                                                +
                                                                {n?.type ===
                                                                "tour"
                                                                    ? `${n?.tickets} tickets`
                                                                    : `${n?.gem} gems`}
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
                        {isSelectedNotificationShown.status &&
                            isSelectedNotificationShown.type === "tour" && (
                                <NotificationLeaderboardHistory
                                    id={isSelectedNotificationShown.cgId}
                                    notificationList={notificationList}
                                    leaderboardHistory={leaderboardHistory}
                                    leaderRuleRanks={leaderRuleRanks}
                                    handleCloseLeaderboardHistory={
                                        handleCloseLeaderboardHistory
                                    }
                                />
                            )}

                        {/* FRIEND INVITATION */}
                        {isSelectedNotificationShown.status &&
                            isSelectedNotificationShown.type === "invite" && (
                                <NotificationFriendInvitation
                                    id={isSelectedNotificationShown.typeId}
                                    createdOn={
                                        isSelectedNotificationShown.createdOn
                                    }
                                    notificationList={notificationList}
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
