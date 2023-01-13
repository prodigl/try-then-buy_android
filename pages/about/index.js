import { Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper";
import "swiper/css/navigation";
import NewsLetter from "components/NewsLetter";
import {Header} from "components";
import Footer from "components/Footer";

const About = () => {
  return (
    <>
    <Header />
      
      {/* mobile view */}
      <div className="mobile">
        {/*******Header background Image Section  */}
        <div className="about-section-header-mobile">
          <div className="container about-header-mobile">
            <h1 className="font-30x text-white">ABOUT US</h1>
          </div>
        </div>
        {/* *********Body section******  */}
        <div className="container-fluid px-3 mt-5">
          <div className="row">
            <div className="col-12">
              <h1 className="font-26x text-dark">
                We are india’s 2nd most popular brand in Furniture
              </h1>

              <p className="font-16x mt-5" style={{ fontWeight: 500 }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>

              <div className="about-box py-3 px-5" style={{ height: "auto" }}>
                <div className="mb-1">
                  <h3 className="font-35x mb-0">3+</h3>
                  <p className="mb-0 font-16x">Years in Industry</p>
                </div>
                <div className="mt-4">
                  <h3 className="font-35x mb-0">13+</h3>
                  <p className="mb-0 font-16x">Offices</p>
                </div>
                <div className="mt-4">
                  <h3 className="font-35x mb-0">13,999+</h3>
                  <p className="mb-0 font-16x">Satisfied Customers</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* *********Mobile Carosel******  */}

        <div className="container-fluid px-3 mt-5">
          <Swiper
            modules={[Navigation, Autoplay]}
            slidesPerView={1}
            spaceBetween={30}
            navigation
            centeredSlides={true}
            // autoplay={{
            //     delay: 2500,
            //     disableOnInteraction: false,
            // }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
          >
            <SwiperSlide>
              <img src="/images/happy.jpg" alt="" className="img-fluid" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/images/happy.jpg" alt="" className="img-fluid" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/images/happy.jpg" alt="" className="img-fluid" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/images/happy.jpg" alt="" className="img-fluid" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/images/happy.jpg" alt="" className="img-fluid" />
            </SwiperSlide>
          </Swiper>
        </div>

        <div className="container-fluid px-3">
          <div className="d-flex justify-content-center align-items-center flex-column">
            <h3 className="mb-0 font-26x">Our Mission</h3>
            <p
              className="mb-0 text-center font-16x mt-3"
              style={{
                fontWeight: 500,
                color: "#2B2B2B",
              }}
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy tex.
            </p>
          </div>
          <p
            className="mb-0  font-16x mt-5"
            style={{
              fontWeight: 500,
              color: "#2B2B2B",
            }}
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
            <br />
            <br />
            It has survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged. It was
            popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem
            Ipsum.
          </p>

          <p
            className="mb-0 font-16x mt-5"
            style={{
              fontWeight: 500,
              color: "#646464",
            }}
          >
            All our products are ISO Certified
          </p>
          <img src="/images/iso.svg" alt="" className="mt-3" />
          <p
            className="mb-0 font-16x mt-3"
            style={{
              fontWeight: 500,
              color: "#646464",
            }}
          >
            ISO 9001
          </p>
        </div>

        <div className="container-fluid px-3" style={{ marginTop: "80px" }}>
          <h1 className="font-26x text-dark">
            What we are working on right now
          </h1>
          <p
            className="font-16x mt-3"
            id="alternative-black"
            style={{
              fontWeight: 500,
              color: "#2B2B2B",
            }}
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </div>

        <div className="container-fluid px-3" style={{ marginTop: "80px" }}>
          <h1 className="font-26x">Leadership team</h1>
          <div className="row">
            <div className="col-12">
              <div className="cart cart-details p-3" style={{ height: "auto" }}>
                <img src="/images/image1.jpg" alt="" />
                <h1 className="font-22x mt-3 fw-bold mb-0">
                  Dishant Agnihotri
                </h1>
                <p className="mb-0 font-16x" id="secondry-text">
                  Founder / CEO
                </p>

                <p className="font-16x mt-1" id="primary-color">
                  ceo@trythenbuy.com
                </p>
                <div className="d-flex mt-4">
                  <img src="/images/profile-linkdin.svg" className="me-3" />
                  <img src="/images/profile-facebook.svg" className="me-3" />
                  <img src="/images/profile-twitter.svg" />
                </div>
              </div>

              <div
                className="cart cart-details p-3 mt-3"
                style={{ height: "auto" }}
              >
                <img src="/images/image1.jpg" alt="" />
                <h1 className="font-22x mt-3 fw-bold mb-0">
                  Dishant Agnihotri
                </h1>
                <p className="mb-0 font-16x" id="secondry-text">
                  Founder / CEO
                </p>

                <p className="font-16x mt-1" id="primary-color">
                  ceo@trythenbuy.com
                </p>
                <div className="d-flex mt-4">
                  <img src="/images/profile-linkdin.svg" className="me-3" />
                  <img src="/images/profile-facebook.svg" className="me-3" />
                  <img src="/images/profile-twitter.svg" />
                </div>
              </div>

              <div
                className="cart cart-details p-3 mt-3"
                style={{ height: "auto" }}
              >
                <img src="/images/image1.jpg" alt="" />
                <h1 className="font-22x mt-3 fw-bold mb-0">
                  Dishant Agnihotri
                </h1>
                <p className="mb-0 font-16x" id="secondry-text">
                  Founder / CEO
                </p>

                <p className="font-16x mt-1" id="primary-color">
                  ceo@trythenbuy.com
                </p>
                <div className="d-flex mt-4">
                  <img src="/images/profile-linkdin.svg" className="me-3" />
                  <img src="/images/profile-facebook.svg" className="me-3" />
                  <img src="/images/profile-twitter.svg" />
                </div>
              </div>

              <div
                className="cart cart-details p-3 mt-3"
                style={{ height: "auto" }}
              >
                <img src="/images/image1.jpg" alt="" />
                <h1 className="font-22x mt-3 fw-bold mb-0">
                  Dishant Agnihotri
                </h1>
                <p className="mb-0 font-16x" id="secondry-text">
                  Founder / CEO
                </p>

                <p className="font-16x mt-1" id="primary-color">
                  ceo@trythenbuy.com
                </p>
                <div className="d-flex mt-4">
                  <img src="/images/profile-linkdin.svg" className="me-3" />
                  <img src="/images/profile-facebook.svg" className="me-3" />
                  <img src="/images/profile-twitter.svg" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container" style={{ marginTop: "100px" }}>
          <NewsLetter />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
