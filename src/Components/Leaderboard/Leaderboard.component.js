// REACT, REDUX & 3RD PARTY LIBRARIES
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import _ from "lodash";

// COMPONENTS
import LeaderRankIndicator from "Components/Global/LeaderRankIndicator.component";
import GenericLoader from "Components/Loader/Generic.loader";
import GameQuitModal from "Components/Modals/GameQuit.modal";
import GameEndModal from "Components/Modals/GameEnd.modal";
import EarnAdditionalBenefitModal from "Components/Modals/EarnAdditionalBenefit.modal";

// REDUX THUNKS TO CALL SERVICES (AYSNC) AND ADD DATA TO STORE
import loadUserDetails from "redux/thunks/UserDetails.thunk";
import { loadPrizePoolTickets } from "redux/thunks/PrizePoolTickets.thunk";
import loadPlayerTickets from "redux/thunks/PlayerTickets.thunk";
import loadPlayerEnterTournamentId from "redux/thunks/PlayerEnterTournament.thunk";
import loadPlayerLeaveTournamentId from "redux/thunks/PlayerLeaveTournament.thunk";
import loadLeaderboard from "redux/thunks/Leaderboard.thunk";
import loadCurrentUserRank from "redux/thunks/CurrentUserRank.thunk";
import loadLeaderboardRanks from "redux/thunks/LeaderboardRanks.thunk";
import loadCurrentGameRules from "redux/thunks/CurrentGameRules.thunk";
// import loadPrizes from "redux/thunks/Prizes.thunk";
import { removeEarnAdditionalBenefitStatus } from "redux/thunks/EarnAdditionalTickets.thunk";
import InsufficientBalanceModalPopup from "Components/Modals/InsufficientBalance.modal";
import LaunchGameMenuModalPopup from "Components/Modals/LaunchGameMenu.modal";

// HELPER FUNCTION
import { defaultUserImage } from "Utils/DefaultImage";
import getPoolTickets from "Utils/PoolTickets";
import showAdsBeforeGame from "Utils/showAdsBeforeGame";
import { convertSecondsToHours } from "Utils/TimeConversion";
import OverTimeModeChecker from "Utils/OverTimeModeChecker";
import getToken from "Utils/GetToken";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { PLAYER_LOG_RESET } from "redux/types";
import PauseMenuModal from "Components/Modals/PauseMenuModal";

