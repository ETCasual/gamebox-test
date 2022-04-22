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
import { loadPrizePoolTickets } from "redux/thunks/PrizePoolTickets.thunk";
import loadPlayerTickets from "redux/thunks/PlayerTickets.thunk";
import loadPlayerEnterTournamentId from "redux/thunks/PlayerEnterTournament.thunk";
import loadPlayerLeaveTournamentId from "redux/thunks/PlayerLeaveTournament.thunk";
import loadLeaderboard from "redux/thunks/Leaderboard.thunk";
import loadCurrentUserRank from "redux/thunks/CurrentUserRank.thunk";
import loadLeaderboardRanks from "redux/thunks/LeaderboardRanks.thunk";
// import loadPrizes from "redux/thunks/Prizes.thunk";
import { removeEarnAdditionalBenefitStatus } from "redux/thunks/EarnAdditionalTickets.thunk";

// HELPER FUNCTION
import { defaultUserImage } from "Utils/DefaultImage";
import getPoolTickets from "Utils/PoolTickets";
import showAdsBeforeGame from "Utils/showAdsBeforeGame";
import convertSecondsToHours from "Utils/TimeConversion";
import OverTimeModeChecker from "Utils/OverTimeModeChecker";
import getToken from "Utils/GetToken";

const Leaderboard = ({
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
    const { extraEarning, currentGameInfo } = useSelector(
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
    const [modalStatus, setModalStatus] = useState({
        isGameReady: false,
        isQuitGameBtnDisabled: false,
        isQuitGameConfirm: false,
        isTournamentEnded: false,
        isEarnAdditionalWinModalShown: false,
        isEarnAdditionalInfoShown: false,
    });

    let watcherRef = useRef(null);
    let leaderBoardBackgroundRef = useRef(null);
    let leaderBoardGameInfoRef = useRef(null);
    let leaderboardRef = useRef(null);
    let readyTournamentButtonRef = useRef(null);

    let rankLength = _.maxBy(leaderRuleRanks, "rankTo")?.rankTo;

    // SORTING LEADERBOARD
    useEffect(() => {
        setLeaderboardList(leaderboard);

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
    }, [leaderboard, setEarnAdditionalDisabledStatus]);

    // LEADERBOARD RANK & ADDITIONAL TICKETS RULES
    useEffect(() => {
        if (currentGameDetails?.gameId > 0)
            dispatch(loadLeaderboardRanks(currentGameDetails.gameId));
    }, [currentGameDetails.gameId, dispatch]);

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
                // GET SCORES
                score = destination?.getScore?.();
                if (score > -1 && currentGameInfo.playerEnterGameId) {
                    localStorage.setItem("currentGameScore", score);

                    // END BY TIMER
                    destination?.endGameByTimer?.();
                    dispatch(loadPlayerLeaveTournamentId(score));
                }
            }

            setEarnAdditionalDisabledStatus({
                gems: false,
                ads: false,
            });

            setModalStatus((prev) => ({ ...prev, isTournamentEnded: true }));

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
    ]);

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

        const token = getToken();

        setModalStatus((prev) => ({
            ...prev,
            isEarnAdditionalInfoShown: false,
        }));

        if (currentGameDetails.gameId > 0) {
            try {
                let url = `${process.env.REACT_APP_GLOADER_ENDPOINT}/sloader?game_id=${currentGameDetails.gameId}&user_id=${user.id}`;
                let options = {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
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
                currentGameDetails?.gameId,
                isAdWatched,
                isGemUsed
            )
        );
    };

    const handleQuitGame = () => {
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
                loadCurrentUserRank(
                    data?.prizeId.toString(),
                    currentGameDetails?.gameId
                )
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
                                src={`${window.cdn}icons/icon_profile.svg`}
                                alt="player"
                            />
                        </div>

                        <div className="px-2 ml-3">
                            <p className="player-name">-</p>
                            <p className="points">0 pts</p>
                        </div>
                        <div className="tickets ml-auto d-flex align-items-center justify-content-center">
                            <span>{getRankTickets(x)} tickets</span>
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
                            <span>{getRankTickets(i)} tickets</span>
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
                        width="36"
                        onClick={handleQuitGame}
                        src={`${window.cdn}buttons/button_close.png`}
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
                                bg="#FF007C"
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
            <section
                id="game-leaderboard-screen"
                onClick={(e) => {
                    if (
                        !e.target.closest(".bottom-ready-tournament") &&
                        !e.target.closest(".earn-additional-tickets-container")
                    ) {
                        setModalStatus((prev) => ({
                            ...prev,
                            isEarnAdditionalInfoShown: false,
                        }));
                    }
                }}
            >
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-10 col-lg-8 col-xl-7">
                            {/* BACK BUTTON */}
                            <div
                                className="d-flex align-items-center back-button mb-3 mb-md-4"
                                onClick={handleBackButton}
                            >
                                <img
                                    src={`${window.cdn}buttons/button_back.png`}
                                    alt="back-btn"
                                />
                                <span className="ml-2">Back</span>
                            </div>
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
                                                        tickets
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                </div>

                                {/* READY TOURNAMENT BUTTON */}
                                {!modalStatus.isEarnAdditionalInfoShown && (
                                    <div
                                        className="bottom-ready-tournament d-flex align-items-center justify-content-center"
                                        ref={readyTournamentButtonRef}
                                    >
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
                                    <div className="earn-additional-tickets-container d-flex flex-column align-items-center justify-content-center">
                                        <EarnAdditionalTickets
                                            gameId={currentGameDetails.gameId}
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
                                            className={`play-button-container d-flex justify-content-center ${
                                                timer !== "Ended" ||
                                                timer !== "0d 0h 0m 0s"
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
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
};

export default Leaderboard;
