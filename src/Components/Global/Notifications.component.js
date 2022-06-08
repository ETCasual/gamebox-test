import React from "react";
import { Link, useHistory } from "react-router-dom";
import { defaultGameImage } from "Utils/DefaultImage";
import { timeOptions } from "Utils/Enums";

const Notification = ({
    notificationData,
    handleBackButton,
    handleNotificationLeaderboardHistory,
}) => {
    const history = useHistory();

    return (
        <>
            <div className="notification-overlay" onClick={handleBackButton} />
            <div id="notification-panel">
                {/* NOTIFICATIONS */}
                <div className="ui-wrapper d-flex align-items-center justify-content-between mb-2">
                    <p className="mb-0">Notifications</p>
                    <Link
                        onClick={handleBackButton}
                        to={{
                            pathname: "/notifications",
                            state: {
                                prevPath: history.location.pathname,
                            },
                        }}
                    >
                        <button>View more</button>
                    </Link>
                </div>
                {notificationData.length <= 0 && (
                    <div className="all-seen d-flex flex-column align-items-center justify-content-center">
                        <p className="mb-1">No notifications found yet!</p>
                        <small>
                            Looks like you've not played for any prizes yet.
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
                                            <img
                                                width={50}
                                                className="prize-img"
                                                onError={(e) =>
                                                    defaultGameImage(e)
                                                }
                                                src={
                                                    n?.picture
                                                        ? n.picture
                                                        : n.type === "rankup"
                                                        ? `${window.cdn}assets/notification_level_01.jpg`
                                                        : `${window.cdn}assets/notification_friends_01.jpg`
                                                }
                                                alt="icon"
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
                                                            ? `+${n?.tickets} tickets`
                                                            : `+${n?.gem} gems`}
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
