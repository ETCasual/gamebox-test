import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import RevealWinnerLoader from "Components/Loader/RevealWinner.loader";

import loadNotifications from "redux/thunks/Notifcations.thunk";

const PremiumCompleted = ({ data, handleWinnerRevealCard }) => {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);
    const [windowSize, setWindowSize] = useState({
        width: 0,
    });

    useEffect(() => {
        let finishedPrizeList =
            JSON.parse(localStorage.getItem("finishedPrizeList")) || [];
        let idx = finishedPrizeList.findIndex(
            (e) => e.prizeId === data?.prizeId
        );
        let diff = Date.now() - finishedPrizeList[idx]?.timeStamp;
        if (diff > 16000) setLoading(false);

        let timer = setTimeout(() => {
            dispatch(loadNotifications());
            setLoading(false);
        }, 10000);

        return () => clearTimeout(timer);
    }, [data.prizeId, dispatch]);

    // RESIZE LISTENER
    useEffect(() => {
        window.addEventListener("resize", handleResize, false);

        function handleResize() {
            setWindowSize((prev) => ({
                width: window.innerWidth || prev.width,
            }));
        }
        handleResize();

        return () => window.removeEventListener("resize", handleResize, false);
    }, []);

    return (
        <div className="col-12 col-md-6 d-flex mb-4">
            <div className="w-100 position-relative ">
                <div
                    className="complete-overlay"
                    onClick={() => handleWinnerRevealCard(data?.type)}
                >
                    <div className="wrapper d-flex flex-column align-items-center justify-content-end w-100">
                        <img
                            className="mb-3 reward-icon"
                            width="122"
                            src={`${window.cdn}art_assets/illustrations/rewards_close.png`}
                            alt="discover rewards"
                        />
                        {loading && (
                            <div className="loader d-flex flex-column align-items-center justify-content-center">
                                <p className="mb-0">Drawing winner</p>
                                <RevealWinnerLoader
                                    cx1={windowSize.width < 480 ? "37%" : "40%"}
                                    cx2={windowSize.width < 480 ? "46%" : "47%"}
                                    cx3={windowSize.width < 480 ? "55%" : "54%"}
                                    cx4={windowSize.width < 480 ? "64%" : "61%"}
                                />
                            </div>
                        )}
                        {!loading && (
                            <div className="content text-center w-100 p-3">
                                <p className="title mb-2">{data.prizeTitle}</p>
                                <p className="subtitle mb-4">
                                    {data.prizeSubtitle}
                                </p>
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
                    <div className="overlay"></div>
                    <div className="badges mb-1">
                        {data.prizeContent || "Premium"}
                    </div>
                    <div className="prize-text">
                        <div className="card-title pl-3">{data.prizeTitle}</div>
                        <div className="card-subtitle pl-3">
                            {data.prizeSubtitle}
                        </div>
                    </div>
                </div>
                <div className="col-12 d-flex flex-row align-items-center ticket-info">
                    <div className="col px-0">
                        {/* MOBILE */}
                        <div className="px-2 py-2 ticket-wrapper d-block d-md-none">
                            <div className="your-tickets d-flex justify-content-end">
                                <div className="col d-flex flex-row px-0">
                                    <p className="mb-0 px-2 label d-flex align-items-center">
                                        Your tickets
                                    </p>
                                </div>
                                <p className="mb-0 tickets d-flex align-items-center">
                                    {data.ticketsRequired?.toLocaleString() ||
                                        0}
                                </p>
                            </div>
                            <div className="pool-tickets d-flex justify-content-end mt-3">
                                <div className="col d-flex flex-row px-0">
                                    <p className="mb-1 px-2 label d-flex align-items-end">
                                        Draw starts in
                                    </p>
                                </div>
                                <p className="mb-0 tickets d-flex align-items-center">
                                    {data.ticketsRequired?.toLocaleString() ||
                                        0}
                                    <span>
                                        {`\u00A0/ ${
                                            data.ticketsRequired?.toLocaleString() ||
                                            0
                                        }`}
                                    </span>
                                </p>
                            </div>
                        </div>
                        {/* DESKTOP */}
                        <div className="px-2 py-2 ticket-wrapper d-none d-md-block">
                            <div className="your-tickets">
                                <p className="mb-0 label d-flex align-items-center">
                                    Your tickets
                                </p>
                                <div className="col d-flex flex-row px-0">
                                    <p className="mb-0 tickets d-flex align-items-center">
                                        {`\u00A0${data.ticketsRequired?.toLocaleString()}` ||
                                            0}
                                    </p>
                                </div>
                            </div>
                            <div className="pool-tickets mt-2">
                                <p className="mb-0 label d-flex align-items-end">
                                    Draw starts in
                                </p>
                                <div className="col d-flex px-0">
                                    <p className="mb-0 tickets d-flex align-items-center">
                                        {`\u00A0${
                                            data.ticketsRequired?.toLocaleString() ||
                                            0
                                        }`}
                                    </p>
                                    <p className="mb-0 required-tickets d-flex align-items-center">
                                        {`\u00A0/ ${
                                            data.ticketsRequired?.toLocaleString() ||
                                            0
                                        }`}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pl-2 game-icon d-flex justify-content-center position-relative">
                        <img
                            className="img-fluid"
                            src={data.gameIcon}
                            alt="game-icon"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PremiumCompleted;
