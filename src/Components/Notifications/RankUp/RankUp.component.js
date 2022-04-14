import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const NotificationRankUp = ({
    isSelectedNotificationShown,
    setIsSelectedNotificationShown,
}) => {
    const { ranks } = useSelector((state) => state.ranks);

    useEffect(() => {
        document.documentElement.style.overflowY = "hidden";

        return () => (document.documentElement.style.overflowY = "visible");
    }, []);

    const getTicketMultiplier = () => {
        const idx = ranks.findIndex((r) => 
            isSelectedNotificationShown?.description.substring(12) === r.title
        );
        if (idx > -1) return ranks[idx]?.multiplier * 100;
        return false;
    };

    return (
        <div id="rank-up">
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
                                    ${window.cdn}assets/model_levelup_01.png
                                )`,
                            }}
                        >
                            <p className="title">
                                {isSelectedNotificationShown?.description}
                            </p>
                            <p className="subtitle">
                                Here's a rewards for you.
                            </p>
                            <div className="reward p-3 p-md-4 mb-3 mb-md-4 d-flex flex-column align-items-start justify-content-around">
                                <p className="mb-3 title">Reward</p>
                                <p className="gems mb-0">
                                    {`+ ${
                                        isSelectedNotificationShown?.gem || "0"
                                    } gems`}
                                </p>
                                <p className="gems mt-2 mb-0">
                                    {`+ ${getTicketMultiplier()}% ticket multiplier`}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotificationRankUp;
