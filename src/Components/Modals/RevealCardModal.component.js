// REACT, REDUX & 3RD PARTY LIBRARIES
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SwiperCore, {
    Navigation,
    Pagination,
    Scrollbar,
    A11y,
    Autoplay,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// COMPONENTS
import ThumbnailMedia from "Components/Global/ThumbnailMedia.component";

// HELPER FUNCTION
import { defaultUserImage } from "Utils/DefaultImage";

const RevealCardModal = ({ data, user, handleRevealBackButton }) => {
    SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

    const [prizeData, setPrizeData] = useState([]);

    useEffect(() => {
        let timeOutRef = null;
        clearTimeout(timeOutRef);
        timeOutRef = setTimeout(() => {
            setPrizeData(data);
            console.log(data);
        }, 500);

        return () => clearTimeout(timeOutRef);
    }, [data]);

    useEffect(() => {
        document.documentElement.style.overflowY = "hidden";

        return () => (document.documentElement.style.overflowY = "visible");
    }, []);

    const getMintDate = (date) => {
        return new Date(date * 1000).toLocaleString("default", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    return (
        <>
            {prizeData.length > 0 && (
                <div className="winner-announcement">
                    <Swiper
                        className="swiper"
                        preloadImages={true}
                        initialSlide={1}
                        slidesPerView={1}
                    >
                        {prizeData.map((e, idx) => (
                            <SwiperSlide key={idx}>
                                <div className="prize">
                                    <div className="picture-wrapper d-flex flex-column align-items-center">
                                        {/* THUMBNAIL MEDIA */}
                                        <ThumbnailMedia
                                            url={e.picture}
                                            isPlayVideo={true}
                                            className="thumb-media"
                                        />
                                        <img
                                            width="36"
                                            className="close-btn"
                                            onClick={() =>
                                                handleRevealBackButton(e?.id)
                                            }
                                            src={`${window.cdn}buttons/button_close.png`}
                                            alt="close-btn"
                                        />
                                    </div>
                                    <div className="w-100 p-3 text-center winner-wrapper">
                                        <div
                                            className={`profile-img d-inline-flex ${
                                                e?.isVip ? "is-vip" : ""
                                            }`}
                                        >
                                            <span>
                                                <img
                                                    className="img-holder"
                                                    onError={(err) =>
                                                        defaultUserImage(err)
                                                    }
                                                    src={e?.winnerAvatarUrl}
                                                    alt="avatar"
                                                />
                                            </span>
                                            <span className="img-frame">
                                                {e?.isVip && (
                                                    <img
                                                        className="vip-frame"
                                                        src={`${window.cdn}icons/icon_vip_frame_01.png`}
                                                        alt="vip-frame"
                                                    />
                                                )}
                                            </span>
                                        </div>
                                        {user?.username?.toLowerCase() ===
                                            e?.winner?.toLowerCase() && (
                                            <>
                                                <p className="winner-name p-3">
                                                    {e?.winner} (You)
                                                </p>
                                                <p className="won-text mb-0">
                                                    Won the
                                                </p>
                                                <p className="prize-name my-2">
                                                    {e?.title}
                                                </p>
                                                <p className="nft-token">
                                                    TokenID:{" "}
                                                    {e?.nftContractAddress?.substring(
                                                        0,
                                                        5
                                                    )}
                                                    ....
                                                    {e?.nftContractAddress?.substring(
                                                        e?.nftContractAddress
                                                            ?.length - 4
                                                    )}
                                                </p>

                                                {e?.canClaimDate > 0 && (
                                                    <>
                                                        <p className="mb-2 mt-4 not-minted">
                                                            This NFT is not
                                                            minted yet. We’ll
                                                            notify you once it’s
                                                            out.
                                                        </p>
                                                        <p className="mint-date">
                                                            NFT mint date:{" "}
                                                            {getMintDate(
                                                                e?.canClaimDate
                                                            )}
                                                        </p>
                                                    </>
                                                )}
                                                {e?.canClaimDate <= 0 && (
                                                    <Link
                                                        to="/profile/rewards"
                                                        onClick={() =>
                                                            handleRevealBackButton(
                                                                e?.prizeId
                                                            )
                                                        }
                                                    >
                                                        <button className="connect-wallet-btn p-3">
                                                            CLAIM PRIZE
                                                        </button>
                                                    </Link>
                                                )}
                                            </>
                                        )}
                                        {user?.username?.toLowerCase() !==
                                            e?.winner?.toLowerCase() && (
                                            <>
                                                <p className="winner-name mt-5 p-3">
                                                    {e?.winner}
                                                </p>
                                                <p className="won-text mb-0">
                                                    won the
                                                </p>
                                                <p className="prize-name my-2">
                                                    {e?.title}
                                                </p>
                                                <p className="nft-token">
                                                    TokenID:{" "}
                                                    {e?.nftContractAddress?.substring(
                                                        0,
                                                        5
                                                    )}
                                                    ....
                                                    {e?.nftContractAddress?.substring(
                                                        e?.nftContractAddress
                                                            ?.length - 4
                                                    )}
                                                </p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}
        </>
    );
};

export default RevealCardModal;
