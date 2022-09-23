const RetrySubmitModal = ({
    handleOk,
    handleClose,
    disableRetry,
    title,
    subtitle,
    ok_button_text = "",
    close_button_text = "",
}) => {
    const showOkBtn = ok_button_text !== "";
    const showCloseBtn = close_button_text !== "";

    return (
        <div className="container-fluid d-flex align-items-center justify-content-center modal-pop">
            <div className="modal-body-small">
                <p className="pt-4 mb-2 title pl-2">{title}</p>
                <p className="subtitle pl-2">{subtitle}</p>

                <div className="p-0 btn-wrapper d-flex mt-4">
                    {showCloseBtn && (
                        <button className="col btn-no" onClick={handleClose}>
                            {close_button_text}
                        </button>
                    )}
                    {showOkBtn && (
                        <button
                            className={`col btn-yes ${
                                !disableRetry ? "" : "opacity-0-5"
                            }`}
                            onClick={!disableRetry ? handleOk : null}
                        >
                            {ok_button_text}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RetrySubmitModal;
