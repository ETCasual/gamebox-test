import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import getToken from "Utils/GetToken";
import GameEndModal from "Components/Modals/GameEnd.modal";
import PauseMenuModal from "Components/Modals/PauseMenuModal";
import GameQuitModal from "Components/Modals/GameQuit.modal";

const StayTune = () => {
    const { user } = useSelector((state) => state.userData);
    const { gamesList } = useSelector((state) => state.gamesList);

    const [gameData, setGameData] = useState("");
    const [scoreObject, setScoreObject] = useState({});

    const [modalStatus, setModalStatus] = useState({
        isGamePaused: false,
        isGameOver: false,
        isPendingQuitGameConfirmation: false,
    });

    const [isMute, setIsMute] = useState(window.localStorage.getItem("mute"));

    useEffect(() => {
        window.isGameDemo = true;
        return () => {
            window.isGameDemo = false;
        };
    }, []);

    const handlePlayDemoGame = async (id) => {
        const token = getToken();
        if (id > 0) {
            try {
                let url = `${process.env.REACT_APP_GLOADER_ENDPOINT}/sloader?game_id=${id}&user_id=${user.id}`;
                let options = {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
                        Authorization: `Bearer ${token}`,
                    },
                };
                let response = await axios.get(url, options);
                if (response.data) {
                    setModalStatus(() => ({
                        isGamePaused: false,
                        isGameOver: false,
                        isPendingQuitGameConfirmation: false,
                    }));
                    setGameData(response.data);
                }
            } catch (error) {
                console.log(error.message);
            }
        }
    };

    window.handleQuitGame = () => {
        triggerQuitGameConfirmation();
    };

    const triggerQuitGameConfirmation = () => {
        setModalStatus((prev) => ({
            ...prev,
            isPendingQuitGameConfirmation: true,
        }));
    };

    const handleQuitGameAction = (choice) => {
        setModalStatus((prev) => ({
            ...prev,
            isPendingQuitGameConfirmation: false,
        }));

        if (choice === "yes") {
            setGameData(false);
        } else if (choice === "no") {
            resumeGame();
        }
    };

    window.endDemoGame = () => setGameData("");

    window.playerFinishGame = async (score) => {
        setScoreObject(score);
        setModalStatus((prev) => ({
            ...prev,
            isGameOver: true,
        }));
    };

    window.pauseGame = () => {
        if (modalStatus.isPendingQuitGameConfirmation) return;
        if (modalStatus.isGameOver) return;

        setModalStatus((prev) => ({
            ...prev,
            isGamePaused: true,
        }));
    };

    const resumeGame = () => {
        setModalStatus((prev) => ({
            ...prev,
            isGamePaused: false,
        }));
        let destination = document.getElementById("demo-game")?.contentWindow;
        console.log(document.getElementById("demo-game"));
        destination?.resumeGame?.();
        destination.focus();
    };

    return (
        <>
            {gameData && (
                <div className="game-wrapper">
                    <iframe
                        title="game"
                        id="demo-game"
                        srcDoc={gameData}
                        frameBorder="0"
                    />

                    {/* MODAL FOR GAME OVER */}
                    {modalStatus.isGameOver && (
                        <GameEndModal
                            score={scoreObject.a}
                            handleContinueButton={() => {
                                setGameData(false);
                                setModalStatus((prev) => ({
                                    ...prev,
                                    isGameOver: false,
                                }));
                            }}
                            isShowTournamentEndedText={false}
                            currentGameBoosterInfo={{
                                isUseBooster: false,
                                extraTickets: false,
                                scoreNeededPerExtraTickets: false,
                            }}
                        />
                    )}

                    {/* MODAL FOR GAME PAUSED */}
                    {modalStatus.isGamePaused && (
                        <PauseMenuModal
                            handleResumeButton={() => {
                                resumeGame();
                                // setIsGameLeaderboardShown(false);
                            }}
                            handleQuitButton={() => {
                                triggerQuitGameConfirmation();
                            }}
                            handleAudioButton={() => {
                                isMute === "true"
                                    ? setIsMute("false")
                                    : setIsMute("true");

                                let destination =
                                    document.getElementById(
                                        "demo-game"
                                    )?.contentWindow;
                                destination?.toggleAudioOnOff?.();
                            }}
                            isMute={isMute}
                        />
                    )}

                    {modalStatus.isPendingQuitGameConfirmation && (
                        <GameQuitModal
                            onActionCallback={handleQuitGameAction}
                            isShowWarningMessage={false}
                        />
                    )}
                </div>
            )}
            <div className="container-fluid stay-tune">
                <div className="row">
                    <div className="col-10 col-lg-5 mx-auto d-flex flex-column align-items-center justify-content-center min-vh-100">
                        <h1 className="title">Stay Tuned!</h1>
                        <p className="mb-1 subtitle-1 text-center">
                            We'll be back with more rewards for you.
                        </p>
                        {
                            <p className="mb-4 subtitle-2 text-center">
                                Here're some games for you while you wait.
                            </p>
                        }
                        {
                            <div className="row justify-content-md-center">
                                {gamesList.map((e, idx) => (
                                    <div
                                        className="col-4 col-md-3 mb-4 px-0 d-flex align-items-center justify-content-center game-icon"
                                        key={`game-${idx}`}
                                    >
                                        <img
                                            className="img-fluid"
                                            onClick={() =>
                                                handlePlayDemoGame(e.gameId)
                                            }
                                            src={e.gameIcon}
                                            alt={e.gameTitle}
                                        />
                                    </div>
                                ))}
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default StayTune;
