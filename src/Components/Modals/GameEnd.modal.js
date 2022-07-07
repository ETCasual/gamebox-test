import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import NotificationLeaderboard from "Components/Notifications/LeaderboardHistory/LeaderboardHistory.component";

import loadLeaderboardHistory from "redux/thunks/LeaderboardHistory.thunk";
import loadLeaderboardRanks from "redux/thunks/LeaderboardRanks.thunk";

const GameEndModal = ({ handleContinueButton ,isShowTournamentEndedText}) => {
    const score = localStorage.getItem("currentGameScore");

    const dispatch = useDispatch();

    const { leaderboardHistory } = useSelector(
        (state) => state.leaderboardHistory
    );
    const { extraEarning } = useSelector((state) => state.playerTournamentInfo);

    const [isSelectedNotificationShown, setIsSelectedNotificationShown] =
        useState({
            status: false,
            cgId: null,
            gameId: null,
            type: "tour",
        });

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

    const handleViewResult = () => {
        if (
            isSelectedNotificationShown.cgId > 0 &&
            isSelectedNotificationShown.gameId > 0 &&
            isSelectedNotificationShown.type === "tour"
        ) {
            setIsSelectedNotificationShown((prev) => ({
                ...prev,
                status: true,
            }));
        }
    };

    const handleCloseLeaderboardHistory = () => {
        setIsSelectedNotificationShown((prev) => ({
            ...prev,
            status: false,
        }));
        handleContinueButton();
    };

    return (
        <>
            {!isSelectedNotificationShown.status && (
                 <div className="container-fluid d-flex align-items-center justify-content-center modal-pop">
                 <div className="game-result-panel col-12 col-md-10 col-xl-6 position-relative">
                     {/* CARD */}
                     <div className="row justify-content-center mt-3 mt-sm-3">
                         <div className="col-10 col-lg-8 mb-3 pl-2 pr-1">
                             {/* <div className="card-prize d-flex flex-column flex-sm-row m-auto"> */}
                            <p className="text-center panel-title">
                                            GAME RESULT
                                         </p>

                            {isShowTournamentEndedText&&(
                                <p className="text-center tournament-has-ended-text">
                                            (The tournament has ended)
                            </p>
                            )}
                          
                            {score && (
                                <p className="text-center score-text mt-5 mb-0">
                                Score
                                </p>  
                           )}
                              
                           {score && (
                              <p className="text-center score-number ">
                                {score}
                              </p>
                           )}
                         
 
                             <div className="d-flex flex-row justify-content-center text-center py-0 align-items-center mt-5">
                                 <p className="pr-2 ticket-rate-text-score">
                                     every 50 score
                                    
                                 </p>
                                 <p className=" ticket-rate-text-ticket d-flex tickets-amount align-items-center">
                                 <span className="mr-2">+10</span>
                                      <img
                                        width="20"
                                        src={`${window.cdn}assets/tickets_05.png`}
                                        alt="tickets"
                                 />
                                 </p>
                                
                             </div>
                             <div className="row text-center mx-auto total-tickets-earned align-items-center">
                             <p className=" col py-2 pl-2 pr-2 you-earned d-flex m-auto justify-content-end">
                                    You earned
                                 </p>
                                 <p className="col pr-2 d-flex tickets-amount align-items-center d-flex m-auto">
                                    <span className="mr-2">20</span>
                                      <img
                                        width="40"
                                        src={`${window.cdn}assets/tickets_05.png`}
                                        alt="tickets"
                                 />
                                 </p>
                              
                            </div>
                            <button
                                className="continue-button d-block text-center mx-auto mt-4 py-3"
                                onClick={handleContinueButton}
                            >
                                Continue
                            </button>

                            <button
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
                            </button>
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
                //                                 src={`${window.cdn}assets/tickets_05.png`}
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
                //                                 src={`${window.cdn}assets/tickets_05.png`}
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
                //                         src={`${window.cdn}assets/tickets_05.png`}
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
