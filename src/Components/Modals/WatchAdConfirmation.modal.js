const WatchAdConfirmationModalPopup = ({ handleNo, handleYes }) => {
    return (
        <div className="container-fluid d-flex align-items-center justify-content-center modal-pop">
            <div className="modal-body-small">
                <p className="title">Confirm watch ads?</p>
                <p className="subtitle">
                    You will get the additional tickets immediately after every
                    game.
                </p>
                <div className="p-0 btn-wrapper d-flex mt-4">
                    <button className="btn-no col" onClick={handleNo}>
                        No
                    </button>
                    <button className="btn-yes col" onClick={handleYes}>
                        Yes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WatchAdConfirmationModalPopup;
