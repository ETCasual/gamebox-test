// REACT, REDUX & 3RD PARTY LIBRARIES
import React, { useState } from "react";
import { useDispatch } from "react-redux";

// COMPONENTS
import ThumbnailMedia from "Components/Global/ThumbnailMedia.component";

// REDUX
import { loadNFTClaim } from "redux/thunks/UnClaimedPrizes.thunk";

// HELPER
import { defaultGameImage } from "Utils/DefaultImage";
import { useTranslation } from "react-i18next";

const VipPassRedemption = ({ data }) => {
    const dispatch = useDispatch();

    const [loader, setLoader] = useState({
        id: null,
        status: false,
    });

    const handleRedeem = () => {
        if (loader.status) return;

        setLoader({ status: true, id: data.id });

        dispatch(
            loadNFTClaim(
                data.id,
                data.prizeBlockchainNetwork,
                data.prizeContractType,
                setLoader
            )
        );
    };

    const { t } = useTranslation();

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
                                            {t("vip_pass.title")}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="desc text-left">
                                            {t("vip_pass.subtitle")}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="desc text-left">
                                            {t("vip_pass.desc")}
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
                                                {t("vip_pass.claim")}
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
