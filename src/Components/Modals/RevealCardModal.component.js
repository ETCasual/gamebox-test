import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SwiperCore, {
    Navigation,
    Pagination,
    Scrollbar,
    A11y,
    Autoplay,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { handleConnectWallet } from "Utils/ConnectWallet";
import { defaultUserImage } from "Utils/DefaultImage";

const RevealCardModal = ({
    data,
    user,
    updateLocalPrizeList,
    handleRevealBackButton,
}) => {
    SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

    const { blockchainNetworks } = useSelector((state) => state.blockchainNetworks);

    const dispatch = useDispatch();

    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);

    const [prizeData, setPrizeData] = useState([]);
    const [activeSlide, setActiveSlide] = useState(-1);

    useEffect(() => {
        if (data.length > 0)
            setTimeout(() => {
                if (data?.constructor?.name === "Array") {
                    setPrizeData(data);
                } else if (data?.constructor?.name === "Object") {
                    let _arr = [];
                    _arr.push(data);
                    setPrizeData(_arr);
                }
            }, 500);
    }, [data]);

    useEffect(() => {
        document.documentElement.style.overflowY = "hidden";

        return () => (document.documentElement.style.overflowY = "visible");
    }, []);

    const handleWallet = async () => {
        if (user.walletAddress) return;

        await handleConnectWallet(dispatch, blockchainNetworks);
    };

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
                        onActiveIndexChange={(active) => {
                            setActiveSlide(active.realIndex);
                            updateLocalPrizeList(
                                prizeData[active.realIndex]?.prizeId
                            );
                        }}
                    >
                        {prizeData.map((e, idx) => (
                            <SwiperSlide key={idx}>
                                <div className="prize">
                                    <div className="picture-wrapper d-flex flex-column align-items-center">
                                        <img
                                            className="picture mb-4"
                                            src={e?.picture}
                                            alt="prize"
                                        />
                                        <img
                                            width={28}
                                            className="close-btn"
                                            onClick={() =>
                                                handleRevealBackButton(
                                                    e?.prizeId
                                                )
                                            }
                                            src={`${window.cdn}buttons/button_close.png`}
                                            alt="close-btn"
                                        />
                                    </div>
                                    <div className="w-100 p-3 text-center winner-wrapper">
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
                                                <p className="won-text mb-0">
                                                    Won the
                                                </p>
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
                                                        e.nftContractAddress
                                                            .length - 4
                                                    )}
                                                </p>

                                                {e.canClaimDate > 0 && (
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
                                                                e.canClaimDate
                                                            )}
                                                        </p>
                                                    </>
                                                )}

                                                {!user.walletAddress &&
                                                    e.canClaimDate <= 0 && (
                                                        <button
                                                            className="connect-wallet-btn p-3"
                                                            onClick={
                                                                handleWallet
                                                            }
                                                        >
                                                            Connect your wallet
                                                            to receive NFT
                                                        </button>
                                                    )}
                                                {user.walletAddress &&
                                                    e.canClaimDate <= 0 && (
                                                        <Link to="/profile/rewards">
                                                            <button className="connect-wallet-btn p-3">
                                                                Claim your NFT
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
                                                <p className="won-text mb-0">
                                                    won the
                                                </p>
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
                                                        e.nftContractAddress
                                                            .length - 4
                                                    )}
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
            )}
        </>
    );
};

export default RevealCardModal;
