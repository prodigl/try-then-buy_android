import NewsLetter from "components/NewsLetter";
import React from "react";
import {Header} from "components";
import Footer from "components/Footer";

const contact = () => {
  return (
    <>
    <Header />

      {/* mobile view */}
      <div className="mobile">
        <div
          className="container-fluid"
          style={{ marginTop: "170px", width: "90%" }}
        >
          <div className="row">
            <div className="col-12 text-center">
              <img
                src="images/contact-form.svg"
                className="img-fluid"
                width={147}
              />
            </div>
            <div className="col-12">
              <h1 className="font-24x text-center pt-4 fw-bold">
                Have a Query?
              </h1>
              <p
                className="font-16x fw-lighter text-justify mt-4"
                id="secondry-text"
              >
                A bed with a good storage space for multiple purpose you can use
                it in different ways. A bed with a good storage space for
                multiple purpose you can use it.
              </p>

              <div className="text-center mt-4">
                <button className="contact-box-faq">
                  <span className="me-3 fw-bold">Visit Help Centre</span>
                  <img src="images/arrow.svg" alt="arrow" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <div
            className="text-center d-flex justify-content-center"
            style={{ marginTop: "100px" }}
          >
            <hr
              className="text-center"
              style={{ width: "50%", border: "2px solid black", opacity: "1" }}
            />
          </div>

          <div className="text-center">
            <h1 className="font-24x text-center pt-4 mb-3 fw-bold">
              Can’t Find What You are Looking for ??
            </h1>
            <p
              className="font-18x fw-bold mb-5"
              id="primary-color"
              style={{ letterSpacing: "0.14em" }}
            >
              LEAVE US A MESSAGE{" "}
            </p>
          </div>

          <div className="row">
            <div className="col-12 d-flex justify-content-center">
              <div className="faq-box-model d-flex justify-content-center align-items-center p-3 flex-column ">
                <h1 className="font-24x fw-bold">Helpline Number</h1>
                <h1 className="font-24x" style={{ fontWeight: 500 }}>
                  +91 71080 XXXXX
                </h1>
              </div>
            </div>
            <div className="col-12 d-flex justify-content-center mt-5">
              <div className="faq-box-model d-flex justify-content-center align-items-center p-3 flex-column ">
                <h1 className="font-24x fw-bold">Email </h1>
                <h1 className="font-24x" style={{ fontWeight: 500 }}>
                  info@trythenbuy.in
                </h1>
              </div>
            </div>
          </div>

          <div className="text-center d-flex justify-content-center mt-5">
            <div className="faq-box-model d-flex justify-content-center p-3 flex-column">
              <h1 className="font-24x fw-bold">Office Address</h1>
              <h1 className="font-24x" style={{ fontWeight: 500 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.i
              </h1>
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

export default contact;
