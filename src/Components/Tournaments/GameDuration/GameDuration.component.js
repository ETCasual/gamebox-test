// REACT, REDUX & 3RD PARTY LIBRARIES
import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";

// REDUX THUNKS TO CALL SERVICES (AYSNC) AND ADD DATA TO STORE
import loadLeaderboardRanks from "redux/thunks/LeaderboardRanks.thunk";
import loadCurrentGameRules from "redux/thunks/CurrentGameRules.thunk";

// HELPER FUNCTION
import convertSecondsToHours from "Utils/TimeConversion";

const GameDuration = ({
    game,
    index,
    data,
    timer,
    setTimer,
    handleGameLeaderPanel,
    setEarnAdditionalDisabledStatus,
}) => {
    // GAME ID
    const gameId = game.gameId;

    const dispatch = useDispatch();

    const [isGameAvailable, setIsGameAvailable] = useState(false);

    // GAME DURATION REF
    let watcherRef = useRef(null);

    // LEADERBOARD RANK & ADDITIONAL TICKETS RULES
    useEffect(() => {
        setIsGameAvailable(false);
        if (gameId > 0) {
            dispatch(loadLeaderboardRanks(gameId));
            dispatch(loadCurrentGameRules(gameId));
        }
    }, [gameId, dispatch, setIsGameAvailable]);

    // STARTING COUNTDOWN TIMER
    useEffect(() => {
        clearInterval(watcherRef.current);
        watcherRef.current = setInterval(() => {
            let finalTimeRef = convertSecondsToHours(
                data?.gameInfo[0]?.endTimeStamp
            );
            setTimer(finalTimeRef);

            if (finalTimeRef === "Ended") {
                setIsGameAvailable(false);
                countDownTimerEnded();
            } else if (
                finalTimeRef !== "0d 0h 0m 0s" ||
                finalTimeRef !== "Ended"
            )
                setIsGameAvailable(true);
        }, 1000);

        // END COUNTDOWN TIMER
        function countDownTimerEnded() {
            clearInterval(watcherRef.current);
            watcherRef.current = null;

            setIsGameAvailable(false);
            setEarnAdditionalDisabledStatus({
                gems: false,
                ads: false,
            });
        }

        return () => {
            clearInterval(watcherRef.current);
            watcherRef.current = null;
        };
    }, [data, setTimer, setIsGameAvailable, setEarnAdditionalDisabledStatus]);

    const onClickEnterGame = () => {
        if (isGameAvailable) {
            handleGameLeaderPanel(
                gameId,
                index,
                game.gameTitle,
                game.gameIcon,
                game.endTimeStamp
            );
        } else return null;
    };

    return (
        <>
            <div
                className={`col-10 col-md-7 col-lg-6 col-xl-4 mb-3`}
                style={{
                    opacity: isGameAvailable ? "1" : "0.5",
                    pointerEvents: isGameAvailable ? "" : "none",
                }}
                onClick={onClickEnterGame}
            >
                <div
                    className="game-card d-flex flex-column align-items-end justify-content-end"
                    style={{ backgroundImage: `url(${game.gameIcon})` }}
                >
                    <div className="transparent-overlay p-2 text-left">
                        <div className="game-title mb-1">{game.gameTitle}</div>
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="tournament-end-in-text">
                                Tournament ends in
                            </div>
                            <div className="game-duration">
                                {timer || "0d 0h 0m 0s"}
                            </div>
                        </div>
                    </div>
                </div>
                <button className="join">Join Tournament</button>
            </div>
        </>
    );
};

export default GameDuration;