const Leaderboard = ({
    data,
    // handleBackButton,
    // setIsGameLeaderboardShown,
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
    const { currentGameRules } = useSelector((state) => state.prizes);
    const [currentGameBoosterInfo, setCurrentGameBoosterInfo] = useState({
        isUseBooster: false,
        scoreNeededPerExtraTickets: 0,
        extraTickets: 0,
    });

    const { currentGameInfo } = useSelector(
        (state) => state.playerTournamentInfo
    );
    const { currentUserRank } = useSelector((state) => state.currentUserRank);
    const { config } = useSelector((state) => state.config);
    const { prizeTicketCollection } = useSelector(
        (state) => state.prizePoolTickets
    );
    const { earnAdditionalBenefitStatus } = useSelector(
        (state) => state.earnAdditional
    );
    const { currentGameDetails } = useSelector(
        (state) => state.currentGameDetails
    );

    const [gameData, setGameData] = useState(null);
    const [leaderboardList, setLeaderboardList] = useState([]);
    const [isGameAvailable, setIsGameAvailable] = useState(false);
    const [modalStatus, setModalStatus] = useState({
        isGameReady: false,
        isGamePaused: false,
        isQuitGameBtnDisabled: false,
        isPlayBtnDisabled: false,
        isQuitGameConfirm: false,
        isTournamentEnded: false,
        isGameOver: false,
        isEarnAdditionalWinModalShown: false,
        isEarnAdditionalInfoShown: false,
    });
    const [isSubscriptionModalShown, setIsSubscriptionModalShown] =
        useState(false);

    const { executeRecaptcha } = useGoogleReCaptcha();

    let watcherRef = useRef(null);
    let leaderBoardBackgroundRef = useRef(null);
    let leaderBoardGameInfoRef = useRef(null);
    let leaderboardRef = useRef(null);
    let readyTournamentButtonRef = useRef(null);

    let rankLength = _.maxBy(leaderRuleRanks, "rankTo")?.rankTo;

    let onClickSubscriptionCancel = () => setIsSubscriptionModalShown(false);

    /* REASON COMMENTED: Leaderboard is moved to parent page
    // DISABLE SCROLLING
    useEffect(() => {
        window.addEventListener("resize", handleResize, { once: true });

        function handleResize() {
            document.documentElement.style.overflowY = "hidden";
            document.documentElement.scrollTop = 0;
        }

        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    });
    */

    // LEADERBOARD RANK & ADDITIONAL TICKETS RULES
    useEffect(() => {
        setIsGameAvailable(false);
        if (currentGameDetails?.gameId > 0) {
            dispatch(loadLeaderboardRanks(currentGameDetails?.gameId));
            dispatch(loadCurrentGameRules(currentGameDetails?.gameId));
        }
    }, [currentGameDetails, dispatch]);

    // SORTING LEADERBOARD
    useEffect(() => {
        setLeaderboardList(leaderboard);
    }, [leaderboard]);

    // LEADERBOARD RANK & ADDITIONAL TICKETS RULES
    useEffect(() => {
        if (currentGameDetails?.gameId > 0)
            dispatch(loadLeaderboardRanks(currentGameDetails.gameId));

        // To notify the players that stayed in games tournament ended when they left the window
        let destination = document.getElementById("destination")?.contentWindow;
        if (destination) {
            // END BY TIMER
            destination?.endGameByTimer?.();

            setEarnAdditionalDisabledStatus({
                gems: false,
                ads: false,
            });

            setModalStatus((prev) => ({ ...prev, isTournamentEnded: true }));
        }
    }, [currentGameDetails.gameId, dispatch, setEarnAdditionalDisabledStatus]);

    // COUNTDOWN TIMER
    useEffect(() => {
        clearInterval(watcherRef.current);
        watcherRef.current = setInterval(() => {
            let finalTimeRef = convertSecondsToHours(
                data?.gameInfo[0]?.endTimeStamp * 1000,
                config.offsetTimestamp ? config.offsetTimestamp : 0
            );

            setTimer(finalTimeRef);

            if (finalTimeRef === "Ended") countDownTimerEnded();
        }, 1000);

        // END COUNTDOWN TIMER
        async function countDownTimerEnded() {
            clearInterval(watcherRef.current);
            watcherRef.current = null;

            let destination =
                document.getElementById("destination")?.contentWindow;

            if (destination) {
                // END BY TIMER
                destination?.endGameByTimer?.();
                setModalStatus((prev) => ({
                    ...prev,
                    isTournamentEnded: true,
                }));
            }

            setEarnAdditionalDisabledStatus({
                gems: false,
                ads: false,
            });

            // setTimeout(() => {
            //     if (score === -1) dispatch(loadPrizes());
            // }, 2000);
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
        executeRecaptcha,
        config,
    ]);

    useEffect(() => {
        let isDisabled = false;
        switch (timer) {
            case "Calculating":
            case "Ended":
            case "0d 0h 0m 0s":
                isDisabled = true;
                break;
            default:
                isDisabled = false;
        }
        setIsGameAvailable(!isDisabled);
    }, [timer]);

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
        setModalStatus((prev) => ({
            ...prev,
            isPlayBtnDisabled: true,
            isEarnAdditionalInfoShown: false,
        }));

        if (!executeRecaptcha) {
            console.log("Execute recaptcha not yet available");
            return;
        }
        const recaptchaToken = await executeRecaptcha("playGame");

        localStorage.removeItem("currentGameScore");

        // TODO
        let _earnAdditional = [...earnAdditionalBenefitStatus];
        let index = _earnAdditional.findIndex(
            (e) => e.prizeId === data?.prizeId
        );
        let isAdWatched =
            index > -1 ? _earnAdditional[index]?.isAdsSelected : false;
        let isGemUsed =
            index > -1 ? _earnAdditional[index]?.isGemsSelected : false;

        setCurrentGameBoosterInfo(() => ({
            isUseBooster: isGemUsed,
            extraTickets: currentGameRules.useGemTickets,
            scoreNeededPerExtraTickets: currentGameRules.score,
        }));

        dispatch(
            loadPlayerEnterTournamentId(
                data?.prizeId,
                currentGameDetails?.gameId,
                isAdWatched,
                isGemUsed,
                recaptchaToken
            )
        )
            .then(async () => {
                const token = getToken();
                setModalStatus((prev) => ({
                    ...prev,
                    isGamePaused: false,
                    isGameReady: true,
                    isEarnAdditionalInfoShown: false,
                }));

                if (currentGameDetails.gameId > 0) {
                    try {
                        let url = `${process.env.REACT_APP_GLOADER_ENDPOINT}/sloader?game_id=${currentGameDetails.gameId}&user_id=${user.id}`;
                        let options = {
                            headers: {
                                "Access-Control-Allow-Origin": "*",
                                "Access-Control-Allow-Methods":
                                    "POST, GET, OPTIONS",
                                Authorization: `Bearer ${token}`,
                            },
                        };
                        let response = await axios.get(url, options);
                        if (response.data) {
                            sessionStorage.setItem(
                                "lbId",
                                JSON.stringify({
                                    cgId: data.cgId,
                                    gameId: currentGameDetails.gameId,
                                })
                            );
                            setGameData(response.data);
                            let gameCount =
                                parseInt(localStorage.getItem("gameCount")) ||
                                0;
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
            })
            .catch((err) => {
                setIsSubscriptionModalShown(true);
            });
    };

    const handleQuitGame = () => {
        setModalStatus((prev) => ({
            ...prev,
            isQuitGameConfirm: true,
        }));
    };

    window.handleQuitGame = () => {
        handleQuitGame();
    };

    window.pauseGame = () => {
        console.log("mm", modalStatus.isQuitGameConfirm);
        if (modalStatus.isQuitGameConfirm) return;
        if (modalStatus.isGameOver) return;

        setModalStatus((prev) => ({
            ...prev,
            isGamePaused: true,
        }));
    };

    const handleModalButton = (choice) => {
        if (choice === "yes")
            setModalStatus((prev) => ({
                ...prev,
                isGameReady: false,
                isQuitGameConfirm: false,
                isPlayBtnDisabled: false,
            }));
        else if (choice === "no") {
            setModalStatus((prev) => ({
                ...prev,
                isQuitGameConfirm: false,
            }));
            let destination =
                document.getElementById("destination")?.contentWindow;
            destination?.resumeGame?.();
        }
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

    /**
     * Whenever a game is finished should call this function to submiting the score object
     * @param {
            a: this.currentScore, // score
            b: scoreObject, // scoreObject { timestamp: number, score: number }
            c: this.gameStartTime, // gameStartTime
            d: this.gameOverTime, // gameOverTime
            e: this.sTick, // sTick} score 
     * @returns 
     */
    window.playerFinishGame = async (score) => {
        if (!executeRecaptcha) {
            console.log("Execute recaptcha not yet available");
            return;
        }

        const recaptchaToken = await executeRecaptcha("finishGame");
        if (currentGameInfo.playerEnterGameId) {
            localStorage.setItem("currentGameScore", score.a);

            dispatch(loadPlayerLeaveTournamentId(score, recaptchaToken));
            dispatch(
                loadCurrentUserRank(
                    data?.prizeId.toString(),
                    currentGameDetails?.gameId
                )
            );

            setModalStatus((prev) => ({
                ...prev,
                isQuitGameBtnDisabled: true,
                isGamePaused: false,
            }));

            // CALL USER & LEADERBOARD API & DISPLAY GAME OVER PANEL AFTER 1 SECOND DELAY
            setTimeout(() => {
                setModalStatus((prev) => ({
                    ...prev,
                    isGameOver: true,
                    isPlayBtnDisabled: false,
                    isQuitGameConfirm: false,
                    isGamePaused: false,
                }));
                // setIsShowAdditionalBenefitsModal(true);
                // setIsGameLeaderboardShown(false);

                dispatch(loadUserDetails());
                dispatch(
                    loadLeaderboard(data?.prizeId, currentGameDetails?.gameId)
                );
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

    // window.playerQuitGame = () => {
    //     setModalStatus((prev) => ({
    //         ...prev,
    //         isQuitGameBtnDisabled: true,
    //     }));

    //     if (extraEarning.experience !== 0 || extraEarning.ticket !== 0)
    //         setModalStatus((prev) => ({
    //             ...prev,
    //             isEarnAdditionalWinModalShown: true,
    //         }));
    //     else
    //         setModalStatus((prev) => ({
    //             ...prev,
    //             isQuitGameBtnDisabled: false,
    //             isGameReady: false,
    //             isTournamentEnded: false,
    //             isEarnAdditionalWinModalShown: false,
    //         }));
    // };

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
                                src={`${window.cdn}icons/icon_profile.svg`}
                                alt="player"
                            />
                        </div>

                        <div className="px-2 ml-3">
                            <p className="player-name">-</p>
                            <p className="points">0 pts</p>
                        </div>
                        <div className="tickets ml-auto d-flex align-items-center justify-content-center">
                            <span>
                                {getRankTickets(x)}{" "}
                                <img
                                    className="icon ml-1"
                                    src={`${window.cdn}assets/tickets_06.png`}
                                    alt="ticket"
                                />
                            </span>
                        </div>
                    </div>
                </div>
            );
        }
        return rankList;
    }

    function getLeaderboardList() {
        let _leaderboardList = [];

        for (let i = 0; i < rankLength; i++) {
            _leaderboardList.push(
                <div key={`leaderboard-${i}`} className="individual-rank">
                    <div
                        className={`leader-player-card d-flex align-items-center ${
                            isCurrentUser(leaderboardList[i]?.userId)
                                ? "you"
                                : ""
                        }`}
                    >
                        <div className="number-holder">
                            <LeaderRankIndicator index={i} type="lb" />
                        </div>

                        <div className="user-avatar">
                            <img
                                className="avatar"
                                onError={(e) => defaultUserImage(e)}
                                src={
                                    leaderboardList[i]?.avatarUrl ||
                                    `${window.cdn}icons/icon_profile.svg`
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
                                              user.username ||
                                              "Player"
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

                        <div className="tickets ml-auto d-flex align-items-center justify-content-center">
                            <span>
                                {getRankTickets(i)}{" "}
                                <img
                                    className="icon ml-1"
                                    src={`${window.cdn}assets/tickets_06.png`}
                                    alt="ticket"
                                />
                            </span>
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
                                isPlayBtnDisabled: false,
                            }));
                        }}
                    />
                )}
                {/* MODAL FOR GAME OVER */}
                {modalStatus.isGameOver && (
                    <GameEndModal
                        handleContinueButton={() => {
                            setModalStatus((prev) => ({
                                ...prev,
                                isGameReady: false,
                                isQuitGameBtnDisabled: false,
                                isGameOver: false,
                                isTournamentEnded: false,
                                isPlayBtnDisabled: false,
                            }));
                            // setIsGameLeaderboardShown(false);
                            dispatch({ type: PLAYER_LOG_RESET });
                        }}
                        isShowTournamentEndedText={
                            modalStatus.isTournamentEnded
                        }
                        currentGameBoosterInfo={currentGameBoosterInfo}
                    />
                )}

                {/* MODAL FOR GAME PAUSED */}
                {modalStatus.isGamePaused && (
                    <PauseMenuModal
                        handleResumeButton={() => {
                            setModalStatus((prev) => ({
                                ...prev,
                                isGamePaused: false,
                            }));
                            let destination =
                                document.getElementById(
                                    "destination"
                                )?.contentWindow;
                            destination?.resumeGame?.();
                            // setIsGameLeaderboardShown(false);
                        }}
                        handleQuitButton={() => {
                            setModalStatus((prev) => ({
                                ...prev,
                                isGamePaused: false,
                                isQuitGameConfirm: true,
                            }));
                        }}
                    />
                )}

                {/* Comment out because the Front End X button is no longer in
                used */}
                {/* {!modalStatus.isQuitGameBtnDisabled && (
                    <img
                        className="ml-1 mt-1 quit-btn"
                        width="36"
                        onClick={handleQuitGame}
                        src={`${window.cdn}buttons/button_close.png`}
                        alt="Close Button"
                    />
                )} */}
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
                                bg="#FF007C"
                                cx1={window.innerWidth > 1200 ? "48%" : "46%"}
                                cx2="50%"
                                cx3={window.innerWidth > 1200 ? "52%" : "54%"}
                                cy="15"
                            />
                            <button
                                className="loading-quit-btn d-block text-center mx-auto mt-4 py-3"
                                onClick={handleQuitGame}
                            >
                                Close
                            </button>
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
            <section
                id="game-leaderboard-screen"
                // REASON OF COMMENTED: Disable tap outside to close the LaunchGameMenu popup
                // onClick={(e) => {
                //     if (
                // //         !e.target.closest(".bottom-ready-tournament") &&
                // //         !e.target.closest(".earn-additional-tickets-container")
                //     ) {
                //         setModalStatus((prev) => ({
                //             ...prev,
                //             isEarnAdditionalInfoShown: false,
                //         }));
                //     }
                // }}
            >
                {/* TICKETS BOOSTER CLOSE LAYER */}
                {/* {modalStatus.isEarnAdditionalInfoShown && (
                    <div className="leaderboard-tickets-booster-close"></div>
                )} */}

                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-12">
                            {/* BACKGROUND IMAGE */}
                            <div
                                className="col-12 px-0 leaderboard-background-wrapper position-relative"
                                ref={leaderBoardBackgroundRef}
                            >
                                <img
                                    className="leaderboard-background"
                                    src={currentGameDetails?.gameIcon}
                                    alt={currentGameDetails?.gameTitle}
                                />
                                {/* LEADERBOARD */}
                                <div className="leaderboard-wrapper">
                                    {/* GAME INFO & TIMER */}
                                    <div
                                        className="leaderboard-game-info d-flex align-items-center justify-content-start"
                                        ref={leaderBoardGameInfoRef}
                                    >
                                        <img
                                            className="game-icon"
                                            src={currentGameDetails?.gameIcon}
                                            alt={currentGameDetails?.gameIcon}
                                        />
                                        <div className="game-details w-100 px-3">
                                            <p className="game-name w-100 mb-2">
                                                {currentGameDetails?.gameTitle}
                                            </p>

                                            <div className="w-100 d-flex align-items-center justify-content-between">
                                                <p className="tournament-end-text mb-0">
                                                    Tournament ends in
                                                </p>
                                                <p
                                                    className={`mb-0 ${
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
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* LEADERBOARD LIST */}
                                    <div
                                        ref={leaderboardRef}
                                        className={`leaderboard ${
                                            currentUserRank.rank > rankLength ||
                                            currentUserRank.rank === "-"
                                                ? ""
                                                : "leaderboard-rank-layer-without-user"
                                        }`}
                                        style={{
                                            padding: `${
                                                currentUserRank.rank >
                                                rankLength
                                                    ? "0.25rem 0.25rem 5rem 0.25rem"
                                                    : ""
                                            }`,
                                        }}
                                    >
                                        {leaderboardList.length > 0
                                            ? getLeaderboardList()
                                            : getEmptyLeaderboardList()}
                                    </div>

                                    {/* CURRENT USER RANK IF IT'S MORE THAN THE RANK LIST LENGTH */}
                                    {currentUserRank.rank > rankLength ? (
                                        <div className="leaderboard-user-wrapper w-100">
                                            <div className="leader-player-card px-2 d-flex align-items-center leader-curr-player-card">
                                                <div className="number-holder">
                                                    <LeaderRankIndicator
                                                        index={
                                                            currentUserRank.rank
                                                        }
                                                        type="current"
                                                    />
                                                </div>
                                                <div className="user-avatar">
                                                    <img
                                                        className="avatar"
                                                        onError={(e) =>
                                                            defaultUserImage(e)
                                                        }
                                                        src={
                                                            user.picture ||
                                                            `${window.cdn}icons/icon_profile.svg`
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
                                                <div className="tickets ml-auto d-flex align-items-center justify-content-center">
                                                    <span>
                                                        {getRankTickets(
                                                            currentUserRank.rank -
                                                                1
                                                        ) || "0"}{" "}
                                                        <img
                                                            className="icon ml-1"
                                                            src={`${window.cdn}assets/tickets_06.png`}
                                                            alt="ticket"
                                                        />
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                </div>

                                {/* READY TOURNAMENT BUTTON */}
                                <div
                                    className="bottom-ready-tournament d-block align-items-center justify-content-center"
                                    ref={readyTournamentButtonRef}
                                >
                                    <button
                                        className={`ready-tournament-button ${
                                            isGameAvailable ? "" : "opacity-0-5"
                                        }`}
                                        onClick={
                                            isGameAvailable
                                                ? () => {
                                                      setModalStatus(
                                                          (prev) => ({
                                                              ...prev,
                                                              isEarnAdditionalInfoShown: true,
                                                          })
                                                      );
                                                  }
                                                : null
                                        }
                                    >
                                        Join Tournament
                                        {/* <img
                                            width={18}
                                            className="icon ml-3 mr-1"
                                            src={`${window.cdn}assets/gem_01.png`}
                                            alt="gems"
                                        />
                                        {data?.gemsNeeded} */}
                                    </button>
                                </div>

                                {isSubscriptionModalShown && (
                                    <InsufficientBalanceModalPopup
                                        onCloseClicked={
                                            onClickSubscriptionCancel
                                        }
                                    />
                                )}

                                {/* EARN ADDITIONAL BENEFITS */}
                                {modalStatus.isEarnAdditionalInfoShown && (
                                    <LaunchGameMenuModalPopup
                                        gameId={currentGameDetails.gameId}
                                        prizeId={data?.prizeId}
                                        playCost={data?.gemsNeeded}
                                        setEarnAdditionalDisabledStatus={
                                            setEarnAdditionalDisabledStatus
                                        }
                                        onCloseClicked={() => {
                                            setModalStatus((prev) => ({
                                                ...prev,
                                                isEarnAdditionalInfoShown: false,
                                            }));
                                        }}
                                        onPlayClicked={handleOnClickPlayButton}
                                        onInsufficientPayment={() => {
                                            setModalStatus((prev) => ({
                                                ...prev,
                                                isEarnAdditionalInfoShown: false,
                                            }));
                                            setIsSubscriptionModalShown(true);
                                        }}
                                    />

                                    // <div className="earn-additional-tickets-container d-flex flex-column align-items-center justify-content-center">
                                    //     <EarnAdditionalTickets
                                    //         gameId={currentGameDetails.gameId}
                                    //         prizeId={data?.prizeId}
                                    //         earnAdditionalDisabledStatus={
                                    //             earnAdditionalDisabledStatus
                                    //         }
                                    //         setEarnAdditionalDisabledStatus={
                                    //             setEarnAdditionalDisabledStatus
                                    //         }
                                    //     />
                                    //     {/* PLAY BUTTON*/}
                                    //     <div
                                    //         className={`play-button-container d-flex justify-content-center ${
                                    //             isGameAvailable
                                    //                 ? ""
                                    //                 : "opacity-0-5"
                                    //         }`}
                                    //     >
                                    //         <button
                                    //             onClick={
                                    //                 isGameAvailable && !modalStatus.isPlayBtnDisabled
                                    //                     ? handleOnClickPlayButton
                                    //                     : null
                                    //             }
                                    //             className={`play-button ${
                                    //                 isGameAvailable && !modalStatus.isPlayBtnDisabled
                                    //                     ? ""
                                    //                     : "opacity-0-5"
                                    //             }`}
                                    //         >
                                    //             Play Tournament!
                                    //         </button>
                                    //     </div>
                                    // </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
};

export default Leaderboard;
