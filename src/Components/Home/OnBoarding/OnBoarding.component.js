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

const OnBoarding = ({ handleOnBoardingClose }) => {
    SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);

    const [homeButton, setHomeButton] = useState(true);

    const onBoardingData = [
        {
            img: `${window.cdn}illustrations/friends_01.png`,
            title: "Hello and welcome!",
            description:
                "We’re glad you decided to join us. Please take a few minutes to read through our short introduction on what GameBox is all about.",
        },
        {
            img: `${window.cdn}illustrations/steps_01.png`,
            title: "A platform that offers a variety of premium prizes",
            description:
                "With just a few simple steps, you stand a chance to win premium prizes from us. Simply choose a prize, participate in the tournament to win tickets and wait for the prize draw to start.",
            extra: "",
        },
        {
            img: `${window.cdn}illustrations/steps_02.png`,
            title: "Play off with other players and compete to get the top score",
            description:
                "Compete with players from around the world to get the highest score points to win more tickets in the tournament. Your tickets will automatically be added into the prize draw pool.",
            extra: "",
        },
        {
            img: `${window.cdn}illustrations/steps_03.png`,
            title: "WINNER WINNER CHICKEN DINNER!",
            description:
                "The prize draw pool will start once the total number of tickets reaches the pool limit. A winner will be drawn from the pool of tickets.",
            extra: "",
        },
        {
            img: `${window.cdn}illustrations/bonus_05.png`,
            title: "THAT'S NOT ALL!",
            description:
                "You also stand a chance to win our Daily Bonus Prize. How so? Tickets won in any tournaments throughout the platform for the day will automatically be cloned and added into the Daily Bonus Prize.",
            extra: "So what are you waiting for? Go and have some fun!",
        },
    ];

    useEffect(() => {
        setHomeButton(false);
    }, []);

    return (
        <div className="onboarding d-flex align-items-center justify-content-center">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-11 col-md-8 col-lg-7 wrapper p-4">
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
                                if (
                                    active.realIndex ===
                                    onBoardingData.length - 1
                                )
                                    setHomeButton(true);
                                else setHomeButton(false);
                            }}
                        >
                            {onBoardingData.map((e, idx) => (
                                <SwiperSlide
                                    key={idx}
                                    className="d-flex align-items-center justify-content-center"
                                >
                                    <div className="steps d-flex flex-column align-items-center">
                                        <img
                                            className="img-fluid icon"
                                            src={e.img}
                                            alt={e.title}
                                        />
                                        <p className="title my-3 mt-md-2 mb-md-4">
                                            {e.title}
                                        </p>
                                        <p className="description mb-2">
                                            {e.description}
                                        </p>
                                        <p className="extra">{e.extra}</p>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <div className="row">
                            <div className="w-100 px-3 swiper-nav d-flex align-items-center justify-content-around">
                                <div
                                    className="col-3 prev p-0 text-center"
                                    ref={navigationPrevRef}
                                >
                                    Back
                                </div>
                                <div className="col-6 p-0 custom-pagination text-center" />
                                <div className="col-3 text-center p-0">
                                    <div
                                        className={`next ${
                                            homeButton ? "d-none" : ""
                                        }`}
                                        ref={navigationNextRef}
                                    >
                                        Next
                                    </div>
                                    {homeButton && (
                                        <button
                                            className="next"
                                            onClick={handleOnBoardingClose}
                                        >
                                            Continue
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OnBoarding;
