import React from "react";

const NewsLetter = () => {
  return (
    <>
      <section className="subscribe-letter">
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <p className="subscrible-heading mb-0">
                Subscribe to our newsletter.
              </p>
              <p className="font-12x mt-1 mb-0 fw-lighter" id="secondry-text">
                Get our latest offers and news straight in your inbox.
              </p>
              <form className="d-flex mt-4 input-box">
                <input
                  className="form-control me-2 newsletter"
                  type="email"
                  placeholder="Please enter your email address.."
                  aria-label="email"
                />
                <button
                  className="main-button"
                  style={{
                    width: "155px",
                    height: "42px",
                    borderRadius: "0",
                  }}
                >
                  <p className="mb-0 font-12x text-center text-white">
                    SUBSCRIBE
                  </p>
                </button>
              </form>
            </div>

            <div className="col-lg-3 text-center">
              <iframe src="https://embed.lottiefiles.com/animation/99568"></iframe>
            </div>

            <div className="col-lg-4">
              <p className="subscrible-heading mb-0">Download our apps.</p>
              <p className="font-12x mt-1 mb-0 fw-lighter" id="secondry-text">
                Shop our products and offers on-the-go.
              </p>
              <div className="d-flex">
                <img src="/images/android-app.svg" alt="" className="me-3" />
                <img src="/images/ios-app.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewsLetter;
