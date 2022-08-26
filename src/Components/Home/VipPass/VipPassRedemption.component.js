// REACT, REDUX & 3RD PARTY LIBRARIES
import React, { useState } from "react";
import { useDispatch } from "react-redux";

// COMPONENTS
import ThumbnailMedia from "Components/Global/ThumbnailMedia.component";

// REDUX
import { loadNFTClaim } from "redux/thunks/UnClaimedPrizes.thunk";

// HELPER
import { defaultGameImage } from "Utils/DefaultImage";

const VipPassRedemption = ({ data }) => {
    const dispatch = useDispatch();

    const [loader, setLoader] = useState({
        id: null,
        status: false,
    });

    const handleRedeem = () => {
        if (loader.status) return;

        setLoader({ status: true, id: data.winnerId });

        dispatch(
            loadNFTClaim(
                data.winnerId,
                data.prizeBlockchainNetwork,
                data.prizeContractType,
                setLoader
            )
        );
    };

    return (
        <>
            <div className="col-12 d-flex align-items-center justify-content-center">
                <div className="vip-pass-wrapper">
                    {/* PRIZE TITLE, DESCRIPTION & ID */}
                    <div className="pass-info position-relative d-flex flex-wrap p-2 pb-3 p-sm-3">
                        <div className="pass-img p-0 col-12 col-sm-6 col-xl-5 position-relative">
                            <ThumbnailMedia
                                url={data?.prizeImageUrl}
                                isPlayVideo={true}
                                onError={(e) => defaultGameImage(e)}
                            />
                        </div>
                        <div className="d-flex flex-column justify-content-between col-12 col-sm-6 col-xl-7 px-sm-4 px-1">
                            <div className="info-wrapper row h-100">
                                {/* <div className="row justify-content-between"> */}
                                <div className="col-12">
                                    <div className="my-3">
                                        <p className="title text-center">
                                            GAMEBOX VIP PASS
                                        </p>
                                    </div>
                                    <div className="">
                                        <p className="desc text-left">
                                            The Gamebox VIP Pass is a privilege
                                            membership pass in Gamebox.
                                        </p>
                                    </div>
                                    <div className="">
                                        <p className="desc text-left">
                                            The Gamebox VIP Pass NFT grants
                                            players special utilities, such as
                                            increased daily spins and future
                                            utilities. This gives players
                                            additional free gems daily to
                                            participate and win prizes on
                                            Gamebox.
                                        </p>
                                    </div>
                                </div>
                                <div className="col-12 align-self-end my-3">
                                    <div className="">
                                        <div
                                            className={`claim-btn d-flex ml-auto ${
                                                loader.id === data?.id
                                                    ? "disabled opacity-0-5"
                                                    : "enabled"
                                            }`}
                                            onClick={handleRedeem}
                                        >
                                            <p className="m-auto">
                                                CLAIM VIP PASS
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {/* </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VipPassRedemption;
