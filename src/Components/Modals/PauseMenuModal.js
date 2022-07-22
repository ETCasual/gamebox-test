const PauseMenuModal = ({
    handleResumeButton,
    handleQuitButton,
    handleAudioButton,
    isMute,
}) => {
    return (
        <>
            {
                <div className="container-fluid d-flex align-items-center justify-content-center modal-pop">
                    <div className="game-pause-panel col-12 col-md-8 col-xl-6 col-xxl-5 position-relative">
                        {/* CARD */}
                        <div className="row justify-content-center mt-3 mt-sm-3 px-0">
                            <div className="col-10 col-lg-8 mb-4 px-0 ">
                                {/*EXTRA MARGIN */}
                                <p className="my-5"></p>
                                <p className="text-center panel-title">
                                    GAME PAUSED
                                </p>

                                <p className="game-time-text text-center mb-5">
                                    Game time still continue running...
                                </p>

                                {/*EXTRA MARGIN */}
                                <p className="mt-2"></p>

                                <button
                                    className="resume-button d-block mx-auto text-center  mt-5 py-2"
                                    onClick={handleResumeButton}
                                >
                                    RESUME
                                </button>

                                <button
                                    className="quit-button d-block text-center mx-auto mt-3 py-2"
                                    onClick={handleQuitButton}
                                >
                                    QUIT
                                </button>
                                <div className="bottom-buttons-container d-flex flex-row mx-auto row mt-3">
                                    {/* <p className="col-5 my-auto px-0  d-flex align-items-center justify-content-between">
                                        <img
                                            src={`${window.cdn}buttons/icon_tutorial.png`}
                                            alt="tutorial"
                                        />
                                        <span className="pr-2">
                                            Game Tutorial
                                        </span>
                                    </p>
                                    <p className="col-2 my-auto px-0  d-flex"></p> */}

                                    {isMute === "true" ? (
                                        <p
                                            className="audio-btn col-5 my-auto  px-0  d-flex  align-items-center justify-content-between mx-auto"
                                            onClick={handleAudioButton}
                                        >
                                            <img
                                                src={`${window.cdn}buttons/icon_audio_off.png`}
                                                alt="audio"
                                            />
                                            <span>Turn on audio</span>
                                        </p>
                                    ) : (
                                        <p
                                            className="audio-btn col-5 my-auto  px-0  d-flex  align-items-center justify-content-between mx-auto"
                                            onClick={handleAudioButton}
                                        >
                                            <img
                                                src={`${window.cdn}buttons/icon_audio_on.png`}
                                                alt="audio"
                                            />
                                            <span>Turn off audio</span>
                                        </p>
                                    )}
                                </div>
                                {/*EXTRA MARGIN */}
                                <p className="my-5"></p>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default PauseMenuModal;
