// REACT, REDUX & 3RD PARTY LIBRARIES
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

// COMPONENTS
import ClaimedPrizeDetailModal from "Components/Modals/ClaimedPrizeDetail.modal";

// HELPER FUNCTIONS
import { scrollToTop } from "Utils/ScrollToTop";

const Rewards = () => {
    const { claimedPrizes } = useSelector((state) => state.claimedPrizes);

    const history = useHistory();

    const [isClaimedPrizeDetailPopupOpen, setIsClaimedDetailPopupOpen] =
        useState(false);
    const [claimedPrizeDetails, setClaimedPrizeDetails] = useState("");

    const getClaimedDate = (claimedOn) => {
        let playerTimeZone = (new Date().getTimezoneOffset() / 60) * -1;
        let claimedTimeZone =
            (new Date(claimedOn * 1000).getTimezoneOffset() / 60) * -1;

        if (playerTimeZone !== claimedTimeZone) {
            let correctDateTime = new Date(
                (claimedOn + playerTimeZone * 60 * 60) * 1000
            );
            return correctDateTime.toDateString();
        }
        return new Date(claimedOn * 1000).toDateString();
    };

    return (
        <>
            {/* CLAIMED PRIZE DETAILS MODAL */}
            {isClaimedPrizeDetailPopupOpen && (
                <ClaimedPrizeDetailModal
                    data={claimedPrizeDetails}
                    onCloseButtonClick={() => {
                        setIsClaimedDetailPopupOpen(false);
                    }}
                />
            )}
            {/* REWARDS */}
            <section id="rewards-panel">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-10 col-lg-7 wrapper">
                            {/* BACK BUTTON */}
                            <div className="col-12 mb-5 px-1">
                                <Link
                                    className="back-button"
                                    onClick={scrollToTop}
                                    to={{
                                        pathname:
                                            history?.location?.state
                                                ?.prevPath || "/",
                                        state: {
                                            prevPath: "/",
                                        },
                                    }}
                                >
                                    <img
                                        width="42"
                                        src={`${window.cdn}buttons/button_back.png`}
                                        alt="back-btn"
                                    />
                                    <span className="ml-2">Back</span>
                                </Link>
                            </div>
                            {/* TABS */}
                            <div className="col-12 mb-4">
                                <h2 className="title my-4">Rewards</h2>
                            </div>
                            {/* CLAIMED */}
                            {claimedPrizes.length > 0 &&
                                claimedPrizes?.map((data, i) => {
                                    return (
                                        <div
                                            className="col-12 col-md-6 mb-3 prize"
                                            key={`prizes-${i}`}
                                        >
                                            <div
                                                className="card-wrapper d-flex"
                                                onClick={() => {
                                                    setClaimedPrizeDetails(
                                                        data
                                                    );
                                                    setIsClaimedDetailPopupOpen(
                                                        true
                                                    );
                                                }}
                                            >
                                                <div className="col-auto p-2">
                                                    <div
                                                        className="prize-image"
                                                        style={{
                                                            backgroundImage: `url("${data.prizeImageUrl}")`,
                                                        }}
                                                    ></div>
                                                </div>
                                                <div className="col py-2 px-0 mt-1">
                                                    <div className="prize-text">
                                                        <div className="card-title">
                                                            {data.prizeTitle}
                                                        </div>
                                                        <div className="card-subtitle">
                                                            {data.prizeSubtitle}
                                                        </div>
                                                    </div>
                                                    {data.claimedOn > 0 ? (
                                                        <div className="prize-claimed py-2">
                                                            {getClaimedDate(
                                                                data.claimedOn
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <div className="prize-claimed text-red py-2">
                                                            {`Connect wallet to receive NFT`}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            {claimedPrizes.length === 0 && (
                                <div className="no-result">
                                    <p className="title mb-1">
                                        No Rewards found yet!
                                    </p>
                                    <p className="subtitle mt-1 mb-0">
                                        Looks like you've not played for any
                                        prizes yet.{" "}
                                    </p>
                                    <p className="subtitle">
                                        <Link to="/">Click here</Link> to look
                                        for one you like.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Rewards;
