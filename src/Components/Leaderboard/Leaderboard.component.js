// REACT, REDUX & 3RD PARTY LIBRARIES
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isMobile } from "react-device-detect";
import axios from "axios";
import _ from "lodash";

// COMPONENTS
import LeaderRankIndicator from "Components/Global/LeaderRankIndicator.component";
import GenericLoader from "Components/Loader/Generic.loader";
import GameQuitModal from "Components/Modals/GameQuit.modal";
import GameEndModal from "Components/Modals/GameEnd.modal";
import EarnAdditionalBenefitModal from "Components/Modals/EarnAdditionalBenefit.modal";
import RetrySubmitModal from "Components/Modals/RetrySubmit.modal";
import PauseMenuModal from "Components/Modals/PauseMenuModal";

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
import {
    convertSecondsToHours,
    convertSecondsForCalculation,
} from "Utils/TimeConversion";
import OverTimeModeChecker from "Utils/OverTimeModeChecker";
import { getToken } from "Utils/GetToken";
import { isScrolledIntoView } from "Utils/ScrollHelper";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { PLAYER_LOG_RESET } from "redux/types";
import { BUFFER_END_TIME } from "Utils/TournamentEndTime";
import { Trans, useTranslation } from "react-i18next";
import { useTime } from "Utils/hooks/useTime";

