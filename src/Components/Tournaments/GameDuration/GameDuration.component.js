// REACT, REDUX & 3RD PARTY LIBRARIES
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

// REDUX THUNKS TO CALL SERVICES (AYSNC) AND ADD DATA TO STORE
import loadLeaderboardRanks from "redux/thunks/LeaderboardRanks.thunk";
import loadCurrentGameRules from "redux/thunks/CurrentGameRules.thunk";

// HELPER FUNCTION
import { convertSecondsToHours } from "Utils/TimeConversion";
import { useTranslation } from "react-i18next";
import { useTime } from "Utils/hooks/useTime";

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

    const { config } = useSelector((state) => state.config);

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
    }, [gameId, index, game, dispatch, setIsGameAvailable]);

    // STARTING COUNTDOWN TIMER
    useEffect(() => {
        clearInterval(watcherRef.current);
        watcherRef.current = setInterval(() => {
            let finalTimeRef = convertSecondsToHours(
                data?.gameInfo[0]?.endTimeStamp * 1000,
                config.offsetTimestamp ? config.offsetTimestamp : 0
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
    }, [
        data,
        setTimer,
        setIsGameAvailable,
        setEarnAdditionalDisabledStatus,
        config,
    ]);

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

    const { t } = useTranslation();

    return (
        <div
            className={`col-8 col-md-6 col-lg-5 col-xl-5 mb-3 ${
                index > 0 ? "px-2" : ""
            } ${isGameAvailable ? "" : "opacity-0-5"}`}
            style={{
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
                            {t("tournament.ends_in")}
                        </div>
                        <div className="game-duration">{useTime(timer)}</div>
                    </div>
                </div>
            </div>
            <button className="join">{t("tournament.join")}</button>
        </div>
    );
};

export default GameDuration;
