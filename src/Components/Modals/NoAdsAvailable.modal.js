const NoAdsAvailable = ({ handleNoAdAvailable }) => {
    return (
        <div className="container-fluid d-flex align-items-center justify-content-center modal-pop">
            <div className="modal-body-small">
                <p className="title">No Ads are available at the moment!</p>
                <p className="subtitle">
                    You are still able to get additional tickets.
                </p>
                <div className="p-0 btn-wrapper d-flex mt-4">
                    <button
                        className="btn-yes w-100"
                        onClick={handleNoAdAvailable}
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NoAdsAvailable;
