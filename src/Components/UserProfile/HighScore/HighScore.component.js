// REACT & REDUX
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// HELPER FUNCTIONS
import getDateFormat from "Utils/DateFormat";

const HighScore = ({ handleBackButton }) => {
    const { highScore } = useSelector((state) => state.highScore);

    const [noDataLoaded, setNoDataLoaded] = useState(false);

    let timeOutRef = useRef(null);

    // STAY TUNED
    useEffect(() => {
        clearTimeout(timeOutRef.current);
        timeOutRef.current = setTimeout(() => {
            if (highScore.length <= 0) setNoDataLoaded(true);
        }, 100);
        return () => {
            clearTimeout(timeOutRef.current);
            timeOutRef.current = null;
        };
    }, [highScore]);

    // BLUR BACKGROUND FOR NAVBAR & SCROLL TO TOP
    useEffect(() => {
        const overlay = document.querySelector(".blur-overlay");
        overlay?.setAttribute("style", `min-height: 145px`);
        return () => {
            overlay?.removeAttribute("style");
        };
    }, []);

    return (
        <>
            <div className="nav-top-back-btn-wrapper d-flex align-items-center justify-content-center mx-auto">
                <div className="d-flex col-12 col-md-10 col-lg-8 col-xl-8 justify-content-between">
                    <button className="d-flex align-items-center justify-content-center p-0">
                        <img
                            className="back-button"
                            width="42"
                            onClick={handleBackButton}
                            src={`${window.cdn}art_assets/buttons/button_back.png`}
                            alt="back-btn"
                        />
                    </button>
                </div>
            </div>
            <section id="high-score">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-10 col-lg-8 wrapper">
                            <div className="row">
                                <div className="col-12">
                                    <h3 className="title mb-4">Highscores</h3>
                                    {noDataLoaded && (
                                        <div className="no-result">
                                            <p className="title mb-1">
                                                No highscores yet!
                                            </p>
                                            <p className="subtitle mt-1 mb-0">
                                                Looks like you've not played for
                                                any prizes yet.{" "}
                                            </p>
                                            <p className="subtitle">
                                                <Link to="/">Click here</Link>{" "}
                                                to look for one you like.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="row">
                                {!noDataLoaded &&
                                    highScore?.map((card, i) => (
                                        <div
                                            key={`highscore-${i}`}
                                            className="col-12 col-sm-6"
                                        >
                                            <div className="row mb-3 px-3 align-items-center justify-content-between highscore-card position-relative">
                                                <div className="col-3 px-0 game-icon">
                                                    <img
                                                        className="img-fluid"
                                                        src={card.gameImageUrl}
                                                        alt="game"
                                                    />
                                                </div>
                                                <div className="col-9 d-flex flex-column align-items-start justify-content-end mt-0 mb-1">
                                                    <p className="game-title mb-2">
                                                        {card.gameTitle}
                                                    </p>
                                                    <div className="w-100 d-flex align-items-end justify-content-between">
                                                        <p className="score-date mb-0">
                                                            {getDateFormat(
                                                                card.leaveTimeStamp *
                                                                    1000
                                                            )}
                                                        </p>
                                                        <p className="px-0 score mb-0">
                                                            {`${card.gameScore?.toLocaleString()} pts`}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HighScore;
