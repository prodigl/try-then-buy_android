import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper';

const category = () => {
    return (
        <>
            <div className="mobile">
                <div className="category-box">
                    <div className="container-fluid px-4">
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
                        <h1 className="font-22x mb-5">
                            <Skeleton />
                        </h1>
                    </div>
                    <div className="container-fluid extra-container px-4">
                        <div className="slider-carosel">
                            <div className="card card-style-box me-4">
                                <Skeleton
                                    className="card-img-top"
                                    height="116px"
                                />
                                <div className="card-body card-style-body">
                                    <p className="card-text">
                                        <Skeleton />
                                    </p>
                                </div>
                            </div>
                            <div className="card card-style-box me-4">
                                <Skeleton
                                    className="card-img-top"
                                    height="116px"
                                />
                                <div className="card-body card-style-body">
                                    <p className="card-text">
                                        <Skeleton />
                                    </p>
                                </div>
                            </div>
                            <div className="card card-style-box me-4">
                                <Skeleton
                                    className="card-img-top"
                                    height="116px"
                                />
                                <div className="card-body card-style-body">
                                    <p className="card-text">
                                        <Skeleton />
                                    </p>
                                </div>
                            </div>
                            <div className="card card-style-box me-4">
                                <Skeleton
                                    className="card-img-top"
                                    height="116px"
                                />
                                <div className="card-body card-style-body">
                                    <p className="card-text">
                                        <Skeleton />
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid mt-3 px-2">
                    <h1 className="font-18x mt-4">Top Selling Products</h1>
                    <Swiper
                        navigation={true}
                        loop={true}
                        modules={[Navigation]}
                        className="mySwiper"
                        breakpoints={{
                            360: {
                                slidesPerView: 2,
                                spaceBetween: 6,
                            },
                            568: {
                                slidesPerView: 1,
                                // spaceBetween: 10
                            },
                            608: {
                                slidesPerView: 2.5,
                                spaceBetween: 30,
                            },
                            768: {
                                slidesPerView: 2.5,
                                spaceBetween: 30,
                            },
                            820: {
                                slidesPerView: 2.5,
                                spaceBetween: 30,
                            },
                            1001: {
                                slidesPerView: 3.5,
                                spaceBetween: 30,
                            },
                        }}>
                        <SwiperSlide>
                            <div className="product-box mx-auto">
                                <div className="card product-card">
                                    <div className="card-image customise-img">
                                        <Skeleton className="image-product" />
                                        <div className="discount">
                                            <span>
                                                <Skeleton /> % off
                                            </span>
                                        </div>
                                    </div>
                                    <div className="card-body ">
                                        <p className="product-heading mt-3 mb-0 text-start">
                                            <Skeleton width="150px" />
                                        </p>

                                        <div className="d-xl-flex justify-content-between">
                                            <p className="font-14x mt-3 text-start fw-bold">
                                                <Skeleton width="150px" />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
                <section>
                    <div className="container">
                        <div className="row my-3">
                            <div className="col-12">
                                <div className="d-flex justify-content-between align-items-center">
                                    <p
                                        className="font-16x mb-0"
                                        id="secondry-text">
                                        <Skeleton width="200px" />
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <div className="row px-1">
                                    <div className="col-6 col-sm-6 col-md-4 ps-0 pe-1">
                                        <div className="product-box-cart">
                                            <div className="card product-card">
                                                <div
                                                    className="card-image customise-img"
                                                    style={{
                                                        height: '204px',
                                                    }}>
                                                    <Skeleton
                                                        className="card-img-top"
                                                        style={{
                                                            height: '204px',
                                                        }}
                                                    />

                                                    <div className="discount">
                                                        <span>
                                                            <Skeleton width="150px" />
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="card-body ">
                                                    <p className="product-heading mb-0 text-start">
                                                        <Skeleton width="150px" />
                                                    </p>
                                                    <div className="product-discount">
                                                        <p className="mb-0 text-start">
                                                            <Skeleton width="150px" />
                                                        </p>
                                                    </div>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div>
                                                            <p className="font-14x mt-2 mb-3 fw-bold">
                                                                <Skeleton width="150px" />
                                                            </p>
                                                            <p className="font-10x text-start mb-2">
                                                                <Skeleton width="150px" />
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <hr className="my-2" />
                                                    <div className="d-flex justify-content-between align-items-center px-2">
                                                        <Skeleton width="50px" />
                                                        <Skeleton width="50px" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6 col-sm-6 col-md-4 ps-0 pe-1">
                                        <div className="product-box-cart">
                                            <div className="card product-card">
                                                <div
                                                    className="card-image customise-img"
                                                    style={{
                                                        height: '204px',
                                                    }}>
                                                    <Skeleton
                                                        className="card-img-top"
                                                        style={{
                                                            height: '204px',
                                                        }}
                                                    />

                                                    <div className="discount">
                                                        <span>
                                                            <Skeleton width="150px" />
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="card-body ">
                                                    <p className="product-heading mb-0 text-start">
                                                        <Skeleton width="150px" />
                                                    </p>
                                                    <div className="product-discount">
                                                        <p className="mb-0 text-start">
                                                            <Skeleton width="150px" />
                                                        </p>
                                                    </div>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div>
                                                            <p className="font-14x mt-2 mb-3 fw-bold">
                                                                <Skeleton width="150px" />
                                                            </p>
                                                            <p className="font-10x text-start mb-2">
                                                                <Skeleton width="150px" />
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <hr className="my-2" />
                                                    <div className="d-flex justify-content-between align-items-center px-2">
                                                        <Skeleton width="50px" />
                                                        <Skeleton width="50px" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default category;
