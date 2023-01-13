import { useState, useEffect } from 'react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import config from 'config/config';
import api from 'helpers/api';
import Link from 'next/link';
import NewsLetter from 'components/NewsLetter';
import { Header } from 'components';
import Footer from '../components/Footer';
import Loader from 'components/LoadingSpinner';
import PositionIssue from 'components/PositionIssue';
import Skeleton from 'components/Skelten/HomeSkelten';

const Homepage = (props) => { 
    // const [homepage, setHomepage] = useState(props?.data?.data);
    const [homepage, setHomepage] = useState();
    const [category, setCategory] = useState('');
    const [isLoader, setIsLoader] = useState(false);

    //Fetching the header-Catergory
    const fetchCategory = async () => {
        setIsLoader(true);
        try {
            const responce = await api.get(`header-category`);
            const data = responce.data;
            // console.log('homepage', data);
            if (data) {
                setCategory(data.data);
                setIsLoader(false);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchCategory();
    }, []);

    const fetchHomepage = async () => {
        setIsLoader(true);
        try {
            const responce = await api.get(`homepage`);
            const data = responce.data;
            // console.log('homepage', data.data);
            if (data) {
                setIsLoader(false);
                setHomepage(data.data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchHomepage();
    }, []);

    //Add product default src
    const addDefaultSrc = (e) => {
        e.target.src = '/images/error-product-image.png';
    };

    //Add category default src
    const addCategorySrc = (e) => {
        e.target.src = '/images/error-product-image.png';
    };
    return (
        <>
            <Header />
            <PositionIssue>
                {isLoader ? (
                    <Skeleton />
                ) : (
                    <div className="mobile">
                        <div className="container-fluid mt-5 pt-2">
                            <Swiper
                                spaceBetween={30}
                                slidesPerView={1}
                                autoplay
                                modules={[Pagination, A11y, Autoplay]}
                                pagination={{ clickable: true }}>
                                {homepage &&
                                    homepage[0]?.section_data?.map(
                                        (banner, index) => {
                                            return (
                                                <>
                                                    <SwiperSlide key={banner?.id}>
                                                        <Link href="#">
                                                            <a className="w-100 ">
                                                                <img
                                                                    src={`${config.homepagePath}${banner.image}`}
                                                                    width="100%"
                                                                    // height="357px"
                                                                    style={
                                                                        {
                                                                            // height: "200px",
                                                                            // objectFit:'fill'
                                                                        }
                                                                    }
                                                                    onError={
                                                                        addCategorySrc
                                                                    }
                                                                />
                                                            </a>
                                                        </Link>
                                                    </SwiperSlide>
                                                </>
                                            );
                                        }
                                    )}
                            </Swiper>
                        </div>
                        {homepage && homepage[1].name == 'Special Offers' ? (
                            <>
                                <div className="container-fluid mt-4">
                                    <h1 className="font-22x fw-bold">
                                        Special Offers
                                    </h1>
                                </div>
                            </>
                        ) : null}

                        <div className="container-fluid extra-container">
                            <div className="slider-carosel">
                                {homepage &&
                                    homepage[1]?.section_data?.map((offer) => {
                                        return (
                                            <>
                                                <img
                                                    src={`${config.homepagePath}${offer.image}`}
                                                    alt={offer.name}
                                                    className="special-offer"
                                                    onError={addCategorySrc}
                                                    key={offer.id}
                                                />
                                            </>
                                        );
                                    })}
                            </div>
                        </div>

                        <div className="container-fluid mt-4">
                            {category && (
                                <h1 className="font-22x fw-bold">Categories</h1>
                            )}
                        </div>
                        <div className="container-fluid extra-container">
                            <div className="slider-carosel">
                                {category &&
                                    category?.category?.map((category) => {
                                        return (
                                            <>
                                                <Link
                                                    href={`/category/${category?.slug}`} key={category.id}>
                                                    <div className="text-center">
                                                        <img
                                                            src={`${config.categoriesBasePath}${category.photo}`}
                                                            alt={category.name}
                                                            className="category-offer"
                                                            onError={
                                                                addCategorySrc
                                                            }
                                                        />
                                                        <span className="font-12x d-flex align-items-center justify-content-center mt-2">
                                                            {category.name}
                                                            <img src="/icons/anchor.svg" />
                                                        </span>
                                                    </div>
                                                </Link>
                                            </>
                                        );
                                    })}
                            </div>
                        </div>

                        <div className="container-fluid mt-5">
                            <img
                                src={`${config.homepagePath}${
                                    homepage &&
                                    homepage[2]?.section_data[0]?.image
                                }`}
                                className="landscape"
                                onError={addCategorySrc}
                            />
                        </div>
                        <div className="mt-5">
                            <NewsLetter />
                        </div>
                    </div>
                )}
                <Footer />
            </PositionIssue>
        </>
    );
};

export default Homepage;
