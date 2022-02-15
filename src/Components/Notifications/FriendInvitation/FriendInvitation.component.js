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
                    <div className="col-11 col-md-8 col-lg-7 col-xl-4 invitaiton d-flex flex-column">
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
                            src={`${window.cdn}buttons/button_close_01.png`}
                            alt="close-btn"
                        />
                        {/* INVITATION MODAL */}
                        <div className="invitation">
                            <p className="title">
                                A friend has used your Invite code.
                            </p>
                            <p className="subtitle">
                                <span className="friend-username">
                                    {getInvitationInfo("inviteeId")}
                                </span>{" "}
                                has used your invite code.
                            </p>
                            <div className="reward d-flex align-items-center justify-content-around">
                                <div className="d-flex flex-column">
                                    <p className="mb-3 title">Reward</p>
                                    <div className="d-flex align-items-center justify-content-center gem">
                                        <span>
                                            + {getInvitationInfo("gem")}{" "}
                                        </span>
                                        <img
                                            width="22"
                                            className="ml-2"
                                            src={`${window.cdn}gems/gems.png`}
                                            alt="gems"
                                        />
                                    </div>
                                </div>
                                <img
                                    width="124"
                                    src={`${window.cdn}illustrations/friends_01.png`}
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotificationFriendInvitation;
