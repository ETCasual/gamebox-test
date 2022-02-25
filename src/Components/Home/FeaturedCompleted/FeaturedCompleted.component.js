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
                <div className="col-12 col-md-10 col-lg-8 col-xl-7">
                    <div className="w-100 position-relative ">
                        <div
                            className="complete-overlay"
                            onClick={() => handleWinnerModal(data?.type)}
                        >
                            <div className="wrapper d-flex flex-column align-items-center justify-content-end w-100">
                                <img
                                    className="mt-4 mb-3 mb-md-4 reward-icon"
                                    src={`${window.cdn}assets/bonusreward_02.png`}
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
                        <div className="card-wrapper d-md-flex">
                            <div className="col-12 col-md-6 pl-0 d-flex flex-column align-items-start justify-content-end position-relative p-3">
                                {/* PRIZE TYPE */}
                                <div className="prize-type">Featured NFT</div>
                                {/* PRIZE TITLE, DESCRIPTION & ID */}
                                <div className="prize-text mb-2 w-100">
                                    <div className="prize-id">
                                        ID: {data?.prizeContent}
                                    </div>
                                    <div className="prize-title mt-2 mb-3">
                                        {data?.prizeTitle}
                                    </div>
                                    <div className="prize-subtitle">
                                        {data?.prizeSubtitle}
                                    </div>

                                    {/* HR SEPARATOR */}
                                    <hr className="separator" />

                                    {/* TICKETS INFO */}
                                    <p className="ticket-label">Your tickets</p>
                                    <div className="col-12 d-flex align-items-center justify-content-between pl-0">
                                        {/* YOUR TICKETS */}
                                        <p className="mb-0 your-tickets d-flex align-items-end">
                                            {data?.ticketsRequired?.toLocaleString()}
                                        </p>
                                        <div className="d-flex">
                                            {/* TOTAL POOL TICKETS COLLECTED */}
                                            <p
                                                className={`mb-0 d-flex align-items-center remaining-tickets`}
                                            >
                                                {data?.ticketsRequired?.toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 d-flex align-items-center justify-content-end px-0">
                                <picture className="d-flex align-items-center justify-content-end w-100 h-100">
                                    <source
                                        media="(max-width:768px)"
                                        srcSet={data.prizeBG2}
                                    />
                                    <img
                                        src={data.prizeBG}
                                        alt={data.prizeTitle}
                                    />
                                </picture>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeaturedCompleted;
