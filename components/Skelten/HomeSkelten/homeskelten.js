import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
const Home = () => {
    return (
        <>
            <div className="mobile">
                <div className="container-fluid mt-5 pt-2">
                    <Swiper
                        spaceBetween={30}
                        slidesPerView={1}
                        autoplay
                        modules={[Pagination, A11y, Autoplay]}
                        pagination={{ clickable: true }}>
                        <SwiperSlide>
                            <Skeleton width="100%" height={175} />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Skeleton width="100%" height={175} />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Skeleton width="100%" height={175} />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Skeleton width="100%" height={175} />
                        </SwiperSlide>
                    </Swiper>
                </div>
                <div className="container-fluid mt-4">
                    <h1 className="font-22x fw-bold">Special Offers</h1>
                </div>
                <div className="container-fluid extra-container">
                    <div className="slider-carosel">
                        <Skeleton width={128} height={128} className="me-3" />
                        <Skeleton width={128} height={128} className="me-3" />
                        <Skeleton width={128} height={128} className="me-3" />
                        <Skeleton width={128} height={128} className="me-3" />
                    </div>
                </div>
                <div className="container-fluid mt-4">
                    <h1 className="font-22x fw-bold">Categories</h1>
                </div>
                <div className="container-fluid extra-container">
                    <div className="slider-carosel">
                        <Skeleton width={128} height={128} className="me-3" />
                        <Skeleton width={128} height={128} className="me-3" />
                        <Skeleton width={128} height={128} className="me-3" />
                        <Skeleton width={128} height={128} className="me-3" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
