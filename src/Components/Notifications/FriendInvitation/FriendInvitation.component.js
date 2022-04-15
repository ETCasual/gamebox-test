import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const NotificationFriendInvitation = ({
    id,
    createdOn,
    notificationList,
    setIsSelectedNotificationShown,
}) => {
    const { config } = useSelector((state) => state.config);
    const { user } = useSelector((state) => state.userData);

    useEffect(() => {
        document.documentElement.style.overflowY = "hidden";

        return () => (document.documentElement.style.overflowY = "visible");
    }, []);

    const getInvitationInfo = (nType) => {
        if (notificationList.length > 0) {
            const date = new Date(createdOn * 1000)?.toLocaleString("default", {
                month: "long",
                year: "numeric",
            });
            let nIdx = notificationList.findIndex((n) => n.monthYear === date);
            if (nIdx > -1) {
                let idx = notificationList[nIdx]?.list?.findIndex(
                    (e) => e.id === id
                );
                if (idx > -1) {
                    if (nType === "gem")
                        return notificationList[nIdx]?.list[idx]?.gem;
                    else if (nType === "userId")
                        return notificationList[nIdx]?.list[idx]?.userId;
                    else if (nType === "inviteeId")
                        return notificationList[nIdx]?.list[idx]?.inviteeId;
                    else if (nType === "inviteeName")
                        return notificationList[nIdx]?.list[idx]?.inviteeName;
                }
            }
        }
    };

    return (
        <div id="friend-invitation">
            <div className="col-12 wrapper">
                <div className="row align-items-center justify-content-center">
                    <div className="col-10 col-md-8 col-lg-7 col-xl-4 pt-3 pt-lg-4 px-3 px-lg-4 invitaiton-wrapper d-flex flex-column">
                        {/* BACK BUTTON */}
                        <img
                            onClick={() =>
                                setIsSelectedNotificationShown((prev) => ({
                                    ...prev,
                                    status: false,
                                }))
                            }
                            className="close-button"
                            width="36"
                            src={`${window.cdn}buttons/button_close.png`}
                            alt="close-btn"
                        />
                        {/* INVITATION MODAL */}
                        <div
                            className="invitation w-100"
                            style={{
                                backgroundImage: `url(
                                    ${window.cdn}assets/model_friend_05.png
                                )`,
                            }}
                        >
                            {user.id === getInvitationInfo("inviteeId") && (
                                <>
                                    <p className="title">
                                        You have reached level{" "}
                                        {config.rewardInvitesRank}.
                                    </p>
                                    <p className="subtitle">
                                        Here's a rewards specially for you for
                                        using your friends code.
                                    </p>
                                </>
                            )}
                            {user.id === getInvitationInfo("userId") && (
                                <>
                                    <p className="title">
                                        A friend has reached level{" "}
                                        {config.rewardInvitesRank} with your
                                        invite code.
                                    </p>
                                    <p className="subtitle">
                                        Your friend{" "}
                                        <span className="friend-username">
                                            {getInvitationInfo("inviteeName")}
                                        </span>{" "}
                                        has used your invite code.
                                    </p>
                                </>
                            )}
                            <div className="reward p-3 p-md-4 mb-3 mb-md-4 d-flex flex-column align-items-start justify-content-around">
                                <p className="mb-3 title">Reward</p>
                                <p className="gems mb-0">
                                    {`+ ${
                                        getInvitationInfo("gem") || "0"
                                    } gems`}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotificationFriendInvitation;
