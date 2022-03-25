import React, { useState, useEffect, useRef } from "react";
import SwiperCore, {
    Navigation,
    Pagination,
    Scrollbar,
    A11y,
    Autoplay,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import { defaultUserImage } from "Utils/DefaultImage";

const PrizeModal = ({ data, user, handleBackButton }) => {
    SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);
    console.log(user);

    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);

    const [prizeData, setPrizeData] = useState([]);
    const [activeSlide, setActiveSlide] = useState(-1);

    useEffect(() => {
        if (data.length > 0) {
            document.body.style.overflow = "hidden";
            setTimeout(() => {
                setPrizeData(data);
            }, 500);
        }

        return () => (document.body.style.overflow = "visible");
    }, [data]);

    useEffect(() => {
        document.documentElement.style.overflowY = "hidden";

        return () => (document.documentElement.style.overflowY = "visible");
    }, []);

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
                            <div className="picture-wrapper d-flex flex-column align-items-center">
                                <img
                                    className="picture"
                                    src={e.picture}
                                    alt="prize"
                                />
                                <img
                                    width={28}
                                    className="close-btn"
                                    onClick={() => handleBackButton(e?.prizeId)}
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
                                {user.username.toLowerCase() ===
                                    e.winner.toLowerCase() && (
                                    <>
                                        <p className="winner-name p-3">
                                            {e.winner} (You)
                                        </p>
                                        <p className="won-text mb-0">Won the</p>
                                        <p className="prize-name my-3">
                                            {e.title}
                                        </p>

                                        <p className="transfer-nft-text mx-auto mb-2">
                                            Your NFT is automatically sent to
                                            your wallet ending with{" "}
                                            <span>
                                                {user.walletAddress.substring(
                                                    0,
                                                    4
                                                )}
                                                ....
                                                {user.walletAddress.substring(
                                                    user.walletAddress.length -
                                                        1,
                                                    user.walletAddress.length -
                                                        5
                                                )}
                                            </span>
                                        </p>
                                        {!user.walletAddress && (
                                            <button className="connect-wallet-btn p-3">
                                                Connect your wallet to receive
                                                NFT
                                            </button>
                                        )}
                                    </>
                                )}
                                {user.username.toLowerCase() !==
                                    e.winner.toLowerCase() && (
                                    <>
                                        <p className="winner-name mt-5 p-3">
                                            {e.winner}
                                        </p>
                                        <p className="won-text mb-2">won the</p>
                                        <p className="prize-name my-2">
                                            {e.title}
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>
                    </SwiperSlide>
                ))}

                <div
                    className={`pagination p-3 mx-auto ${
                        prizeData.length > 1 ? "d-flex" : "d-none"
                    } align-items-center justify-content-between`}
                >
                    <img
                        width={32}
                        className={`prev ${
                            activeSlide > 0 ? "" : "opacity-0-5"
                        }`}
                        ref={navigationPrevRef}
                        src={`${window.cdn}buttons/button_back.png`}
                        alt="prev-btn"
                    />
                    <div className="custom-pagination d-flex"></div>
                    <img
                        width={32}
                        className={`next ${
                            activeSlide === prizeData.length - 1
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

export default PrizeModal;
