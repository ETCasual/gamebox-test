const GameQuitModal = ({ onActionCallback }) => {
    return (
        <>
            {
                <div className="container-fluid d-flex align-items-center justify-content-center modal-pop">
                    <div className="game-quit-panel col-12 col-md-8 col-xl-6 col-xxl-5 position-relative">
                        {/* CARD */}
                        <div className="row justify-content-center mt-3 mt-sm-3 px-0">
                            <div className="col-10 col-lg-8 mb-4 px-0 ">
                                {/*EXTRA MARGIN */}
                                <p className="my-5"></p>
                                <p className="text-center panel-title text-danger">
                                    QUIT GAME?
                                </p>

                                <p className="game-warning-text text-center  mb-0">
                                    You will lose your current game score if you
                                    exit now and{" "}
                                    <span className="text-danger">
                                        Gems will not be refunded
                                    </span>
                                    .
                                </p>
                            

                                {/*EXTRA MARGIN */}
                                <p className="mt-2"></p>

                                <button
                                    className="yes-button d-block bg-danger mx-auto text-center  mt-5 py-2"
                                    onClick={() => onActionCallback("yes")}
                                >
                                    YES, QUIT
                                </button>

                                <button
                                    className="cancel-button d-block text-center mx-auto mt-3 py-2"
                                    onClick={() => onActionCallback("no")}
                                >
                                    CANCEL
                                </button>
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

export default GameQuitModal;
