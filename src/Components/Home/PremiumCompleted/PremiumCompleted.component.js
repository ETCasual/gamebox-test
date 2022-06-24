import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import RevealWinnerLoader from "Components/Loader/RevealWinner.loader";

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

    return (
        <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 px-3 px-md-2 d-flex align-items-center justify-content-center mb-4">
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
                    <picture>
                        <source
                            media="(max-width:768px)"
                            srcSet={data.prizeBG2}
                        />
                        <img src={data.prizeBG} alt={data.prizeTitle} />
                    </picture>
                </div>

                {/* TICKET INFO */}
                <div className="col-12 d-flex flex-row align-items-center ticket-info">
                    <div className="col px-0">
                        {/* MOBILE */}
                        <div className="px-2 py-2 ticket-wrapper d-block d-sm-none">
                            <div className="your-tickets d-flex justify-content-end">
                                <div className="col d-flex justify-content-between px-0">
                                    <p className="mb-0 px-md-2 label d-flex align-self-end">
                                        Your tickets
                                    </p>
                                </div>
                                <p className="mb-0 tickets d-flex align-items-center">
                                    {0}
                                </p>
                            </div>
                            <div className="pool-tickets d-flex justify-content-end mt-3">
                                <div className="col d-flex justify-content-between px-0">
                                    <p className="mb-0 mb-md-1 pl-md-1 pr-md-2 label d-flex align-items-end">
                                        Draw starts in
                                    </p>
                                </div>

                                <p
                                    className={`mb-0 d-flex align-items-center ${
                                        "tickets"
                                    }`}
                                >
                                    {0}
                                    <span className="required-tickets">
                                        {`\u00A0/ ${data?.ticketsRequired?.toLocaleString()}`}
                                    </span>
                                </p>
                            </div>
                        </div>
                        {/* DESKTOP */}
                        <div className="px-2 py-2 ticket-wrapper d-none d-sm-block">
                            <div className="your-tickets">
                                <p className="mb-1 label d-flex align-items-center">
                                    Your tickets
                                </p>
                                <div className="col d-flex flex-row align-items-center px-0">
                                    <p className="mb-0 tickets d-flex align-items-center">
                                        {`\u00A0${
                                            0
                                        }`}
                                    </p>
                                </div>
                            </div>
                            <div className="pool-tickets mt-2">
                                <p className="mb-1 label d-flex align-items-end">
                                    Draw starts in
                                </p>
                                <div className="col d-flex align-items-center px-0">
                                    <p
                                        className={`mb-0 d-flex align-items-center ${
                                            "tickets"
                                        }`}
                                    >
                                        {`\u00A0${
                                            0
                                        }`}
                                    </p>
                                    <p className="required-tickets mb-0 mt-1 d-flex align-items-center">
                                        {`\u00A0/ ${data?.ticketsRequired?.toLocaleString()}`}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ml-2 game-icon d-flex justify-content-center position-relative">
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
    );
};

export default PremiumCompleted;
