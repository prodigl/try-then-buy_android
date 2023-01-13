import React, { useEffect, useRef, useState } from "react";
import { config } from "config";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper";

const ImageSlider = ({ product, ar, data }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const[Product, setProduct] = useState("");
  // console.log('ar',data?.ar)

  // const ar = data?.ar;

  // const atm = {
  //   ar : `${data?.ar}`
  // }
  // ani.push(atm)
  // ani.push(ar);
  // ani.push(imgg);
  // console.log('dataa', ani)
  
  useEffect(() => {
    if(product?.length) {
      let ani = [];
       ani.push(...product);

       if(data?.ar?.length) {
        const atm = {
          ar: `${data?.ar}`
        }
        ani.push(atm)
       }
      
      
      console.log('ani', ani)
      setProduct(ani);

    }
  }, [data, product])
  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
          objectFit: "scale-down",
          textAlign: "center",
        }}
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >

        {
        Product.length ?
        Product?.map((image, index) => {
          return (
            <>
              {
                Object.keys(image) != 'ar' ?
                  <SwiperSlide >

                    <img
                      src={`${config.gallerySlider}${image.photo}`}
                      className="productImg img-fluid"
                      style={{
                        objectFit: "scale-down",
                      }}
                    />

                  </SwiperSlide>
                  :
                  <SwiperSlide>
                    <iframe
                      src={`${image.ar}`}
                      frameborder="0"
                      width="100%"
                      className="iframe-control"
                    ></iframe>
                  </SwiperSlide>
              }



            </>
          )



        }) : ''
      }
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
        // style={{
        //   paddingBottom: "20px !important",
        // }}

        breakpoints={{
          350: {
            slidesPerView: 2.3,
          },
          390: {
            slidesPerView: 3,
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
          1001 : {
            slidesPerView: 3.5,
          }

        }}
      >
        {
          Product.length ?
          Product?.map((image, index) => {
            return (
              <>
                {
                  Object.keys(image) != 'ar' ?
                    <SwiperSlide>
                      <div
                        style={{
                          width: "95px",
                          height: "95px",
                        }}
                      >
                        <img
                          src={`${config.gallerySlider}${image.photo}`}
                          className="img-fluid productImgSmall"
                        />


                      </div>
                    </SwiperSlide> :
                    <SwiperSlide>
                      <div
                        style={{
                          width: "95px",
                          height: "95px",
                        }}
                      >
                        <img
                          src="/icons/360.jpg"
                          frameborder="0"
                          width="100%"
                        ></img>
                      </div>
                    </SwiperSlide>
                }
              </>
            );
          })
          : ''

        }
      </Swiper>

      
    </>
  );
};

export default ImageSlider;
