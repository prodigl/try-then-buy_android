import React from "react";

const cart = (props) => {
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-3">
            <div className="d-flex justify-content-lg-between mb-4 mb-md-0">
              <img
                src="/images/cart.svg"
                alt=""
                width={props.lWidth}
                className="me-3 me-lg-0"
              />
              <img
                src="/images/hr-line.svg"
                alt=""
                width={2}
                height={props.line}
              />
              <img
                src="/images/secure.svg"
                alt=""
                width={props.sWidth}
                className="ms-3 ms-lg-0"
              />
            </div>
          </div>
          <div className="col-lg-9">
            <p className="font-14x " id="secondry-text">
              Your credit card details are securely encrypted and passed
              directly to our PCI DSS compliant Payment Gateway for processing.
              We only store your credit card's last 4 digits and the expiration
              date. Your traffic to this page is secured using either a 256-bit
              or 128-bit SSL certificate depending on your browser version.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default cart;
