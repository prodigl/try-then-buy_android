import Link from "next/link";
import { useState,memo } from "react";
import { useRouter } from "next/router";

const Sidebar = ({ user }) => {
  console.log('user',user)
  const [isOpenOrder, setIsOpenOrder] = useState(false);
  const [isOpenASetting, setIsOpenASetting] = useState(false);

  const router = useRouter();
  return (
    <>
      <section>
        <div className="product-cartDetails p-3 d-flex">
          <img src="/images/image1.jpg" className="user-image" />
          <div className="d-flex flex-column ms-3">
            <p className="mb-0 font-12x" id="secondry-text">
              Hello,
            </p>
            <p className="mb-0 font-16x fw-bold">{!Object.keys(user).length ?"user": user.name ? user?.name.charAt(0)?.toUpperCase() + user?.name.slice(1): "user"}</p>
          </div>
        </div>

        <div className="product-cartDetails mt-3 p-0">
          <Link href="/account/loyalty">
            <a>
              <div className="row m-0 d-flex align-items-center py-3 profileLinks">
                <div className="col-lg-2 text-end pe-0">
                  <img src="/images/loyalti.svg" /> 
                </div>
                <div className="col-lg-10 d-flex">
                  <p className="mb-0 font-14x fw-bold" id="dark-text">
                    Loyalty:
                  </p>
                  <span className="font-14x fw-bold ms-2" id="success-text">
                    ₹ {Object.keys(user).length ? user?.wallet?.balance && user.wallet.balance  : 0}
                  </span>
                </div>
              </div>
            </a>
          </Link>

          <hr className="m-0 horizental-line" />

          <div
            className="row m-0 d-flex align-items-center pt-2 pb-2 dropDownContainer"
            onClick={() => {
              setIsOpenOrder(!isOpenOrder);
            }}
          >
            <div className="col-lg-10 d-flex">
              <p className="mb-0 font-12x sidebarClick" id="secondry-text">
                Orders
              </p>
            </div>
            <div className="col-lg-2 text-end">
              <img
                src="/images/dropdownIcon.svg"
                className={!isOpenOrder && "dActive"}
              />
            </div>

            {isOpenOrder && (
              <div className="pt-2 px-0">
                <Link href="/account/order">
                  <a>
                    <div
                      className={`row m-0 d-flex align-items-center py-2 profileLinks ${
                        router.pathname == "/account/order" ? "activeLink" : ""
                      }`}
                    >
                      <div className="col-lg-2 text-end pe-0">
                        <img src="/images/loyalti.svg" />
                      </div>
                      <div className="col-lg-10 d-flex">
                        <p className="mb-0 font-14x fw-bold" id="secondry-text">
                          Your Orders
                        </p>
                      </div>
                    </div>
                  </a>
                </Link>

                <Link href="">
                  <a>
                    <div
                      className={`row m-0 d-flex align-items-center py-2 profileLinks ${
                        router.pathname == "" ? "activeLink" : ""
                      }`}
                    >
                      <div className="col-lg-2 text-end pe-0">
                        <img src="/images/loyalti.svg" />
                      </div>
                      <div className="col-lg-10 d-flex">
                        <p className="mb-0 font-14x fw-bold" id="secondry-text">
                          Reviews & Ratings
                        </p>
                      </div>
                    </div>
                  </a>
                </Link>
              </div>
            )}
          </div>

          <hr className="m-0 horizental-line" />

          <Link href="/account/wishlist">
            <a>
              <div
                className={`row m-0 d-flex align-items-center py-2 profileLinks ${
                  router.pathname == "/account/wishlist" ? "activeLink" : ""
                }`}
              >
                <div className="col-lg-2 text-end pe-0">
                  <img
                    src="/images/header-logo2.svg"
                    width="20px"
                    height="18px"
                  />
                </div>
                <div className="col-lg-10 d-flex">
                  <p className="mb-0 font-14x fw-bold" id="dark-text">
                    Wishlist
                  </p>
                </div>
              </div>
            </a>
          </Link>

          <hr className="m-0 horizental-line" />

          <div
            className="row m-0 d-flex align-items-center pt-2 pb-2 dropDownContainer"
            onClick={() => {
              setIsOpenASetting(!isOpenASetting);
            }}
          >
            <div className="col-lg-10 d-flex">
              <p className="mb-0 font-12x sidebarClick" id="secondry-text">
                Account Settings
              </p>
            </div>
            <div className="col-lg-2 text-end">
              <img
                src="/images/dropdownIcon.svg"
                className={!isOpenASetting && "dActive"}
              />
            </div>

            {isOpenASetting && (
              <div className="pt-2 px-0">
                <Link href="/account">
                  <a>
                    <div
                      className={`row m-0 d-flex align-items-center py-2 profileLinks ${
                        router.pathname == "/account" ? "activeLink" : ""
                      }`}
                    >
                      <div className="col-lg-2 text-end pe-0">
                        <img
                          src="/images/header-logo4.svg"
                          width="20px"
                          height="18px"
                        />
                      </div>
                      <div className="col-lg-10 d-flex">
                        <p className="mb-0 font-14x fw-bold" id="secondry-text">
                          Profile Information
                        </p>
                      </div>
                    </div>
                  </a>
                </Link>

                <Link href="/account/address">
                  <a>
                    <div
                      className={`row m-0 d-flex align-items-center py-2 profileLinks ${
                        router.pathname == "/account/address"
                          ? "activeLink"
                          : ""
                      }`}
                    >
                      <div className="col-lg-2 text-end pe-0">
                        <img
                          src="/images/address.svg"
                          width="20px"
                          height="18px"
                        />
                      </div>
                      <div className="col-lg-10 d-flex align-items-center">
                        <p className="mb-0 font-14x fw-bold" id="secondry-text">
                          Manage Addresses
                        </p>
                      </div>
                    </div>
                  </a>
                </Link>

                <Link href="/account/transactions">
                  <a>
                    <div
                      className={`row m-0 d-flex align-items-center py-2 profileLinks ${
                        router.pathname == "/account/address"
                          ? "activeLink"
                          : ""
                      }`}
                    >
                      <div className="col-lg-2 text-end pe-0">
                        <img
                          src="/images/address.svg"
                          width="20px"
                          height="18px"
                        />
                      </div>
                      <div className="col-lg-10 d-flex align-items-center">
                        <p className="mb-0 font-14x fw-bold" id="secondry-text">
                        Transactions
                        </p>
                      </div>
                    </div>
                  </a>
                </Link>
              </div>
            )}
          </div>

          {/* <div className="row m-0 d-flex align-items-center py-3">
            <div className="col-lg-2 text-end pe-0"></div>
            <div className="col-lg-10 d-flex">
              <p className="mb-0 font-12x" id="secondry-text">
                Account Settings
              </p>
            </div>
          </div>

          <hr className="m-0 horizental-line" />

          <Link href="/account">
            <a>
              <div className="row m-0 d-flex align-items-center py-3">
                <div className="col-lg-2 text-end pe-0">
                  <img
                    src="/images/header-logo4.svg"
                    width="20px"
                    height="18px"
                  />
                </div>
                <div className="col-lg-10 d-flex">
                  <p className="mb-0 font-14x fw-bold" id="dark-text">
                    Profile Information
                  </p>
                </div>
              </div>
            </a>
          </Link>

          <Link href="/account/address">
            <a>
              <div className="row m-0 d-flex align-items-center py-3">
                <div className="col-lg-2 text-end pe-0">
                  <img src="/images/address.svg" width="20px" height="18px" />
                </div>
                <div className="col-lg-10 d-flex">
                  <p className="mb-0 font-14x fw-bold" id="dark-text">
                    Manage Addresses
                  </p>
                </div>
              </div>
            </a>
          </Link> */}

          <hr className="m-0 horizental-line" />

          <Link href="/faq">
            <a>
              <div
                className={`row m-0 d-flex align-items-center py-2 profileLinks ${
                  router.pathname == "/faq" ? "activeLink" : ""
                }`}
              >
                <div className="col-lg-2 text-end pe-0">
                  <img
                    src="/images/header-logo.svg"
                    width="21px"
                    height="23px"
                  />
                </div>
                <div className="col-lg-10 d-flex">
                  <p className="mb-0 font-14x fw-bold" id="dark-text">
                    Help Center & FAQs
                  </p>
                </div>
              </div>
            </a>
          </Link>

          <hr className="m-0 horizental-line" />

          <Link href="">
            <a>
              <div className="row m-0 d-flex align-items-center py-3 profileLinks">
                <div className="col-lg-2 text-end pe-0">
                  <img src="/images/logout.svg" width="20px" height="18px" />
                </div>
                <div className="col-lg-10 d-flex">
                  <p className="mb-0 font-14x fw-bold" id="dark-text">
                    Logout
                  </p>
                </div>
              </div>
            </a>
          </Link>
        </div>
      </section>
    </>
  );
};
export default memo(Sidebar);
