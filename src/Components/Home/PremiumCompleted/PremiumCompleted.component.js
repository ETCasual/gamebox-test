import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import RevealWinnerLoader from "Components/Loader/RevealWinner.loader";

import loadNotifications from "redux/thunks/Notifcations.thunk";

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
                    dispatch(loadNotifications());
                    setLoading(false);
                }, 10000);
            }
        }

        return () => clearTimeout(timer);
    }, [data.prizeId, notificationList, dispatch]);

    return (
        <div className="col-12 col-md-6 col-lg-6 col-xl-4 d-flex align-items-center justify-content-center mb-4">
            <div className="w-100 h-100 position-relative">
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
                                <p className="mb-0">Drawing winner</p>
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
                                <div className="prize-info p-3 w-100">
                                    <p className="title mb-2 px-3">
                                        {data.prizeTitle}
                                    </p>
                                    <p className="subtitle mb-0 px-3">
                                        {data.prizeSubtitle}
                                    </p>
                                </div>
                                <p className="tap-btn mb-0">
                                    Tap to reveal the winner
                                </p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="card-wrapper">
                    <p className="prize-id mb-0">{data.prizeContent}</p>
                    <picture>
                        <source
                            media="(max-width:768px)"
                            srcSet={data.prizeBG2}
                        />
                        <img src={data.prizeBG} alt={data.prizeTitle} />
                    </picture>
                    <div className="prize-info py-3">
                        <div className="col-12 d-flex align-items-center justify-content-between mb-2">
                            <p className="prize-title mb-0">
                                {data.prizeTitle}
                            </p>
                            <p className="mb-1 ticket-label d-flex align-items-center">
                                Your tickets
                            </p>
                        </div>
                        <div className="col-12 d-flex align-items-center justify-content-between">
                            <div className="prize-subtitle">
                                {data.prizeSubtitle}
                            </div>
                            <p className="mb-0 ticket-value d-flex align-items-center">
                                {data?.ticketsRequired?.toLocaleString()}
                            </p>
                        </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-center remaining-tickets">
                        {data?.ticketsRequired?.toLocaleString()} tickets
                        remaining
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PremiumCompleted;
