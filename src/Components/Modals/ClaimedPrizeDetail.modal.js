const ClaimedPrizeDetailModal = ({ data, onCloseButtonClick }) => {
    const date = new Date(data.claimedOn * 1000);
    const dateMonthYear = date.toLocaleString("default", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });

    return (
        <div className="claim-prize-detail-modal">
            <div className="col-12">
                <div className="row justify-content-center">
                    <div className="col-11 col-md-6 col-lg-4 col-xl-4 d-flex flex-column">
                        <div className="wrapper w-100">
                            {/* BACK BUTTON */}
                            <img
                                onClick={onCloseButtonClick}
                                className="close-button"
                                width="38"
                                src={`${window.cdn}art_assets/buttons/button_close_01.png`}
                                alt="close-btn"
                            />
                            {/* CONTENT */}
                            <div className="prize-info">
                                <div className="overlay"></div>
                                <img
                                    className="img-fluid"
                                    src={data.prizeImageUrl}
                                    alt="prize"
                                />
                                <div className="badge d-flex align-items-center">
                                    {data?.prizeContent}
                                </div>
                                <div className="prize-text">
                                    <p className="title mb-1">
                                        {data.prizeTitle}
                                    </p>
                                    <p className="subtitle mb-0">
                                        {data.prizeSubtitle}
                                    </p>
                                </div>
                            </div>
                            <div className="claim-info p-3">
                                {/* CLAIM DATE */}
                                <div className="claimed-date d-flex mb-4">
                                    <p className="title mb-0">
                                        Claimed on{" "}
                                        <span className="date">
                                            {dateMonthYear}
                                        </span>
                                    </p>
                                </div>

                                <div className="separator"></div>

                                {/*  RECEIVER INFO */}
                                <div className="delivery-address mt-4">
                                    <p className="title mb-2">Delivered to </p>
                                    <p className="name mb-1">
                                        {data.userNickName}
                                    </p>
                                    <p className="email mb-1">
                                        {data.userEmail}
                                    </p>
                                    <p className="phone mb-4">
                                        {data.userPhone}
                                    </p>
                                    <p className="address mb-0">
                                        {data.userAddress}
                                    </p>
                                    <p className="city mb-0">{data.userCity}</p>
                                    <p className="zipcode mb-0">
                                        {data.userZipcode}
                                    </p>
                                    <p className="state mb-0">{data.userState}</p>
                                    <p className="country">
                                        {data.userCountry}
                                    </p>
                                </div>
                                {/* TRACKING */}
                                <div className="tracking mt-5">
                                    <p className="title mb-2">
                                        Tracking Number
                                    </p>
                                    <p className="tracking-number mb-1">
                                        {data.shipTracking === ""
                                            ? "..."
                                            : data.shipTracking}
                                    </p>
                                    <p className="company-name">
                                        {data.deliveryCompany === ""
                                            ? "..."
                                            : data.deliveryCompany}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClaimedPrizeDetailModal;
