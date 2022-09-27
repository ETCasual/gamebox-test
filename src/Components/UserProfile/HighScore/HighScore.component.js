// REACT & REDUX
import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation, Trans } from "react-i18next";
import loadHighScore from "redux/thunks/HighScore.thunk";

// HELPER FUNCTIONS
import { getDateFormat } from "Utils/DateFormat";

const HighScore = ({ handleBackButton }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { highScore } = useSelector((state) => state.highScore);

    const [highScoreData, setHighScoreData] = useState([]);
    const [noDataLoaded, setNoDataLoaded] = useState(false);

    let timeOutRef = useRef(null);

    useEffect(() => {
        dispatch(loadHighScore());
    }, [dispatch]);

    // STAY TUNED
    useEffect(() => {
        clearTimeout(timeOutRef.current);
        timeOutRef.current = setTimeout(() => {
            if (highScoreData.length <= 0) setNoDataLoaded(true);
            else setNoDataLoaded(false);
        }, 100);
        return () => {
            clearTimeout(timeOutRef.current);
            timeOutRef.current = null;
        };
    }, [highScoreData]);

    useEffect(() => {
        setHighScoreData(highScore);
    }, [highScore, dispatch]);

    const { t } = useTranslation();

    return (
        <>
            <section id="high-score">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-10 col-lg-9 wrapper">
                            {/* BACK BUTTON */}
                            <div
                                className="back-button mb-4 mb-md-5"
                                onClick={history.goBack}
                            >
                                <img
                                    src={`${window.cdn}buttons/button_back.png`}
                                    alt="back-btn"
                                />
                                <span className="ml-2">{t("btn.back")}</span>
                            </div>
                            {/* IF LIST NOT AVAILABLE */}
                            <div className="col-12 mb-4">
                                <h1 className="main-title my-3 my-md-4">
                                    {t("highscore.title")}
                                </h1>
                                {noDataLoaded && (
                                    <div className="no-result">
                                        <p className="title mb-1">
                                            {t("highscore.no_data.title")}
                                        </p>
                                        <p className="subtitle">
                                            <Trans i18nKey="highscore.no_data.subtitle">
                                                <Link to="/">0</Link>1
                                            </Trans>
                                        </p>
                                    </div>
                                )}
                            </div>
                            {/* HIGHSCORES LIST */}
                            {!noDataLoaded && (
                                <div className="content-min-height pb-5">
                                    {highScoreData?.map((card, i) => (
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
                                                            {t(
                                                                "leaderboard.default.points",
                                                                {
                                                                    count: card.gameScore?.toLocaleString(),
                                                                }
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HighScore;
