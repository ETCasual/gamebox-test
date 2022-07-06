// REACT, REDUX & 3RD PARTY LIBRARIES
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
import SwiperCore, {
    Navigation,
    Pagination,
    Scrollbar,
    A11y,
    Autoplay,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

// COMPONENTS
import ThumbnailMedia from "Components/Global/ThumbnailMedia.component";

// HELPER FUNCTION
// import { handleConnectWallet } from "Utils/ConnectWallet";
import { defaultUserImage } from "Utils/DefaultImage";

const WinnerAnnouncementModal = ({ data, user, handleBackButton }) => {
    SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

    // const { blockchainNetworks } = useSelector(
    //     (state) => state.blockchainNetworks
    // );

    // const dispatch = useDispatch();

    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);

    const [prizeData, setPrizeData] = useState([]);
    const [activeSlide, setActiveSlide] = useState(-1);

    useEffect(() => {
        sessionStorage.setItem("showAnnouncement", 0);

        let timeOutRef = null;
        if (data.length > 0) {
            clearTimeout(timeOutRef);
            timeOutRef = setTimeout(() => {
                data.push(data[0]);
                setPrizeData(data);
            }, 500);
        }

        return () => clearTimeout(timeOutRef);
    }, [data]);

    useEffect(() => {
        document.documentElement.style.overflowY = "hidden";

        return () => (document.documentElement.style.overflowY = "visible");
    }, []);

    // const handleWallet = async () => {
    //     if (user.walletAddress) return;

    //     await handleConnectWallet(dispatch, blockchainNetworks);
    // };

    const getMintDate = (date) => {
        return new Date(date * 1000).toLocaleString("default", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    return (
        <div className="winner-announcement">
            <Swiper
                className="swiper"
                spaceBetween={0}
                pagination={{
                    el: ".custom-pagination",
                    clickable: true,
                    dynamicBullets: true,
                    renderBullet: (index, className) => {
                        // TODO: USE STATIC IMG IN SMALL THUMBNAIL
                        return `<div class="${className} d-flex align-items-center justify-content-center">
                            <img src="${prizeData[index]?.picture}" alt="prize"/>
                        </div>`;
                    },
                }}
                navigation={{
                    prevEl: navigationPrevRef.current,
                    nextEl: navigationNextRef.current,
                }}
                preloadImages={true}
                threshold={30}
                initialSlide={1}
                slidesPerView={1}
                onActiveIndexChange={(active) => {
                    setActiveSlide(active.realIndex);
                }}
            >
                {prizeData.map((e, idx) => (
                    <SwiperSlide key={idx}>
                        <div className="prize">
                            {/* PRIZE INFO */}
                            <div className="picture-wrapper d-flex flex-column align-items-center text-center">
                                {/* THUMBNAIL MEDIA */}
                                <ThumbnailMedia
                                    url={e.picture}
                                    isPlayVideo={true}
                                    setIsPlayVideo={null}
                                    className="thumb-media"
                                />
                                <img
                                    width={28}
                                    className="close-btn"
                                    onClick={() =>
                                        handleBackButton(e?.prizeId, e?.id)
                                    }
                                    src={`${window.cdn}buttons/button_close.png`}
                                    alt="close-btn"
                                />
                            </div>
                            {/* WINNER INFO */}
                            <div className="w-100 p-4 text-center winner-wrapper">
                                <img
                                    className="winner-pic"
                                    src={e?.winnerAvatarUrl}
                                    onError={(e) => defaultUserImage(e)}
                                    alt={e.winner}
                                />
                                {/* TODO: To change the checking to not use username */}
                                {user.username.toLowerCase() ===
                                    e.winner.toLowerCase() && (
                                        <>
                                            <p className="winner-name p-3">
                                                {e.winner} (You)
                                            </p>
                                            <p className="won-text mb-0">Won the</p>
                                            <p className="prize-name my-2">
                                                {e.title}
                                            </p>
                                            <p className="nft-token">
                                                TokenID:{" "}
                                                {e.nftContractAddress.substring(
                                                    0,
                                                    5
                                                )}
                                                ....
                                                {e.nftContractAddress.substring(
                                                    e.nftContractAddress.length - 4
                                                )}
                                            </p>

                                            {e.canClaimDate > 0 && (
                                                <>
                                                    <p className="mb-2 mt-4 not-minted">
                                                        This NFT is not minted yet.
                                                        We’ll notify you once it’s
                                                        out.
                                                    </p>
                                                    <p className="mint-date">
                                                        NFT mint date:{" "}
                                                        {getMintDate(
                                                            e.canClaimDate
                                                        )}
                                                    </p>
                                                </>
                                            )}

                                            {e.canClaimDate <= 0 && (
                                                <Link to="/profile/rewards">
                                                    <button className="connect-wallet-btn p-3">
                                                        Claim prize
                                                    </button>
                                                </Link>
                                            )}
                                        </>
                                    )}
                                {user.username.toLowerCase() !==
                                    e.winner.toLowerCase() && (
                                        <>
                                            <p className="winner-name mt-5 p-3">
                                                {e.winner}
                                            </p>
                                            <p className="won-text mb-0">won the</p>
                                            <p className="prize-name my-2">
                                                {e.title}
                                            </p>
                                            <p className="nft-token">
                                                TokenID:{" "}
                                                {e.nftContractAddress.substring(
                                                    0,
                                                    5
                                                )}
                                                ....
                                                {e.nftContractAddress.substring(
                                                    e.nftContractAddress.length - 4
                                                )}
                                            </p>
                                        </>
                                    )}
                            </div>
                        </div>
                    </SwiperSlide>
                ))}

                <div
                    className={`pagination p-3 mx-auto ${prizeData.length > 1 ? "d-flex" : "d-none"
                        } align-items-center justify-content-between`}
                >
                    <img
                        width={32}
                        className={`prev ${activeSlide > 0 ? "" : "opacity-0-5"
                            }`}
                        ref={navigationPrevRef}
                        src={`${window.cdn}buttons/button_back.png`}
                        alt="prev-btn"
                    />
                    <div className="custom-pagination d-flex justify-content-center"></div>
                    <img
                        width={32}
                        className={`next ${activeSlide === prizeData.length - 1
                                ? "opacity-0-5"
                                : ""
                            }`}
                        ref={navigationNextRef}
                        src={`${window.cdn}buttons/button_back.png`}
                        alt="next-btn"
                    />
                </div>
            </Swiper>
        </div>
    );
};

export default WinnerAnnouncementModal;
