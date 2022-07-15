const PauseMenuModal = ({ handleResumeButton, handleQuitButton }) => {
    return (
        <>
            {
                <div className="container-fluid d-flex align-items-center justify-content-center modal-pop">
                    <div className="game-pause-panel col-12 col-md-4 col-xl-4 position-relative">
                        {/* CARD */}
                        <div className="row justify-content-center mt-3 mt-sm-3 px-0">
                            <div className="col-10 col-lg-8 mb-4 px-0 ">
                                <p className="text-center panel-title">
                                    GAME PAUSED
                                </p>

                                <p className="game-time-text text-center mb-5">
                                    Game time still continue running...
                                </p>

                                <button
                                    className="resume-button d-block text-center mx-auto mt-5 py-3"
                                    onClick={handleResumeButton}
                                >
                                    RESUME
                                </button>

                                <button
                                    className="quit-button d-block text-center mx-auto mt-4 py-3"
                                    onClick={handleQuitButton}
                                >
                                    QUIT
                                </button>
                            </div>

                            <div className="bottom-buttons-container row text-center align-items-center">
                                <p className="game-tutorial col-6 d-flex align-items-center d-flex my-auto">
                                    <img
                                        width="40"
                                        src={`${window.cdn}buttons/icon_tutorial.png`}
                                        alt="tickets"
                                    />
                                    <span>Game Tutorial</span>
                                </p>
                                <p className="audio-control col-6  d-flex align-items-center d-flex my-auto">
                                    <img
                                        width="40"
                                        src={`${window.cdn}buttons/icon_audio_on.png`}
                                        alt="tickets"
                                    />
                                    <span>Turn off audio</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default PauseMenuModal;
