import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Header from "Components/Global/Header.component";
import NotificationLeaderboardHistory from "Components/Notifications/LeaderboardHistory/LeaderboardHistory.component";
import NotificationFriendInvitation from "Components/Notifications/FriendInvitation/FriendInvitation.component";

import loadLeaderboardRanks from "redux/thunks/LeaderboardRanks.thunk";
import loadResetNotificationNumber from "redux/thunks/RestNotificationNumber.thunk";
import loadLeaderboardHistory from "redux/thunks/LeaderboardHistory.thunk";

const HeaderHOC = () => {
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.userData);
    const { notificationNumber } = useSelector(
        (state) => state.notificationNumber
    );
    const { notificationList } = useSelector((state) => state.notifications);
    const { leaderboardHistory } = useSelector(
        (state) => state.leaderboardHistory
    );
    const { leaderRuleRanks } = useSelector((state) => state.leaderboardRanks);

    const [userImage, setUserImage] = useState(
        `${window.cdn}icons/icon_profile.png`
    );
    const [userGems, setUserGems] = useState(user.gems);
    const [isNotificationShown, setIsNotificationShown] = useState(false);
    const [notificationData, setNotificationData] = useState([]);
    const [isSelectedNotificationShown, setIsSelectedNotificationShown] =
        useState({
            status: false,
            cgId: 0,
            typeId: 0,
            type: "",
            createdOn: 0,
        });

    let token = sessionStorage.getItem("token");

    useEffect(() => {
        if (user.picture) setUserImage(user.picture);
    }, [user.picture]);

    useEffect(() => {
        setTimeout(() => {
            setUserGems(user.gems);
        }, 1000);
    }, [user.gems]);

    useEffect(() => {
        setTimeout(() => {
            if (notificationNumber.count > 0) setIsNotificationShown(true);
            else setIsNotificationShown(false);
        }, 1000);
    }, [notificationNumber.count]);

    useEffect(() => {
        let _notificationData = [];

        notificationList?.forEach((n) => {
            const filteredData = n.list.filter(
                (l) => l.type === "tour" || l.type === "invite"
            );
            _notificationData = [...filteredData];
        });
        setNotificationData(
            _notificationData?.slice(
                0,
                notificationNumber.count <= 5 ? notificationNumber.count : 5
            )
        );
    }, [notificationList, notificationNumber.count]);

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

    // ON CLICK NOTIFICATION ICON
    const handleOnClickNotificationIcon = () => {
        let _notificationData = [];
        notificationList?.forEach((n) => {
            const filteredData = n.list.filter(
                (l) => l.type === "tour" || l.type === "invite"
            );
            _notificationData = [...filteredData];
        });
        setNotificationData(_notificationData?.slice(0, 5));
        setIsNotificationShown(true);
    };

    const handleNotificationLeaderboardHistory = (
        cgId,
        typeId,
        type,
        createdOn
    ) => {
        handleNotificationPanelBackButton();
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

    // NOTIFICAITON BACK BUTTON
    const handleNotificationPanelBackButton = () => {
        setIsNotificationShown(false);
        // RESET NOTIFICATION TO 0
        dispatch(loadResetNotificationNumber());
    };

    const handleCloseLeaderboardHistory = () => {
        setIsSelectedNotificationShown((prev) => ({ ...prev, status: false }));
    };

    return (
        <>
            {token !== null && user.id > 0 && (
                <Header
                    userImage={userImage}
                    userGems={userGems}
                    isNotificationShown={isNotificationShown}
                    handleNotificationPanelBackButton={
                        handleNotificationPanelBackButton
                    }
                    notificationData={notificationData}
                    handleOnClickNotificationIcon={
                        handleOnClickNotificationIcon
                    }
                    handleNotificationLeaderboardHistory={
                        handleNotificationLeaderboardHistory
                    }
                />
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
            {isSelectedNotificationShown.status &&
                isSelectedNotificationShown.type === "invite" && (
                    <NotificationFriendInvitation
                        id={isSelectedNotificationShown.typeId}
                        createdOn={isSelectedNotificationShown.createdOn}
                        notificationList={notificationList}
                        setIsSelectedNotificationShown={
                            setIsSelectedNotificationShown
                        }
                    />
                )}
        </>
    );
};

export default HeaderHOC;
