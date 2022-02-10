import React from "react";
import { Link, useHistory } from "react-router-dom";
import { defaultGameImage } from "Utils/DefaultImage";

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
                <div className="ui-wrapper d-flex align-items-center justify-content-between mb-4">
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
                        <button>View all</button>
                    </Link>
                </div>
                {notificationData.length <= 0 && (
                    <div className="all-seen d-flex flex-column align-items-center justify-content-center">
                        <p className="mb-2">You're All Caught Up!</p>
                        <small>You've seen all new notifications</small>
                    </div>
                )}
                {notificationData.length > 0 &&
                    notificationData?.map((n, i) => (
                        <div
                            key={`notification-${i}`}
                            className="col-12 mb-2 notification-card px-0"
                            style={{
                                cursor:
                                    n?.type === "tour" || n?.type === "invite"
                                        ? "pointer"
                                        : "default",
                            }}
                            onClick={() =>
                                n?.type === "tour"
                                    ? handleNotificationLeaderboardHistory(
                                          n?.cgId,
                                          n?.gameId,
                                          n?.type,
                                          n?.createdOn
                                      )
                                    : n?.type === "invite"
                                    ? handleNotificationLeaderboardHistory(
                                          n?.cgId,
                                          n?.id,
                                          n?.type,
                                          n?.createdOn
                                      )
                                    : null
                            }
                        >
                            <div className="col d-flex flex-column card-wrapper px-0 position-relative">
                                <img
                                    className="prize-img"
                                    onError={defaultGameImage}
                                    src={
                                        n?.type === "tour"
                                            ? n?.picture
                                            : `${window.cdn}art_assets/illustrations/friends_03.jpg`
                                    }
                                    alt="icon"
                                />
                                <div className="col-12 d-flex flex-row prize-info">
                                    <div className="col-12 col-md-11 pr-0 pl-5 pl-md-4 ml-2 ml-md-auto d-flex align-items-center justify-content-between">
                                        <p className="mb-0 d-flex align-items-center">
                                            {n?.type === "tour"
                                                ? n?.title
                                                : "Friend Invite"}
                                        </p>
                                        <p className="mb-0 d-flex align-items-center">
                                            {new Date(
                                                n?.createdOn * 1000
                                            )?.toDateString()}{" "}
                                            |{" "}
                                            {new Date(n?.createdOn * 1000)
                                                ?.toLocaleTimeString("en-us", {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })
                                                ?.replace("AM", "")
                                                ?.replace("PM", "")}
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className={`col-12 d-flex flex-row ${
                                        n?.type === "tour"
                                            ? "game-info"
                                            : "invite-info"
                                    }`}
                                >
                                    <div className="col-12 col-md-11 pr-0 pl-5 pl-md-4 ml-2 ml-md-auto d-flex align-items-center justify-content-between">
                                        <p className="mb-0 d-flex align-items-center">
                                            {n?.type === "tour"
                                                ? n?.description
                                                : "Invite Redemption"}
                                        </p>
                                        <p className="mb-0 ticket d-flex align-items-center">
                                            +
                                            {n?.type === "tour"
                                                ? n?.tickets
                                                : n?.gem}
                                            <img
                                                className="ml-1"
                                                width="24"
                                                src={`${
                                                    n?.type === "tour"
                                                        ? `${window.cdn}art_assets/icons/tickets.png`
                                                        : `${window.cdn}art_assets/gems/gems.png`
                                                }`}
                                                alt="ticket"
                                            />
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </>
    );
};

export default Notification;
