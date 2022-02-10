const GameInstructionsModalPopup = ({ handleInstructionsCloseBtn }) => {
    return (
        <div className="container-fluid d-flex align-items-center justify-content-center modal-pop ">
            <div className="modal-body-small position-relative">
                <img
                    className="close-button"
                    onClick={handleInstructionsCloseBtn}
                    width="38"
                    src={`${window.cdn}art_assets/buttons/button_close_01.png`}
                    alt="close-btn"
                />
                <div className="col-12">
                    <h5 className="title">How to win prizes?</h5>
                    <p className="subtitle">Follow these 4 simple steps.</p>
                    <ul className="my-4 list-unstyled">
                        <li className="row">
                            <div className="col-3 col-md-2 step">
                                <p className="mb-0">Step 1</p>
                            </div>
                            <div className="col-9 col-md-10 px-0 instruction">
                                <p className="mb-0">
                                    Select the prize you would like to win.
                                </p>
                            </div>
                        </li>
                        <li className="row">
                            <div className="col-3 col-md-2 step">
                                <p className="mb-0">Step 2</p>
                            </div>
                            <div className="col-9 col-md-10 px-0 instruction">
                                <p className="mb-0">
                                    Participate in the tournament.
                                </p>
                            </div>
                        </li>
                        <li className="row">
                            <div className="col-3 col-md-2 step">
                                <p className="mb-0">Step 3</p>
                            </div>
                            <div className="col-9 col-md-10 px-0 instruction">
                                <p className="mb-0">
                                    Win and earn tickets at the end of
                                    tournament.
                                </p>
                            </div>
                        </li>
                        <li className="row">
                            <div className="col-3 col-md-2 step">
                                <p className="mb-0">Step 4</p>
                            </div>
                            <div className="col-9 col-md-10 px-0 instruction">
                                <p className="mb-0">
                                    Enter new tournaments to collect more
                                    tickets.
                                </p>
                            </div>
                        </li>
                    </ul>
                    <p className="subtitle">
                        Pro tip: The more tickets you have, the higher chance to
                        win the prize.
                    </p>
                    <h5 className="title">How it works?</h5>
                    <p className="subtitle">
                        When the total amount of tickets (global tickets)
                        reaches the allocated number, your tickets (along with
                        other players' tickets) will enter a pool. The winner
                        will be chosen based on the ticket drawn from the pool
                        randomly.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default GameInstructionsModalPopup;
