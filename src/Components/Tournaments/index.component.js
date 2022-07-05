// REACT, REDUX & 3RD PARTY LIBRARIES
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// COMPONENTS
import Leaderboard from "Components/Leaderboard/Leaderboard.component";
import AutomatedEntryTournamentInfo from "Components/Tournaments/AutomatedEntryTournamentInfo/AutomatedEntryTournamentInfo.component";
import SubscriptionModal from "Components/Modals/Subscription.modal";
import GameInstructionsModal from "Components/Modals/GameInstructions.modal";
import ThumbnailMedia from "Components/Global/ThumbnailMedia.component";

// REDUX THUNKS TO CALL SERVICES (AYSNC) AND ADD DATA TO STORE
import loadPrizes from "redux/thunks/Prizes.thunk";
import loadPlayerTickets from "redux/thunks/PlayerTickets.thunk";
import { loadPrizePoolTickets } from "redux/thunks/PrizePoolTickets.thunk";
import loadLeaderboard from "redux/thunks/Leaderboard.thunk";
import loadCurrentUserRank from "redux/thunks/CurrentUserRank.thunk";
import loadAvailableSpins from "redux/thunks/AvailableSpins.thunk";

// HELPER FUNCTION
import { PRIZE_TYPE } from "Utils/Enums";
import getPrizeTicketCollected from "Utils/PrizeTicketCollected";
import getPoolTickets from "Utils/PoolTickets";
import { CURRENT_GAME_DETAILS, PRIZE_ENDED } from "redux/types";
import PrizeEndedModalPopup from "Components/Modals/PrizeEnded.modal";

