// REACT, REDUX & 3RD PARTY LIBRARIES
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// COMPONENTS

// REDUX
import RevealWinnerLoader from "Components/Loader/RevealWinner.loader";
import { useTranslation } from "react-i18next";

const PremiumCompleted = ({ data, handleWinnerRevealCard }) => {
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
        <div
            className="complete-overlay"
            onClick={() => handleWinnerRevealCard(data?.prizeId)}
        >
            <div className="wrapper d-flex flex-column align-items-center justify-content-end w-100">
                <img
                    className="mb-3 reward-icon"
                    width="122"
                    src={`${window.cdn}assets/bonusreward_02.png`}
                    alt="discover rewards"
                />
                {loading && (
                    <div className="loader d-flex flex-column align-items-center justify-content-center">
                        <p className="mb-0">
                            {t("featuredCompleted.drawingWinner")}
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
                    <div className="content text-center d-flex flex-column align-items-center justify-content-end">
                        <div className="prize-info p-1 p-sm-3 w-100">
                            <div className="row">
                                <p className="col-4 col-xl-3 prize-id mb-1 mb-sm-2 px-3 text-right">
                                    {`#${data.prizeId}`}
                                </p>
                                <p className="col-8 col-xl-9 title mb-1 mb-sm-2 px-3 text-left">
                                    {data.prizeTitle}
                                </p>
                            </div>
                            <div className="row">
                                <p className="col-8 offset-4 col-xl-9 offset-xl-3 subtitle mb-0 px-3 text-left">
                                    {data.prizeSubtitle}
                                </p>
                            </div>
                        </div>
                        <p className="tap-btn mb-0">
                            {t("featuredCompleted.tapToReveal")}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PremiumCompleted;
