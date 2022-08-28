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
            img1: `${window.cdn}assets/model_friend_04.png`,
            title: "Hello, welcome to GameBox BETA Access",
            description:
                "Thank you for your participation. Please take a few minutes to read through our short introduction to Gamebox.",
        },
        {
            img1: `${window.cdn}assets/howto_frame1_01.png`,
            img2: `${window.cdn}assets/howto_frame1_02.png`,
            title: "A Game Platform that offers exciting prizes for winning!",
            description:
                "With a few simple steps, you stand a chance to win premium rewards. Simply pick your choice of great prizes, and participate in the running tournament to win tickets and wait for the prize draw to start.",
        },
        {
            img1: `${window.cdn}assets/howto_frame2_01.png`,
            img2: `${window.cdn}assets/howto_frame2_02.png`,
            img3: `${window.cdn}assets/howto_frame2_03.png`,
            title: "Compete with other Players",
            description:
                "Players compete globally to get the highest score to win more tickets within the running tournament. The tickets will automatically be entered into the drawing pool. The more tickets you have, the higher the chance of winning.",
        },
        {
            img1: `${window.cdn}assets/howto_frame3_01.png`,
            title: "Cross your fingers, you might be the winner!",
            description:
                "The prize draw will begin once the total number of tickets reaches the pool limit. A winner will be drawn from the pool of tickets.",
        },
        {
            img1: `${window.cdn}assets/bonusreward_02.png`,
            title: "That's not all!",
            description:
                "Every game costs one gem. Fret not! You can always obtain free gems by taking a chance on spinning the wheel or buy more gems using $FROYO on the platform.",
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
                                        {idx === onBoardingData.length - 1 && (
                                            <button
                                                className="continue mt-2"
                                                onClick={handleOnBoardingClose}
                                            >
                                                Have fun!
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