const Index = ({ match }) => {
    const {
        params: { id, type },
    } = match;

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.userData);
    const { config } = useSelector((state) => state.config);
    const { prizes, prizeEnded } = useSelector((state) => state.prizes);
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
    // DIFFERENT COMPONENT UI STATES
    const [isIntructionShown, setIsInstructionShown] = useState(false);
    // REASON COMMENTED: Leaderboard is moved to parent page
    // const [isGameLeaderboardShown, setIsGameLeaderboardShown] = useState(false);
    const [isSubscriptionModalShown, setIsSubscriptionModalShown] =
        useState(false);
    // EARN ADDITIONAL SELECTION STATES
    const [earnAdditionalDisabledStatus, setEarnAdditionalDisabledStatus] =
        useState({
            gems: checkIsAdOrGemsUsed("gems"),
            ads: checkIsAdOrGemsUsed("ads"),
        });
    const [timer, setTimer] = useState("Calculating");

    // LOAD PRIZES WHEN TIMER END WITH 2 SECOND DELAY
    // useEffect(() => {
    //     let timeOutRef = null;
    //     if (timer === "Ended" || timer === "0d 0h 0m 0s") {
    //         clearTimeout(timeOutRef);
    //         timeOutRef = setTimeout(() => {
    //             dispatch(loadPrizes());
    //         }, 4000);
    //     }
    //     return () => clearTimeout(timeOutRef);
    // }, [timer, dispatch]);

    /* REASON COMMENTED: Since leaderboard is moved to parent page, scrolling is necessary.
    // DISABLE SCROLLING
    useEffect(() => {
        window.addEventListener("resize", handleResize, { once: true });

        function handleResize() {
            document.documentElement.style.overflowY = "hidden";
            document.documentElement.scrollTop = 0;
        }

        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
            document.documentElement.style.overflowY = "visible";
        };
    });
    */

    // LOAD AVAILABLE SPINS
    useEffect(() => {
        if (user.id && spinner.freeSpins <= 0) dispatch(loadAvailableSpins());
    }, [dispatch, user.id, spinner.freeSpins]);

    // SET CURRENT PRIZE
    useEffect(
        () => {
            const nowTimeStamp = () =>
                Date.now() + (config?.offsetTimestamp || 0);

            let prizeType = prizes[PRIZE_TYPE[type]] || [];
            let idx = prizeType?.findIndex((e) => e.prizeId === parseInt(id));
            let gameEndTime =
                type !== "automated"
                    ? prizeType[idx]?.gameInfo?.[0]?.endTimeStamp * 1000
                    : prizeType[idx]?.scheduledOff * 1000;

            if (prizeType.length > 0 && nowTimeStamp() < (gameEndTime || 0)) {
                // console.log("GOT THE PRIZE WITH TIMER:", prizeType[idx]);
                if (idx > -1) {
                    setCurrentPrize(prizeType[idx]);
                    if (type !== "automated") {
                        const currentGameInfo =
                            JSON.parse(
                                sessionStorage.getItem("currentGameInfo")
                            ) || null;
                        if (currentGameInfo !== null) {
                            const gameIdx = prizeType[idx].gameInfo.findIndex(
                                (g) => g.gameId === currentGameInfo.gameId
                            );
                            if (gameIdx === -1) {
                                const _gameInfo = {
                                    gameId: prizeType[idx].gameInfo[0].gameId,
                                    gameIndex:
                                        prizeType[idx].gameInfo[0].gameIndex,
                                    gameTitle:
                                        prizeType[idx].gameInfo[0].gameTitle,
                                    gameIcon:
                                        prizeType[idx].gameInfo[0].gameIcon,
                                    endTimeStamp:
                                        prizeType[idx].gameInfo[0].endTimeStamp,
                                };
                                sessionStorage.setItem(
                                    "currentGameInfo",
                                    JSON.stringify(_gameInfo)
                                );
                                dispatch({
                                    type: CURRENT_GAME_DETAILS,
                                    payload: _gameInfo,
                                });
                                dispatch(
                                    loadLeaderboard(
                                        parseInt(id),
                                        prizeType[idx].gameInfo[0].gameId
                                    )
                                );
                            }
                        }
                    }
                }
            } else dispatch(loadPrizes());
        },
        // eslint-disable-next-line
        [prizes, id, type, dispatch]
    );

    useEffect(() => {
        if (currentPrize?.gameInfo?.length > 0) {
            const gameInfo = currentPrize?.gameInfo[0];

            dispatch(loadLeaderboard(parseInt(id), gameInfo.gameId));
            // TODO:: ADD PROPER DISPATCH TO IT
            Object.assign(currentGameInfo, {
                prizeId: id,
                gameId: gameInfo.gameId,
            });

            sessionStorage.setItem("currentGameInfo", JSON.stringify(gameInfo));
            dispatch({
                type: CURRENT_GAME_DETAILS,
                payload: gameInfo,
            });
            loadCurrentUserRank(
                user,
                id,
                gameInfo.gameId,
                currentUserRank,
                dispatch
            );
            // setIsGameLeaderboardShown(true);
        }
    }, [currentPrize, id, user, currentGameInfo, currentUserRank, dispatch]);

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
        } else {
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

    // BACK BUTTONS
    const onClickInstructionBackButton = () => setIsInstructionShown(false);
    // const onClickGameLeaderBackButton = () => {
    //     setIsGameLeaderboardShown(false);
    // };

    // PAYMENT
    const onClickSubscriptionCancel = () => setIsSubscriptionModalShown(false);

    const handleHomeNavLink = () => dispatch(loadPrizes());

    const handlePrizeEndedModalContinueBtn = () => {
        dispatch({ type: PRIZE_ENDED, payload: false });
        dispatch(loadPrizes());
        history.push("/");
    };

    return (
        <>
            {type !== "automated" && (
                <section id="game-screen">
                    <div className="container-fluid">
                        <div className="row justify-content-center">
                            <div className="col-12 col-md-10 col-lg-8 px-0 full-wrapper">
                                {/* BACK BUTTON */}
                                <div className="d-flex align-items-center back-button mb-3 mb-md-4 px-3">
                                    <div
                                        className="d-flex align-items-center"
                                        onClick={() => { handleHomeNavLink(); history.goBack(); }}
                                    >
                                        <img
                                            src={`${window.cdn}buttons/button_back.png`}
                                            alt="back-btn"
                                        />
                                        <span className="ml-2">Back</span>
                                    </div>
                                </div>
                                {/* TICKETS AND POOL INFO */}
                                <div className="col-12 px-3 position-relative d-flex align-items-start justify-content-start prize-info-wrapper mb-4 mb-md-4">
                                    {/* THUMBNAIL MEDIA */}
                                    <ThumbnailMedia
                                        url={currentPrize?.prizeBG}
                                        isPlayVideo={true}
                                        setIsPlayVideo={null}
                                    />

                                    {currentPrize?.infoUrl ? (
                                        <a
                                            className="contract-address"
                                            href={currentPrize?.infoUrl || "#"}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            {currentPrize?.nftContractAddress?.substring(
                                                0,
                                                4
                                            )}
                                            ....
                                            {currentPrize?.nftContractAddress?.substring(
                                                currentPrize?.nftContractAddress
                                                    .length - 5,
                                                currentPrize?.nftContractAddress
                                                    .length - 1
                                            )}
                                        </a>
                                    ) : (
                                        <div className="contract-address">
                                            {currentPrize?.nftContractAddress?.substring(
                                                0,
                                                4
                                            )}
                                            ....
                                            {currentPrize?.nftContractAddress?.substring(
                                                currentPrize?.nftContractAddress
                                                    .length - 5,
                                                currentPrize?.nftContractAddress
                                                    .length - 1
                                            )}
                                        </div>
                                    )}
                                    <div className="prize-text-holder d-flex flex-column align-items-start justify-content-between w-100 ml-3">
                                        <div className="prize-id mb-lg-1 mt-2">
                                            {currentPrize?.prizeSubtitle}
                                        </div>
                                        <div className="prize-title mb-lg-3">
                                            {currentPrize?.prizeTitle || "-"}
                                        </div>
                                        <div className="prize-description">
                                            {currentPrize?.prizeContent || "-"}
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
                                                    )?.toLocaleString() || 0}
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
                                                        className={`${currentPrize.overTime
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
                                                            {`\u00A0 / ${currentPrize?.ticketsRequired?.toLocaleString() ||
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
                                                            {`\u00A0 / ${currentPrize?.ticketsRequired?.toLocaleString() ||
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
                                <div className="d-flex align-items-end px-3 px-md-3">
                                    {/* JOIN TITLE & STATEMENT */}
                                    <div className="col-12 col-xl-12 game-info px-3 pt-3">
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
                                                    Compete with other players,
                                                    collect tickets and stand a
                                                    chance to own this Prize!
                                                </p>
                                            </div>
                                        </div>
                                        {/* GAME INFO CARDS */}
                                        <div className="row">
                                            {/* TOURNAMENT LEADBOARD */}
                                            <Leaderboard
                                                data={currentPrize}
                                                // handleBackButton={
                                                //     onClickGameLeaderBackButton
                                                // }
                                                // setIsGameLeaderboardShown={
                                                //     setIsGameLeaderboardShown
                                                // }
                                                timer={timer}
                                                setTimer={setTimer}
                                                earnAdditionalDisabledStatus={
                                                    earnAdditionalDisabledStatus
                                                }
                                                setEarnAdditionalDisabledStatus={
                                                    setEarnAdditionalDisabledStatus
                                                }
                                            />
                                            {/* PRIZE FINISHED */}
                                            {prizeEnded && (
                                                <PrizeEndedModalPopup
                                                    handleContinueBtn={
                                                        handlePrizeEndedModalContinueBtn
                                                    }
                                                />
                                            )}
                                        </div>

                                        {/* RECAPTCHA MESSAGES */}
                                        <p className="recaptcha-text">
                                            This site is protected by reCAPTCHA
                                            and the Google
                                            {""}{" "}
                                            <a href="https://policies.google.com/privacy">
                                                Privacy Policy
                                            </a>{" "}
                                            and
                                            {""}{" "}
                                            <a href="https://policies.google.com/terms">
                                                Terms of Service
                                            </a>{" "}
                                            apply.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
            {type === "automated" && (
                <AutomatedEntryTournamentInfo data={currentPrize} type={type} />
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
                    handleInstructionsCloseBtn={onClickInstructionBackButton}
                />
            )}

            {/* PRIZE FINISHED */}
            {prizeEnded && (
                <PrizeEndedModalPopup
                    handleContinueBtn={handlePrizeEndedModalContinueBtn}
                />
            )}
        </>
    );

    // REASON COMMENTED: Leaderboard is moved to parent page
    // if (isGameLeaderboardShown) {
    //     return (
    //         <>
    //             <Leaderboard
    //                 data={currentPrize}
    //                 handleBackButton={onClickGameLeaderBackButton}
    //                 setIsGameLeaderboardShown={setIsGameLeaderboardShown}
    //                 timer={timer}
    //                 setTimer={setTimer}
    //                 earnAdditionalDisabledStatus={earnAdditionalDisabledStatus}
    //                 setEarnAdditionalDisabledStatus={
    //                     setEarnAdditionalDisabledStatus
    //                 }
    //             />
    //             {/* PRIZE FINISHED */}
    //             {prizeEnded && (
    //                 <PrizeEndedModalPopup
    //                     handleContinueBtn={handlePrizeEndedModalContinueBtn}
    //                 />
    //             )}
    //         </>
    //     );
    // }
};

export default Index;
