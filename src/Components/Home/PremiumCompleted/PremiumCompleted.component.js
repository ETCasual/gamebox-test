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
        <div className="col-12 col-md-6 col-lg-6 col-xl-4 d-flex align-items-center justify-content-center mb-4">
            <div className="w-100 position-relative">
                <div
                    className="complete-overlay"
                    onClick={() => handleWinnerRevealCard(data?.type)}
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
                                    cx1={windowSize.width < 480 ? "37%" : "40%"}
                                    cx2={windowSize.width < 480 ? "46%" : "47%"}
                                    cx3={windowSize.width < 480 ? "55%" : "54%"}
                                    cx4={windowSize.width < 480 ? "64%" : "61%"}
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
                    <div className="prize-info py-3">
                        <div className="col-12 d-flex align-items-center justify-content-between mb-2">
                            <div className="prize-title">{data.prizeTitle}</div>
                            <p className="mb-1 token-label d-flex align-items-center">
                                Your tickets
                            </p>
                        </div>
                        <div className="col-12 d-flex align-items-center justify-content-between">
                            <div className="prize-subtitle">
                                {data.prizeSubtitle}
                            </div>
                            <p className="mb-0 token-value d-flex align-items-center">
                                {data?.ticketsRequired?.toLocaleString()}
                            </p>
                        </div>
                    </div>
                    <div
                        className={`d-flex align-items-center justify-content-center remaining-tokens`}
                    >
                        {data?.ticketsRequired?.toLocaleString()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PremiumCompleted;
