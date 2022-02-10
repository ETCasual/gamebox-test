import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import RevealWinnerLoader from "Components/Loader/RevealWinner.loader";

import loadNotifications from "redux/thunks/Notifcations.thunk";

const FeaturedCompleted = ({ data, handleWinnerModal }) => {
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
        <div className={`container-fluid position-relative featured mb-3`}>
            <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-8 col-xl-8">
                    <div className="w-100 position-relative ">
                        <div
                            className="complete-overlay"
                            onClick={() => handleWinnerModal(data?.type)}
                        >
                            <div className="wrapper d-flex flex-column align-items-center justify-content-end w-100">
                                <img
                                    className="mt-4 mb-3 mb-md-4 reward-icon"
                                    src={`${window.cdn}art_assets/illustrations/rewards_close.png`}
                                    alt="discover rewards"
                                />
                                {loading && (
                                    <div className="loader d-flex flex-column align-items-center justify-content-center">
                                        <p className="mb-0 text-center">
                                            Drawing winner
                                        </p>
                                        <RevealWinnerLoader
                                            cx1={
                                                windowSize.width < 480
                                                    ? "40%"
                                                    : windowSize.width > 1200
                                                    ? "47%"
                                                    : "46%"
                                            }
                                            cx2={
                                                windowSize.width < 480
                                                    ? "47%"
                                                    : windowSize.width > 1200
                                                    ? "49%"
                                                    : "49%"
                                            }
                                            cx3={
                                                windowSize.width < 480
                                                    ? "54%"
                                                    : windowSize.width > 1200
                                                    ? "51%"
                                                    : "52%"
                                            }
                                            cx4={
                                                windowSize.width < 480
                                                    ? "61%"
                                                    : windowSize.width > 1200
                                                    ? "53%"
                                                    : "55%"
                                            }
                                        />
                                    </div>
                                )}
                                {!loading && (
                                    <div className="content text-center w-100 p-3">
                                        <p className="title mb-2">
                                            {data.prizeTitle}
                                        </p>
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
                                {data.prizeContent || "Featured"}
                            </div>
                            <div className="prize-text">
                                <div className="card-title pl-3">
                                    {data.prizeTitle}
                                </div>
                                <div className="card-subtitle pl-3">
                                    {data.prizeSubtitle || "Version 2"}
                                </div>
                            </div>
                        </div>
                        <div className="col-12 d-flex flex-row align-items-center ticket-info py-2 py-md-0 px-2 px-md-3">
                            <div className="col px-0">
                                <div className="px-2 py-2 py-md-1 ticket-wrapper d-md-flex align-items-md-center justify-content-md-between">
                                    <div className="your-tickets d-flex justify-content-between">
                                        <p className="mb-0 px-md-2 label d-flex align-self-end">
                                            Your tickets
                                        </p>
                                        <p className="mb-0 tickets d-flex align-items-end">
                                            {data?.ticketsRequired?.toLocaleString()}
                                        </p>
                                    </div>
                                    <div className="pool-tickets d-flex justify-content-between mt-3 mt-md-0">
                                        <p className="mb-0 pl-md-1 pr-md-2 label d-flex align-items-end">
                                            Draw starts in
                                        </p>
                                        <div className="d-flex">
                                            <p className="mb-0 tickets d-flex align-items-center">
                                                {data?.ticketsRequired?.toLocaleString()}
                                            </p>
                                            <p className="required-tickets mb-0 mt-1 d-flex align-items-center">
                                                {`\u00A0/ ${data?.ticketsRequired?.toLocaleString()}`}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="pl-2 game-icon d-flex justify-content-center">
                                <img
                                    className="img-fluid"
                                    src={data.gameIcon}
                                    alt="game-icon"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeaturedCompleted;
