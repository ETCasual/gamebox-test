// REACT & REDUX
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// HELPER FUNCTIONS
import {
    getCurrentLevelExp,
    getCurrentMultiplier,
    getCurrentLevel,
    getLevelProgress,
} from "Utils/CurrentLevel";
import getDateFormat from "Utils/DateFormat";
import { defaultUserImage } from "Utils/DefaultImage";

const SelectedPlayerInfo = ({ handleBackButton }) => {
    const { playerDetails } = useSelector((state) => state.playerDetails);
    const { playersHighScore } = useSelector((state) => state.playerHighScore);
    const { ranks } = useSelector((state) => state.ranks);

    const [playerDetailsData, setPlayerDetailsData] = useState({});
    const [ranksList, setRanksList] = useState([]);
    const [playersHighScoreList, setPlayerHighScoreList] = useState([]);

    useEffect(() => {
        const navBottom = document.querySelector(".navbar-bottom");
        if (navBottom)
            navBottom?.setAttribute("style", "display: none!important");

        setPlayerDetailsData(playerDetails);
        setPlayerHighScoreList(playersHighScore);
        setRanksList(ranks);

        return () => {
            navBottom?.removeAttribute("style");
        };
    }, [playerDetails, playersHighScore, ranks]);

    return (
        <>
            {/* PLAYER INFO */}
            <section id="selected-player-info">
                <div className="container-fluid">
                    <div className="col-12 col-md-8 col-lg-5 mb-5 mx-auto">
                        <div className="row">
                            {/* BACK BUTTON */}
                            <div className="d-flex align-items-center back-button">
                                <img
                                    onClick={handleBackButton}
                                    width="42"
                                    src={`${window.cdn}icon_back.png`}
                                    alt="back-btn"
                                />
                                <span className="ml-2">Back</span>
                            </div>
                            {/* PLAYER, LEVEL, EXP & MULTIPLIER */}
                            <div className="col-12">
                                <div className="row">
                                    {/* PLAYER INFO */}
                                    <div className="col-12 text-center">
                                        <div className="profile-info">
                                            <img
                                                onError={(e) =>
                                                    defaultUserImage(e)
                                                }
                                                src={playerDetailsData.picture}
                                                alt="avatar"
                                            />
                                            <h2 className="mt-3 mb-1">
                                                {playerDetailsData.name}
                                            </h2>
                                            <p>user@froyo.games</p>
                                        </div>
                                    </div>
                                    {/* PLAYER MULTIPLIER */}
                                    <div className="col-12 mt-3">
                                        <div className="multiplier p-4 d-flex flex-column align-items-start">
                                            <p className="mb-3 multiplier-info">
                                                Multiplier{" "}
                                                <span>
                                                    {getCurrentMultiplier(
                                                        playerDetailsData,
                                                        ranksList
                                                    ) || 0}
                                                    %
                                                </span>
                                            </p>
                                            {/* LEVEL */}
                                            <div className="w-100">
                                                <div className="level mb-2 d-flex align-items-center justify-content-between">
                                                    <p className="mb-0 current-level">
                                                        <span>
                                                            {getCurrentLevel(
                                                                playerDetailsData,
                                                                ranksList
                                                            )}
                                                        </span>
                                                    </p>
                                                    <div className="mb-0 d-flex align-items-center exp">
                                                        <span className="player-exp">
                                                            {playerDetailsData?.exp >
                                                            ranksList[
                                                                ranksList.length -
                                                                    1
                                                            ]?.exp
                                                                ? ranksList[
                                                                      ranksList.length -
                                                                          1
                                                                  ]?.exp?.toLocaleString()
                                                                : playerDetailsData?.exp?.toLocaleString()}
                                                        </span>
                                                        <span className="px-1">
                                                            /
                                                        </span>
                                                        <span className="current-mutliplier-total pr-1">
                                                            {getCurrentLevelExp(
                                                                playerDetailsData,
                                                                ranksList
                                                            )?.toLocaleString()}
                                                        </span>
                                                        <span>exp</span>
                                                    </div>
                                                </div>
                                                <div className="col-12 position-relative px-0">
                                                    <div className="progress">
                                                        <div
                                                            className="progress-bar"
                                                            role="progressbar"
                                                            style={{
                                                                width: `${getLevelProgress(
                                                                    playerDetailsData,
                                                                    ranksList
                                                                )}%`,
                                                            }}
                                                            aria-valuemin="0"
                                                            aria-valuemax="100"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* HIGHSCORES */}
                            <div className="col-12 high-score mt-5">
                                <div className="row">
                                    <div className="col-12">
                                        <p className="title mb-4">Highscores</p>
                                    </div>
                                </div>
                                <div className="row">
                                    {playersHighScoreList.map((card, i) => (
                                        <div
                                            key={`highscore-${i}`}
                                            className="col-12"
                                        >
                                            <div className="row mb-4 px-3 align-items-center justify-content-between highscore-card">
                                                <div className="col-2 col-xl-1 px-0">
                                                    <img
                                                        className="img-fluid"
                                                        src={card.gameImageUrl}
                                                        alt="game"
                                                    />
                                                </div>
                                                <div className="col-10 col-xl-11 game-details d-flex flex-column align-items-start justify-content-end">
                                                    <p className="game-title mb-2">
                                                        {card.gameTitle}
                                                    </p>
                                                    <div className="w-100 d-flex align-items-end justify-content-between">
                                                        <p className="score-date">
                                                            {getDateFormat(
                                                                card.leaveTimeStamp *
                                                                    1000
                                                            )}
                                                        </p>
                                                        <p className="px-0 score">
                                                            {`${card.gameScore} pts`}
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
                </div>
            </section>
        </>
    );
};

export default SelectedPlayerInfo;
