import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import refreshToken from "Utils/RefreshToken";

const StayTune = () => {
    const { user } = useSelector((state) => state.userData);
    const { gamesList } = useSelector((state) => state.gamesList);

    const [gameData, setGameData] = useState("");

    useEffect(() => {
        window.isGameDemo = true;
        return () => {
            window.isGameDemo = false;
        };
    }, []);

    const handlePlayDemoGame = async (id) => {
        const token = await refreshToken();
        if (token) {
            if (id > 0) {
                try {
                    let url = `${process.env.REACT_APP_GLOADER_ENDPOINT}/sloader?game_id=${id}&user_id=${user.id}`;
                    let options = {
                        headers: {
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Methods":
                                "POST, GET, OPTIONS",
                            Authorization: token,
                        },
                    };
                    let response = await axios.get(url, options);
                    if (response.data) {
                        setGameData(response.data);
                    }
                } catch (error) {
                    console.log(error.message);
                }
            }
        }
    };

    const handleQuitGame = () => setGameData("");

    window.endDemoGame = () => setGameData("");

    return (
        <>
            {gameData && (
                <>
                    <img
                        className="ml-1 mt-1 quit-demo-btn"
                        width="40"
                        src={`${window.cdn}buttons/button_close_02.png`}
                        alt="Close Button"
                        onClick={handleQuitGame}
                    />
                    <iframe
                        title="game"
                        id="demo-game"
                        srcDoc={gameData}
                        frameBorder="0"
                    />
                </>
            )}
            <div className="container-fluid stay-tune">
                <div className="row">
                    <div className="col-12 col-lg-8 mx-auto d-flex flex-column align-items-center justify-content-center min-vh-100">
                        <h1 data-title="Stay Tuned!">Stay Tuned!</h1>
                        <p className="mb-1">
                            We'll be back with more rewards for you.
                        </p>
                        <p className="mb-4">
                            Here're some games for you while you wait.
                        </p>
                        <div className="row justify-content-md-center">
                            {gamesList.map((e, idx) => (
                                <div
                                    className="col-4 col-md-2 col-lg-2 d-flex align-items-center justify-content-center game-icon mb-2 mb-md-0"
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
                    </div>
                </div>
            </div>
        </>
    );
};

export default StayTune;
