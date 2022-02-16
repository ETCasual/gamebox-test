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
                                className="back-button mb-5"
                                onClick={handleBackButton}
                            >
                                <img
                                    width="42"
                                    src={`${window.cdn}buttons/button_back.png`}
                                    alt="back-btn"
                                />
                                <span className="ml-2">Back</span>
                            </div>
                            {/* IF LIST NOT AVAILABLE */}
                            <div className="col-12 mb-4">
                                <h3 className="title my-4">Highscores</h3>
                                {noDataLoaded && (
                                    <div className="no-result">
                                        <p className="title mb-1">
                                            No highscores found yet!
                                        </p>
                                        <p className="subtitle mt-1 mb-0">
                                            Looks like you've not played for any
                                            prizes yet.{" "}
                                        </p>
                                        <p className="subtitle">
                                            <Link to="/">Click here</Link> to
                                            look for one you like.
                                        </p>
                                    </div>
                                )}
                            </div>
                            {/* HIGHSCORES LIST */}
                            {!noDataLoaded &&
                                highScore?.map((card, i) => (
                                    <div
                                        key={`highscore-${i}`}
                                        className="col-12 col-md-6"
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
            </section>
        </>
    );
};

export default HighScore;
