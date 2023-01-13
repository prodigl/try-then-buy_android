import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";
import Search from "../Search/index";
import Category from "components/Category";
import Signup from "components/Signupmodal";
import { AuthValidation } from "providers/AuthContext";
import { CartVolume } from "providers/CartContext";
import MobileHeader from "../Mobile-header";
import Compare from "components/compareDiv";
import { ToastContainer, toast } from "react-toastify";


const Header = () => {

  //SignupModal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  //Cart state managment---------
  const {
    cart,
    updateCartItem,
    compare,
    wishlist,
    localCartData,
    updateWishlist
  } = CartVolume();

  //Auth State Managment-------
  const {
    user,
    updateUser,
    token,
    updateToken,
    userLogout
  } = AuthValidation();

  //Loging out user -------------
  const logoutUser = () => {
    userLogout();
    updateCartItem("");
    updateWishlist("");
  };

  return (
    <>
      
      <div className="mobile">
        <MobileHeader />
      </div>
      {!token?.length && (
        <Signup
          show={show}
          handleClose={handleClose}
          updateUser={updateUser}
          updateToken={updateToken}
        />
      )}


    </>
  );
};
export default Header;
