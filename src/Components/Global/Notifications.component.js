// REACT, REDUX & 3RD PARTY LIBRARIES
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

// COMPONENTS
import ThumbnailMedia from "Components/Global/ThumbnailMedia.component";

// HELPER FUNCTION
import { defaultGameImage } from "Utils/DefaultImage";
import { timeOptions } from "Utils/Enums";

const Notification = ({
    notificationData,
    handleBackButton,
    handleNotificationLeaderboardHistory,
}) => {
    const { t } = useTranslation();

    const history = useHistory();

    return (
        <>
            <div className="notification-overlay" onClick={handleBackButton} />
            <div id="notification-panel">
                {/* NOTIFICATIONS */}
                <div className="ui-wrapper d-flex align-items-center justify-content-between mb-2">
                    <p className="mb-0">{t("header.notification.title")}</p>
                    <Link
                        onClick={handleBackButton}
                        to={{
                            pathname: "/notifications",
                            state: {
                                prevPath: history.location.pathname,
                            },
                        }}
                    >
                        <button>{t("header.notification.view_more")}</button>
                    </Link>
                </div>
                {notificationData.length <= 0 && (
                    <div className="all-seen d-flex flex-column align-items-center justify-content-center">
                        <p className="mb-1">
                            {t("header.notification.no_notification_subtitle")}
                        </p>
                        <small>
                            {t("header.notification.no_notification_desc")}
                        </small>
                    </div>
                )}

                {notificationData.length > 0 && (
                    <div className="notification-card-wrapper py-3 position-relative">
                        {notificationData?.map((n, i) => {
                            return (
                                n.type !== "winner" && (
                                    <div
                                        key={`notification-${i}`}
                                        className={`col-12 notification-card px-0 ${
                                            notificationData.length - 1 !== i
                                                ? "mb-4"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            handleNotificationLeaderboardHistory(
                                                n
                                            )
                                        }
                                    >
                                        <div className="col-12 d-flex align-items-center justify-content-between">
                                            {/* THUMBNAIL MEDIA */}
                                            <ThumbnailMedia
                                                url={
                                                    n?.picture
                                                        ? n.picture
                                                        : n.type === "rankup"
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
                                                <div className="col-12 px-2 d-flex align-items-center justify-content-between prize-info mb-2">
                                                    <p className="mb-0 d-flex align-items-center">
                                                        {n?.title}
                                                    </p>
                                                    <p className="mb-0 d-flex align-items-center">
                                                        {new Date(
                                                            n?.createdOn * 1000
                                                        )?.toDateString()}{" "}
                                                        |{" "}
                                                        {new Date(
                                                            n?.createdOn * 1000
                                                        )
                                                            ?.toLocaleTimeString(
                                                                "en-GB",
                                                                timeOptions
                                                            )
                                                            ?.replace("AM", "")
                                                            ?.replace("PM", "")}
                                                    </p>
                                                </div>
                                                {/* TOURNAMENT OR INVITE INFO */}
                                                <div
                                                    className={`col-12 px-2 d-flex align-items-center justify-content-between noti-info`}
                                                >
                                                    <p className="mb-0 d-flex align-items-center">
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
                                                        {n?.type === "winprize"
                                                            ? `You've won`
                                                            : n?.type === "tour"
                                                            ? `+${n?.tickets}`
                                                            : `+${n?.gem} gems`}

                                                        {n?.type === "tour" ? (
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
                                    </div>
                                )
                            );
                        })}
                    </div>
                )}
            </div>
        </>
    );
};

export default Notification;
