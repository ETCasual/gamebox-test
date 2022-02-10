import React, { useState, useEffect } from "react";
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

const PrizeModal = ({ data, user, handleClaimRewardBtn, handleBackButton }) => {
    SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

    const [prizeData, setPrizeData] = useState([]);

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

    return (
        <div className="winner-announcement">
            <Swiper
                className="swiper"
                spaceBetween={0}
                loop={true}
                slidesPerView={1}
                pagination={{ clickable: true }}
                navigation={prizeData.length > 1 ? true : false}
                preloadImages={true}
            >
                {prizeData.map((e, idx) => (
                    <SwiperSlide key={idx}>
                        <div className="prize">
                            <div className="picture-wrapper d-flex flex-column align-items-center">
                                <img
                                    className="picture mb-4"
                                    src={e.picture}
                                    alt="prize"
                                />
                                <img
                                    className="winner-pic"
                                    src={e?.winnerAvatarUrl}
                                    onError={(e) => defaultUserImage(e)}
                                    alt={e.winner}
                                />
                            </div>

                            <div className="w-100 p-3 text-center">
                                {user.username.toLowerCase() ===
                                    e.winner.toLowerCase() && (
                                    <>
                                        <p
                                            data-text="Congratulations!"
                                            className="title"
                                        >
                                            Congratulations!
                                        </p>
                                        <p className="description mb-5">
                                            You have won the{" "}
                                            <span>{e.title}</span>
                                        </p>
                                        <button
                                            className="claim-btn"
                                            onClick={() =>
                                                handleClaimRewardBtn(e?.prizeId)
                                            }
                                        >
                                            Claim Reward
                                        </button>
                                        <button
                                            className="later-btn"
                                            onClick={() =>
                                                handleBackButton(e?.prizeId)
                                            }
                                        >
                                            Continue to homepage
                                        </button>
                                    </>
                                )}
                                {user.username.toLowerCase() !==
                                    e.winner.toLowerCase() && (
                                    <>
                                        <p className="description mb-5">
                                            <span>{e.winner}</span> has won the{" "}
                                            <span>{e.title}</span>
                                        </p>
                                        <div className="separator"></div>
                                        <button
                                            className="continue-btn mt-2"
                                            onClick={() =>
                                                handleBackButton(e?.prizeId)
                                            }
                                        >
                                            Continue to homepage
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default PrizeModal;
