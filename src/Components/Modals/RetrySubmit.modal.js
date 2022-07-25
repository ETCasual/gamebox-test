const RetrySubmitModal = ({
    handleRetry,
    handleCancel,
    disableRetry,
    title,
    subtitle,
}) => {
    return (
        <div className="container-fluid d-flex align-items-center justify-content-center modal-pop">
            <div className="modal-body-small">
                <p className="pt-4 mb-2 title pl-2">{title}</p>
                <p className="subtitle pl-2">{subtitle}</p>

                <div className="p-0 btn-wrapper d-flex mt-4">
                    <button className="col btn-no" onClick={handleCancel}>
                        SKIP
                    </button>
                    <button
                        className={`col btn-yes ${
                            !disableRetry ? "" : "opacity-0-5"
                        }`}
                        onClick={!disableRetry ? handleRetry : null}
                    >
                        RETRY
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RetrySubmitModal;
