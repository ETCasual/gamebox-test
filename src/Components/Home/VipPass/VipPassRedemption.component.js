// REACT, REDUX & 3RD PARTY LIBRARIES
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// COMPONENTS
import ThumbnailMedia from "Components/Global/ThumbnailMedia.component";

// REDUX

// HELPER
import { defaultGameImage } from "Utils/DefaultImage";

const VipPassRedemption = ({ data }) => {
    const dispatch = useDispatch();

    return (
        <>
            <div className="col-12 d-flex align-items-center justify-content-center">
                <div className="vip-pass-wrapper">
                    {/* PRIZE TITLE, DESCRIPTION & ID */}
                    <div className="pass-info position-relative d-flex flex-wrap p-2 pb-3 p-sm-3">
                        <div className="pass-img p-0 col-12 col-sm-6 position-relative">
                            <ThumbnailMedia
                                url={
                                    "https://openseauserdata.com/files/7675eb2656eaa8be2f5fc1790713282d.mp4"
                                }
                                isPlayVideo={true}
                                onError={(e) => defaultGameImage(e)}
                            />
                        </div>
                        <div className="col-12 col-sm-6 px-sm-4 px-1">
                            <div className="info-wrapper row h-100">
                                <div className="col-12 my-3">
                                    <p className="title text-center">
                                        GAMEBOX VIP PASS
                                    </p>
                                </div>
                                <div className="col-12">
                                    <p>
                                        The Gamebox VIP Pass is a privilege
                                        membership pass in Gamebox.
                                    </p>
                                </div>
                                <div className="col-12">
                                    <p>
                                        The Gamebox VIP Pass NFT grants players
                                        special utilities, such as increased
                                        daily spins and future utilities. This
                                        gives players additional free gems daily
                                        to participate and win prizes on
                                        Gamebox.
                                    </p>
                                </div>
                                <div className="col-12">
                                    <div
                                        className="claim-btn d-flex align-items-center justify-content-center mx-auto"
                                        onClick={null}
                                    >
                                        <p className="mb-0">CLAIM VIP PASS</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VipPassRedemption;
