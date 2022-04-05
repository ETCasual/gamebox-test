// REACT, REDUX & 3RD PARTY LIBRARIES
import React, { useState, useEffect } from "react";
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
import { loadPrizePoolTickets } from "redux/thunks/PrizePoolTickets.thunk";
import loadLeaderboard from "redux/thunks/Leaderboard.thunk";
import loadCurrentUserRank from "redux/thunks/CurrentUserRank.thunk";
import loadAvailableSpins from "redux/thunks/AvailableSpins.thunk";

// HELPER FUNCTION
import { scrollToTop } from "Utils/ScrollToTop";
import { PRIZE_TYPE } from "Utils/Enums";
import getPrizeTicketCollected from "Utils/PrizeTicketCollected";
import getPoolTickets from "Utils/PoolTickets";

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
        if (user.id && spinner.freeSpins <= 0) dispatch(loadAvailableSpins());
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

    console.log(history.location);

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
                    <section id="game-screen">
                        <div className="container-fluid">
                            <div className="row justify-content-center">
                                <div className="col-12 col-md-10 col-lg-8 col-xl-7 px-0 full-wrapper">
                                    {/* BACK BUTTON */}
                                    <div className="d-flex align-items-center back-button mb-3 mb-md-4 px-3">
                                        <Link
                                            className="d-flex align-items-center"
                                            onClick={handleHomeNavLink}
                                            to={{
                                                pathname:
                                                    history.location?.state
                                                        ?.prevPath || "/",
                                                state: {
                                                    prevPath:
                                                        history.location
                                                            .pathname,
                                                },
                                            }}
                                        >
                                            <img
                                                src={`${window.cdn}buttons/button_back.png`}
                                                alt="back-btn"
                                            />
                                            <span className="ml-2">Back</span>
                                        </Link>
                                    </div>
                                    {/* TICKETS AND POOL INFO */}
                                    <div className="col-12 px-3 d-flex align-items-start justify-content-start prize-info-wrapper mb-4 mb-md-4">
                                        <img
                                            className="prize-img mr-3"
                                            src={currentPrize?.prizeBG}
                                            alt="prize"
                                        />
                                        <div className="prize-text-holder d-flex flex-column align-items-start justify-content-between w-100">
                                            <div className="prize-id mb-lg-1">
                                                {currentPrize?.prizeContent?.substring(
                                                    0,
                                                    4
                                                )}
                                                ....
                                                {currentPrize?.prizeContent?.substring(
                                                    currentPrize?.prizeContent
                                                        .length - 5,
                                                    currentPrize?.prizeContent
                                                        .length - 1
                                                )}
                                            </div>
                                            <div className="prize-title mb-lg-3">
                                                {currentPrize?.prizeTitle ||
                                                    "-"}
                                            </div>
                                            <div className="prize-description">
                                                {currentPrize?.prizeSubtitle ||
                                                    "-"}
                                            </div>
                                            {/* DESKTOP - TICKETS, TIMER & OVERTIME */}
                                            <div className="token-and-draw-start-holder mt-auto mb-1 d-none d-lg-flex align-items-end justify-content-between w-100">
                                                <div className="token-text-holder d-flex align-items-end justify-content-start">
                                                    <div className="your-tokens-text">
                                                        Your tickets
                                                    </div>
                                                    <div className="your-tokens-number ml-0 ml-md-2">
                                                        {getPoolTickets(
                                                            poolTickets,
                                                            id
                                                        )?.toLocaleString() ||
                                                            0}
                                                    </div>
                                                </div>

                                                <div className="overtime-and-total-tickets-wrapper">
                                                    {/* OVERTIME TEXT */}
                                                    {currentPrize.overTime && (
                                                        <p className="overtime-text mb-1 text-right text-danger">
                                                            Overtime!
                                                        </p>
                                                    )}
                                                    {/* TICKETS & OVERTIME TIMER */}
                                                    <div className="draw-start-holder d-flex align-items-end ms-auto">
                                                        <div className="draw-text mr-0 mr-md-2">
                                                            {`Draw starts in \u00A0`}
                                                        </div>

                                                        {/* COUNT DOWN TIME */}
                                                        <span
                                                            className={`${
                                                                currentPrize.overTime
                                                                    ? "text-danger tickets-text-end"
                                                                    : "tickets-text"
                                                            }`}
                                                        >
                                                            {currentPrize.overTime
                                                                ? timer
                                                                : getPrizeTicketCollected(
                                                                      prizeTicketCollection,
                                                                      id
                                                                  )?.toLocaleString() ||
                                                                  0}
                                                        </span>

                                                        {/* TICKETS REQUIRED NUMBER */}
                                                        {!currentPrize.overTime && (
                                                            <span className="total-tickets-text">
                                                                {`\u00A0 / ${
                                                                    currentPrize?.ticketsRequired?.toLocaleString() ||
                                                                    0
                                                                }`}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* MOBILE - SEPARATOR */}
                                    <div className="separator d-block d-lg-none px-3" />
                                    {/* MOBILE - TICKETS, TIMER & OVERTIME */}
                                    <div className="token-and-draw-start-holder px-3 mt-auto mb-1 d-flex d-lg-none align-items-end justify-content-between w-100">
                                        <div className="token-text-holder">
                                            <p className="your-tokens-text mb-0">
                                                Your tickets
                                            </p>
                                            <p className="your-tokens-number mt-2">
                                                {getPoolTickets(
                                                    poolTickets,
                                                    id
                                                )?.toLocaleString() || 0}
                                            </p>
                                        </div>
                                        <div className="overtime-and-total-tickets-wrapper">
                                            {/* OVERTIME TEXT */}
                                            {
                                                // OverTimeModeChecker(
                                                //     currentPrize?.prizeId,
                                                //     currentPrize?.ticketsRequired,
                                                //     prizeTicketCollection
                                                // )
                                                currentPrize.overTime && (
                                                    <p className="overtime-text mb-1 text-right text-danger">
                                                        Overtime!
                                                    </p>
                                                )
                                            }
                                            {/* TICKETS & OVERTIME TIMER */}
                                            <div className="draw-start-holder">
                                                <p className="draw-text mb-0">
                                                    Draw starts in
                                                </p>

                                                {/* COUNT DOWN TIME */}
                                                <p className="mt-2">
                                                    <span
                                                        className={`${
                                                            // OverTimeModeChecker(
                                                            //     currentPrize?.prizeId,
                                                            //     currentPrize?.ticketsRequired,
                                                            //     prizeTicketCollection
                                                            // )
                                                            currentPrize.overTime
                                                                ? "text-danger tickets-text-end"
                                                                : "tickets-text"
                                                        }`}
                                                    >
                                                        {
                                                            // OverTimeModeChecker(
                                                            //     currentPrize?.prizeId,
                                                            //     currentPrize?.ticketsRequired,
                                                            //     prizeTicketCollection
                                                            // )
                                                            currentPrize.overTime
                                                                ? timer
                                                                : getPrizeTicketCollected(
                                                                      prizeTicketCollection,
                                                                      id
                                                                  )?.toLocaleString() ||
                                                                  0
                                                        }
                                                    </span>

                                                    {/* TICKETS REQUIRED NUMBER */}
                                                    {
                                                        // !OverTimeModeChecker(
                                                        //     currentPrize?.prizeId,
                                                        //     currentPrize?.ticketsRequired,
                                                        //     prizeTicketCollection
                                                        // )
                                                        !currentPrize.overTime && (
                                                            <span className="total-tickets-text">
                                                                {`\u00A0 / ${
                                                                    currentPrize?.ticketsRequired?.toLocaleString() ||
                                                                    0
                                                                }`}
                                                            </span>
                                                        )
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* GAME INFO */}
                                    <div className="d-flex align-items-end px-0 px-md-3">
                                        {/* JOIN TITLE & STATEMENT */}
                                        <div className="col-12 col-xl-10 game-info px-3 pt-3">
                                            <div className="row">
                                                <div className="col-12 mb-4">
                                                    <div className="join-tournament-wrapper d-flex align-items-center justify-content-between mb-2">
                                                        <p className="statement-title algin mb-0">
                                                            Join Tournaments!
                                                        </p>
                                                        <img
                                                            width={20}
                                                            src={`${window.cdn}buttons/button_question_01.png`}
                                                            className="question-mark-img"
                                                            alt="question-mark"
                                                            onClick={
                                                                handleInstructionPanel
                                                            }
                                                        />
                                                    </div>
                                                    <p className="statement-subtitle mb-0">
                                                        Compete with other
                                                        players, collect tickets
                                                        and stand a chance to
                                                        own this NFT!
                                                    </p>
                                                </div>
                                            </div>
                                            {/* GAME INFO CARDS */}
                                            <div className="row scrolling-wrapper">
                                                {/* GAME INFO & TIMER */}
                                                {currentPrize?.gameInfo?.map(
                                                    (game, index) => (
                                                        <React.Fragment
                                                            key={`time-${index}`}
                                                        >
                                                            <GameDuration
                                                                game={game}
                                                                index={index}
                                                                data={
                                                                    currentPrize
                                                                }
                                                                timer={timer}
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
                                                <div className="col-6 col-md-4 col-lg-3 d-flex d-xl-none mb-3 align-self-end">
                                                    {type !== "automated" && (
                                                        <div
                                                            className="fortune-wheel-btn p-3"
                                                            onClick={() =>
                                                                setFortuneWheelShown(
                                                                    true
                                                                )
                                                            }
                                                        >
                                                            <p className="the-spinner-text mb-1">
                                                                The spinner
                                                            </p>
                                                            <p className="earn-more-tickets-text">
                                                                Earn more
                                                                tickets here
                                                            </p>
                                                            <img
                                                                className="earn-more-tickets-img"
                                                                src={`${window.cdn}spinner/spinner_column_01.png`}
                                                                alt="earn-more-tickets"
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        {/* SPINNER BUTTON */}
                                        <div className="col-2 col-md-3 col-xl-2 d-none d-xl-block">
                                            {type !== "automated" && (
                                                <div
                                                    className="fortune-wheel-btn p-3"
                                                    onClick={() =>
                                                        setFortuneWheelShown(
                                                            true
                                                        )
                                                    }
                                                >
                                                    <p className="the-spinner-text mb-1">
                                                        The spinner
                                                    </p>
                                                    <p className="earn-more-tickets-text">
                                                        Earn more tickets here
                                                    </p>
                                                    <img
                                                        className="earn-more-tickets-img"
                                                        src={`${window.cdn}spinner/spinner_column_01.png`}
                                                        alt="earn-more-tickets"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
                {type === "automated" && (
                    <AutomatedEntryTournamentInfo
                        data={currentPrize}
                        type={type}
                    />
                )}

                {/* FORTUNE WHEEL */}
                {fortuneWheelShown && (
                    <FortuneWheel
                        prizeId={parseInt(id)}
                        setIsTicketsUpdated={setIsTicketsUpdated}
                        ticketsRequired={currentPrize?.ticketsRequired}
                        setFortuneWheelShown={setFortuneWheelShown}
                    />
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
