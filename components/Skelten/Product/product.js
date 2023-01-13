import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import {
    FreeMode,
    Navigation,
    Thumbs,
    Pagination,
    A11y,
    Autoplay,
} from 'swiper';

const product = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    return (
        <>
            <div className="mobile">
                <div className="container-fluid mt-5 pt-4">
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Skeleton width="100px" />
                            </li>
                            <li className="breadcrumb-item">
                                <a>
                                    <Skeleton width="100px" />
                                </a>
                            </li>
                        </ol>
                    </nav>

                    <div className="col-12 mb-4">
                        <div style={{ position: 'relative' }}>
                            <Swiper
                                style={{
                                    '--swiper-navigation-color': '#fff',
                                    '--swiper-pagination-color': '#fff',
                                    objectFit: 'scale-down',
                                    textAlign: 'center',
                                }}
                                spaceBetween={10}
                                thumbs={{ swiper: thumbsSwiper }}
                                // modules={[FreeMode, Navigation, Thumbs]}
                                autoplay
                                modules={[
                                    FreeMode,
                                    Navigation,
                                    Thumbs,
                                    Pagination,
                                    A11y,
                                    Autoplay,
                                ]}
                                pagination={{ clickable: true }}
                                className="mySwiper2">
                                <SwiperSlide>
                                    <Skeleton
                                        className="productImg img-fluid"
                                        height="192px"
                                    />
                                </SwiperSlide>
                            </Swiper>

                            <Swiper
                                onSwiper={setThumbsSwiper}
                                navigation={true}
                                spaceBetween={0}
                                // slidesPerView={3}
                                freeMode={true}
                                watchSlidesProgress={true}
                                modules={[FreeMode, Navigation, Thumbs]}
                                className="mySwiper2"
                                breakpoints={{
                                    350: {
                                        slidesPerView: 3,
                                    },
                                    375: {
                                        slidesPerView: 3.3,
                                    },
                                    390: {
                                        slidesPerView: 3.3,
                                    },
                                    410: {
                                        slidesPerView: 3.6,
                                    },
                                    430: {
                                        slidesPerView: 3.5,
                                    },
                                    460: {
                                        slidesPerView: 4,
                                    },
                                    560: {
                                        slidesPerView: 4.5,
                                    },
                                    1001: {
                                        slidesPerView: 3.5,
                                    },
                                }}>
                                <SwiperSlide>
                                    <div
                                        style={{
                                            width: '95px',
                                            height: '95px',
                                        }}>
                                        <Skeleton height="95px" />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div
                                        style={{
                                            width: '95px',
                                            height: '95px',
                                        }}>
                                        <Skeleton height="95px" />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div
                                        style={{
                                            width: '95px',
                                            height: '95px',
                                        }}>
                                        <Skeleton height="95px" />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div
                                        style={{
                                            width: '95px',
                                            height: '95px',
                                        }}>
                                        <Skeleton height="95px" />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div
                                        style={{
                                            width: '95px',
                                            height: '95px',
                                        }}>
                                        <Skeleton height="95px" />
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </div>

                    <div className="container-fluid ">
                        <div className="row mt-4">
                            <div className="col-12">
                                <h1 className="font-22x fw-bold">
                                    <Skeleton height="40px" />
                                </h1>

                                <div className="d-flex flex-column fs-4">
                                    <p
                                        className="mb-0 font-14x fw-light mt-3 d-flex align-items-center"
                                        id="secondry-text">
                                        <Skeleton width="150px" />:
                                        <span
                                            id="secondry-color"
                                            className="ms-2 fw-bold">
                                            <Skeleton width="150px" />
                                        </span>{' '}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default product;
