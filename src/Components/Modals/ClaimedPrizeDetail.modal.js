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
                            <div className="prize-img m-auto">
                                <img
                                    className="img-fluid"
                                    src={data.prizeImageUrl}
                                    alt="prize"
                                />
                            </div>
                            <div className="claim-info p-3 text-center">
                                <div className="prize-info">
                                    <div className="prize-text m-2 p-3">
                                        <p className="title mb-1">
                                            {data.prizeTitle}
                                        </p>
                                        {/* <p className="subtitle mb-0">
                                            {data.prizeSubtitle}
                                        </p> */}
                                        <div className="content">
                                            PrizeID: {data?.prizeContent}
                                        </div>
                                    </div>
                                </div>


                                {/*  RECEIVER INFO */}
                                <div className="delivery-address mt-4">
                                    <p className="title mb-2">NFT delivered to wallet address</p>
                                    <p className="wallet-address">
                                        {data.userNickName}
                                    </p>
                                </div>

                                <div className="separator my-4"></div>

                                {/* CLAIM DATE */}
                                <div className="claimed-date mb-2">
                                    <p className="title mb-0">
                                        <span className="date">
                                            {dateMonthYear}
                                        </span>
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
