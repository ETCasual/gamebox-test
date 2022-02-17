import React, { useState, useRef } from "react";
import SwiperCore, {
    Navigation,
    Pagination,
    Scrollbar,
    A11y,
    Autoplay,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

const OnBoarding = ({ handleOnBoardingClose }) => {
    SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);

    const [activeElemStatus, setActiveElemStatus] = useState({
        pagination: true,
        nextBtn: true,
        continueBtn: false,
        backBtn: false,
    });

    const onBoardingData = [
        {
            img1: `${window.cdn}model_friend_04.png`,
            title: "Hello and welcome!",
            description:
                "We’re glad you decided to join us. Please take a few minutes to read through our short introduction on what GameBox is all about.",
        },
        {
            img1: `${window.cdn}howto_frame1_01.png`,
            img2: `${window.cdn}howto_frame1_02.png`,
            title: "A platform that offers premium NFT’s for FREE",
            description:
                "With just a few simple steps, you can stand a chance to win NFT’s from us. Simply just choose a NFT, participate in the running tournament to win tickets and wait for the prize draw to start.",
        },
        {
            img1: `${window.cdn}howto_frame2_01.png`,
            img2: `${window.cdn}howto_frame2_02.png`,
            img3: `${window.cdn}howto_frame2_03.png`,
            title: "Play off with other players",
            description:
                "Compete with players from around the world to get the highest score points to win more tickets in the running tournament. The tickets will automatically be entered into the prize draw pool.",
        },
        {
            img1: `${window.cdn}howto_frame3_01.png`,
            title: "Cross your fingers, the winner might be you",
            description:
                "The prize draw pool will start once the total number of tickets reaches the pool limit. A winner will be drawn from the pool of tickets.",
        },
        {
            img1: `${window.cdn}bonusreward_02.png`,
            title: "But wait! Thats not all.",
            description:
                "You also stand a chance to win our Bonus NFT Reward. How? Tickets won in any tournaments throughout the platform for the week will automatically be cloned and entered into the Weekly Bonus Prize.",
        },
    ];

    return (
        <div className="onboarding d-flex align-items-center justify-content-center">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-11 col-md-8 col-lg-7 wrapper px-4 pt-4 pb-3">
                        <Swiper
                            className="swiper"
                            preloadImages={true}
                            spaceBetween={0}
                            slidesPerView={1}
                            pagination={{
                                el: ".custom-pagination",
                                clickable: true,
                                renderBullet: (index, className) => {
                                    return (
                                        '<span class="' +
                                        className +
                                        '"></span>'
                                    );
                                },
                            }}
                            navigation={{
                                prevEl: navigationPrevRef.current,
                                nextEl: navigationNextRef.current,
                            }}
                            onBeforeInit={(swiper) => {
                                swiper.params.navigation.prevEl =
                                    navigationPrevRef.current;
                                swiper.params.navigation.nextEl =
                                    navigationNextRef.current;
                            }}
                            onActiveIndexChange={(active) => {
                                setActiveElemStatus((prev) => ({
                                    ...prev,
                                    backBtn:
                                        active.realIndex > 0 ? true : false,
                                    continueBtn:
                                        active.realIndex ===
                                        onBoardingData.length - 1
                                            ? true
                                            : false,
                                    pagination:
                                        active.realIndex ===
                                        onBoardingData.length - 1
                                            ? false
                                            : true,
                                    nextBtn:
                                        active.realIndex ===
                                        onBoardingData.length - 1
                                            ? false
                                            : true,
                                }));
                            }}
                        >
                            {onBoardingData.map((e, idx) => (
                                <SwiperSlide
                                    key={idx}
                                    className="d-flex align-items-center justify-content-center"
                                >
                                    <div className="steps d-flex flex-column align-items-center">
                                        <img
                                            className={`img-fluid icon icon-${idx} ${
                                                e.img2
                                                    ? `position-alter-1-slide-${
                                                          idx + 1
                                                      }`
                                                    : ""
                                            }`}
                                            src={e.img1}
                                            alt={e.title}
                                        />
                                        {e.img2 && (
                                            <img
                                                className={`img-fluid icon position-alter-2-slide-${
                                                    idx + 1
                                                }`}
                                                src={e.img2}
                                                alt={e.title}
                                            />
                                        )}
                                        {e.img3 && (
                                            <img
                                                className={`img-fluid icon position-alter-3-slide-${
                                                    idx + 1
                                                }`}
                                                src={e.img3}
                                                alt={e.title}
                                            />
                                        )}
                                        <p className="title my-3 mt-md-2 mb-md-4">
                                            {e.title}
                                        </p>
                                        <p className="description mb-2">
                                            {e.description}
                                        </p>
                                        {activeElemStatus.continueBtn && (
                                            <button
                                                className="continue mt-2"
                                                onClick={handleOnBoardingClose}
                                            >
                                                Go have fun!
                                            </button>
                                        )}
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <img
                            width={32}
                            className={`prev p-0 text-center ${
                                activeElemStatus.backBtn ? "" : "d-none"
                            }`}
                            ref={navigationPrevRef}
                            src={`${window.cdn}buttons/button_back.png`}
                            alt="prev-btn"
                        />
                        <img
                            width={32}
                            className={`next p-0 text-center ${
                                activeElemStatus.nextBtn ? "" : "d-none"
                            }`}
                            ref={navigationNextRef}
                            src={`${window.cdn}buttons/button_back.png`}
                            alt="next-btn"
                        />

                        <div
                            className={`w-100 px-3 swiper-nav align-items-center justify-content-around ${
                                activeElemStatus.pagination
                                    ? "d-flex"
                                    : "d-none"
                            }`}
                        >
                            <div className="col-9 p-0 custom-pagination text-center" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OnBoarding;
