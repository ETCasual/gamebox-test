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

    return (
        <>
            <section id="high-score">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-10 col-lg-7 wrapper">
                            {/* BACK BUTTON */}
                            <div
                                className="back-button mb-4 mb-md-5"
                                onClick={handleBackButton}
                            >
                                <img
                                    src={`${window.cdn}buttons/button_back.png`}
                                    alt="back-btn"
                                />
                                <span className="ml-2">Back</span>
                            </div>
                            {/* IF LIST NOT AVAILABLE */}
                            <div className="col-12 mb-4">
                                <h1 className="main-title my-3 my-md-4">Highscores</h1>
                                {noDataLoaded && (
                                    <div className="no-result">
                                        <p className="title mb-1">
                                            No highscores yet...
                                        </p>
                                        <p className="subtitle">
                                            <Link to="/">Tap here</Link> to check out available Prize’s.
                                        </p>
                                    </div>
                                )}
                            </div>
                            {/* HIGHSCORES LIST */}
                            {!noDataLoaded &&
                                highScore?.map((card, i) => (
                                    <div
                                        key={`highscore-${i}`}
                                        className="col-12 col-md-9 col-xl-8"
                                    >
                                        <div className="row mb-3 px-3 align-items-center justify-content-between highscore-card position-relative">
                                            <div className="col-auto px-0 game-icon">
                                                <img
                                                    className="img-fluid"
                                                    src={card.gameImageUrl}
                                                    alt="game"
                                                />
                                            </div>
                                            <div className="col d-flex flex-column align-items-start justify-content-end mt-0 mb-1">
                                                <p className="game-title mb-2">
                                                    {card.gameTitle}
                                                </p>
                                                <div className="w-100 d-flex align-items-end justify-content-between">
                                                    <p className="score-date mb-0">
                                                        {getDateFormat(
                                                            card.scoreTimestamp *
                                                                1000
                                                        )}
                                                    </p>
                                                    <p className="px-0 score mb-0 d-flex align-items-start justify-content-end">
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
            </section>
        </>
    );
};

export default HighScore;
