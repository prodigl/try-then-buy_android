import React from "react";
import { CartVolume } from "providers/CartContext";
import { config } from "config";
import CompareCard from "components/CompareProduct/CompareProductCard/CompareCard";
import {Header} from "components";
import Footer from "components/Footer";

const product = () => {
  const { compare } = CartVolume();

  //Add default src for 404 image
  const addDefaultSrc = (e) => {
    e.target.src = "/images/error-product-image.png";
  };

  return (
    <>
    <Header />
      <div className="desktop">
        <div className="container pt-5">
          <h1 className="font-28x fw-bold "> Compare Products</h1>
          <div className="row">
            <div className="col-lg-3"></div>
            {[...Array(3)].map((_, i) => {
              //   console.log(compare[i], compare[i]?.name);
              return compare[i] == null ? (
                <CompareCard />
              ) : (
                <div className="col-lg-3">
                  <div className="product-box m-0" style={{ width: "100%" }}>
                    <div class="card product-card">
                      <img
                        src={`${config.productbasepath}${compare[i]?.photo}`}
                        class="card-img-top"
                        width={216}
                        height={216}
                        onError={addDefaultSrc}
                      />
                      <div class="card-body ">
                        <p className="product-heading mt-2 mb-0">
                          {compare[i]?.name?.slice(0, 15) + "..."}
                        </p>
                        <p className="product-title mt-2">
                          Amberville by z-designs
                        </p>
                        <button
                          className="add-to-cart-product"
                          style={{ width: "158px" }}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="row mt-5">
            <div className="col-lg-3">
              <p className="mb-0 font-18x" style={{ fontWeight: 500 }}>
                Size
              </p>
            </div>
            <div className="col-lg-3">
              <p className="mb-0 font-16x" id="secondry-text">
                King
              </p>
            </div>
            <div className="col-lg-3">
              <p
                className="mb-0 font-16x"
                id="secondry-text"
                style={{ fontWeight: 500 }}
              >
                King
              </p>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-lg-3">
              <p className="mb-0 font-18x" style={{ fontWeight: 500 }}>
                Ratings
              </p>
            </div>
            <div className="col-lg-3">
              <div className="d-flex align-items-center">
                <p className="mb-0 font-16x me-1" id="secondry-text">
                  5
                </p>
                <span className="d-flex">
                  <img
                    src="/images/star.svg"
                    width="16px"
                    height="16px"
                    className="me-1"
                  />
                  <img
                    src="/images/star.svg"
                    width="16px"
                    height="16px"
                    className="me-1"
                  />
                  <img
                    src="/images/star.svg"
                    width="16px"
                    height="16px"
                    className="me-1"
                  />
                  <img
                    src="/images/star.svg"
                    width="16px"
                    height="16px"
                    className="me-1"
                  />
                  <img
                    src="/images/star.svg"
                    width="16px"
                    height="16px"
                    className="me-1"
                  />
                </span>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="d-flex align-items-center">
                <p className="mb-0 font-16x me-1" id="secondry-text">
                  5
                </p>
                <span className="d-flex">
                  <img
                    src="/images/star.svg"
                    width="16px"
                    height="16px"
                    className="me-1"
                  />
                  <img
                    src="/images/star.svg"
                    width="16px"
                    height="16px"
                    className="me-1"
                  />
                  <img
                    src="/images/star.svg"
                    width="16px"
                    height="16px"
                    className="me-1"
                  />
                  <img
                    src="/images/star.svg"
                    width="16px"
                    height="16px"
                    className="me-1"
                  />
                  <img
                    src="/images/star.svg"
                    width="16px"
                    height="16px"
                    className="me-1"
                  />
                </span>
              </div>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-lg-3">
              <p className="mb-0 font-18x" style={{ fontWeight: 500 }}>
                Price
              </p>
            </div>
            <div className="col-lg-3">
              <p className="mb-0 font-16x" id="primary-color">
                ₹26,000
              </p>
            </div>
            <div className="col-lg-3">
              <p className="mb-0 font-16x" id="primary-color">
                ₹26,000
              </p>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-lg-3">
              <p className="mb-0 font-18x" style={{ fontWeight: 500 }}>
                Colour
              </p>
            </div>
            <div className="col-lg-3">
              <p className="mb-0 font-16x" id="secondry-text">
                Black
              </p>
            </div>
            <div className="col-lg-3">
              <p className="mb-0 font-16x" id="secondry-text">
                Black
              </p>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-lg-3">
              <p className="mb-0 font-18x" style={{ fontWeight: 500 }}>
                Finish
              </p>
            </div>
            <div className="col-lg-3">
              <p className="mb-0 font-16x" id="secondry-text">
                Texture Finished Black
              </p>
            </div>
            <div className="col-lg-3">
              <p className="mb-0 font-16x" id="secondry-text">
                Texture Finished Black
              </p>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-lg-3">
              <p className="mb-0 font-18x" style={{ fontWeight: 500 }}>
                Material
              </p>
            </div>
            <div className="col-lg-3">
              <p className="mb-0 font-16x" id="secondry-text">
                Metal
              </p>
            </div>
            <div className="col-lg-3">
              <p className="mb-0 font-16x" id="secondry-text">
                Metal
              </p>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-lg-3">
              <p className="mb-0 font-18x" style={{ fontWeight: 500 }}>
                Product <br /> Dimensions
              </p>
            </div>
            <div className="col-lg-3">
              <p className="mb-0 font-16x" id="secondry-text">
                190.5 x 182.88 x 101.6 cm, 75 Kilograms
              </p>
            </div>
            <div className="col-lg-3">
              <p className="mb-0 font-16x" id="secondry-text">
                190.5 x 182.88 x 101.6 cm, 75 Kilograms
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mobile">
        <div className="container-fluid">
          <h1 className="font-20x fw-bold mt-5"> Compare Products</h1>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default product;
