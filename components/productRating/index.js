import React from "react";

const index = () => {
  return (
    <>
            <div
              className="row mx-0 d-flex align-items-center mb-3"
            >
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
                    // style={{ width: rating.total }}
                  ></div>
                </div>
              </div>
              <div className="col-2">
                <p className="mb-0 font-16x" id="secondry-text">
                  5
                </p>
              </div>
            </div>

            <div
              className="row mx-0 d-flex align-items-center mb-3"
            >
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
                    // style={{ width: rating.total }}
                  ></div>
                </div>
              </div>
              <div className="col-2">
                <p className="mb-0 font-16x" id="secondry-text">
                  4
                </p>
              </div>
            </div>
          </>
    
  );
};

export default index;
