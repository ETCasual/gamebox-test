// REACT, REDUX & 3RD PARTY LIBRARIES
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// COMPONENTS
import ClaimedPrizeDetailModal from "Components/Modals/ClaimedPrizeDetail.modal";

import {
    loadNFTClaim,
    loadTokenClaim,
} from "redux/thunks/UnClaimedPrizes.thunk";
import GenericLoader from "Components/Loader/Generic.loader";

const Rewards = () => {
    const { claimedPrizes } = useSelector((state) => state.claimedPrizes);
    const { unClaimedPrizes } = useSelector((state) => state.unClaimedPrizes);

    const dispatch = useDispatch();

    const history = useHistory();

    const [isClaimedPrizeDetailPopupOpen, setIsClaimedDetailPopupOpen] =
        useState(false);
    const [claimedPrizeDetails, setClaimedPrizeDetails] = useState("");
    const [loader, setLoader] = useState({
        id: null,
        status: false,
    });
    const [hideGemsOnMobile, setHideGemsOnMobile] = useState(false);

    useEffect(() => {
        window.addEventListener("resize", handleResize);

        function handleResize() {
            setHideGemsOnMobile(
                window.innerWidth > 767 && window.ethereum ? false : true
            );
        }
        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const getClaimedDate = (createdOn) => {
        let playerTimeZone = (new Date().getTimezoneOffset() / 60) * -1;
        let claimedTimeZone =
            (new Date(createdOn * 1000).getTimezoneOffset() / 60) * -1;

        if (playerTimeZone !== claimedTimeZone) {
            let correctDateTime = new Date(
                (createdOn + playerTimeZone * 60 * 60) * 1000
            );
            return correctDateTime.toLocaleString("default", {
                day: "2-digit",
                month: "long",
                year: "numeric",
            });
        }
        return new Date(createdOn * 1000).toLocaleString("default", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
    };

    const getRemainingDaysToClaim = (claimDate) => {
        let date = new Date(claimDate * 1000);
        const formattedDate = date.toLocaleString("default", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
        return formattedDate;
    };

    const validClaimDate = (claimDate) => {
        const today = new Date().toLocaleDateString();
        const _claimDated = new Date(claimDate * 1000).toLocaleDateString();
        if (today < _claimDated) return true;
        return false;
    };

    const handleNFTClaim = (winnerId, prizeBlockchainNetwork) => {
        if (loader.status) return;

        setLoader({ status: true, id: winnerId });
        dispatch(loadNFTClaim(winnerId, prizeBlockchainNetwork, setLoader));
    };

    const handleTokenClaim = (winnerId, prizeBlockchainNetwork) => {
        if (loader.status) return;

        setLoader({ status: true, id: winnerId });
        dispatch(loadTokenClaim(winnerId, prizeBlockchainNetwork, setLoader));
    };

    const handleClaimedInfo = (data) => {
        setClaimedPrizeDetails(data);
        setIsClaimedDetailPopupOpen(true);
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
                                        src={`${window.cdn}buttons/button_back.png`}
                                        alt="back-btn"
                                    />
                                    <span className="ml-2">Back</span>
                                </Link>
                            </div>
                            <div className="col-12">
                                <h1 className={`main-title mb-4`}>Rewards</h1>
                            </div>
                            <div className="col-12">
                                {/* UNCLAIMED */}
                                {unClaimedPrizes.length > 0 && (
                                    <>
                                        <p className="claimed-title">
                                            Unclaimed rewards
                                        </p>
                                        <div className="row">
                                            {unClaimedPrizes?.map((data, i) => (
                                                <div
                                                    className="col-12 col-md-6 mb-3 prize unclaimed pl-2 pr-1 position-relative"
                                                    style={{
                                                        cursor: `${
                                                            (!loader.status &&
                                                                data.prizeContractType ===
                                                                    1 &&
                                                                !validClaimDate(
                                                                    data.prizeCanClaimDate
                                                                )) ||
                                                            data.prizeContractType ===
                                                                2
                                                                ? "pointer"
                                                                : "default"
                                                        }`,
                                                    }}
                                                    key={`prizes-${i}`}
                                                    onClick={() =>
                                                        data.prizeContractType ===
                                                            1 &&
                                                        !hideGemsOnMobile
                                                            ? handleNFTClaim(
                                                                  data.id,
                                                                  data.prizeBlockchainNetwork
                                                              )
                                                            : data.prizeContractType ===
                                                                  2 &&
                                                              !hideGemsOnMobile
                                                            ? handleTokenClaim(
                                                                  data.id,
                                                                  data.prizeBlockchainNetwork
                                                              )
                                                            : null
                                                    }
                                                >
                                                    <div className="card-wrapper d-flex">
                                                        <div className="col-auto p-2">
                                                            <div
                                                                className="prize-image"
                                                                style={{
                                                                    backgroundImage: `url("${data.prizeImageUrl}")`,
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="col py-2 pl-2 pr-1 mt-1">
                                                            <div className="prize-text">
                                                                <div className="card-title">
                                                                    {
                                                                        data.prizeTitle
                                                                    }
                                                                </div>
                                                                <div className="card-subtitle">
                                                                    {
                                                                        data.prizeSubtitle
                                                                    }
                                                                </div>
                                                            </div>

                                                            {data.prizeContractType ===
                                                                1 &&
                                                                validClaimDate(
                                                                    data.prizeCanClaimDate
                                                                ) && (
                                                                    <div className="prize-claimed text-wait py-2">
                                                                        {!hideGemsOnMobile
                                                                            ? `Claim your NFT - ${getRemainingDaysToClaim(
                                                                                  data.prizeCanClaimDate
                                                                              )}`
                                                                            : "Connect your wallet through your computer browser."}
                                                                    </div>
                                                                )}
                                                            {data.prizeContractType ===
                                                                1 &&
                                                                !validClaimDate(
                                                                    data.prizeCanClaimDate
                                                                ) && (
                                                                    <div className="prize-claimed text-red py-2">
                                                                        {!hideGemsOnMobile
                                                                            ? "Claim your NFT"
                                                                            : "Connect your wallet through your computer browser."}
                                                                    </div>
                                                                )}

                                                            {data.prizeContractType ===
                                                                2 && (
                                                                <div className="prize-claimed text-red py-2">
                                                                    {!hideGemsOnMobile
                                                                        ? "Claim your Token"
                                                                        : "Connect your wallet through your computer browser."}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    {loader.id === data.id && (
                                                        <div className="loader d-flex align-items-center justify-content-center">
                                                            <GenericLoader
                                                                height="30"
                                                                bg="#FF007C"
                                                                cx1="45%"
                                                                cx2="50%"
                                                                cx3="55%"
                                                                cy="15"
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="col-12 mt-5">
                                {/* CLAIMED */}
                                {claimedPrizes.length > 0 && (
                                    <>
                                        <p className="claimed-title">
                                            Claimed rewards
                                        </p>
                                        <div className="row">
                                            {claimedPrizes?.map((data, i) => (
                                                <div
                                                    className={`col-12 col-md-6 mb-3 pl-2 pr-1 prize ${
                                                        data.status === 2
                                                            ? "claimed"
                                                            : ""
                                                    }`}
                                                    key={`prizes-${i}`}
                                                >
                                                    <div
                                                        className="card-wrapper d-flex"
                                                        onClick={() =>
                                                            data.status === 2
                                                                ? handleClaimedInfo(
                                                                      data
                                                                  )
                                                                : null
                                                        }
                                                    >
                                                        <div className="col-auto p-2">
                                                            <div
                                                                className="prize-image"
                                                                style={{
                                                                    backgroundImage: `url("${data.prizeImageUrl}")`,
                                                                }}
                                                            ></div>
                                                        </div>
                                                        <div className="col py-2 pl-2 pr-1 mt-1">
                                                            <div className="prize-text">
                                                                <div className="card-title">
                                                                    {
                                                                        data.prizeTitle
                                                                    }
                                                                </div>
                                                                <div className="card-subtitle">
                                                                    {
                                                                        data.prizeSubtitle
                                                                    }
                                                                </div>
                                                            </div>

                                                            <div className="prize-claimed py-2">
                                                                {data.status ===
                                                                2
                                                                    ? getClaimedDate(
                                                                          data.createdOn
                                                                      )
                                                                    : "Pending"}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>

                            {claimedPrizes.length === 0 &&
                                unClaimedPrizes.length === 0 && (
                                    <div className="no-result">
                                        <p className="title mb-1">
                                            No Rewards found yet!
                                        </p>
                                        <p className="subtitle mt-1 mb-0">
                                            Looks like you've not played for any
                                            prizes yet.{" "}
                                        </p>
                                        <p className="subtitle">
                                            <Link to="/">Click here</Link> to
                                            look for one you like.
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
