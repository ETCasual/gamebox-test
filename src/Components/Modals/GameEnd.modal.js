import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import NotificationLeaderboard from "Components/Notifications/LeaderboardHistory/LeaderboardHistory.component";

import loadLeaderboardHistory from "redux/thunks/LeaderboardHistory.thunk";
import loadLeaderboardRanks from "redux/thunks/LeaderboardRanks.thunk";

const GameEndModal = ({ handleContinueButton }) => {
    const score = localStorage.getItem("currentGameScore");

    const dispatch = useDispatch();

    const { notificationList } = useSelector((state) => state.notifications);
    const { leaderboardHistory } = useSelector(
        (state) => state.leaderboardHistory
    );
    const { leaderRuleRanks } = useSelector((state) => state.leaderboardRanks);
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
        }, 3000);

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
                    <div className="modal-body-small text-center">
                        <>
                            <p className="title">The tournament has ended.</p>
                            {score && (
                                <p className="subtitle">
                                    You scored {score} points.
                                </p>
                            )}
                            {extraEarning.ticket > 0 &&
                                extraEarning.experience > 0 && (
                                    <p className="subtitle mb-2">
                                        Additional tickets and experience points
                                        earned
                                    </p>
                                )}

                            {(extraEarning.ticket > 0 ||
                                extraEarning.experience > 0) && (
                                <p className="subtitle mb-2">
                                    {extraEarning.ticket > 0
                                        ? "Additional tickets earned"
                                        : ""}
                                    {extraEarning.experience > 0
                                        ? "Additional Experience points earned"
                                        : ""}
                                </p>
                            )}

                            {(extraEarning.ticket > 0 ||
                                extraEarning.experience > 0) && (
                                <div className="benefit d-flex align-items-center justify-content-center">
                                    {extraEarning.ticket > 0 && (
                                        <p className="mb-0 earn-tickets d-flex align-items-center justify-content-center">
                                            + {extraEarning.ticket}
                                            <img
                                                width="20"
                                                src={`${window.cdn}icons/tickets.png`}
                                                alt="tickets"
                                            />
                                        </p>
                                    )}
                                    {extraEarning.ticket > 0 &&
                                        extraEarning.experience > 0 && (
                                            <p className="mx-3 mb-0">{"&"}</p>
                                        )}
                                    {extraEarning.experience > 0 && (
                                        <p className="mb-0 earn-exp d-flex align-items-center justify-content-center">
                                            + {extraEarning.experience}{" "}
                                            <img
                                                width="20"
                                                src={`${window.cdn}icons/exp_01.png`}
                                                alt="star"
                                            />
                                        </p>
                                    )}
                                </div>
                            )}
                            <div className="p-0 btn-wrapper d-flex flex-column mt-4">
                                <button
                                    className={`btn-results ${
                                        leaderboardHistory.length > 0
                                            ? ""
                                            : "opacity-0-5"
                                    }`}
                                    onClick={handleViewResult}
                                >
                                    View results
                                </button>
                                <button
                                    className="btn-continue"
                                    onClick={handleContinueButton}
                                >
                                    Continue
                                </button>
                            </div>
                        </>
                    </div>
                </div>
            )}
            {isSelectedNotificationShown.status && (
                <NotificationLeaderboard
                    id={isSelectedNotificationShown.cgId}
                    notificationList={notificationList}
                    leaderboardHistory={leaderboardHistory}
                    leaderRuleRanks={leaderRuleRanks}
                    handleCloseLeaderboardHistory={
                        handleCloseLeaderboardHistory
                    }
                />
            )}
        </>
    );
};

export default GameEndModal;
