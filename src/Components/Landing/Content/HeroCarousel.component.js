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
                            src={`${window.cdn}temp_img/sample_nft_1.png`}
                            alt="Sample NFT"
                        />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="w-100 d-flex align-items-center justify-content-end justify-content-md-center">
                        <img
                            src={`${window.cdn}temp_img/sample_nft_2.png`}
                            alt="Sample NFT"
                        />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="w-100 d-flex align-items-center justify-content-end justify-content-md-center">
                        <img
                            src={`${window.cdn}temp_img/sample_nft_3.png`}
                            alt="Sample NFT"
                        />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="w-100 d-flex align-items-center justify-content-end justify-content-md-center">
                        <img
                            src={`${window.cdn}temp_img/sample_nft_3.png`}
                            alt="Sample NFT"
                        />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="w-100 d-flex align-items-center justify-content-end justify-content-md-center">
                        <img
                            src={`${window.cdn}temp_img/sample_nft_3.png`}
                            alt="Sample NFT"
                        />
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Carousel;
