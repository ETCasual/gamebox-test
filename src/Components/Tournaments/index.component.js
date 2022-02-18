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
                        <section id="game-screen">
                            <div className="container-fluid">
                                <div className="row justify-content-center">
                                    <div className="col-12 col-md-10 col-lg-8 col-xl-7">
                                        {/* BACK BUTTON */}
                                        <div className="d-flex align-items-center back-button">
                                            <Link
                                                className="d-flex align-items-center"
                                                onClick={handleHomeNavLink}
                                                to={{
                                                    pathname: "/",
                                                    state: {
                                                        prevPath:
                                                            history.location
                                                                .pathname,
                                                    },
                                                }}
                                            >
                                                <img
                                                    width="42"
                                                    src={`${window.cdn}buttons/button_back.png`}
                                                    alt="back-btn"
                                                />
                                            </Link>
                                            <span className="ml-2">Back</span>
                                        </div>
                                        {/* TICKETS AND POOL INFO */}
                                        <div className="row prize-detail-panel mt-4 mb-5 col-12">
                                            <div className="prize-info-holder d-flex">
                                                <img
                                                    className="prize-img"
                                                    src={currentPrize?.prizeBG}
                                                    alt="prize"
                                                />
                                                <div className="prize-text-holder d-flex flex-column">
                                                    <div className="prize-id">
                                                        {
                                                            currentPrize?.prizeContent
                                                        }
                                                    </div>
                                                    <div className="prize-title">
                                                        {currentPrize?.prizeTitle ||
                                                            "-"}
                                                    </div>{" "}
                                                    <div className="prize-description">
                                                        {currentPrize?.prizeTitle ||
                                                            "-"}
                                                    </div>
                                                    <div className="token-and-draw-start-holder d-flex align-items-end justify-content-between mt-auto">
                                                        <div className="token-text-holder d-flex align-items-end justify-content-start">
                                                            <div className="your-tokens-text">
                                                                {`Your tokens `}
                                                            </div>
                                                            <div className="your-tokens-number">
                                                                {getPoolTickets(
                                                                    poolTickets,
                                                                    id
                                                                )?.toLocaleString() ||
                                                                    0}
                                                            </div>
                                                        </div>

                                                        <div className="draw-start-holder d-flex align-items-end ms-auto">
                                                            <div className="draw-text">
                                                                {`Draw starts in \u00A0`}
                                                            </div>

                                                            {/* COUNT DOWN TIME */}
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

                                                            {/* TICKETS REQUIRED NUMBER */}
                                                            {!OverTimeModeChecker(
                                                                currentPrize?.prizeId,
                                                                currentPrize?.ticketsRequired,
                                                                prizeTicketCollection
                                                            ) && (
                                                                <span className="total-tickets-text">
                                                                    {`\u00A0 / ${
                                                                        currentPrize?.ticketsRequired?.toLocaleString() ||
                                                                        0
                                                                    }`}
                                                                </span>
                                                            )}

                                                            {/* OVERTIME TEXT */}
                                                            {OverTimeModeChecker(
                                                                currentPrize?.prizeId,
                                                                currentPrize?.ticketsRequired,
                                                                prizeTicketCollection
                                                            ) && (
                                                                <div className="progress-perc text-danger">
                                                                    Overtime!
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* GAME INFO */}
                                        <div className="game-info-background col-12">
                                            <div className="row game-detail-panel">
                                                <div className="col-12">
                                                    <div className="join-tournament-container">
                                                        <div className="statement-title">
                                                            JOIN TOURNAMENTS!
                                                        </div>
                                                        <img
                                                            src={`${window.cdn}icons/icon_question_01.png`}
                                                            className="question-mark-img"
                                                            alt="question-mark"
                                                            onClick={
                                                                handleInstructionPanel
                                                            }
                                                        />
                                                    </div>
                                                    <div className="statement-subtitle">
                                                        Compete with other
                                                        players, collect tokens
                                                        and stand a chance to
                                                        own this NFT!
                                                    </div>
                                                </div>
                                                <div
                                                    className="game-container"
                                                    style={{
                                                        marginLeft: "15px",
                                                    }}
                                                >
                                                    {currentPrize?.gameInfo?.map(
                                                        (game, index) => (
                                                            <React.Fragment
                                                                key={`time-${index}`}
                                                            >
                                                                <GameDuration
                                                                    game={game}
                                                                    index={
                                                                        index
                                                                    }
                                                                    data={
                                                                        currentPrize
                                                                    }
                                                                    timer={
                                                                        timer
                                                                    }
                                                                    setTimer={
                                                                        setTimer
                                                                    }
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
                                            {type !== "automated" && (
                                                <div
                                                    className="fortune-wheel-fixed-btn-container"
                                                    onClick={() =>
                                                        setFortuneWheelShown(
                                                            true
                                                        )
                                                    }
                                                    ref={spinnerFixedButtonRef}
                                                >
                                                    <div
                                                        className="the-spinner-text-wrapper"
                                                        style={{
                                                            color: "#00C1B9",
                                                            marginBottom: "3px",
                                                        }}
                                                    >
                                                        The spinner
                                                    </div>
                                                    <div className="earn-more-tickets-text-wrapper">
                                                        Earn more tickets here
                                                    </div>
                                                    <img
                                                        className="earn-more-tickets-img"
                                                        src={`${window.cdn}icons/spinner_column.png`}
                                                        alt="earn-more-tickets"
                                                    ></img>
                                                </div>
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
