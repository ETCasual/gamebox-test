// REACT, REDUX & 3RD PARTY LIBRARIES
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import _ from "lodash";

// COMPONENTS
import EarnAdditionalTickets from "Components/Leaderboard/EarnAdditionalTickets/EarnAdditionalTickets.component";
import LeaderRankIndicator from "Components/Global/LeaderRankIndicator.component";
import GenericLoader from "Components/Loader/Generic.loader";
import GameQuitModal from "Components/Modals/GameQuit.modal";
import GameEndModal from "Components/Modals/GameEnd.modal";
import EarnAdditionalBenefitModal from "Components/Modals/EarnAdditionalBenefit.modal";

// REDUX THUNKS TO CALL SERVICES (AYSNC) AND ADD DATA TO STORE
import loadUserDetails from "redux/thunks/UserDetails.thunk";
import loadPrizePoolTickets from "redux/thunks/PrizePoolTickets.thunk";
import loadPlayerTickets from "redux/thunks/PlayerTickets.thunk";
import loadPlayerEnterTournamentId from "redux/thunks/PlayerEnterTournament.thunk";
import loadPlayerLeaveTournamentId from "redux/thunks/PlayerLeaveTournament.thunk";
import loadLeaderboard from "redux/thunks/Leaderboard.thunk";
import loadCurrentUserRank from "redux/thunks/CurrentUserRank.thunk";
import loadLeaderboardRanks from "redux/thunks/LeaderboardRanks.thunk";
import loadPrizes from "redux/thunks/Prizes.thunk";
import { removeEarnAdditionalBenefitStatus } from "redux/thunks/EarnAdditionalTickets.thunk";

// HELPER FUNCTION
import { defaultUserImage } from "Utils/DefaultImage";
import getPoolTickets from "Utils/PoolTickets";
import showAdsBeforeGame from "Utils/showAdsBeforeGame";
import convertSecondsToHours from "Utils/TimeConversion";
import OverTimeModeChecker from "Utils/OverTimeModeChecker";
import refreshToken from "Utils/RefreshToken";

