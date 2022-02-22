const BuySpinConfirmModalPopup = ({
    handleYes,
    handleNo,
    gemAmount,
    spinAmount,
}) => {
    return (
        <div className="container-fluid d-flex align-items-center justify-content-center modal-pop">
            <div className="modal-body-small">
                <p className="pt-4 mb-2 title pl-2">You've run out of spins.</p>
                <p className="subtitle pl-2">
                    Get {spinAmount} more spins with {gemAmount} gems
                </p>

                <div className="p-0 btn-wrapper d-flex mt-4">
                    <button className="col btn-no" onClick={handleNo}>
                        Cancel
                    </button>
                    <button className="col btn-yes" onClick={handleYes}>
                        Use {gemAmount} gems
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BuySpinConfirmModalPopup;
