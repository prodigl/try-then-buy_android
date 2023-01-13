import { useState, useEffect, useMemo, useCallback } from "react";
import { config } from "config";
import { AuthValidation } from "providers/AuthContext";
import { CartVolume } from "providers/CartContext";
import axios from "helpers/api";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CartFooter from "components/cart-footer";
import Link from "next/link";
import CartDetails from "components/CartDetails";
import CartModal from "components/CartModal";
import Signup from "components/Signupmodal";
import Login from 'components/LoginComp'; 

const cartComponent = () => {
  const router = useRouter();

  

  //Auth State Management---------
  const { user, token, updateUser, updateToken, userLogout } = AuthValidation();

  //Cart State Management---------
  const {
    cart,
    fetchCartData,
    fetchWishlist,
    coupon,
    wishlist,
    localCartData,
    updateLocalCartData,
    getLocalData,
    updateCartItem,
    setWishlist,
  } = CartVolume();

  //Add default src
  const addDefaultSrc = (e) => {
    e.target.src = "/images/error-product-image.png";
  };

  useEffect(() => {
    fetchCartData();
    // return () => {
    //   updateLocalCartData([]);
    // }
  }, [token]);

  const owner = JSON.parse(localStorage.getItem("configration"));

  //Remove product from localy
  const removelocalItem = (id) => {
    let data = localCartData.filter((item) => item.id !== id);
    localStorage.setItem("localCartData", JSON.stringify(data));
    updateLocalCartData(data);
  };

  //Signupmodal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //For Cart opening modal
  const [cartProduct, setCartProduct] = useState(false);
  const closeCart = () => setCartProduct(false);
  const openCart = () => setCartProduct(true);

  const [login, setLogin] = useState(false);
  const loginOpen = () => setLogin(true);
  const loginClose = () => setLogin(false);

  const [cartId, setCartId] = useState("");
  const [cartSlug, setCartSlug] = useState("");
  const [loginBar, setLoginBar] = useState(false);

  //Remove Items from the cart
  const removeItem = (id) => {
    const url = `removeProductFromCart/${cart.id}`;
    // alert(url);
    try {
      if (token) {
        const res = axios.post(
          url,
          {
            product_id: id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res) {
          fetchCartData();
        }
      }
    } catch (error) {
      console.log(error);
      if (error.response.status == 401) {
        userLogout();
        updateCartItem("");
        setWishlist("");

        toast.error("Session Expired..!", {
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

  //Add to Wishlist
  const addtoWishlist = async (id) => {
    // alert(id);
    const removeUrl = `removeProductFromCart/${cart.id}`;
    try {
      if (token) {
        const res = await axios.post(
          removeUrl,
          {
            product_id: id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res) {
          fetchCartData();

          try {
            const wishUrl = `add-to-wishlist/${id}`;
            if (token) {
              const res = await axios.post(
                wishUrl,
                {},
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              );

              if (res) {
                fetchWishlist();
              }
            }
          } catch (err) {
            console.log(err);
          }
        }
      }
    } catch (error) {
      console.log(error);
      if (error.response.status == 401) {
        userLogout();
        updateCartItem("");
        setWishlist("");

        toast.error("Session Expired..!", {
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

  //Add to cart from the wishlist
  const addtocart = async (id, slug) => {
    // try {
    //   const wishUrl = `add-to-wishlist/${id}`;
    //   if (token) {
    //     const res = await axios.post(
    //       wishUrl,
    //       {},
    //       {
    //         headers: { Authorization: `Bearer ${token}` },
    //       }
    //     );

    //     if (res) {
    //       fetchWishlist();
    //       if (token) {
    //         setCartId(id);
    //         setCartSlug(slug);
    //         openCart();
    //       } else {
    //         // handleShow();
    //         loginBarUpdate();
    //       }
    //     }
    //   }else{
    //     loginBarUpdate();
    //   }

    //   // if (token) {
    //   //   setCartId(id);
    //   //   setCartSlug(slug);
    //   //   openCart();
    //   // } else {
    //   //   handleShow();
    //   // }
    // } catch (error) {
    //   console.log(error);
    //   if (error.response.status == 401) {
    //     userLogout();
    //     updateCartItem("");
    //     setWishlist("");

    //     toast.error("Session Expired..!", { 
    //       position: "top-center",
    //       autoClose: 2000,
    //       hideProgressBar: true,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //     });
    //   }
    // }

    const url = `product/${slug}`;
    try {
      const res = await axios.get(url);
      if (res.status === 200) {
        const product = res.data.data;
        console.log(product);
        const color = product.product_variations[0].color;
        const size = product.product_variations[0].size;
        // console.log(color, size);

        if (token) {
          if (color !== null && size !== null) {
            const url = `addProductToCart/${cart?.id}`;
            const res = await axios.post(
              url,
              {
                product_id: id,
                color: color,
                size: size,
                qty: 1,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            //if responce is successfull
            if (res.status === 200) {
              try {
                const wishUrl = `add-to-wishlist/${id}`;
                if (token) {
                  const res = await axios.post(
                    wishUrl,
                    {},
                    {
                      headers: { Authorization: `Bearer ${token}` },
                    }
                  );

                  if (res) {
                    fetchWishlist();
                    // if (token) {
                    //   setCartId(id);
                    //   setCartSlug(slug);
                    //   openCart();
                    // } else {
                    //   // handleShow();
                    //   loginBarUpdate();
                    // }
                  }
                }
                // else {
                //   loginBarUpdate();
                // }

                // if (token) {
                //   setCartId(id);
                //   setCartSlug(slug);
                //   openCart();
                // } else {
                //   handleShow();
                // }
              } catch (error) {
                console.log(error);
                if (error.response.status == 401) {
                  userLogout();
                  updateCartItem("");
                  setWishlist("");

                  toast.error("Session Expired..!", {
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
              fetchCartData();
              toast('✔️ Product is added in your Cart!', {
                position: 'top-center',
                autoClose: 4000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }
          }
        }

      }
    } catch (e) {
      console.log(e);
    }
  };

  //quantity update
  const updateCart = async (qty, id) => {
    try {
      const url = `addProductToCart/${cart.id}`;
      if (token) {
        const res = await axios.post(
          url,
          {
            product_id: id,
            qty: qty,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res) {
          fetchCartData();
        }
      }
    } catch (error) {
      console.log(error);
      if (error.response.status == 401) {
        userLogout();
        updateCartItem("");
        setWishlist("");

        toast.error("Session Expired..!", {
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

  const percentageDeal = (actualP, preciousP) => {
    let c = Math.round(preciousP);
    let d = Math.round(actualP);
    let e = c - d;
    let p = e / c;
    let per = Math.round(p * 100);
    return per;
  };
  const loginBarUpdate = () => {
    setLoginBar(true);
  }
  return (
    <>
      {/* mobile view */}
      <div className="mobile mt-0">
        <div className="container-fluid pt-4">
          <div className="d-flex justify-content-between">
            <Link href="/">
              <img src="/images/brand-logo.svg" />
            </Link>
            <div className="text-end">
              <p
                className="font-10x mb-1"
                id="secondry-text"
                style={{ fontWeight: 500 }}
              >
                Have any question? We’re here to help
              </p>
              <p className="font-16x mb-0 fw-bold" id="secondry-color">
                (+91) {owner?.header_phone}
              </p>
            </div>
          </div>
        </div>

        <div className="container-fluid mt-4 px-0">
          <div className="payment-status">
            <Link href="/cart">
              <div className="summery">
                <img src="/images/cart-summary.svg" />
                <p className="mb-0 font-11x fw-bold ms-2">Summary</p>
              </div>
            </Link>
            <div className="delivery ms-4">
              <img src="/images/cart-delivary.svg" alt="" />
              <p className="mb-0 font-11x fw-bold ms-2">Delivery & Payment</p>
            </div>
          </div>
        </div>

        {/* ********Top breadcrumb section**********  */}
        <div className="container mt-5">
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/">
                  <a >HOME</a>
                </Link>
              </li>
              <li>
                <img
                  src="/images/dropdown90.svg"
                  alt=""
                  className="ms-2 me-2"
                />
              </li>
              <li className="breadcrumb-item">
                <a href="#" id="primary-color">
                  CART
                </a>
              </li>
            </ol>
          </nav>
        </div>

        {/* ********Top body section**********  */}
        <div className="container-fluid">
          <h1 className="font-26x fw-bold">
            Summary{" "}
            <span className="font-14x" id="secondry-text">
              {localCartData?.length
                ? `(${localCartData?.length} product)`
                : cart?.order_products?.length
                  ? `(${cart?.order_products?.length} product)`
                  : null}
            </span>
          </h1>
          <div className="row">
            <div className="col-12">
              {
                // if local cart exists
                localCartData.length ? (
                  <>
                    <div className="product-cartDetails">
                      <CartDetails
                        cart={cart}
                        handleShow={handleShow}
                        show={show}
                        handleClose={handleClose}
                        coupon={coupon}
                        localCartData={localCartData}
                      />
                      <button
                        className="add-to-cart-product  t-4"
                        onClick={() => loginBarUpdate()}
                      >
                        CHECKOUT
                      </button>
                    </div>
                  </>
                ) : cart?.order_products?.length ? (
                  <>
                    <div className="product-cartDetails">
                      {console.log("cart", cart)}
                      <CartDetails
                        cart={cart}
                        handleShow={handleShow}
                        show={show}
                        handleClose={handleClose}
                        coupon={coupon}
                        localCartData={localCartData}
                      />
                      <button
                        className="add-to-cart-product mt-4"
                        onClick={() => router.push("/cart/step-2")}
                      >
                        CHECKOUT
                      </button>
                    </div>
                  </>
                ) : null
              }
            </div>

            <div className="col-12 mt-4">
              <div className="product-cartDetails">
                {localCartData?.length ? (
                  localCartData?.map((product, index) => {
                    return (
                      <>
                        <div className="d-flex" key={product.slug}>
                          <Link href={`/product/${product?.slug}`}>
                            <img
                              src={`${config.productbasepath}${product?.product?.photo}`}
                              className="mobileProductImage"
                              onError={addDefaultSrc}
                            />
                          </Link>
                          <div className="d-flex flex-column ms-3">
                            <p className="mb-0 font-20x">
                              {product?.product?.name?.length <= 14
                                ? `${product?.product?.name}`
                                : `${product?.product?.name?.substring(
                                  0,
                                  13
                                )}...`}
                            </p>
                            <div className="d-flex align-items-center mt-1">
                              <p
                                className="font-12x fw-bold  mb-0"
                                style={{ color: "#999" }}
                              >
                                <del>
                                  {`₹ ${parseInt(
                                    product?.product?.previous_price
                                  ).toLocaleString()}/-`}
                                </del>
                              </p>
                              <div className="saving-money ms-2">
                                <p
                                  className="font-10x mb-0 fw-bold"
                                  id="secondry-color"
                                >
                                  Saving{" "}
                                  {percentageDeal(
                                    parseInt(product?.product?.price),
                                    parseInt(product?.product?.previous_price)
                                  )}
                                  %
                                </p>
                              </div>
                            </div>
                            <p
                              className="font-14x fw-bold  mb-0 mt-2"
                              id="primary-color"
                            >
                              {`₹ ${parseInt(
                                product?.product?.price
                              ).toLocaleString()}/-`}
                            </p>

                            <div className="d-flex justify-content-between">
                              <div className="d-flex justify-content-between">
                                <p
                                  className="mb-0 font-14x d-flex align-items-center"
                                  id="gray-text"
                                >
                                  Color:
                                  <div
                                    className="ms-2 rounded"
                                    style={{
                                      background: `${product?.color}`,
                                      height: "14px",
                                      width: "50px",
                                    }}
                                  ></div>
                                </p>
                              </div>
                              <p className="mb-0 font-14x mt-1 ms-3" id="gray-text">
                                Size: {product?.size}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="d-flex  my-3">
                          <div className="d-flex w-100">
                            <button
                              className="remove-button mt-3"
                              onClick={() =>
                                removelocalItem(product?.product?.id)
                              }
                              style={{ width: "100%" }}
                            >
                              REMOVE
                            </button>
                          </div>
                        </div>
                      </>
                    );
                  })
                ) : cart?.order_products?.length ? (
                  cart?.order_products?.map((product, index) => {
                    return (
                      <div className="mb-3" key={product.slug}>
                        <div className="d-flex">
                          <Link href={`/product/${product?.slug}`}>
                            <img
                              src={`${config.productbasepath}${product?.photo}`}
                              className="mobileProductImage"
                              onError={addDefaultSrc}
                            />
                          </Link>
                          <div className="d-flex flex-column ms-3">
                            <p className="mb-0 font-20x">
                              {product?.name.length <= 14
                                ? `${product?.name}`
                                : `${product?.name.substring(0, 13)}..`}
                            </p>

                            <div className="d-flex align-items-center mt-1">
                              <p
                                className="font-12x fw-bold  mb-0"
                                style={{ color: "#999" }}
                              >
                                <del>
                                  {`₹ ${parseInt(
                                    product?.previous_price
                                  ).toLocaleString()}/-`}
                                </del>
                              </p>
                              <div className="saving-money ms-2">
                                <p
                                  className="font-10x mb-0 fw-bold"
                                  id="secondry-color"
                                >
                                  Saving{" "}
                                  {percentageDeal(
                                    parseInt(product.price),
                                    parseInt(product.previous_price)
                                  )}
                                  %
                                </p>
                              </div>
                            </div>
                            <p
                              className="font-14x fw-bold  mb-0 mt-2"
                              id="primary-color"
                            >
                              {`₹ ${parseInt(
                                product?.price
                              ).toLocaleString()}/-`}
                            </p>

                            <div className="d-flex justify-content-between">
                              <div className="d-flex justify-content-between">
                                <p
                                  className="mb-0 font-14x d-flex align-items-center"
                                  id="gray-text"
                                >
                                  Color:
                                  <div
                                    className="ms-2 rounded"
                                    style={{
                                      background: `${product?.pivot
                                        ?.color}`,
                                      height: "14px",
                                      width: "50px",
                                    }}
                                  ></div>
                                </p>
                              </div>
                              <p className="mb-0 font-14x mt-1 ms-3" id="gray-text">
                                Size: {product?.pivot?.size}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="d-flex justify-content-between mt-4">
                          <div className="qty-box">
                            <p className="mb-0 font-14x" id="secondry-text">
                              QTY
                            </p>

                            <select
                              className="qty-select"
                              onChange={({ target: { value } }) =>
                                updateCart(value, product.id)
                              }
                            >
                              <option
                                value="1"
                                selected={product?.pivot?.qty == "1"}
                              >
                                1
                              </option>
                              <option
                                value="2"
                                selected={product?.pivot?.qty == "2"}
                              >
                                2
                              </option>
                              <option
                                value="3"
                                selected={product?.pivot?.qty == "3"}
                              >
                                3
                              </option>
                              <option
                                value="4"
                                selected={product?.pivot?.qty == "4"}
                              >
                                4
                              </option>
                              <option
                                value="5"
                                selected={product?.pivot?.qty == "5"}
                              >
                                5
                              </option>
                            </select>
                          </div>
                          <div className="d-flex justify-content-end align-items-end flex-column">
                            <div
                              className="d-flex align-items-center"
                              onClick={() => addtoWishlist(product.id)}
                              style={{ cursor: "pointer" }}
                            >
                              <img src="/images/blue-heart.svg" alt="" />
                              <p
                                className="mb-0 font-12x ms-1"
                                id="secondry-color"
                              >
                                MOVE TO WISHLIST
                              </p>
                            </div>

                            <button
                              className="remove-button mt-3"
                              onClick={() => removeItem(product.id)}
                            >
                              REMOVE
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p
                    className="mb-0 text-center mt-4 font-18x fw-bold"
                    id="secondry-text"
                  >
                    No Cart Items
                  </p>
                )}
              </div>
            </div>

            <div className="col-12 mt-5">
              <div
                className="d-sm-flex justify-content-between align-items-center"
                style={{
                  marginTop: "15px",
                }}
              >
                <h1 className="font-26x fw-bold">
                  Wishlist{" "}
                  <span className="font-14x" id="secondry-text">
                    {wishlist?.length === 1
                      ? `(${wishlist?.length} product)`
                      : `(${wishlist?.length} products)`}
                  </span>
                </h1>

                <p className="font-12x fw-bold" id="secondry-text">
                  Not Included in Current Cart
                </p>
              </div>
              <div className="product-cartDetails">
                {wishlist.length ? (
                  wishlist?.map((wishlist) => {
                    return (
                      <div className="mb-3">
                        <div className="d-md-flex justify-content-between">
                          <div className="d-flex">
                            <Link href={`/product/${wishlist?.product?.slug}`}>
                              <img
                                src={`${config.productbasepath}${wishlist?.product?.photo}`}
                                className="mobileProductImage"
                                onError={addDefaultSrc}
                              />
                            </Link>
                            <div className="d-flex flex-column ms-3">
                              <p
                                title={wishlist?.product?.name}
                                className="mb-0 font-20x"
                              >
                                {wishlist?.product?.name.length <= 14
                                  ? `${wishlist?.product?.name}`
                                  : `${wishlist?.product?.name.substring(
                                    0,
                                    13
                                  )}...`}
                              </p>

                              <div className="d-flex align-items-center mt-2">
                                <p
                                  className="font-12x fw-bold  mb-0"
                                  style={{ color: "#999" }}
                                >
                                  <del>
                                    {`₹ ${parseInt(
                                      wishlist?.product.previous_price
                                    ).toLocaleString()}/-`}
                                  </del>
                                </p>
                                <div className="saving-money ms-2">
                                  <p
                                    className="font-10x mb-0 fw-bold"
                                    id="secondry-color"
                                  >
                                    Saving{" "}
                                    {percentageDeal(
                                      parseInt(wishlist?.product.price),
                                      parseInt(wishlist?.product.previous_price)
                                    )}
                                    %
                                  </p>
                                </div>
                              </div>
                              <p
                                className="font-14x fw-bold  mb-0 mt-2"
                                id="primary-color"
                              >
                                {`₹ ${parseInt(
                                  wishlist?.product.price
                                ).toLocaleString()}/-`}
                              </p>
                            </div>
                          </div>
                          <div className="mt-4 mt-md-0">
                            <div className="d-flex justify-content-between align-items-center">
                              <div
                                className="d-flex align-items-center"
                                onClick={() =>
                                  addtocart(
                                    wishlist?.product?.id,
                                    wishlist?.product?.slug
                                  )
                                }
                                style={{ cursor: "pointer" }}
                              >
                                <img
                                  src="/icons/client/cart.svg"
                                  alt=""
                                  height="16px"
                                />
                                <p
                                  className="mb-0 font-12x ms-1"
                                // id="secondry-color"
                                >
                                  MOVE TO CART
                                </p>
                              </div>

                              <button
                                className="remove-button"
                                onClick={() =>
                                  addtoWishlist(wishlist?.product_id)
                                }
                              >
                                REMOVE
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p
                    className="mb-0 text-center mt-4 font-18x fw-bold"
                    id="secondry-text"
                  >
                    No Wishlist Items
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <CartFooter lWidth="47px" sWidth="74px" line="45px" />
      </div>

      <Signup
        show={login}
        handleClose={loginClose}
        updateUser={updateUser}
        updateToken={updateToken}
        getLocalData={getLocalData}
        updateLocalCartData={updateLocalCartData}
      />

      <CartModal
        id={cartId}
        slug={cartSlug}
        show={cartProduct}
        closeCart={closeCart}
      />

      <Login
        searchBar={loginBar}
        setSearchBar={setLoginBar}
      // updateSliderActive={updateSliderDeactive}
      />
    </>
  );
};

export default cartComponent;