const Leaderboard = ({
    gameInfo,
    data,
    handleBackButton,
    setIsGameLeaderboardShown,
    timer,
    setTimer,
    earnAdditionalDisabledStatus,
    setEarnAdditionalDisabledStatus,
}) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.userData);
    const { poolTickets } = useSelector((state) => state.playerTickets);
    const { leaderRuleRanks } = useSelector((state) => state.leaderboardRanks);
    const { leaderboard } = useSelector((state) => state.leaderboard);
    const { extraEarning } = useSelector((state) => state.playerTournamentInfo);
    const { currentUserRank } = useSelector((state) => state.currentUserRank);
    const { config } = useSelector((state) => state.config);
    const { currentGameInfo } = useSelector(
        (state) => state.playerTournamentInfo
    );
    const { prizeTicketCollection } = useSelector(
        (state) => state.prizePoolTickets
    );
    const { earnAdditionalBenefitStatus } = useSelector(
        (state) => state.earnAdditional
    );

    const [gameData, setGameData] = useState(null);
    const [leaderboardList, setLeaderboardList] = useState([]);
    const [modalStatus, setModalStatus] = useState({
        isGameReady: false,
        isQuitGameBtnDisabled: false,
        isQuitGameConfirm: false,
        isTournamentEnded: false,
        isEarnAdditionalWinModalShown: false,
        isEarnAdditionalInfoShown: false,
    });

    let watcherRef = useRef(null);
    let leaderboardRef = useRef(null);
    let leaderboardLayerRef = useRef(null);

    let rankLength = _.maxBy(leaderRuleRanks, "rankTo")?.rankTo;

    // BLUR BACKGROUND FOR NAVBAR & SCROLL TO TOP
    useEffect(() => {
        const overlay = document.querySelector(".blur-overlay");
        // overlay?.setAttribute("style", `min-height: 145px`);
        return () => {
            overlay?.removeAttribute("style");
        };
    }, []);

    // SORTING LEADERBOARD
    useEffect(() => {
        setLeaderboardList(leaderboard);
    }, [leaderboard]);

    // LEADERBOARD RANK & ADDITIONAL TICKETS RULES
    useEffect(() => {
        if (gameInfo.gameId > 0)
            dispatch(loadLeaderboardRanks(gameInfo.gameId));
    }, [gameInfo.gameId, dispatch]);

    // COUNTDOWN TIMER
    useEffect(() => {
        clearInterval(watcherRef.current);
        watcherRef.current = setInterval(() => {
            let finalTimeRef = convertSecondsToHours(
                data?.gameInfo[0]?.endTimeStamp
            );
            setTimer(finalTimeRef);
            if (finalTimeRef === "Ended") countDownTimerEnded();
        }, 1000);

        // END COUNTDOWN TIMER
        function countDownTimerEnded() {
            clearInterval(watcherRef.current);
            watcherRef.current = null;

            let destination =
                document.getElementById("destination")?.contentWindow;
            let score = -1;
            if (destination) {
                score = destination?.getScore?.();
                if (score > -1 && currentGameInfo.playerEnterGameId) {
                    localStorage.setItem("currentGameScore", score);
                    destination?.endGameByTimer?.();
                    dispatch(loadPlayerLeaveTournamentId(score));
                }
            }

            setEarnAdditionalDisabledStatus({
                gems: false,
                ads: false,
            });

            setModalStatus((prev) => ({ ...prev, isTournamentEnded: true }));

            setTimeout(() => {
                if (score === -1) dispatch(loadPrizes());
            }, 2000);
        }

        return () => {
            clearInterval(watcherRef.current);
            watcherRef.current = null;
        };
    }, [
        data,
        currentGameInfo.playerEnterGameId,
        dispatch,
        setTimer,
        setEarnAdditionalDisabledStatus,
    ]);

    // RESIZE EVENT FOR LEADERBOARD HEIGHT
    useEffect(() => {
        window.addEventListener("resize", handleResize, false);

        function handleResize() {
            let nav =
                document.querySelector(".blur-overlay")?.clientHeight || 154;
            let gameInfo =
                document.querySelector(".leaderboard-game-info-flex-container")
                    ?.clientHeight || 122;
            let readyButton =
                document.querySelector(".bottom-ready-tournament")
                    ?.clientHeight || 100;
            if (
                nav > 0 &&
                gameInfo > 0 &&
                readyButton > 0 &&
                leaderboardLayerRef.current
            )
                console.table([nav, gameInfo, readyButton, window.innerWidth]);
            leaderboardLayerRef.current.style.height = `${
                window.innerHeight -
                (nav + gameInfo + readyButton) -
                (window.innerWidth > 767 ? 91 : 50)
            }px`;
        }
        leaderboardLayerRef.current && handleResize();

        return () => {
            window.removeEventListener("resize", handleResize, false);
        };
    }, [modalStatus.isGameReady]);

    const isCurrentUser = (id) => {
        if (id > 0 && user.id === id) return true;
        return false;
    };

    const getRankTickets = (index) => {
        let value;
        leaderRuleRanks.forEach((el) => {
            if (el.rankFrom <= index + 1) value = el.tickets;
            if (index + 1 >= el.rankTo) value = el.tickets;
        });
        return value;
    };

    const handleOnClickPlayButton = async () => {
        localStorage.removeItem("currentGameScore");

        setModalStatus((prev) => ({ ...prev, isGameReady: true }));

        const token = await refreshToken();
        if (token) {
            setModalStatus((prev) => ({
                ...prev,
                isEarnAdditionalInfoShown: false,
            }));

            if (gameInfo.gameId > 0) {
                try {
                    let url = `${process.env.REACT_APP_GLOADER_ENDPOINT}/sloader?game_id=${gameInfo.gameId}&user_id=${user.id}`;
                    let options = {
                        headers: {
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Methods":
                                "POST, GET, OPTIONS",
                            Authorization: token,
                        },
                    };
                    let response = await axios.get(url, options);
                    if (response.data) {
                        setGameData(response.data);
                        let gameCount =
                            parseInt(localStorage.getItem("gameCount")) || 0;
                        if (gameCount <= config.adsPerGame) {
                            gameCount = gameCount + 1;
                            localStorage.setItem("gameCount", gameCount);
                        }

                        showAdsBeforeGame(config);
                    }
                } catch (error) {
                    console.log(error.message);
                }
            }

            setEarnAdditionalDisabledStatus({
                gems: false,
                ads: false,
            });

            // TODO
            let _earnAdditional = [...earnAdditionalBenefitStatus];
            let index = _earnAdditional.findIndex(
                (e) => e.prizeId === data?.prizeId
            );
            let isAdWatched =
                index > -1 ? _earnAdditional[index]?.isAdsSelected : false;
            let isGemUsed =
                index > -1 ? _earnAdditional[index]?.isGemsSelected : false;

            dispatch(
                loadPlayerEnterTournamentId(
                    data?.prizeId,
                    gameInfo?.gameId,
                    isAdWatched,
                    isGemUsed
                )
            );
        }
    };

    const handleQuitGame = () => {
        dispatch({
            type: "GET_LEADERBOARD",
            payload: {
                gameId: gameInfo.gameId,
                prizeId: data?.prizeId,
            },
        });
        setModalStatus((prev) => ({
            ...prev,
            isQuitGameConfirm: true,
        }));
    };

    const handleModalButton = (choice) => {
        if (choice === "yes")
            setModalStatus((prev) => ({
                ...prev,
                isGameReady: false,
                isQuitGameConfirm: false,
            }));
        else if (choice === "no")
            setModalStatus((prev) => ({ ...prev, isQuitGameConfirm: false }));
    };

    window.playerEnterGame = () => {
        let _earnAdditional = [...earnAdditionalBenefitStatus];
        let index = _earnAdditional.findIndex(
            (e) => e.prizeId === data?.prizeId
        );
        let enterGameConfig = {
            prizeId: data?.prizeId,
            earnAdditionalBenefitStatus:
                index !== -1 ? _earnAdditional[index] : false,
            spinTicket: getPoolTickets(poolTickets, data?.prizeId),
        };
        return enterGameConfig;
    };

    window.playerFinishGame = (score) => {
        if (currentGameInfo.playerEnterGameId) {
            localStorage.setItem("currentGameScore", score);

            setModalStatus((prev) => ({
                ...prev,
                isQuitGameBtnDisabled: true,
            }));

            dispatch(loadPlayerLeaveTournamentId(score));
            dispatch(
                loadCurrentUserRank(data?.prizeId.toString(), gameInfo?.gameId)
            );

            // CALL USER & LEADERBOARD API AFTER 1 SECOND DELAY
            setTimeout(() => {
                if (timer === "Ended") {
                    setModalStatus((prev) => ({
                        ...prev,
                        isQuitGameBtnDisabled: false,
                    }));
                    // setIsShowAdditionalBenefitsModal(true);
                    // setIsGameLeaderboardShown(false);
                }

                dispatch(loadUserDetails());
                dispatch(loadLeaderboard(data?.prizeId, gameInfo?.gameId));
                // CALLING TICKETS API TO GET LATEST NUMBERS
                if (earnAdditionalBenefitStatus.length > 0) {
                    // PLAYER TICKETS
                    dispatch(loadPlayerTickets(data?.prizeId, true));
                    // PRIZE TOTAL TICKETS
                    dispatch(
                        loadPrizePoolTickets(
                            data?.prizeId,
                            true,
                            data?.ticketsRequired
                        )
                    );
                    // REMOVE ADDITIONAL BENEFIT STATUS FOR CURRENT PRIZE
                    dispatch(removeEarnAdditionalBenefitStatus(data?.prizeId));
                }
            }, 1000);
        }
    };

    window.playerQuitGame = () => {
        setModalStatus((prev) => ({
            ...prev,
            isQuitGameBtnDisabled: true,
        }));

        if (extraEarning.experience !== 0 || extraEarning.ticket !== 0)
            setModalStatus((prev) => ({
                ...prev,
                isEarnAdditionalWinModalShown: true,
            }));
        else
            setModalStatus((prev) => ({
                ...prev,
                isQuitGameBtnDisabled: false,
                isGameReady: false,
                isTournamentEnded: false,
                isEarnAdditionalWinModalShown: false,
            }));
    };

    function getEmptyLeaderboardList() {
        let rankList = [];
        for (let x = 0; x < rankLength; x++) {
            rankList.push(
                <div key={`leaderboard-${x}`} className="individual-rank">
                    <div className="leader-player-card d-flex align-items-center">
                        <div className="number-holder">
                            <LeaderRankIndicator index={x} type="lb" />
                        </div>

                        <div className="user-avatar">
                            <div className="rank-star"></div>
                            <img
                                className="avatar"
                                onError={(e) => defaultUserImage(e)}
                                src={`${window.cdn}icons/user.png`}
                                alt="player"
                            />
                        </div>

                        <div className="px-2 ml-3">
                            <p className="player-name">-</p>
                            <p className="points">0 pts</p>
                        </div>
                        <div className="tokens ml-auto d-flex align-items-center justify-content-center">
                            <span>{getRankTickets(x)} Tokens</span>
                            {/* <img
                                className="ml-1"
                                width="16"
                                src={`${window.cdn}icons/tickets.png`}
                                alt="tickets"
                            /> */}
                        </div>
                    </div>
                </div>
            );
        }
        return rankList;
    }

    function getLeaderboardList() {
        let _leaderboardList = [];
        // let length =
        //     _leaderboardList.length < rankLength
        //         ? rankLength
        //         : _leaderboardList.length;

        for (let i = 0; i < rankLength; i++) {
            _leaderboardList.push(
                <div key={`leaderboard-${i}`} className="individual-rank">
                    <div
                        className={`leader-player-card d-flex align-items-center ${
                            leaderboardList[i]?.userId
                                ? isCurrentUser(leaderboardList[i]?.userId)
                                    ? "leader-curr-player-card"
                                    : ""
                                : ""
                        }`}
                    >
                        <div className="number-holder">
                            <LeaderRankIndicator index={i} type="lb" />
                        </div>

                        <div className="user-avatar">
                            <div className="rank-star"></div>
                            <img
                                className="avatar"
                                onError={(e) => defaultUserImage(e)}
                                src={
                                    leaderboardList[i]?.avatarUrl ||
                                    `${window.cdn}icons/user.png`
                                }
                                alt="player"
                            />
                        </div>

                        <div className="px-2 ml-3">
                            <p className="player-name">
                                {leaderboardList[i]?.userId
                                    ? isCurrentUser(leaderboardList[i]?.userId)
                                        ? `${
                                              leaderboardList[i]?.nickName ||
                                              user.username
                                          } (You)`
                                        : leaderboardList[i]?.nickName ||
                                          `Player ${leaderboardList[i]?.userId}`
                                    : "-"}
                            </p>
                            <p className="points">
                                {leaderboardList[i]?.gameScore >= 0
                                    ? leaderboardList[i]?.gameScore
                                    : "0"}{" "}
                                pts
                            </p>
                        </div>

                        <div className="tokens ml-auto d-flex align-items-center justify-content-center">
                            <span>{getRankTickets(i)} Tokens</span>
                            {/* <img
                                className="ml-1"
                                width="16"
                                src={`${window.cdn}icons/tickets.png`}
                                alt="tickets"
                            /> */}
                        </div>
                    </div>
                </div>
            );
        }
        return _leaderboardList;
    }

    if (modalStatus.isGameReady) {
        return (
            <div className="game-wrapper">
                {/* ADDITIONAL TICKETS & EXPERIENCE POINTS WIN MODAL */}
                {modalStatus.isEarnAdditionalWinModalShown && (
                    <EarnAdditionalBenefitModal
                        handleContinueButton={() => {
                            setModalStatus((prev) => ({
                                ...prev,
                                isGameReady: false,
                                isQuitGameBtnDisabled: false,
                                isEarnAdditionalWinModalShown: false,
                            }));
                        }}
                    />
                )}

                {/* MODAL FOR TOURNAMENT HAS ENDED */}
                {modalStatus.isTournamentEnded && (
                    <GameEndModal
                        handleContinueButton={() => {
                            setModalStatus((prev) => ({
                                ...prev,
                                isGameReady: false,
                                isQuitGameBtnDisabled: false,
                                isTournamentEnded: false,
                            }));
                            setIsGameLeaderboardShown(false);
                        }}
                    />
                )}

                {!modalStatus.isQuitGameBtnDisabled && (
                    <img
                        className="ml-1 mt-1 quit-btn"
                        width="40"
                        onClick={handleQuitGame}
                        src={`${window.cdn}buttons/button_close_02.png`}
                        alt="Close Button"
                    />
                )}

                {/* QUIT GAME MODAL */}
                {modalStatus.isQuitGameConfirm && (
                    <GameQuitModal handleModalButton={handleModalButton} />
                )}

                {/* GAME IFRAME */}
                {gameData !== null && (
                    <>
                        <div className="game-loading">
                            <p className="mb-2 text-center loading-text">
                                Loading
                            </p>
                            <GenericLoader
                                height="30"
                                bg="#7824f8"
                                cx1={window.innerWidth > 1200 ? "48%" : "46%"}
                                cx2="50%"
                                cx3={window.innerWidth > 1200 ? "52%" : "54%"}
                                cy="15"
                            />
                        </div>
                        <iframe
                            title="game"
                            id="destination"
                            srcDoc={gameData}
                            frameBorder="0"
                        />
                    </>
                )}
            </div>
        );
    } else {
        return (
            <>
                <div className="nav-top-back-btn-wrapper d-flex align-items-center justify-content-center mx-auto">
                    <div className="d-flex col-12 col-md-10 col-lg-8 col-xl-8">
                        {/* BACK BUTTON */}
                        <button className="d-flex align-items-center justify-content-center p-0">
                            <img
                                onClick={handleBackButton}
                                className="back-button"
                                width="40"
                                height="40"
                                src={`${window.cdn}buttons/button_back.png`}
                                alt="back-btn"
                            />
                        </button>
                        {/* BACK TEXT */}
                        <div
                            onClick={handleBackButton}
                            className="back-text d-flex align-items-center"
                        >
                            Back
                        </div>
                        {/* YOUR TICKETS */}
                        {/* <div className="ticket-values px-3 ml-auto">
                            <p className="mb-0">
                                You have{" "}
                                <span className="mx-2">
                                    {getPoolTickets(
                                        poolTickets,
                                        data?.prizeId
                                    )?.toLocaleString() || 0}
                                </span>
                                <img
                                    width="24"
                                    src={`${window.cdn}icons/tickets.png`}
                                    alt="tickets"
                                />
                            </p>
                        </div> */}
                    </div>
                </div>

                <section
                    id="game-leaderboard-screen"
                    ref={leaderboardRef}
                    onClick={(e) => {
                        if (
                            !e.target.closest(".bottom-ready-tournament") &&
                            !e.target.closest(
                                ".earn-additional-tickets-container"
                            )
                        ) {
                            setModalStatus((prev) => ({
                                ...prev,
                                isEarnAdditionalInfoShown: false,
                            }));
                        }
                    }}
                >
                    <div className="leaderboard-background-wrapper">
                        <img
                            alt="game-icon"
                            src={gameInfo?.gameIcon}
                            className="leaderboard-background"
                        ></img>
                    </div>

                    <div className="leaderboard-flex-container">
                        <div className="top-leaderboard">
                            <div className="leaderboard-game-info-flex-container">
                                <div
                                    className="game-icon"
                                    style={{
                                        backgroundImage: `url("${gameInfo?.gameIcon}")`,
                                    }}
                                ></div>
                                <div className="game-details-container">
                                    <div className="game-name">
                                        {gameInfo.gameTitle}
                                    </div>

                                    <div className="tournament-end-container">
                                        <div className="tournament-end-text">
                                            Tournament ends in
                                        </div>
                                        <div
                                            className={`${
                                                OverTimeModeChecker(
                                                    data?.prizeId,
                                                    data?.ticketsRequired,
                                                    prizeTicketCollection
                                                )
                                                    ? "text-danger"
                                                    : "timer-text"
                                            }`}
                                        >
                                            {timer || "0d 0h 0m 0s"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="leaderboard-holder">
                                <div
                                    className="leaderboard"
                                    // className={`leaderboard mb-2 mb-md-3 ${
                                    //     currentUserRank.rank > rankLength
                                    //         ? ""
                                    //         : "pb-2 pb-md-3"
                                    // }`}
                                >
                                    <div
                                        ref={leaderboardLayerRef}
                                        className={`leaderboard-rank-layer ${
                                            currentUserRank.rank > rankLength ||
                                            currentUserRank.rank === "-"
                                                ? ""
                                                : "leaderboard-rank-layer-without-user"
                                        }`}
                                    >
                                        {leaderboardList.length > 0
                                            ? getLeaderboardList()
                                            : getEmptyLeaderboardList()}
                                    </div>

                                    {currentUserRank.rank > rankLength ? (
                                        <div className="leaderboard-user-wrapper w-100 p-3">
                                            <div className="leader-player-card px-2 d-flex align-items-center leader-curr-player-card">
                                                <div className="user-avatar">
                                                    <div className="rank-star">
                                                        <LeaderRankIndicator
                                                            index={
                                                                currentUserRank.rank
                                                            }
                                                            type="current"
                                                        />
                                                    </div>
                                                    <img
                                                        className="avatar"
                                                        onError={(e) =>
                                                            defaultUserImage(e)
                                                        }
                                                        src={
                                                            user.picture ||
                                                            `${window.cdn}icons/user.png`
                                                        }
                                                        alt="player"
                                                    />
                                                </div>

                                                <div className="px-2 ml-3">
                                                    <p className="player-name">
                                                        {user.username}
                                                    </p>
                                                    <p className="points">
                                                        {leaderboard.find(
                                                            (e) =>
                                                                e.userId ===
                                                                user.id
                                                        )?.gameScore ||
                                                            "0"}{" "}
                                                        pts
                                                    </p>
                                                </div>
                                                <div className="tokens ml-auto d-flex align-items-center justify-content-center">
                                                    <span>
                                                        {getRankTickets(
                                                            currentUserRank.rank -
                                                                1
                                                        ) || "0"}{" "}
                                                        Tokens
                                                    </span>
                                                    {/* <img
                                                        className="ml-1"
                                                        width="16"
                                                        src={`${window.cdn}icons/tickets.png`}
                                                        alt="tickets"
                                                    /> */}
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* {!modalStatus.isEarnAdditionalInfoShown && (
                            <div className="bottom-ready-tournament">
                                <button
                                    onClick={() => {
                                        setModalStatus((prev) => ({
                                            ...prev,
                                            isEarnAdditionalInfoShown: true,
                                        }));
                                    }}
                                    className="ready-tournament-button"
                                >
                                    Ready Tournament
                                </button>
                            </div>
                        )} */}

                        {/* {modalStatus.isEarnAdditionalInfoShown && (
                            <>
                                <EarnAdditionalTickets
                                    style={{ background: "red" }}
                                    gameId={gameInfo.gameId}
                                    prizeId={data?.prizeId}
                                    earnAdditionalDisabledStatus={
                                        earnAdditionalDisabledStatus
                                    }
                                    setEarnAdditionalDisabledStatus={
                                        setEarnAdditionalDisabledStatus
                                    }
                                />
                                <button
                                    className={`play-btn ${
                                        timer !== "Ended" ||
                                        timer !== "0d 0h 0m 0s"
                                            ? ""
                                            : "opacity-0-5"
                                    }`}
                                    onClick={
                                        timer !== "Ended" ||
                                        timer !== "0d 0h 0m 0s"
                                            ? handleOnClickPlayButton
                                            : null
                                    }
                                >
                                    Play!
                                </button>
                            </>
                        )} */}
                    </div>

                    {!modalStatus.isEarnAdditionalInfoShown && (
                        <div className="bottom-ready-tournament">
                            <button
                                onClick={() => {
                                    setModalStatus((prev) => ({
                                        ...prev,
                                        isEarnAdditionalInfoShown: true,
                                    }));
                                }}
                                className="ready-tournament-button"
                            >
                                Ready Tournament
                            </button>
                        </div>
                    )}

                    {/* EARN ADDITIONAL BENEFITS */}
                    {modalStatus.isEarnAdditionalInfoShown && (
                        <div className="earn-additional-tickets-container">
                            <EarnAdditionalTickets
                                gameId={gameInfo.gameId}
                                prizeId={data?.prizeId}
                                earnAdditionalDisabledStatus={
                                    earnAdditionalDisabledStatus
                                }
                                setEarnAdditionalDisabledStatus={
                                    setEarnAdditionalDisabledStatus
                                }
                            />
                            {/* PLAY BUTTON*/}
                            <div
                                className={`play-button-container ${
                                    timer !== "Ended" || timer !== "0d 0h 0m 0s"
                                        ? ""
                                        : "opacity-0-5"
                                }`}
                            >
                                <button
                                    onClick={
                                        timer !== "Ended" ||
                                        timer !== "0d 0h 0m 0s"
                                            ? handleOnClickPlayButton
                                            : null
                                    }
                                    className="play-button"
                                >
                                    Play Tournament!
                                </button>
                            </div>
                        </div>
                    )}
                </section>
            </>
        );
    }
};

export default Leaderboard;
