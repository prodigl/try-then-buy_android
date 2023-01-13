import Cart from "assets/vectors/cart";
import Heart from "assets/vectors/heart";
import React from "react";
import { config } from "config";
import Link from "next/link";
import Star from "assets/vectors/Star";
import BlankStar from "assets/vectors/Blank-star";

const Product = ({ product, percentageDeal }) => {
  const addDefaultSrc = (e) => {
    e.target.src = "/images/error-product-image.png";
  };
  return (
    <>
      <div>
        <div className="product-box mx-auto">
          <div className="card product-card">
            <div className="card-image customise-img">
              <Link href={`/product/${product?.slug}`}>
                <img
                  src={`${config.productbasepath}${product?.photo}`}
                  className="image-product"
                  onError={addDefaultSrc}
                />
              </Link>
              <div className="discount">
                <span>{percentageDeal(
                  parseInt(product?.price),
                  parseInt(product?.previous_price)
                )}% off</span>
              </div>
            </div>
            <div className="card-body ">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex">
                  {[...Array(5)].map((_, i) => {
                    return (
                      <span key={i}>
                        {Math.round(product?.avg_rating[0]?.rating) >
                          i ? (
                          <Star width={16} height={16} color="#F39200" />
                        ) : (
                          <>
                            <BlankStar width={16} height={16} />
                          </>
                        )}
                      </span>
                    );
                  })}

                </div>
                {/* <div className="product-discount">
                                  <p className="mb-0">
                                    (
                                    {percentageDeal &&
                                      percentageDeal(
                                        product?.price,
                                        product?.previous_price
                                      )}
                                    % OFF)
                                  </p>
                                </div> */}
              </div>
              <p className="product-heading mt-3 mb-0 text-start">
                {product?.name.length < 18
                  ? `${product?.name}`
                  : `${product?.name.substring(0, 17)}..`}
              </p>
              {/* <p className="product-title mt-2 text-start">
                          Amberville by z-designs
                        </p> */}
              <div className="d-xl-flex justify-content-between">
                <p className="font-14x mt-3 text-start fw-bold">
                  {`₹${parseInt(product?.price).toLocaleString()}`}
                  <del className="product-marked-price ms-3 font-18x">
                    {" "}
                    {`₹${parseInt(product?.previous_price).toLocaleString()}`}
                  </del>
                </p>
                {/* <div className="d-flex mt-3">
                            <div
                              onClick={() => addToWishlist(crrElm.id)}
                              style={{ cursor: "pointer" }}
                            >
                              <Heart width={26} height={22} />
                            </div>
                            <div className="ms-3" style={{ cursor: "pointer" }}>
                              <Cart width={26} height={24} />
                            </div>
                          </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
