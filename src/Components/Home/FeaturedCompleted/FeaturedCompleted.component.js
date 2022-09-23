import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import RevealWinnerLoader from "Components/Loader/RevealWinner.loader";
import { useTranslation } from "react-i18next";

const FeaturedCompleted = ({ data, handleWinnerRevealCard }) => {
    const dispatch = useDispatch();
    const { notificationList } = useSelector((state) => state.notifications);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let timer = null;

        if (notificationList.length > 0) {
            const prize = notificationList[0].list.filter(
                (l) => l.prizeId === data.prizeId && l.type === "winner"
            );
            if (prize.length > 0) {
                setLoading(false);
                clearTimeout(timer);
            } else {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    setLoading(false);
                }, 10000);
            }
        }

        return () => clearTimeout(timer);
    }, [data.prizeId, notificationList, dispatch]);

    const { t } = useTranslation();

    return (
        <div className="complete-overlay justify-content-end p-3">
            {/* PRIZE TYPE */}
            <img
                className="mt-4 mb-3 mb-md-4 reward-icon"
                src={`${window.cdn}assets/bonusreward_02.png`}
                alt="discover rewards"
            />
            {/* TICKETS INFO */}
            {loading && (
                <div className="drawing-winner d-flex flex-column align-items-center justify-content-center">
                    <p className="mb-0">
                        {t("featured_completed.drawing_winner")}
                    </p>
                    <RevealWinnerLoader
                        cx1={"43%"}
                        cx2={"48%"}
                        cx3={"53%"}
                        cx4={"58%"}
                    />
                </div>
            )}
            {!loading && (
                <div className="text-wrapper text-center">
                    <div className="prize-title px-3 mt-2 mb-2 mb-md-3">
                        {data?.prizeTitle}
                    </div>
                    <div className="prize-subtitle px-3 mb-4">
                        {data?.prizeSubtitle}
                    </div>
                    <button className="tap-btn mb-0">
                        {t("featured_completed.tap_to_reveal")}
                    </button>
                </div>
            )}
        </div>
    );
};

export default FeaturedCompleted;
