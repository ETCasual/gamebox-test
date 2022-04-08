import React from "react";
import SwiperCore, { Pagination, Autoplay, EffectCoverflow } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const Carousel = () => {
    SwiperCore.use([EffectCoverflow, Pagination, Autoplay]);

    return (
        <div
            id="hero-carousel"
            className="py-2 d-flex align-items-center justify-content-center"
        >
            <Swiper
                effect={"coverflow"}
                grabCursor={true}
                pagination={false}
                centeredSlides={true}
                loop={true}
                speed={800}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                slidesPerView={window.innerWidth > 768 ? 1.3 : 1.05}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 300,
                    modifier: 1,
                    slideShadows: false,
                }}
            >
                <SwiperSlide>
                    <div className="w-100 d-flex align-items-center justify-content-end justify-content-md-center">
                        <img
                            src={`${window.cdn}landing_samples/hg_nft_001_SPECIAL-SPACESUIT.jpg`}
                            alt="Sample NFT"
                        />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="w-100 d-flex align-items-center justify-content-end justify-content-md-center">
                        <img
                            src={`${window.cdn}landing_samples/hg_nft_002_UNIQUE-SPACESUIT.jpg`}
                            alt="Sample NFT"
                        />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="w-100 d-flex align-items-center justify-content-end justify-content-md-center">
                        <img
                            src={`${window.cdn}landing_samples/hg_nft_003_DISTINCT-SPACESUIT.jpg`}
                            alt="Sample NFT"
                        />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="w-100 d-flex align-items-center justify-content-end justify-content-md-center">
                        <img
                            src={`${window.cdn}landing_samples/hg_nft_004_BIZARRE-SPACESUIT.jpg`}
                            alt="Sample NFT"
                        />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="w-100 d-flex align-items-center justify-content-end justify-content-md-center">
                        <img
                            src={`${window.cdn}landing_samples/hg_nft_005_SUPREME-SPACESUIT.jpg`}
                            alt="Sample NFT"
                        />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="w-100 d-flex align-items-center justify-content-end justify-content-md-center">
                        <img
                            src={`${window.cdn}landing_samples/ufo_nft_001_SPECIAL-SPACESHIP.jpg`}
                            alt="Sample NFT"
                        />
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="w-100 d-flex align-items-center justify-content-end justify-content-md-center">
                        <img
                            src={`${window.cdn}landing_samples/ufo_nft_002_UNIQUE-SPACESHIP.jpg`}
                            alt="Sample NFT"
                        />
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="w-100 d-flex align-items-center justify-content-end justify-content-md-center">
                        <img
                            src={`${window.cdn}landing_samples/ufo_nft_003_DISTINCT-SPACESHIP.jpg`}
                            alt="Sample NFT"
                        />
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="w-100 d-flex align-items-center justify-content-end justify-content-md-center">
                        <img
                            src={`${window.cdn}landing_samples/ufo_nft_004_BIZARRE-SPACESHIP.jpg`}
                            alt="Sample NFT"
                        />
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="w-100 d-flex align-items-center justify-content-end justify-content-md-center">
                        <img
                            src={`${window.cdn}landing_samples/ufo_nft_005_SUPREME-SPACESHIP.jpg`}
                            alt="Sample NFT"
                        />
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Carousel;
