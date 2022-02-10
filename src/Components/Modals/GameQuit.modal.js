const GameQuitModal = ({ handleModalButton }) => {
    return (
        <div className="container-fluid d-flex align-items-center justify-content-center modal-pop">
            <div className="modal-body-small">
                <p className="pt-4 mb-2 title pl-2 text-danger">Quit Game?</p>
                <p className="subtitle pl-2 mb-3">
                    You will lose your current game score if you exit now and
                </p>
                <p className="pl-2 text-danger">Gems used will not be refunded if you leave the game now.</p>

                <div className="p-0 btn-wrapper d-flex mt-4">
                    <button
                        className="col btn-no"
                        onClick={() => handleModalButton("no")}
                    >
                        Cancel
                    </button>
                    <button
                        className="col bg-danger text-white"
                        onClick={() => handleModalButton("yes")}
                    >
                        Yes, quit game.
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GameQuitModal;
