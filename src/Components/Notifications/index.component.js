import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import NotificationLeaderboard from "Components/Notifications/LeaderboardHistory/LeaderboardHistory.component";
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
            <div className="container-fluid" id="notification">
                {/* NOTIFICATIONS */}
                <div className="row justify-content-center">
                    <div className="col-11 col-md-10 col-lg-8 col-xl-8">
                        <h4 className="mb-0">Notifications</h4>
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
                                                } month-year`}
                                            >
                                                {notice?.monthYear}
                                            </p>
                                        )}
                                        {notice.list.map((n, idx) => {
                                            return n.type === "tour" ||
                                                n.type === "invite" ? (
                                                <div
                                                    key={`n-${idx}`}
                                                    className="col-12 mb-3 notification-card px-0"
                                                >
                                                    <div
                                                        className="col d-flex flex-column card-wrapper px-0 position-relative"
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
                                                            className="prize-img"
                                                            onError={
                                                                defaultGameImage
                                                            }
                                                            src={
                                                                n.type ===
                                                                "tour"
                                                                    ? n?.picture
                                                                    : `${window.cdn}illustrations/friends_03.jpg`
                                                            }
                                                            alt="icon"
                                                        />
                                                        <div className="col-12 d-flex flex-row prize-info">
                                                            <div className="col-12 col-md-11 pr-0 pl-5 pl-md-4 ml-2 ml-md-auto d-flex align-items-center justify-content-between">
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
                                                        </div>
                                                        <div className="col-12 d-flex flex-row game-info">
                                                            <div className="col-12 col-md-11 pr-0 pl-5 pl-md-4 ml-2 ml-md-auto d-flex align-items-center justify-content-between">
                                                                <p className="mb-0 d-flex align-items-center title">
                                                                    {n?.type ===
                                                                    "tour"
                                                                        ? n?.description
                                                                        : "Invite Redemption"}
                                                                </p>
                                                                <p
                                                                    className={`mb-0 ticket d-flex align-items-center`}
                                                                >
                                                                    +
                                                                    {n?.type ===
                                                                    "tour"
                                                                        ? n?.tickets
                                                                        : n?.gem}
                                                                    {n?.type ===
                                                                        "tour" && (
                                                                        <img
                                                                            className="ml-1 img-fluid"
                                                                            width="24"
                                                                            height="16"
                                                                            src={`${window.cdn}icons/tickets.png`}
                                                                            alt="ticket"
                                                                        />
                                                                    )}
                                                                    {n?.type ===
                                                                        "invite" && (
                                                                        <img
                                                                            className="ml-1"
                                                                            width="24"
                                                                            height="16"
                                                                            src={`${window.cdn}gems/gems.png`}
                                                                            alt="ticket"
                                                                        />
                                                                    )}
                                                                </p>
                                                            </div>
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
                                <NotificationLeaderboard
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
