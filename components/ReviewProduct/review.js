import React from "react";
import { config } from "config";

// export const getStaticProps=()=>{

//     const url =`${congir.apiUrl}`

//     return {
//         params : {
//             data
//         }
//     }
// }

const Review = ({ rating, reviews }) => {
  console.log("rating", rating);
  console.log("reviews", reviews);
  return (
    <>
      <div className="container">
        <h1 className="font-28x mb-4">Product Reviews</h1>
        <div className="row">
          <div className="col-lg-4">
            <div className="row mx-0 d-flex align-items-center mb-3">
              <div className="col-1">
                <p className="mb-0 font-24x" id="secondry-text">
                  5
                </p>
              </div>
              <div className="col-1">
                <img
                  src="/images/star.svg"
                  alt=""
                  className=""
                  width="20px"
                  height="20px"
                />
              </div>
              <div className="col-10">
                <p className="mb-0 font-24x" id="secondry-text">
                  {" "}
                  123 reviews
                </p>
              </div>
            </div>

            <div className="row mx-0 d-flex align-items-center mb-3">
              <div className="col-1">
                <p className="mb-0 font-24x" id="secondry-text">
                  5
                </p>
              </div>
              <div className="col-1">
                <img
                  src="/images/star.svg"
                  alt=""
                  className=""
                  width="20px"
                  height="20px"
                />
              </div>
              <div className="col-8">
                <div className="progress w-100" style={{ height: "4px" }}>
                  <div
                    className="progress-bar bg-success"
                    style={{ width: "40%" }}
                  ></div>
                </div>
              </div>
              <div className="col-2">
                <p className="mb-0 font-16x" id="secondry-text">
                  45
                </p>
              </div>
            </div>

            <div className="row mx-0 d-flex align-items-center mb-3">
              <div className="col-1">
                <p className="mb-0 font-24x" id="secondry-text">
                  4
                </p>
              </div>
              <div className="col-1">
                <img
                  src="/images/star.svg"
                  alt=""
                  className=""
                  width="20px"
                  height="20px"
                />
              </div>
              <div className="col-8">
                <div className="progress w-100" style={{ height: "4px" }}>
                  <div
                    className="progress-bar bg-success"
                    style={{ width: "40%" }}
                  ></div>
                </div>
              </div>
              <div className="col-2">
                <p className="mb-0 font-16x" id="secondry-text">
                  28
                </p>
              </div>
            </div>

            <div className="row mx-0 d-flex align-items-center mb-3">
              <div className="col-1">
                <p className="mb-0 font-24x" id="secondry-text">
                  3
                </p>
              </div>
              <div className="col-1">
                <img
                  src="/images/star.svg"
                  alt=""
                  className=""
                  width="20px"
                  height="20px"
                />
              </div>
              <div className="col-8">
                <div className="progress w-100" style={{ height: "4px" }}>
                  <div
                    className="progress-bar bg-success"
                    style={{ width: "40%" }}
                  ></div>
                </div>
              </div>
              <div className="col-2">
                <p className="mb-0 font-16x" id="secondry-text">
                  28
                </p>
              </div>
            </div>

            <div className="row mx-0 d-flex align-items-center mb-3">
              <div className="col-1">
                <p className="mb-0 font-24x" id="secondry-text">
                  2
                </p>
              </div>
              <div className="col-1">
                <img
                  src="/images/star.svg"
                  alt=""
                  className=""
                  width="20px"
                  height="20px"
                />
              </div>
              <div className="col-8">
                <div className="progress w-100" style={{ height: "4px" }}>
                  <div
                    className="progress-bar bg-success"
                    style={{ width: "40%" }}
                  ></div>
                </div>
              </div>
              <div className="col-2">
                <p className="mb-0 font-16x" id="secondry-text">
                  28
                </p>
              </div>
            </div>

            <div className="row mx-0 d-flex align-items-center mb-3">
              <div className="col-1">
                <p className="mb-0 font-24x" id="secondry-text">
                  1
                </p>
              </div>
              <div className="col-1">
                <img
                  src="/images/star.svg"
                  alt=""
                  className=""
                  width="20px"
                  height="20px"
                />
              </div>
              <div className="col-8">
                <div className="progress w-100" style={{ height: "4px" }}>
                  <div
                    claclassNamess="progress-bar bg-success"
                    style={{ width: "40%" }}
                  ></div>
                </div>
              </div>
              <div className="col-2">
                <p className="mb-0 font-16x" id="secondry-text">
                  28
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="product-details-comment">
              <div className="userinfo mb-5">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <img
                      src="/images/user-image.svg"
                      alt=""
                      className="img-fluid"
                    />
                    <p className="mb-0 font-18x ms-3">Purushottam Das</p>
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <p className="mb-0 font-18x">4</p>
                    <img
                      src="/images/star.svg"
                      alt=""
                      className="img-fluid ps-1 "
                    />
                    <img
                      src="/images/star.svg"
                      alt=""
                      className="img-fluid ps-1"
                    />
                    <img
                      src="/images/star.svg"
                      alt=""
                      className="img-fluid ps-1"
                    />
                    <img
                      src="/images/star.svg"
                      alt=""
                      className="img-fluid ps-1"
                    />
                  </div>
                </div>
                <p className="mb-0 font-16x mt-4">
                  It is available in different types of Cotton and Velvet fabric
                  materials. It is available in different types of Cotton and
                  Velvet fabric materials.It is available in different types of
                  Cotton and Velvet fabric materials.Show more
                </p>
              </div>

              <div className="userinfo mb-5">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <img
                      src="/images/user-image.svg"
                      alt=""
                      className="img-fluid"
                    />
                    <p className="mb-0 font-18x ms-3">Purushottam Das</p>
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <p className="mb-0 font-18x">4</p>
                    <img src="/images/star.svg" alt="" className="img-fluid" />
                    <img src="/images/star.svg" alt="" className="img-fluid" />
                    <img src="/images/star.svg" alt="" className="img-fluid" />
                    <img src="/images/star.svg" alt="" className="img-fluid" />
                  </div>
                </div>
                <p className="mb-0 font-16x mt-4">
                  It is available in different types of Cotton and Velvet fabric
                  materials. It is available in different types of Cotton and
                  Velvet fabric materials.It is available in different types of
                  Cotton and Velvet fabric materials.Show more
                </p>
              </div>

              <div className="userinfo mb-5">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <img
                      src="/images/user-image.svg"
                      alt=""
                      className="img-fluid"
                    />
                    <p className="mb-0 font-18x ms-3">Purushottam Das</p>
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <p className="mb-0 font-18x">4</p>
                    <img src="/images/star.svg" alt="" className="img-fluid" />
                    <img src="/images/star.svg" alt="" className="img-fluid" />
                    <img src="/images/star.svg" alt="" className="img-fluid" />
                    <img src="/images/star.svg" alt="" className="img-fluid" />
                  </div>
                </div>
                <p className="mb-0 font-16x mt-4">
                  It is available in different types of Cotton and Velvet fabric
                  materials. It is available in different types of Cotton and
                  Velvet fabric materials.It is available in different types of
                  Cotton and Velvet fabric materials.Show more
                </p>
              </div>

              <a
                className="d-flex justify-content-center font-18x fw-bold"
                id="primary-color"
              >
                Show 50 more reviews
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Review;
