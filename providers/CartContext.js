import { useState, createContext, useContext, useEffect } from "react";
import { AuthValidation } from "./AuthContext";
import { config } from "config";
import axios from "../helpers/api";
import { toast } from 'react-toastify';


const Cart = createContext();

const CartContext = ({ children }) => {

  //Auth State Mangament--------------
  const {token,userLogout} = AuthValidation();

  //Add item to cart
  const [cart, setCart] = useState([]);

  //Add item to wishlist
  const [wishlist, setWishlist] = useState([]);

  //Set coupon value
  const [coupon, setCoupon] = useState([]);

  //Set compare
  const [compare, setCompare] = useState([]);

  //local Cart Data
  const [localCartData, updateLocalCartData] = useState([]);

  const getLocalData = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      const cart = JSON.parse(localStorage.getItem("localCartData"));
      if (cart?.length ) {
        cart.map((item) => {
          if (item.slug) {
            updateLocalCartData((old) => [...old, item]);
          }
        });
        localStorage.setItem("localCartData", JSON.stringify(localCartData));
      }
    }
  }
        
  useEffect(() => {
    getLocalData();
  }, [])

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      localStorage.setItem("localCartData", JSON.stringify(localCartData));
    }
  }, [localCartData]); 

  //Fetching the wishlist data from the api
  const fetchWishlist = async () => {
    const url = `${config.apiUrl}get-wishlist`;
    try {
      if (token) {
        let res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userData = res.data.data;
        if (res.status === 200) {
          setWishlist(userData);
        }
      }
    } catch (err) {
      console.log(err);
      if(err.response.status === 401) {
        userLogout();
        updateCartItem("");
        setWishlist('');
      }
    }
  };
  
  useEffect(() => {
    fetchWishlist();
  }, [token]);


  //Fetching Cart Data from the Api
  const fetchCartData = async () => {
    const url = `${config.apiUrl}initializeCart`;
    try {
      if (token) {
        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 200) {
          setCart(res.data);
          {console.log('main cart', cart)}
        }
      }
    } catch (err) {
      console.log(err);
      if(err.response.status === 401) {
        userLogout();
        updateCartItem("");
        setWishlist('');
        
        toast.error('Session Expired..!', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      }
    }
  };
  useEffect(() => {
    fetchCartData();
  }, [token]);


  //update cart Items
  const updateCartItem = (props) => {
    setCart(props);
  };

  //update Wishlist Items
  const updateWishlist = (props) => {
    setWishlist(props);
  };

  //update coupon data
  const updateCoupon = (props) => {
    setCoupon(props);
  };

  //update compare data
  const updateCompare = (props) => {
    setCompare([props]);
  };

  const fetchCompare = () => {
    const compare = JSON.parse(localStorage.getItem("compare"));
    setCompare(compare);
  };
  useEffect(() => {
    fetchCompare();
  }, []);

  //Admin Data fetching
  const configration = async () => {
    const url = `configuration`;

    const res = await axios(url);

    if (res) {
      localStorage.setItem("configration", JSON.stringify(...res.data.data));
    }
  };

  useEffect(() => {
    configration();
  }, []);

  return (
    <>
      <Cart.Provider
        value={{
          cart,
          wishlist,
          updateCartItem,
          updateWishlist,
          fetchWishlist,
          fetchCartData,
          coupon,
          updateCoupon,
          compare,
          updateCompare,
          fetchCompare,
          localCartData,
          updateLocalCartData,
          getLocalData,
        }}
      >
        {children}
      </Cart.Provider>
    </>
  );
};

export const CartVolume = () => {
  return useContext(Cart);
};

export default CartContext;