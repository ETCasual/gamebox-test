import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import RevealWinnerLoader from "Components/Loader/RevealWinner.loader";

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

    return (
        <div className="col-12 d-flex align-items-center justify-content-center">
            <div className="w-100 h-100 position-relative">
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
                                Drawing winner
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
                                Tap to reveal the winner
                            </button>
                        </div>
                    )}
                </div>
                <div className="card-wrapper">
                    <div className="w-100">
                        {/* PRIZE TITLE, DESCRIPTION & ID */}
                        <div className="prize-info position-relative d-flex align-self-center justify-content-center">
                            <picture>
                                <source
                                    media="(max-width:768px)"
                                    srcSet={data.prizeBG2}
                                />
                                <img
                                    src={data.prizeBG}
                                    alt={data.prizeTitle}
                                />
                            </picture>
                            <div className="info-wrapper p-3">
                                <div className="prize-subtitle">
                                    {data?.prizeSubtitle}
                                </div>
                                <div className="prize-title mt-2 mb-2">
                                    {data?.prizeTitle}
                                </div>
                                <div className="prize-description">
                                    {data?.prizeContent}
                                </div>
                            </div>
                        </div>
                        {/* TICKETS INFO */}
                        <div className="col-12 d-flex flex-row align-items-center ticket-info py-2 py-md-0 px-2 px-md-3">
                            <div className="col px-0">
                                <div className="px-2 py-2 py-md-1 ticket-wrapper d-md-flex align-items-sm-center justify-content-sm-between">
                                    <div className="your-tickets d-flex justify-content-between">
                                        <p className="mb-0 px-md-2 label d-flex align-self-end">
                                            Your tickets
                                        </p>
                                        <p className="mb-0 tickets d-flex align-items-end">
                                            {0}
                                        </p>
                                    </div>
                                    <div className="pool-tickets d-flex justify-content-between mt-3 mt-md-0">
                                        <p className="mb-0 pl-md-1 pr-md-2 label d-flex align-items-end">
                                            Draw starts in
                                        </p>
                                        <div className="d-flex">
                                            <p
                                                className="mb-0 d-flex align-items-center tickets"
                                            >
                                                {0}
                                            </p>
                                            <p className="required-tickets mb-0 d-flex align-items-center">
                                                {`\u00A0/ ${data?.ticketsRequired?.toLocaleString()}`}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="game-icon ml-2 d-flex justify-content-center">
                                {data.gameInfo.map((e, i) => (
                                    <img
                                        key={`icon-${i}`}
                                        className="img-fluid"
                                        src={e.gameIcon}
                                        alt="game-icon"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeaturedCompleted;
