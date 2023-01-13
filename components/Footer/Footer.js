import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <>


      {/* mobile version */}
      <div className="mobile">
        <footer>
          <div className="footer-section">
            <div className="container px-4">
              <div className="row">
                <div className="col-4 d-flex justify-content-center align-items-start flex-column">
                  <p className="font-14x text-white mb-4">Categories</p>
                  <ul>
                    <li>
                      <Link href="">
                        <a className="footer-links">Living Room</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="">
                        <a className="footer-links">Dining Room</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="">
                        <a className="footer-links">Bedroom</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="">
                        <a className="footer-links">Kids Room</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="">
                        <a className="footer-links">Study Room </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="">
                        <a className="footer-links">Kitchen</a>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="col-4 ">
                  <p className="font-14x text-white mb-4">Categories</p>
                  <ul>
                    <li>
                      <Link href="">
                        <a className="footer-links">Living Room</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="">
                        <a className="footer-links">Dining Room</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="">
                        <a className="footer-links">Bedroom</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="">
                        <a className="footer-links">Kids Room</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="">
                        <a className="footer-links">Study Room </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="">
                        <a className="footer-links">Kitchen</a>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="col-4 d-flex justify-content-end align-items-center flex-column">
                  <p className="font-14x text-white mb-4">Categories</p>
                  <ul>
                    <li>
                      <Link href="">
                        <a className="footer-links">Living Room</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="">
                        <a className="footer-links">Dining Room</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="">
                        <a className="footer-links">Bedroom</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="">
                        <a className="footer-links">Kids Room</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="">
                        <a className="footer-links">Study Room </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="">
                        <a className="footer-links">Kitchen</a>
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="col-4 mt-5">
                  <p className="font-14x text-white mb-4">About Us</p>
                  <ul>
                    <li>
                      <Link href="">
                        <a className="footer-links">Contact Us</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="">
                        <a className="footer-links">Join Us</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="">
                        <a className="footer-links">About Us</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="">
                        <a className="footer-links">Blog</a>
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="col-4 mt-5">
                  <div className="">
                    <p className="font-14x text-white  mb-4">Help</p>

                    <ul>
                      <li>
                        <Link href="">
                          <a className="footer-links">Return Policy</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="">
                          <a className="footer-links">Shipping</a>
                        </Link>
                      </li>
                      <li>
                        <Link href="">
                          <a className="footer-links">Help Center & FAQs</a>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <hr className="my-5 horizental-line" />
              <div className="row">
                <div className="col-12">
                  <div className="col-12">
                    <div className="row">
                      <div className="col-3">
                        <img src="/icons/call.svg" alt="talk_img" />
                      </div>
                      <div className="col-9">
                        <p className="font-14x mb-2 text-white">Talk to us</p>
                        <p className="font-14x mb-0 text-white">
                          1800-212-7500
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 mt-5">
                    <div className="row">
                      <div className="col-3">
                        <img src="/icons/message.svg" alt="talk_img" />
                      </div>
                      <div className="col-9">
                        <p className="font-14x mb-2 text-white">Help centre</p>
                        <p className="font-14x mb-0 text-white">
                          trythrnbuy.in/help
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 mt-5">
                    <div className="row">
                      <div className="col-3">
                        <img src="/icons/letter.svg" alt="talk_img" />
                      </div>
                      <div className="col-9">
                        <p className="font-14x mb-2 text-white">Write to us</p>
                        <p className="font-14x mb-0 text-white">
                          help@trythenbuy@gmail.com
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 mt-5">
                  <a href="">
                    <img src="/images/facebook.svg" alt="" />
                  </a>
                  <a href="" className="ms-3">
                    <img src="/images/linkdin.svg" alt="" />
                  </a>
                  <a href="" className="ms-3">
                    <img src="/images/whatsapp.svg" alt="" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-section-dark py-3">
            <div className="container">
              <div className="row d-flex justify-content-center align-items-center flex-column">
                <div className="col-12 d-flex justify-content-center align-items-center pt-5">
                  <a>
                    <img
                      src="/images/brand-logo-full.svg"
                      alt=""
                      style={{ width: "181px", height: "25px" }}
                    />
                  </a>
                </div>
                <div className="col-12 d-flex justify-content-center align-items-center flex-column mt-4">
                  <p className="font-12x mb-2" id="primary-text">
                    Copyright © 2022 | Try N Buy Properties Limited.
                  </p>
                  <p className="font-10x mb-0" id="primary-text">
                    Privacy Policy - Terms & Conditions
                  </p>
                </div>

                <div className="col-12 d-flex justify-content-center mt-4 pb-5">
                  <div className="d-flex align-items-center">
                    <a href="">
                      <img src="/images/paypal.svg" alt="" />
                    </a>
                    <a href="" className="ms-3">
                      <img src="/images/mastercard.svg" alt="" />
                    </a>
                    <a href="" className="ms-3">
                      <img src="/images/paypal.svg" alt="" />
                    </a>
                    <a href="" className="ms-3">
                      <img src="/images/paypal.svg" alt="" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;
