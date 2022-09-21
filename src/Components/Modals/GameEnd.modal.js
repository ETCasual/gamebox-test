import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import NotificationLeaderboard from "Components/Notifications/LeaderboardHistory/LeaderboardHistory.component";

import loadLeaderboardHistory from "redux/thunks/LeaderboardHistory.thunk";
import loadLeaderboardRanks from "redux/thunks/LeaderboardRanks.thunk";
import { useTranslation } from "react-i18next";

const GameEndModal = ({
    score,
    handleContinueButton,
    isShowTournamentEndedText,
    currentGameBoosterInfo,
}) => {
    const dispatch = useDispatch();

    // const { leaderboardHistory } = useSelector(
    //     (state) => state.leaderboardHistory
    // );
    const { extraEarning } = useSelector((state) => state.playerTournamentInfo);

    const [isSelectedNotificationShown, setIsSelectedNotificationShown] =
        useState({
            status: false,
            cgId: null,
            gameId: null,
            type: "tour",
        });

    const [displayedScore] = useState(score > 0 ? score : 0);

    useEffect(() => {
        let timeoutRef = null;
        clearInterval(timeoutRef);
        timeoutRef = setTimeout(() => {
            const lbId = JSON.parse(sessionStorage.getItem("lbId"));
            if (parseInt(lbId?.cgId) > 0 && parseInt(lbId.gameId) > 0) {
                dispatch(loadLeaderboardHistory(parseInt(lbId?.cgId)));
                dispatch(loadLeaderboardRanks(parseInt(lbId.gameId)));

                setIsSelectedNotificationShown((prev) => ({
                    ...prev,
                    cgId: parseInt(lbId?.cgId),
                    gameId: parseInt(lbId?.gameId),
                }));
            }
        }, 5000);

        return () => clearTimeout(timeoutRef);
    }, [dispatch]);

    // const handleViewResult = () => {
    //     if (
    //         isSelectedNotificationShown.cgId > 0 &&
    //         isSelectedNotificationShown.gameId > 0 &&
    //         isSelectedNotificationShown.type === "tour"
    //     ) {
    //         setIsSelectedNotificationShown((prev) => ({
    //             ...prev,
    //             status: true,
    //         }));
    //     }
    // };

    const handleCloseLeaderboardHistory = () => {
        setIsSelectedNotificationShown((prev) => ({
            ...prev,
            status: false,
        }));
        handleContinueButton();
    };

    const { t } = useTranslation();

    return (
        <>
            {!isSelectedNotificationShown.status && (
                <div className="container-fluid d-flex align-items-center justify-content-center modal-pop">
                    <div className="game-result-panel col-12 col-md-6 col-xl-5 position-relative">
                        {/* CARD */}
                        <div className="row justify-content-center my-3 my-sm-3">
                            <div className="col-10 col-lg-8 mb-2 pl-2 pr-1">
                                {/* <div className="card-prize d-flex flex-column flex-sm-row m-auto"> */}
                                <p className="text-center panel-title">
                                    {t("gameEnd.title")}
                                </p>

                                {isShowTournamentEndedText ? (
                                    <p className="text-center tournament-has-ended-text">
                                        {t("gameEnd.tournamentEnd")}
                                    </p>
                                ) : (
                                    <p className="text-center tournament-has-ended-text">
                                        &nbsp;
                                    </p>
                                )}

                                <div className="mb-5">
                                    <p className="text-center score-text mt-4 mb-0">
                                        {t("gameEnd.score.title")}
                                    </p>
                                    <p className="text-center score-number">
                                        {displayedScore}
                                    </p>
                                </div>

                                {currentGameBoosterInfo.isUseBooster ? (
                                    <div className="d-flex flex-row justify-content-center text-center pt-2 align-items-center mt-4">
                                        <p className="pr-2 ticket-rate-text-score">
                                            {t(
                                                "gameEnd.score.scoreNeededPerExtraTickets",
                                                {
                                                    count: currentGameBoosterInfo.scoreNeededPerExtraTickets,
                                                }
                                            )}
                                        </p>
                                        <p className="ticket-rate-text-ticket d-flex tickets-amount align-items-center">
                                            <span className="mr-2">
                                                {t(
                                                    "gameEnd.score.ticketCount",
                                                    {
                                                        count: currentGameBoosterInfo.extraTickets,
                                                    }
                                                )}
                                            </span>
                                            <img
                                                width="20"
                                                src={`${window.cdn}assets/tickets_06.png`}
                                                alt="tickets"
                                            />
                                        </p>
                                    </div>
                                ) : (
                                    <div className="d-flex flex-row justify-content-center text-center py-0 align-items-center mt-4"></div>
                                )}

                                {currentGameBoosterInfo.isUseBooster && (
                                    <div className="row text-center mx-auto total-tickets-earned align-items-center">
                                        <p className=" col-7 py-2 pl-0 pr-3 you-earned d-flex mt-3 mb-3 justify-content-end">
                                            {t("gameEnd.score.totalEarned")}
                                        </p>
                                        <p className="col-5 pl-2 d-flex tickets-amount align-items-center d-flex my-auto">
                                            <span className="mr-2">
                                                {extraEarning.ticket}
                                            </span>
                                            <img
                                                width="40"
                                                src={`${window.cdn}assets/tickets_06.png`}
                                                alt="tickets"
                                            />
                                        </p>
                                    </div>
                                )}

                                <button
                                    className="continue-button d-block text-center mx-auto mt-3 py-2"
                                    onClick={handleContinueButton}
                                >
                                    {t("btn.continue").toUpperCase()}
                                </button>

                                {/* {isShowTournamentEndedText ? 
                                (<button
                                    className={`btn-results d-block text-center mx-auto mt-2 py-3 ${
                                        leaderboardHistory.length > 0
                                            ? ""
                                            : "opacity-0-5"
                                    }`}
                                    onClick={
                                        leaderboardHistory.length > 0
                                            ? handleViewResult
                                            : null
                                    }
                                    style={{
                                        cursor:
                                            leaderboardHistory.length > 0
                                                ? "pointer"
                                                : "default",
                                    }}
                                >
                                    {leaderboardHistory.length > 0
                                        ? "View Leaderboard"
                                        : "Fetching Leaderboard"}
                                </button>) : (
                                    <p className="btn-results d-block text-center mx-auto mt-2 py-3">
                                        &nbsp;
                                    </p>
                                )} */}
                            </div>
                        </div>
                    </div>
                </div>

                // <div className="container-fluid d-flex align-items-center justify-content-center modal-pop">
                //     <div className="modal-body-small text-center">
                //         <>
                //             <p className="title col-12 p-3">{panelTitle}</p>
                //             {score && (
                //                 <p className="subtitle">
                //                     You scored {score} points.
                //                 </p>
                //             )}
                //             {extraEarning.ticket > 0 &&
                //                 extraEarning.experience > 0 && (
                //                     <p className="subtitle mb-2">
                //                         Additional tickets
                //                         {extraEarning.experience > 0
                //                             ? "and experience points"
                //                             : " "}
                //                         earned
                //                     </p>
                //                 )}

                //             {(extraEarning.ticket > 0 ||
                //                 extraEarning.experience > 0) && (
                //                 <p className="subtitle mb-2">
                //                     {extraEarning.ticket > 0
                //                         ? "Additional tickets earned"
                //                         : ""}
                //                     {extraEarning.experience > 0
                //                         ? "Additional Experience points earned"
                //                         : ""}
                //                 </p>
                //             )}

                //             { (
                //                 <p className="subtitle mb-2">
                //                     {extraEarning.ticket > 0
                //                         ? "* Every 5 score will give you 10 extra "

                //                         : "* Every 5 score will give you 10 extra "}

                //                           <img
                //                                 width="20"
                //                                 src={`${window.cdn}assets/tickets_06.png`}
                //                                 alt="tickets"
                //                             />
                //                         .
                //                 </p>

                //             )}
                //               { (
                //                 <p className="subtitle mb-2">
                //                     {extraEarning.ticket > 0
                //                         ? `${score} \u00f7 5 \u00d7 10 = ${(score/5)*10} `
                //                         : `${score} \u00f7 5 \u00d7 10 = ${(score/5)*10} `}
                //                          <img
                //                                 width="20"
                //                                 src={`${window.cdn}assets/tickets_06.png`}
                //                                 alt="tickets"
                //                             />
                //                 </p>

                //             )}

                //             {(extraEarning.ticket > 0 ||
                //                 extraEarning.experience > 0) && (
                //                 <div className="benefit d-flex align-items-center justify-content-center">
                //                     {extraEarning.ticket > 0 && (
                //                         <p className="mb-0 earn-tickets d-flex align-items-center justify-content-center">
                //                             {extraEarning.ticket} tickets
                //                             {/* <img
                //                                 width="20"
                //                                 src={`${window.cdn}icons/tickets.png`}
                //                                 alt="tickets"
                //                             /> */}
                //                         </p>
                //                     )}
                //                     {extraEarning.ticket > 0 &&
                //                         extraEarning.experience > 0 && (
                //                             <p className="mx-3 mb-0">{"&"}</p>
                //                         )}
                //                     {extraEarning.experience > 0 && (
                //                         <p className="mb-0 earn-exp d-flex align-items-center justify-content-center">
                //                             {extraEarning.experience}{" "} exp
                //                             {/* <img
                //                                 width="20"
                //                                 src={`${window.cdn}icons/exp_01.png`}
                //                                 alt="star"
                //                             /> */}
                //                         </p>
                //                     )}
                //                 </div>
                //             )}

                //              {/* TICKETS INFO */}
                //              <div className="total-tickets-container d-flex justify-content-between">
                //                 <div className="total" >Total </div>
                //                 <div className="number" >10 &nbsp;
                //                 <img
                //                         src={`${window.cdn}assets/tickets_06.png`}
                //                         alt="tickets"
                //                 />
                //                 </div>

                //             </div>

                //     <div className="p-0 btn-wrapper d-inline-flex p-2 mt-4 col-12 p-3">
                //         {/* <button
                //             className={`btn-results ${
                //                 leaderboardHistory.length > 0
                //                     ? ""
                //                     : "opacity-0-5"
                //             }`}
                //             onClick={
                //                 leaderboardHistory.length > 0
                //                     ? handleViewResult
                //                     : null
                //             }
                //             style={{
                //                 cursor:
                //                     leaderboardHistory.length > 0
                //                         ? "pointer"
                //                         : "default",
                //             }}
                //         >
                //             {leaderboardHistory.length > 0
                //                 ? "View Results"
                //                 : "Fetching Results"}
                //         </button> */}
                //         <button
                //             className="btn-yes w-100"
                //             onClick={handleContinueButton}
                //         >
                //             Continue
                //         </button>
                //     </div>
                // </>
                //     </div>
                // </div>
            )}
            {isSelectedNotificationShown.status && (
                <NotificationLeaderboard
                    id={isSelectedNotificationShown.cgId}
                    handleCloseLeaderboardHistory={
                        handleCloseLeaderboardHistory
                    }
                />
            )}
        </>
    );
};

export default GameEndModal;
