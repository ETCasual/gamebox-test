import React from "react";

const NotificationFriendInvitation = ({
    id,
    createdOn,
    notificationList,
    setIsSelectedNotificationShown,
}) => {
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
                    else if (nType === "inviteeId")
                        return (
                            notificationList[nIdx]?.list[idx]?.inviteeName ||
                            `Player ${notificationList[nIdx]?.list[idx]?.inviteeId}`
                        );
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
                            width="38"
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
                            <p className="title">
                                A friend has reached level 3 with your invite
                                code.
                            </p>
                            <p className="subtitle">
                                Your friend{" "}
                                <span className="friend-username">
                                    {getInvitationInfo("inviteeId") || "-"}
                                </span>{" "}
                                has used your invite code.
                            </p>
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
