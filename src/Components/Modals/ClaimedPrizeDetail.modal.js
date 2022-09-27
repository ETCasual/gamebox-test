// COMPONENTS
import ThumbnailMedia from "Components/Global/ThumbnailMedia.component";
import { useTranslation } from "react-i18next";

// HELPER
import { defaultGameImage } from "Utils/DefaultImage";

const ClaimedPrizeDetailModal = ({ data, onCloseButtonClick }) => {
    const date = new Date(data.claimedOn * 1000);
    const dateMonthYear = date.toLocaleString("default", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });

    const { t } = useTranslation();

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
                                width="36"
                                src={`${window.cdn}buttons/button_close.png`}
                                alt="close-btn"
                            />
                            {/* CONTENT */}
                            <div className="prize-img mx-auto">
                                <ThumbnailMedia
                                    key={data.id}
                                    className="img-fluid"
                                    url={data?.prizeImageUrl}
                                    isPlayVideo={true}
                                    onError={(e) => defaultGameImage(e)}
                                />
                            </div>
                            <div className="claim-info p-3 text-center">
                                <div className="prize-info">
                                    <div className="prize-text m-2 p-3">
                                        <div className="content">
                                            {t("prize.token_id", {
                                                id: data?.prizeSubtitle,
                                            })}
                                        </div>
                                        <p className="title my-2">
                                            {data.prizeTitle}
                                        </p>
                                        <div className="content">
                                            {data?.prizeContent}
                                        </div>
                                    </div>
                                </div>

                                {/*  RECEIVER INFO */}
                                <div className="delivery-address mt-4">
                                    <p className="title mb-2">
                                        {t("prize.delivered")}
                                    </p>
                                    <p className="wallet-address">
                                        {t("prize.wallet_address", {
                                            first: data.walletAddress?.substring(
                                                0,
                                                5
                                            ),
                                            last: data.walletAddress?.substring(
                                                data.walletAddress.length - 4
                                            ),
                                        })}
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
