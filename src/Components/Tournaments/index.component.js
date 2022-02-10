// REACT, REDUX & 3RD PARTY LIBRARIES
import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// COMPONENTS
import FortuneWheel from "Components/Tournaments/FortuneWheel/FortuneWheel.component";
import Leaderboard from "Components/Leaderboard/Leaderboard.component";
import GameDuration from "Components/Tournaments/GameDuration/GameDuration.component";
import AutomatedEntryTournamentInfo from "Components/Tournaments/AutomatedEntryTournamentInfo/AutomatedEntryTournamentInfo.component";
import SubscriptionModal from "Components/Modals/Subscription.modal";
import GameInstructionsModal from "Components/Modals/GameInstructions.modal";

// REDUX THUNKS TO CALL SERVICES (AYSNC) AND ADD DATA TO STORE
import loadPrizes from "redux/thunks/Prizes.thunk";
import loadPlayerTickets from "redux/thunks/PlayerTickets.thunk";
import loadPrizePoolTickets from "redux/thunks/PrizePoolTickets.thunk";
import loadLeaderboard from "redux/thunks/Leaderboard.thunk";
import loadCurrentUserRank from "redux/thunks/CurrentUserRank.thunk";
import loadAvailableSpins from "redux/thunks/AvailableSpins.thunk";

// HELPER FUNCTION
import { scrollToTop } from "Utils/ScrollToTop";
import { PRIZE_TYPE } from "Utils/Enums";
import getPrizeTicketCollected from "Utils/PrizeTicketCollected";
import getPoolTickets from "Utils/PoolTickets";
import getPrizeProgress from "Utils/PrizeProgress";
import OverTimeModeChecker from "Utils/OverTimeModeChecker";

