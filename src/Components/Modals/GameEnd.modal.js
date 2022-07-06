import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import NotificationLeaderboard from "Components/Notifications/LeaderboardHistory/LeaderboardHistory.component";

import loadLeaderboardHistory from "redux/thunks/LeaderboardHistory.thunk";
import loadLeaderboardRanks from "redux/thunks/LeaderboardRanks.thunk";

const GameEndModal = ({ handleContinueButton ,panelTitle}) => {
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
                 <div className="game-result-panel col-12 col-md-10 col-lg-8 position-relative">
                     {/* CARD */}
                     <div className="row justify-content-center mt-3 mt-sm-5">
                         <div className="col-10 col-md-8 col-lg-8 mb-3 pl-2 pr-1">
                             {/* <div className="card-prize d-flex flex-column flex-sm-row m-auto"> */}
                            <p className="text-center panel-title my-2">
                                            GAME RESULT
                                         </p>
                            <p className="text-center score-text my-1">
                            score
                            </p>
                            <p className="text-center score-number my-2">
                                           {score}
                                         </p>
 
                             <div className="text-center my-2 my-sm-4">
                                 <p className="tickets-label mb-1 mb-sm-2">
                                     Tickets you have collected
                                 </p>
                               
                             </div>
                             <div className="mx-auto my-2 my-sm-4">
                                <button
                                    className="continue-button d-block text-center m-auto"
                                    onClick={handleContinueButton}
                                >
                                   Continue
                                </button>
                            </div>
                             {/* <div className="line" />
                             <p className="instructions-title text-center">
                                 How to win tickets for the Bonus Draw?
                             </p>
                             <p className="instructions-subtitle text-center">
                                 Participate in any tournament throughout the
                                 platform before the timer runs out.
                                 <br />
                                 Tickets won from the tournaments will
                                 automatically be added into the Bonus Draw pool.
                                 It’s that easy.
                             </p>
                             <p className="instructions-tip text-center mb-0 mb-sm-4">
                                 Tip: Earn more tickets by “spent gems” to
                                 increase your ticket count.
                             </p> */}
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
