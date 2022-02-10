const CancelSubscriptionModal = ({
    handleModalButton,
    getExpiryDate,
    cancelDate,
}) => {
    return (
        <div className="container-fluid d-flex align-items-center justify-content-center modal-pop">
            <div className="modal-body-small">
                <p className="pt-4 mb-2 title pl-2">Cancel Subscription?</p>
                <p className="subtitle pl-2">
                    Your subscription will be cancelled at the end of your
                    billing period on {getExpiryDate(cancelDate)}. You can
                    change your mind any time before this date.
                </p>

                <div className="p-0 btn-wrapper d-flex mt-4">
                    <button
                        className="col btn-no"
                        onClick={() => handleModalButton("no")}
                    >
                        Keep Subscription
                    </button>
                    <button
                        className="col btn-yes"
                        onClick={() => handleModalButton("yes")}
                    >
                        Cancel Subscription
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CancelSubscriptionModal;