const Index = ({ match }) => {
    const {
        params: { id, type },
    } = match;

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.userData);
    const { prizes } = useSelector((state) => state.prizes);
    const { spinner } = useSelector((state) => state.playerSpinnerInfo);
    const { poolTickets } = useSelector((state) => state.playerTickets);
    const { currentUserRank } = useSelector((state) => state.currentUserRank);
    const { prizeTicketCollection } = useSelector(
        (state) => state.prizePoolTickets
    );
    const { earnAdditionalBenefitStatus } = useSelector(
        (state) => state.earnAdditional
    );
    const { currentGameInfo } = useSelector(
        (state) => state.playerTournamentInfo
    );

    const history = useHistory();

    // PRIZES STATES
    const [currentPrize, setCurrentPrize] = useState({});
    // GAME STATES
    const [gameInfo, setGameInfo] = useState({
        gameId: 0,
        gameIndex: 0,
        gameTitle: "",
        endTimeStamp: 0,
    });
    // DIFFERENT COMPONENT UI STATES
    const [isIntructionShown, setIsInstructionShown] = useState(false);
    const [isGameLeaderboardShown, setIsGameLeaderboardShown] = useState(false);
    const [isSubscriptionModalShown, setIsSubscriptionModalShown] =
        useState(false);
    const [fortuneWheelShown, setFortuneWheelShown] = useState(false);
    // EARN ADDITIONAL SELECTION STATES
    const [earnAdditionalDisabledStatus, setEarnAdditionalDisabledStatus] =
        useState({
            gems: checkIsAdOrGemsUsed("gems"),
            ads: checkIsAdOrGemsUsed("ads"),
        });
    const [, setIsTicketsUpdated] = useState(false);
    const [timer, setTimer] = useState("calculating");

    const spinnerFixedButtonRef = useRef(null);

    // BLUR BACKGROUND FOR NAVBAR & SCROLL TO TOP
    useEffect(() => {
        const overlay = document.querySelector(".blur-overlay");
        overlay?.setAttribute("style", `min-height: 145px`);
        return () => {
            overlay?.removeAttribute("style");
        };
    }, [isGameLeaderboardShown]);

    // SCROLL POSITION FOR SPINNER FIXED BUTTON
    useEffect(() => {
        window.addEventListener("scroll", handleScroll, false);

        function handleScroll() {
            const doc = document.documentElement;
            const top =
                (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
            const maxScrollHeight = doc.scrollHeight - window.innerHeight;
            if (
                spinnerFixedButtonRef.current &&
                type !== "automated" &&
                window.innerWidth <= 480 &&
                top > 0 &&
                top >= Math.ceil(maxScrollHeight / 2)
            ) {
                spinnerFixedButtonRef.current.style.bottom = "2em";
                spinnerFixedButtonRef.current.style.right = "30%";
                spinnerFixedButtonRef.current.childNodes[1].style.opacity = "1";
                spinnerFixedButtonRef.current.childNodes[1].style.visibility =
                    "visible";
            } else {
                if (
                    window.innerWidth <= 480 &&
                    type !== "automated" &&
                    spinnerFixedButtonRef.current
                ) {
                    spinnerFixedButtonRef.current?.removeAttribute("style");
                    spinnerFixedButtonRef.current.childNodes[1].removeAttribute(
                        "style"
                    );
                }
            }
        }
        handleScroll();

        return () => {
            spinnerFixedButtonRef.current = null;
            window.removeEventListener("scroll", handleScroll, false);
        };
    }, [type]);

    // LOAD PRIZES WHEN TIMER END WITH 2S DELAY
    useEffect(() => {
        if (timer === "Ended" || timer === "0d 0h 0m 0s") {
            setTimeout(() => {
                dispatch(loadPrizes());
            }, 2000);
        }
    }, [timer, dispatch]);

    // LOAD AVAILABLE SPINS
    useEffect(() => {
        if (user.id > 0 && spinner.freeSpins <= 0)
            dispatch(loadAvailableSpins());
    }, [dispatch, user.id, spinner.freeSpins]);

    // SET CURRENT PRIZE
    useEffect(() => {
        let prizeType = prizes[PRIZE_TYPE[type]] || [];
        let idx = prizeType?.findIndex((e) => e.prizeId === parseInt(id));
        let gameEndTime =
            type !== "automated"
                ? prizeType[idx]?.gameInfo?.[0]?.endTimeStamp * 1000
                : prizeType[idx]?.scheduledOff * 1000;

        if (prizeType.length > 0 && Date.now() < (gameEndTime || 0)) {
            // console.log("GOT THE PRIZE WITH TIMER:", prizeType[idx]);
            if (idx > -1) setCurrentPrize(prizeType[idx]);
        } else dispatch(loadPrizes());
    }, [prizes, id, type, dispatch]);

    // GET TICKETS
    useEffect(() => {
        let timeOut;
        if (
            performance.getEntriesByType("navigation")[0] &&
            performance.getEntriesByType("navigation")[0].type === "reload"
        ) {
            timeOut = setTimeout(async () => {
                // PLAYER TICKETS
                dispatch(loadPlayerTickets(parseInt(id), true));
                // PRIZE TOTAL TICKETS
                dispatch(
                    loadPrizePoolTickets(
                        parseInt(id),
                        true,
                        currentPrize?.ticketsRequired
                    )
                );
            }, 2000);
        }
        return () => clearTimeout(timeOut);
    }, [dispatch, id, currentPrize?.ticketsRequired]);

    function checkIsAdOrGemsUsed(type) {
        if (earnAdditionalBenefitStatus.length === 0) return false;

        if (type === "ads")
            return earnAdditionalBenefitStatus.find(
                (e) => e.prizeId === parseInt(id)
            )?.isAdsSelected;
        else if (type === "gems")
            return earnAdditionalBenefitStatus.find(
                (e) => e.prizeId === parseInt(id)
            )?.isGemsSelected;
    }
    // INSTRUCTION POPUP MODAL
    const handleInstructionPanel = () => setIsInstructionShown(true);

    // 3RD TIER DATA LOADING
    const handleGameLeaderPanel = (
        gameId,
        gameIndex,
        gameTitle,
        gameIcon,
        endTimeStamp
    ) => {
        dispatch(loadLeaderboard(parseInt(id), gameId));
        // TODO
        Object.assign(currentGameInfo, {
            prizeId: id,
            gameId: gameId,
        });
        loadCurrentUserRank(user, id, gameId, currentUserRank, dispatch);

        setGameInfo({ gameId, gameIndex, gameTitle, gameIcon, endTimeStamp });
        setIsGameLeaderboardShown(true);
    };

    // BACK BUTTONS
    const onClickInstructionBackButton = () => setIsInstructionShown(false);
    const onClickGameLeaderBackButton = () => {
        scrollToTop();
        setIsGameLeaderboardShown(false);
    };

    // PAYMENT
    const onClickSubscriptionCancel = () => setIsSubscriptionModalShown(false);

    const handleHomeNavLink = () => {
        scrollToTop();
        loadPrizes(dispatch);
    };

    if (isGameLeaderboardShown) {
        return (
            <Leaderboard
                gameInfo={gameInfo}
                data={currentPrize}
                handleBackButton={onClickGameLeaderBackButton}
                setIsGameLeaderboardShown={setIsGameLeaderboardShown}
                timer={timer}
                setTimer={setTimer}
                earnAdditionalDisabledStatus={earnAdditionalDisabledStatus}
                setEarnAdditionalDisabledStatus={
                    setEarnAdditionalDisabledStatus
                }
            />
        );
    } else {
        return (
            <>
                {type !== "automated" && (
                    <>
                        <div className="nav-top-back-btn-wrapper d-flex align-items-center justify-content-center mx-auto">
                            <div className="d-flex col-12 col-md-10 col-lg-8 col-xl-8 justify-content-between">
                                {/* BACK BUTTON */}
                                <Link
                                    className="d-flex align-items-center justify-content-center"
                                    onClick={handleHomeNavLink}
                                    to={{
                                        pathname: "/",
                                        state: {
                                            prevPath: history.location.pathname,
                                        },
                                    }}
                                >
                                    <img
                                        className="back-button"
                                        width="42"
                                        src={`${window.cdn}art_assets/buttons/button_back.png`}
                                        alt="back-btn"
                                    />
                                </Link>
                                {/* YOUR TICKETS */}
                                <div className="ticket-values px-3">
                                    <p className="mb-0">
                                        You have{" "}
                                        <span className="mx-2">
                                            {getPoolTickets(
                                                poolTickets,
                                                id
                                            )?.toLocaleString() || 0}
                                        </span>
                                        <img
                                            width="24"
                                            src={`${window.cdn}art_assets/icons/tickets.png`}
                                            alt="tickets"
                                        />
                                    </p>
                                </div>
                            </div>
                        </div>

                        <section id="game-screen">
                            <div className="container-fluid">
                                <div className="row justify-content-center">
                                    <div className="col-12 col-md-10 col-lg-8 col-xl-8">
                                        {/* TICKETS AND POOL INFO */}
                                        <div className="row prize-detail-panel my-4">
                                            <div className="prize-detail-header col-12 d-flex justify-content-between mb-3">
                                                <div className="d-flex align-items-end">
                                                    <img
                                                        className="prize-img mr-2"
                                                        src={
                                                            currentPrize?.prizeBG
                                                        }
                                                        alt="prize"
                                                    />
                                                    <div className="title-info d-flex flex-column">
                                                        <p className="prizeId mb-0 mb-md-2">
                                                            {
                                                                currentPrize?.prizeContent
                                                            }
                                                        </p>
                                                        <p className="mb-0 title">
                                                            {currentPrize?.prizeTitle ||
                                                                "-"}
                                                        </p>
                                                    </div>
                                                </div>
                                                {OverTimeModeChecker(
                                                    currentPrize?.prizeId,
                                                    currentPrize?.ticketsRequired,
                                                    prizeTicketCollection
                                                ) && (
                                                    <div className="progress-perc text-danger">
                                                        Overtime
                                                    </div>
                                                )}
                                            </div>
                                            <div className="col-12 mb-3">
                                                <div className="progress align-items-center">
                                                    <div
                                                        className="progress-bar"
                                                        role="progressbar"
                                                        style={{
                                                            width: `${getPrizeProgress(
                                                                prizeTicketCollection,
                                                                id,
                                                                currentPrize?.ticketsRequired
                                                            )}%`,
                                                        }}
                                                        aria-valuemin="0"
                                                        aria-valuemax="100"
                                                    />
                                                </div>
                                                <div
                                                    className="progressbar-shadow"
                                                    role="progressbar"
                                                    style={{
                                                        width: `${
                                                            getPrizeProgress(
                                                                prizeTicketCollection,
                                                                id,
                                                                currentPrize?.ticketsRequired
                                                            ) >= 100
                                                                ? 100
                                                                : getPrizeProgress(
                                                                      prizeTicketCollection,
                                                                      id,
                                                                      currentPrize?.ticketsRequired
                                                                  )
                                                        }%`,
                                                    }}
                                                    aria-valuemin="0"
                                                    aria-valuemax="100"
                                                />
                                            </div>
                                            <div className="col-12 d-flex align-items-end justify-content-between">
                                                <button
                                                    className="instructions mb-0 mb-md-1"
                                                    onClick={
                                                        handleInstructionPanel
                                                    }
                                                >
                                                    How it works?
                                                </button>
                                                <div className="d-flex align-items-end">
                                                    <span className="draw-text mb-0 mb-md-1">
                                                        {`Draw starts in \u00A0`}
                                                    </span>
                                                    <span
                                                        className={`${
                                                            OverTimeModeChecker(
                                                                currentPrize?.prizeId,
                                                                currentPrize?.ticketsRequired,
                                                                prizeTicketCollection
                                                            )
                                                                ? "text-danger tickets-text-end"
                                                                : "tickets-text"
                                                        }`}
                                                    >
                                                        {OverTimeModeChecker(
                                                            currentPrize?.prizeId,
                                                            currentPrize?.ticketsRequired,
                                                            prizeTicketCollection
                                                        )
                                                            ? timer
                                                            : getPrizeTicketCollected(
                                                                  prizeTicketCollection,
                                                                  id
                                                              )?.toLocaleString() ||
                                                              0}
                                                    </span>
                                                    {!OverTimeModeChecker(
                                                        currentPrize?.prizeId,
                                                        currentPrize?.ticketsRequired,
                                                        prizeTicketCollection
                                                    ) && (
                                                        <span className="total-tickets-text mb-0 mb-md-1">
                                                            {`\u00A0 / ${
                                                                currentPrize?.ticketsRequired?.toLocaleString() ||
                                                                0
                                                            }`}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        {/* GAME INFO */}
                                        <div className="row game-detail-panel pt-4 mb-4">
                                            <div className="col-12">
                                                <h2 className="statement-title">
                                                    Join Tournaments
                                                </h2>
                                                <p className="statement-subtitle">
                                                    Compete with other players,
                                                    collect tickets and stand a
                                                    chance to win the prize!
                                                </p>
                                            </div>
                                            {currentPrize?.gameInfo?.map(
                                                (game, index) => (
                                                    <React.Fragment
                                                        key={`time-${index}`}
                                                    >
                                                        <GameDuration
                                                            game={game}
                                                            index={index}
                                                            data={currentPrize}
                                                            timer={timer}
                                                            setTimer={setTimer}
                                                            handleGameLeaderPanel={
                                                                handleGameLeaderPanel
                                                            }
                                                            setEarnAdditionalDisabledStatus={
                                                                setEarnAdditionalDisabledStatus
                                                            }
                                                        />
                                                    </React.Fragment>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </>
                )}
                {type === "automated" && (
                    <AutomatedEntryTournamentInfo
                        data={currentPrize}
                        type={type}
                    />
                )}
                {type !== "automated" && (
                    <div
                        className="fortune-wheel-fixed-btn"
                        onClick={() => setFortuneWheelShown(true)}
                        ref={spinnerFixedButtonRef}
                    >
                        <div className="spinner-wrapper">
                            <img
                                className="spinner"
                                src={`${window.cdn}art_assets/buttons/button_floatspinner.png`}
                                alt="spinner"
                            />
                        </div>
                        <div className="button-wrapper">
                            <button>Play Spinner</button>
                        </div>
                    </div>
                )}

                {/* FORTUNE WHEEL */}
                {fortuneWheelShown && (
                    <div className="fortune-wheel">
                        <FortuneWheel
                            prizeId={parseInt(id)}
                            setIsTicketsUpdated={setIsTicketsUpdated}
                            ticketsRequired={currentPrize?.ticketsRequired}
                            setFortuneWheelShown={setFortuneWheelShown}
                        />
                    </div>
                )}
                {/* POPUP MODAL FOR OUT OF GEMS */}
                {isSubscriptionModalShown && (
                    <SubscriptionModal
                        handleGetGemsLaterBtn={onClickSubscriptionCancel}
                    />
                )}
                {/* POPUP MODAL FOR INSTRUCTIONS */}
                {isIntructionShown && (
                    <GameInstructionsModal
                        handleInstructionsCloseBtn={
                            onClickInstructionBackButton
                        }
                    />
                )}
            </>
        );
    }
};

export default Index;
