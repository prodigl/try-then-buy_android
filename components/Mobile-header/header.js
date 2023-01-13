import HamburgerMenu from "components/HamburgerMenu";
import TopBarMobile from "components/TopBar/TopBarMobile";
import Link from "next/link";
import { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import SignupModal from "components/Signupmodal";
import { AuthValidation } from "providers/AuthContext";
import { CartVolume } from "providers/CartContext";
import { useRouter } from "next/router";
import Search from "components/SearchMobile";
import Compare from "components/compareDiv";
import {MiscellaneousProvider} from "providers/Miscellaneous";
import Login from 'components/LoginComp';

const MobileHeader = () => {
  const router = useRouter();
  const {updateSliderActive, updateSliderDeactive, isLogged, activeLogged, deActiveLogged, setLogged} = MiscellaneousProvider();  
  //Auth State Mangament-----------
  const {
    token,
    updateToken,
    updateUser
  } = AuthValidation();

//Cart State Managament--------------
  const {
    cart,
    updateCartItem,
    wishlist,
    compare,
    localCartData,
    updateWishlist
  } =CartVolume();


  const [closeMenu, setCloseMenu] = useState(false);
  const [searchBar, setSearchBar] = useState(false);
  const [loginBar, setLoginBar] = useState(false);

  //signup opening modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const setPositionToBody = () => {
    setCloseMenu(true);
    updateSliderActive();

  };
const searchBarUpdate = ()=> {
    setSearchBar(true);
    updateSliderActive();
}

const loginBarUpdate = () => {
  // setLoginBar(true);
  activeLogged();
}

const logo = () => {
  updateSliderDeactive();
  router.push('/')
}
  return (
    <>
      <header className="header-section">
        {/* <TopBarMobile /> */}
        <div className="container-fluid">
          <div className="row py-3">
            <div className="col-4 d-flex align-itms-center">

                <img
                  src="/images/humberger.svg"
                  // height="30px"
                  style={{ cursor: "pointer" }}
                  onClick={setPositionToBody}
                />

              <img
                src="/images/brand-logo.svg"
                className="ms-3 pointer"
                height="30px"
                onClick={() => logo()}
              />
            </div>
            <div className="col-8 d-flex justify-content-end align-items-center">
              <img
                 src="/icons/client/search.svg"
                // width="20px"
                height="30px"
                style={{
                  cursor: "pointer",
                }}
                onClick={searchBarUpdate}
              />

              {!token ? null : wishlist.length ? (
                <div style={{ position: "relative" }}>
                  <img
                    src="/icons/client/heart-main.svg"
                    alt=""
                    width="26px"
                    height="24px"
                    className="ms-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => router.push("/account/wishlist")}
                  />
                  <span
                    className="cart_number_mobile
                "
                    style={{ fontSize: "50px", top: "-51px", left: "38px" }}
                  >
                    .
                  </span>
                </div>
              ) : (
                <img
                  src="/icons/client/heart-main.svg"
                  alt=""
                  width="26px"
                  height="24px"
                  className="ms-3"
                  style={{ cursor: "pointer" }}
                />
              )}

              <div style={{ position: "relative" }}>
                <img
                  src="/icons/client/cart.svg"
                  alt=""
                  width="26px"
                  height="24px"
                  className="ms-3"
                  style={{ cursor: "pointer" }}
                  onClick={() => router.push("/cart")}
                />
                <span className="cart_number_mobile">


                  {
                 localCartData?.length
                    ? localCartData.length
                    : cart?.order_products?.length
                    ? cart?.order_products?.length
                    : null}
                </span>
              </div>

              {token ? null : (
                <img
                src="/icons/client/profile.svg"
                  // alt=""
                  // width="20px"
                  // height="20px"
                  className="ms-3"
                  style={{ cursor: "pointer" }}
                  // onClick={() => handleShow()}
                  onClick={()=>loginBarUpdate()}
                />
              )}
            </div>
          </div>
        </div>
      </header>

      {compare?.length ? <Compare compare={compare} /> : null}

      <SignupModal
        show={show}
        handleClose={handleClose}
        updateUser={updateUser}
        updateToken={updateToken}
      />
        <HamburgerMenu
          value={closeMenu}
          setCloseMenu={setCloseMenu}
          updateCartItem={updateCartItem}
          token={token}
          updateWishlist={updateWishlist}
          updateSliderActive={updateSliderDeactive}
        />
        <Search
        searchBar={searchBar}
        setSearchBar={setSearchBar}
        updateSliderActive={updateSliderDeactive}
        />
        <Login
        searchBar={isLogged}
        
        setSearchBar={setLogged}
        // updateSliderActive={updateSliderDeactive}
        />
    </>
  );
};

export default MobileHeader;
