// REACT, REDUX & 3RD PARTY LIBRARIES
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// COMPONENTS
import Leaderboard from "Components/Leaderboard/Leaderboard.component";
import AutomatedEntryTournamentInfo from "Components/Tournaments/AutomatedEntryTournamentInfo/AutomatedEntryTournamentInfo.component";
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
import { useTranslation } from "react-i18next";

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
    // const [isSubscriptionModalShown, setIsSubscriptionModalShown] = useState(false);
    // EARN ADDITIONAL SELECTION STATES
    const [earnAdditionalDisabledStatus, setEarnAdditionalDisabledStatus] =
        useState({
            gems: checkIsAdOrGemsUsed("gems"),
            ads: checkIsAdOrGemsUsed("ads"),
        });
    const [timer, setTimer] = useState("Calculating");
    // const [gameName, setGameName] = useState("");

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

            if (idx > -1) {
                let gameEndTime =
                    type !== "automated"
                        ? prizeType[idx]?.gameInfo?.[0]?.endTimeStamp * 1000
                        : prizeType[idx]?.scheduledOff * 1000;

                if (
                    prizeType.length > 0 &&
                    nowTimeStamp() < (gameEndTime || 0)
                ) {
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
            } else {
                // To redirect to home page if no prize at id
                // dispatch(loadPrizes());
                history.push("/");
            }
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

            // setGameName(currentPrize?.gameInfo[0].gameTitle);
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

    // BACK BUTTONS
    const onClickInstructionBackButton = () => setIsInstructionShown(false);
    // const onClickGameLeaderBackButton = () => {
    //     setIsGameLeaderboardShown(false);
    // };

    // PAYMENT
    // const onClickSubscriptionCancel = () => setIsSubscriptionModalShown(false);

    const handleHomeNavLink = () => dispatch(loadPrizes());

    const handlePrizeEndedModalContinueBtn = () => {
        dispatch({ type: PRIZE_ENDED, payload: false });
        dispatch(loadPrizes());
        history.push("/");
    };

    const { t } = useTranslation();

    return (
        <>
            {type !== "automated" && (
                <section id="game-screen">
                    <div className="container-fluid">
                        <div className="row justify-content-center">
                            <div className="col-12 col-md-10 col-lg-8 px-0 full-wrapper">
                                {/* BACK BUTTON */}
                                <div className="d-flex align-items-center back-button mx-3">
                                    <div
                                        className="d-flex align-items-center"
                                        onClick={() => {
                                            handleHomeNavLink();
                                            history.goBack();
                                        }}
                                    >
                                        <img
                                            src={`${window.cdn}buttons/button_back.png`}
                                            alt="back-btn"
                                        />
                                        <span className="ml-2">
                                            {t("btn.back")}
                                        </span>
                                    </div>
                                </div>

                                <div className="row m-3">
                                    {/* <div className="row col-12"> */}
                                    {/* TICKETS AND POOL INFO */}
                                    <div className="prize-info-wrapper col-12 col-md-4 p-0 d-flex flex-column flex-md-row">
                                        <div className="d-flex flex-row flex-md-column">
                                            <div className="col-4 p-0 col-md-12 flex-md-fill ">
                                                <ThumbnailMedia
                                                    url={currentPrize?.prizeBG}
                                                    isPlayVideo={true}
                                                    className="thumb"
                                                />

                                                {currentPrize?.infoUrl ? (
                                                    <a
                                                        className="contract-address"
                                                        href={
                                                            currentPrize?.infoUrl ||
                                                            "#"
                                                        }
                                                        target="_blank"
                                                        rel="noreferrer"
                                                    >
                                                        {
                                                            currentPrize?.nftContractAddress
                                                        }
                                                        {/* {currentPrize?.nftContractAddress?.substring(
                                                            0,
                                                            4
                                                        )}
                                                        ....
                                                        {currentPrize?.nftContractAddress?.substring(
                                                            currentPrize
                                                                ?.nftContractAddress
                                                                .length - 5,
                                                            currentPrize
                                                                ?.nftContractAddress
                                                                .length - 1
                                                        )} */}
                                                    </a>
                                                ) : (
                                                    <div className="contract-address">
                                                        {currentPrize?.nftContractAddress?.substring(
                                                            0,
                                                            4
                                                        )}
                                                        ....
                                                        {currentPrize?.nftContractAddress?.substring(
                                                            currentPrize
                                                                ?.nftContractAddress
                                                                .length - 5,
                                                            currentPrize
                                                                ?.nftContractAddress
                                                                .length - 1
                                                        )}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="prize-text-holder col-8 col-md-12 d-flex flex-column justify-content-between justify-content-md-start pr-0 pl-md-0">
                                                <div className="align-items-start my-md-3">
                                                    <div className="prize-id mb-lg-1">
                                                        <p className="mb-0">
                                                            {`#${currentPrize?.prizeId}`}
                                                        </p>
                                                        {
                                                            currentPrize?.prizeSubtitle
                                                        }
                                                    </div>
                                                    <div className="prize-title my-2 mb-lg-3">
                                                        {currentPrize?.prizeTitle ||
                                                            "-"}
                                                    </div>
                                                    <div className="prize-description">
                                                        {currentPrize?.prizeContent ||
                                                            "-"}
                                                    </div>
                                                </div>

                                                <div className="your-tokens-info d-flex flex-row flex-md-column align-items-end mt-2">
                                                    <div className="col-4 col-md-auto p-0 mt-auto mx-auto ml-md-0">
                                                        <div className="your-tokens-title-text">
                                                            {t(
                                                                "featured.ticket"
                                                            )}
                                                        </div>
                                                        <div className="your-tokens-number mt-1">
                                                            {getPoolTickets(
                                                                poolTickets,
                                                                id
                                                            )?.toLocaleString() ||
                                                                0}
                                                        </div>
                                                    </div>
                                                    <div className="col-8 col-md-12 p-0 mt-auto mt-md-3 mx-auto ml-md-0 text-right text-md-left">
                                                        {/* CURRENT TICKETS / TOTAL TICKETS */}
                                                        {!currentPrize.overTime && (
                                                            <>
                                                                <div className="your-tokens-title-text mr-0 mr-md-2">
                                                                    {t(
                                                                        "ae.draw_starts"
                                                                    )}
                                                                </div>
                                                                <div className="mt-1">
                                                                    {/* CURRENT PRIZE POOL TICKETS */}
                                                                    <span className="current-tickets-text blue-text">
                                                                        {getPrizeTicketCollected(
                                                                            prizeTicketCollection,
                                                                            id
                                                                        )?.toLocaleString() ||
                                                                            0}
                                                                    </span>

                                                                    {/* TOTAL PRIZE POOL TICKETS */}
                                                                    <span className="total-tickets-text">
                                                                        {`\u00A0 / ${
                                                                            currentPrize?.ticketsRequired?.toLocaleString() ||
                                                                            0
                                                                        }`}
                                                                    </span>
                                                                </div>
                                                            </>
                                                        )}

                                                        {/* OVERTIMER TIMER */}
                                                        {currentPrize.overTime && (
                                                            <div className="overtime-tickets-wrapper text-left">
                                                                <p className="overtime-title-text mb-1">
                                                                    {t(
                                                                        "tournament.bonus_time"
                                                                    )}
                                                                </p>
                                                                <div className="d-flex flex-row align-items-end">
                                                                    <div className="draw-title-text w-100 mr-2 mr-md-2">
                                                                        {t(
                                                                            "ae.draw_starts"
                                                                        )}
                                                                    </div>

                                                                    {/* COUNT DOWN TIME */}
                                                                    <div className="timer-text w-100 text-right">
                                                                        {timer}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* SEPARATOR */}
                                        <div className="separator d-block my-3 mx-0 my-md-0 mx-md-4" />
                                    </div>

                                    {/* TORUNAMENT LEADERBOARD */}
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
                                        setIsInstructionShown={
                                            setIsInstructionShown
                                        }
                                    />
                                    {/* </div> */}
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
            {/* {isSubscriptionModalShown && (
                <SubscriptionModal
                    onCloseClicked={onClickSubscriptionCancel}
                />
            )} */}
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