const Leaderboard = ({
    data,
    // handleBackButton,
    // setIsGameLeaderboardShown,
    timer,
    setTimer,
    earnAdditionalDisabledStatus,
    setEarnAdditionalDisabledStatus,
    setIsInstructionShown,
}) => {
    const LOAD_ERROR_CODES = {
        BROKEN_LINK: 12, //Asset Failed to Load because not found due to incorrect link (defined by phaser)
        LOG_G_ENTER_FAIL: 1,
    };
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.userData);
    const { poolTickets } = useSelector((state) => state.playerTickets);
    const { leaderRuleRanks } = useSelector((state) => state.leaderboardRanks);
    const { leaderboard } = useSelector((state) => state.leaderboard);
    const { currentGameRules } = useSelector((state) => state.prizes);
    const [currentGameBoosterInfo, setCurrentGameBoosterInfo] = useState({
        isUseBooster: false,
        score_needed_per_extra_tickets: 0,
        extraTickets: 0,
    });

    const { currentGameInfo } = useSelector(
        (state) => state.playerTournamentInfo
    );
    // const { currentUserRank } = useSelector((state) => state.currentUserRank);
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
        isSubmitScoreFailed: false,
        isSubmittingScore: false,
    });
    const [scoreObject, setScoreObject] = useState({});
    const [isSubscriptionModalShown, setIsSubscriptionModalShown] =
        useState(false);
    const [yourRankData, setYourRankData] = useState({ visible: false });

    const { executeRecaptcha } = useGoogleReCaptcha();

    let watcherRef = useRef(null);
    let yourRankEleRef = useRef(null);

    let rankLength = _.maxBy(leaderRuleRanks, "rankTo")?.rankTo;

    let onClickSubscriptionCancel = () => setIsSubscriptionModalShown(false);
    const [isMute, setIsMute] = useState(window.localStorage.getItem("mute"));
    const [loadErrorDetails, setLoadErrorDetails] = useState({
        title: "",
        message_1: "",
        message_2: "",
        error_code: "",
        close_button_text: "",
        ok_button_text: "",
        okButtonHandling: "",
        closeButtonHandling: "",
    });

    const [isDisableButton, setIsDisableButton] = useState(false);

    const { t } = useTranslation();

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
        setLeaderboardList([]);
        setYourRankData((prev) => ({ ...prev, visible: false }));

        if (currentGameDetails?.gameId > 0) {
            dispatch(loadLeaderboardRanks(currentGameDetails?.gameId));
            dispatch(loadCurrentGameRules(currentGameDetails?.gameId));
        }
    }, [currentGameDetails, dispatch]);

    // SORTING LEADERBOARD
    useEffect(() => {
        const rankIndex = leaderboard.findIndex(
            (data) => data.userId > 0 && data.userId === user.id
        );
        if (rankIndex >= 0) {
            setYourRankData((prev) => ({
                ...prev,
                ...leaderboard[rankIndex],
                rank: rankIndex + 1,
            }));
        } else {
            setYourRankData((prev) => ({
                ...prev,
                rank: "-",
            }));
        }

        setLeaderboardList(leaderboard);
    }, [leaderboard, user]);

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
                data?.gameInfo?.length > 0
                    ? data?.gameInfo[0]?.endTimeStamp * 1000
                    : 0,
                config.offsetTimestamp ? config.offsetTimestamp : 0
            );

            setTimer(finalTimeRef);

            if (
                convertSecondsForCalculation(
                    data?.gameInfo?.length > 0
                        ? data?.gameInfo[0]?.endTimeStamp * 1000
                        : 0,
                    config.offsetTimestamp ? config.offsetTimestamp : 0
                ) <= BUFFER_END_TIME
            ) {
                setIsDisableButton(true);
            } else {
                setIsDisableButton(false);
            }

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
        if (timer === "Calculating" || timer === "Ended" || isDisableButton) {
            isDisabled = true;
        } else {
            isDisabled = false;
        }
        setIsGameAvailable(!isDisabled);
    }, [timer, isDisableButton]);

    const onLeaderboardScrolling = (evt) => {
        let isInsideElement = false;
        if (yourRankEleRef.current) {
            isInsideElement = isScrolledIntoView(
                evt.target,
                yourRankEleRef.current
            );
        }

        setYourRankData((prev) => ({
            ...prev,
            visible: parseInt(prev.rank) > 0 && !isInsideElement,
        }));
    };

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

    window.sendLogGEnter = async () => {
        let _earnAdditional = [...earnAdditionalBenefitStatus];

        let index = _earnAdditional.findIndex(
            (e) => e.prizeId === data?.prizeId
        );

        if (!executeRecaptcha) {
            console.log("Execute recaptcha not yet available");
            return;
        }

        const recaptchaToken = await executeRecaptcha("playGame");

        let isAdWatched =
            index > -1 ? _earnAdditional[index]?.isAdsSelected : false;
        let isGemUsed =
            index > -1 ? _earnAdditional[index]?.isGemsSelected : false;

        return await dispatch(
            loadPlayerEnterTournamentId(
                data?.prizeId,
                currentGameDetails?.gameId,
                isAdWatched,
                isGemUsed,
                recaptchaToken
            )
        )
            .then(() => true)
            .catch((err) => {
                window.showLoadErrorPopUp(LOAD_ERROR_CODES.LOG_G_ENTER_FAIL);
                return false;
                // setIsSubscriptionModalShown(true);
            });
    };

    const handleOnClickPlayButton = async () => {
        setModalStatus((prev) => ({
            ...prev,
            isGamePaused: false,
            isPlayBtnDisabled: true,
        }));

        // TODO
        let _earnAdditional = [...earnAdditionalBenefitStatus];
        let index = _earnAdditional.findIndex(
            (e) => e.prizeId === data?.prizeId
        );

        let isGemUsed =
            index > -1 ? _earnAdditional[index]?.isGemsSelected : false;

        const token = getToken();

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
                            gameDuration: 180, //in seconds
                            tournamentEndTime:
                                data?.gameInfo[0]?.endTimeStamp -
                                BUFFER_END_TIME,
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

        setModalStatus((prev) => ({
            ...prev,
            isGameReady: true,
            isEarnAdditionalInfoShown: false,
        }));

        setEarnAdditionalDisabledStatus({
            gems: false,
            ads: false,
        });

        setCurrentGameBoosterInfo(() => ({
            isUseBooster: isGemUsed,
            extraTickets: currentGameRules.useGemTickets,
            score_needed_per_extra_tickets: currentGameRules.score,
        }));
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
        if (modalStatus.isQuitGameConfirm) return;
        if (modalStatus.isGameOver) return;

        setModalStatus((prev) => ({
            ...prev,
            isGamePaused: true,
        }));
    };

    const handleQuitGameAction = (choice) => {
        if (choice === "yes")
            setModalStatus((prev) => ({
                ...prev,
                isGameReady: false,
                isQuitGameConfirm: false,
                isPlayBtnDisabled: false,
            }));
        else if (choice === "no") {
            resumeGame();
        }
    };

    const resumeGame = () => {
        setModalStatus((prev) => ({
            ...prev,
            isQuitGameConfirm: false,
            isGamePaused: false,
        }));
        let destination = document.getElementById("destination")?.contentWindow;
        destination?.resumeGame?.();
        destination.focus();
    };

    window.showGameIframe = () => {
        setModalStatus((prev) => ({
            ...prev,
            isShowIframe: true,
        }));
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

    window.showLoadErrorPopUp = (error_code) => {
        switch (error_code) {
            case LOAD_ERROR_CODES.BROKEN_LINK:
                setLoadErrorDetails(() => ({
                    title: t("error.broken_link.title"),
                    message_1: t("error.broken_link.message_1"),
                    message_2: t("error.broken_link.message_2"),
                    error_code: t("error.broken_link.error_code", {
                        prizeId: data?.prizeId,
                        gameId: currentGameDetails?.gameId,
                    }),
                    ok_button_text: t("error.broken_link.ok_button_text"),
                    okButtonHandling: "closeGame",
                    close_button_text: t("error.broken_link.close_button_text"),
                    closeButtonHandling: "",
                }));
                break;
            case LOAD_ERROR_CODES.LOG_G_ENTER_FAIL:
                setLoadErrorDetails(() => ({
                    title: t("error.log_g_enter_fail.title"),
                    message_1: t("error.log_g_enter_fail.message_1"),
                    message_2: t("error.log_g_enter_fail.message_2"),
                    error_code: t("error.log_g_enter_fail.error_code", {
                        prizeId: data?.prizeId,
                        gameId: currentGameDetails?.gameId,
                    }),
                    ok_button_text: t("error.log_g_enter_fail.ok_button_text"),
                    okButtonHandling: "resendLogGEnter",
                    close_button_text: t(
                        "error.log_g_enter_fail.close_button_text"
                    ),
                    closeButtonHandling: "closeGame",
                }));
                break;
            default: //Asset Failed to Load due to internet connection
                setLoadErrorDetails(() => ({
                    title: t("error.internet_error.title"),
                    message_1: t("error.internet_error.message_1"),
                    message_2: t("error.internet_error.message_2"),
                    error_code: t("error.internet_error.error_code", {
                        prizeId: data?.prizeId,
                        gameId: currentGameDetails?.gameId,
                    }),
                    ok_button_text: t("error.internet_error.ok_button_text"),
                    okButtonHandling: "reloadGame",
                    close_button_text: t(
                        "error.internet_error.close_button_text"
                    ),
                    closeButtonHandling: "closeGame",
                }));
        }

        setModalStatus((prev) => ({
            ...prev,
            isLoadGameFailed: true,
        }));
    };

    /**
     * Whenever a game is finished should call this function to submiting the score object
     * @param {
            a: this.currentScore, // score
            b: [scoreObject], // scoreObject { d: data, f: frame, s: score }
            c: this.gameStartTime, // gameStartTime
            d: this.gameOverTime, // gameOverTime
            e: seedObject, // { start: [seed], end: [seed] }
     * @returns 
     */
    window.playerFinishGame = async (score) => {
        setScoreObject(score);

        await submitScore(score);
    };

    const reloadGame = () => {
        setModalStatus((prev) => ({
            ...prev,
            isLoadGameFailed: false,
        }));
        document.getElementById("destination")?.contentWindow?.reloadAssets?.();
    };

    const resendLogGEnter = () => {
        setModalStatus((prev) => ({
            ...prev,
            isLoadGameFailed: false,
        }));
        document
            .getElementById("destination")
            ?.contentWindow?.trySendLogGEnter?.();
    };

    const closeGame = () => {
        setModalStatus((prev) => ({
            ...prev,
            isGameReady: false,
            isQuitGameBtnDisabled: false,
            isGameOver: false,
            isPlayBtnDisabled: false,
            isQuitGameConfirm: false,
            isGamePaused: false,
            isSubmitScoreFailed: false,
            isSubmittingScore: false,
            isTournamentEnded: false,
            isLoadGameFailed: false,
        }));

        dispatch({ type: PLAYER_LOG_RESET });
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

    const submitScore = async (score) => {
        try {
            setModalStatus((prev) => ({
                ...prev,
                isSubmittingScore: true,
            }));

            if (!executeRecaptcha) {
                console.log("Execute recaptcha not yet available");
                return;
            }

            const recaptchaToken = await executeRecaptcha("finishGame");

            if (currentGameInfo.playerEnterGameId) {
                await dispatch(
                    loadPlayerLeaveTournamentId(score, recaptchaToken)
                ).catch((e) => {
                    throw e;
                });

                dispatch(
                    loadCurrentUserRank(
                        data?.prizeId.toString(),
                        currentGameDetails?.gameId
                    )
                );
            }

            // CALL USER & LEADERBOARD API & DISPLAY GAME OVER PANEL AFTER 1 SECOND DELAY
            setTimeout(() => {
                setModalStatus((prev) => ({
                    ...prev,
                    isQuitGameBtnDisabled: true,
                    isGameOver: true,
                    isPlayBtnDisabled: false,
                    isQuitGameConfirm: false,
                    isGamePaused: false,
                    isSubmitScoreFailed: false,
                    isSubmittingScore: false,
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
        } catch (e) {
            setModalStatus((prev) => ({
                ...prev,
                isQuitGameBtnDisabled: true,
                isGamePaused: false,
                isSubmitScoreFailed: true,
                isSubmittingScore: false,
            }));
        }
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
                            {/* PROFILE IMG */}
                            <div className="profile-img d-inline-flex ml-3">
                                <span>
                                    <img
                                        className="img-holder"
                                        onError={(e) => defaultUserImage(e)}
                                        src={`${window.cdn}icons/icon_profile.svg`}
                                        alt="avatar"
                                    />
                                </span>
                            </div>
                        </div>

                        <div className="px-2 ml-3">
                            <p className="player-name">
                                {t("leaderboard.placeholder.player_name")}
                            </p>
                            <p className="points">
                                {t("leaderboard.placeholder.points")}
                            </p>
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
                        ref={
                            isCurrentUser(leaderboardList[i]?.userId)
                                ? yourRankEleRef
                                : null
                        }
                    >
                        <div className="number-holder">
                            <LeaderRankIndicator index={i} type="lb" />
                        </div>

                        <div className="user-avatar">
                            {/* PROFILE IMG */}
                            <div
                                className={`profile-img d-inline-flex ml-3 ${
                                    leaderboardList[i]?.isVip ? "is-vip" : ""
                                }`}
                            >
                                <span>
                                    <img
                                        className="img-holder"
                                        onError={(e) => defaultUserImage(e)}
                                        src={
                                            leaderboardList[i]?.avatarUrl ||
                                            `${window.cdn}icons/icon_profile.svg`
                                        }
                                        alt="avatar"
                                    />
                                </span>
                                <span className="img-frame">
                                    {leaderboardList[i]?.isVip && (
                                        <img
                                            className="vip-frame"
                                            src={`${window.cdn}icons/icon_vip_frame_01.png`}
                                            alt="vip-frame"
                                        />
                                    )}
                                </span>
                            </div>
                        </div>

                        <div className="px-2 ml-3">
                            <p className="player-name">
                                {leaderboardList[i]?.userId
                                    ? isCurrentUser(leaderboardList[i]?.userId)
                                        ? t("leaderboard.default.player_name", {
                                              user:
                                                  leaderboardList[i]
                                                      ?.nickName ||
                                                  user.username ||
                                                  "Player",
                                          })
                                        : leaderboardList[i]?.nickName
                                    : t("leaderboard.placeholder.player_name")}
                            </p>
                            <p className="points">
                                {t("leaderboard.default.points", {
                                    count:
                                        leaderboardList[i]?.gameScore >= 0
                                            ? leaderboardList[i]?.gameScore
                                            : "0",
                                })}
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

    return (
        <>
            <section
                id="game-leaderboard-screen"
                className="col-12 col-md-8 px-0 py-2 px-md-auto py-md-0"
            >
                {/* TORUNAMENT INFO */}
                <div className="tournament-info-wrapper col-12 p-0">
                    <div className="d-flex flex-row">
                        <span className="tournament-title">
                            {t("tournament.title")}
                        </span>
                        <img
                            width={20}
                            src={`${window.cdn}buttons/button_question_01.png`}
                            className="question-mark-img ml-auto"
                            alt="question-mark"
                            onClick={() => setIsInstructionShown(true)}
                        />
                    </div>
                    <p className="tournament-subtitle mt-2 mb-3">
                        {t("tournament.subtitle")}
                    </p>
                </div>

                {/* LEADERBOARD */}
                <div className="tournament-leaderboard">
                    <div className="d-flex flex-column p-0 h-100">
                        <div className="leaderboard-game-info d-flex">
                            <img
                                className="game-icon"
                                src={currentGameDetails?.gameIcon}
                                alt={currentGameDetails?.gameIcon}
                            />
                            <div className="game-details w-100 p-3">
                                <p className="game-name">
                                    {currentGameDetails?.gameTitle}
                                </p>
                                <div className="d-flex align-items-center justify-content-between">
                                    <p className="tournament-end-text mb-0">
                                        {t("tournament.ends_in")}
                                    </p>
                                    <p
                                        className={`mb-0 text-right ${
                                            OverTimeModeChecker(
                                                data?.prizeId,
                                                data?.ticketsRequired,
                                                prizeTicketCollection
                                            )
                                                ? "overtime-text"
                                                : "timer-text"
                                        }`}
                                    >
                                        {useTime(timer)}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div
                            className="leaderboard"
                            onScroll={onLeaderboardScrolling}
                        >
                            {leaderboardList.length > 0
                                ? getLeaderboardList()
                                : getEmptyLeaderboardList()}
                        </div>
                    </div>

                    {/* PLAYER-SELF RANK (SHOWING WHEN PLAYER RANK IS NOT VISIBLE IN VIEWPORT) */}
                    {yourRankData.visible && (
                        <div className="leaderboard-user-wrapper">
                            <div className="leader-player-card d-flex align-items-center leader-curr-player-card">
                                <div className="number-holder">
                                    <LeaderRankIndicator
                                        index={yourRankData.rank}
                                        type="current"
                                    />
                                </div>
                                <div className="user-avatar">
                                    {/* PROFILE IMG */}
                                    <div
                                        className={`profile-img d-inline-flex ml-3 ${
                                            yourRankData.isVip ? "is-vip" : ""
                                        }`}
                                    >
                                        <span>
                                            <img
                                                className="img-holder"
                                                onError={(e) =>
                                                    defaultUserImage(e)
                                                }
                                                src={
                                                    yourRankData.avatarUrl ||
                                                    `${window.cdn}icons/icon_profile.svg`
                                                }
                                                alt="avatar"
                                            />
                                        </span>
                                        <span className="img-frame">
                                            {yourRankData.isVip && (
                                                <img
                                                    className="vip-frame"
                                                    src={`${window.cdn}icons/icon_vip_frame_01.png`}
                                                    alt="vip-frame"
                                                />
                                            )}
                                        </span>
                                    </div>
                                </div>

                                <div className="px-2 ml-3">
                                    <p className="player-name">
                                        {t("leaderboard.default.player_name", {
                                            user: yourRankData.nickName,
                                        })}
                                    </p>
                                    <p className="points">
                                        {t("leaderboard.default.points", {
                                            count: yourRankData.gameScore,
                                        })}
                                    </p>
                                </div>
                                <div className="tickets ml-auto d-flex align-items-center justify-content-center">
                                    <span>
                                        {getRankTickets(
                                            yourRankData.rank - 1
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
                    )}
                </div>

                {/* READY TOURNAMENT BUTTON */}
                <div
                    className={`bottom-ready-tournament d-block ${
                        isMobile ? "mobile" : ""
                    }`}
                >
                    <button
                        className={`ready-tournament-button ${
                            isGameAvailable && !modalStatus.isPlayBtnDisabled
                                ? ""
                                : "opacity-0-5"
                        }`}
                        onClick={
                            isGameAvailable && !modalStatus.isPlayBtnDisabled
                                ? () => {
                                      setModalStatus((prev) => ({
                                          ...prev,
                                          isEarnAdditionalInfoShown: true,
                                          isShowIframe: false,
                                      }));
                                  }
                                : null
                        }
                    >
                        {t("tournament.join")}
                        {/* <img
                            width={18}
                            className="icon ml-3 mr-1"
                            src={`${window.cdn}assets/gem_01.png`}
                            alt="gems"
                        />
                        {data?.gemsNeeded} */}
                    </button>
                </div>

                {/* RECAPTCHA MESSAGES */}
                <p className="abuse-text my-1 my-md-auto">
                    {t("leaderboard.warning.title")}
                </p>

                {/* RECAPTCHA MESSAGES */}

                <p className="recaptcha-text my-1 my-md-auto">
                    <Trans i18nKey={"leaderboard.warning.subtitle"}>
                        0<a href="https://policies.google.com/privacy">1</a>2
                        <a href="https://policies.google.com/terms">3</a>4
                    </Trans>
                </p>

                {isSubscriptionModalShown && (
                    <InsufficientBalanceModalPopup
                        onCloseClicked={onClickSubscriptionCancel}
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
                        isPlayBtnDisabled={
                            !isGameAvailable || modalStatus.isPlayBtnDisabled
                        }
                        isLoadingGame={
                            !modalStatus.isGameReady &&
                            modalStatus.isPlayBtnDisabled
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
            </section>

            {modalStatus.isGameReady && (
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
                            score={scoreObject.a}
                        />
                    )}
                    {/* MODAL FOR GAME OVER */}
                    {modalStatus.isGameOver && (
                        <GameEndModal
                            score={scoreObject.a}
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
                                resumeGame();
                                // setIsGameLeaderboardShown(false);
                            }}
                            handleQuitButton={() => {
                                setModalStatus((prev) => ({
                                    ...prev,
                                    isGamePaused: false,
                                    isQuitGameConfirm: true,
                                }));
                            }}
                            handleAudioButton={() => {
                                isMute === "true"
                                    ? setIsMute("false")
                                    : setIsMute("true");

                                let destination =
                                    document.getElementById(
                                        "destination"
                                    )?.contentWindow;
                                destination?.toggleAudioOnOff?.();
                            }}
                            isMute={isMute}
                        />
                    )}

                    {/* MODAL FOR PENDING SUBMIT SCORE */}
                    {modalStatus.isSubmitScoreFailed && (
                        <RetrySubmitModal
                            close_button_text={t("tournament.score.fail.close")}
                            handleClose={closeGame}
                            ok_button_text={t("tournament.score.fail.retry")}
                            handleOk={() => {
                                submitScore(scoreObject);
                            }}
                            disableRetry={modalStatus.isSubmittingScore}
                            title={t("tournament.score.fail.title")}
                            subtitle={
                                <>
                                    {t("tournament.score.fail.subtitle.1")}
                                    <br />
                                    <br />
                                    {t("tournament.score.fail.subtitle.2")}
                                </>
                            }
                        />
                    )}

                    {/* MODAL FOR RELOADING GAME IF LOAD FAIL */}
                    {modalStatus.isLoadGameFailed && (
                        <RetrySubmitModal
                            ok_button_text={loadErrorDetails.ok_button_text}
                            handleOk={() => {
                                switch (loadErrorDetails.okButtonHandling) {
                                    case "reloadGame":
                                        reloadGame();
                                        break;
                                    case "resendLogGEnter":
                                        resendLogGEnter();
                                        break;
                                    case "closeGame":
                                    default:
                                        closeGame();
                                        break;
                                }
                            }}
                            close_button_text={
                                loadErrorDetails.close_button_text
                            }
                            handleClose={
                                loadErrorDetails.closeButtonHandling ===
                                "closeGame"
                                    ? closeGame
                                    : null
                            }
                            disableRetry={false}
                            title={loadErrorDetails.title}
                            subtitle={
                                <>
                                    {loadErrorDetails.message_1}
                                    <br />
                                    {`(Code: ${loadErrorDetails.error_code})`}
                                    <br />
                                    <br /> {loadErrorDetails.message_2}
                                </>
                            }
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
                        <GameQuitModal
                            onActionCallback={handleQuitGameAction}
                        />
                    )}
                    {/* GAME IFRAME */}
                    {gameData !== null && (
                        <>
                            <div className="game-loading">
                                <p className="mb-2 text-center loading-text">
                                    {t("tournament.loading.title")}
                                </p>
                                <GenericLoader
                                    height="30"
                                    bg="#FF007C"
                                    cx1={
                                        window.innerWidth > 1200 ? "48%" : "46%"
                                    }
                                    cx2="50%"
                                    cx3={
                                        window.innerWidth > 1200 ? "52%" : "54%"
                                    }
                                    cy="15"
                                />
                                <button
                                    className="loading-quit-btn d-block text-center mx-auto mt-4 py-3"
                                    onClick={handleQuitGame}
                                >
                                    {t("tournament.loading.close_button")}
                                </button>
                            </div>
                            <iframe
                                className={
                                    modalStatus.isShowIframe
                                        ? "shown-iframe"
                                        : "hidden-iframe"
                                }
                                title="game"
                                id="destination"
                                srcDoc={gameData}
                                frameBorder="0"
                            />
                        </>
                    )}
                </div>
            )}
        </>
    );
};

export default Leaderboard;
