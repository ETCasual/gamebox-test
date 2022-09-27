import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
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

    const { t } = useTranslation();

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
                                        {config.rewardInvitesRank <= 1
                                            ? t("invite.invitee.title1")
                                            : `${t(
                                                  "invite.invitee.title2"
                                              )} ${config.rewardInvitesRank
                                                  .toString()
                                                  .concat(".")}`}
                                    </p>
                                    <p className="subtitle">
                                        {t("invite.invitee.subtitle")}
                                    </p>
                                </>
                            )}
                            {user.id !== getInvitationInfo("inviteeId") && (
                                <>
                                    <p className="title">
                                        {t("invite.invited.title")}
                                    </p>
                                    <p className="subtitle">
                                        {t(
                                            "invite.invited.subtitle.your_friend"
                                        )}
                                        <span className="friend-username">
                                            {getInvitationInfo("inviteeName")}
                                        </span>{" "}
                                        {t("invite.invited.subtitle.action", {
                                            action:
                                                config.rewardInvitesRank <= 1
                                                    ? " joined"
                                                    : ` reached level ${config.rewardInvitesRank}`,
                                        })}{" "}
                                    </p>
                                </>
                            )}
                            <div className="reward p-3 p-md-4 mb-3 mb-md-4 d-flex flex-column align-items-start justify-content-around">
                                <p className="mb-3 title">
                                    {t("invite.reward.title")}
                                </p>
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
