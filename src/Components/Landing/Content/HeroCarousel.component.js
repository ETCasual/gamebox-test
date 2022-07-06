import React from "react";
import SwiperCore, { Pagination, Autoplay, EffectCoverflow } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import ThumbnailMedia from "Components/Global/ThumbnailMedia.component";

const Carousel = () => {
    const swiperImageSources = [
        `${window.cdn}landing_samples/mp4/hg_nft_001.mp4`,
        `${window.cdn}landing_samples/mp4/hg_nft_002.mp4`,
        `${window.cdn}landing_samples/mp4/hg_nft_003.mp4`,
        `${window.cdn}landing_samples/mp4/hg_nft_004.mp4`,
        `${window.cdn}landing_samples/mp4/hg_nft_005.mp4`,
        `${window.cdn}landing_samples/mp4/ufo_nft_001.mp4`,
        `${window.cdn}landing_samples/mp4/ufo_nft_002.mp4`,
        `${window.cdn}landing_samples/mp4/ufo_nft_003.mp4`,
        `${window.cdn}landing_samples/mp4/ufo_nft_004.mp4`,
        `${window.cdn}landing_samples/mp4/ufo_nft_005.mp4`,
    ];

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
                {swiperImageSources.map((src, i) => {
                    return (
                        <SwiperSlide key={`slider-${i}`}>
                            {({ isActive }) => (
                                <div className="w-100 d-flex align-items-center justify-content-end justify-content-md-center">
                                    <ThumbnailMedia
                                        url={src}
                                        isPlayVideo={isActive}
                                    />
                                </div>
                            )}
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
};

export default Carousel;
