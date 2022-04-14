const CancelSubModalPopup = ({ setCancelModal }) => {
    return (
        <div className="container-fluid d-flex align-items-center justify-content-center modal-pop ">
            <div className="modal-body-small position-relative">
                <img
                    className="close-button"
                    onClick={() => setCancelModal(false)}
                    width="36"
                    src={`${window.cdn}buttons/button_close.png`}
                    alt="close-btn"
                />
                <div className="col-12">
                    <h5 className="title">How to cancel your subscription.</h5>
                    <p className="subtitle">Follow these 2 simple steps.</p>
                    <ul className="my-4 list-unstyled">
                        <li className="row">
                            <div className="col-3 col-md-2 step">
                                <p className="mb-0">Step 1</p>
                            </div>
                            <div className="col-9 col-md-10 px-0 instruction">
                                <p className="mb-0">
                                    Head to your account settings.
                                </p>
                            </div>
                        </li>
                        <li className="row">
                            <div className="col-3 col-md-2 step">
                                <p className="mb-0">Step 2</p>
                            </div>
                            <div className="col-9 col-md-10 px-0 instruction">
                                <p className="mb-0">
                                    Tap “<b>Cancel Subscription</b>” on the
                                    subscription panel to unsubscribe.
                                </p>
                            </div>
                        </li>
                    </ul>
                    <p className="subtitle">
                        Your subscription will stop on the next cycle. Your
                        current subscription will still be active for the
                        remaining duration.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CancelSubModalPopup;
