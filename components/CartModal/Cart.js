import { useState, useEffect, memo } from "react";
import api from "helpers/api";
import { Modal, Button } from "react-bootstrap";
import { AuthValidation } from "providers/AuthContext";
import { CartVolume } from "providers/CartContext";
import ProductSlider from "components/Product-Image-Slider";
import Star from "assets/vectors/Star";
import BlankStar from "assets/vectors/Blank-star";
import { useRouter } from "next/router";
import Loader from "components/LoadingSpinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Rating from 'react-rating'

const Cart = ({ id, show, closeCart, slug, addToWish }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  //Auth context state management----------------
  const { 
    token,
    userLogout 
  } = AuthValidation();

  //Cart state management------------
  const { 
    cart, 
    fetchCartData, 
    localCartData, 
    updateLocalCartData, 
    updateCartItem,
    updateWishlist
  } = CartVolume();

  const [product, setProduct] = useState();

  const productValue = async () => {
    try {
      if (show) {
        setIsLoading(true);
        const url = `product/${slug}`;
        const res = await api(url);
        if (res) {
          setProduct(res.data);
          setIsLoading(false);
        }
      } else {
        setProduct("");
        setOption({
          qty: 1,
          color: "",
          size: "",
        });
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    productValue();
  }, [show]);

  const [optionCart, setOption] = useState({
    qty: 1,
    color: "",
    size: "",
  });

  //Getting size of the product
  const setSize = (size) => {
    setOption({
      ...optionCart,
      size: size,
    });
  };

  ///Getting color of the product
  const addColor = (col) => {
    setOption({
      ...optionCart,
      color: col,
    });
  };

  //Getting qty of the product
  const setQty = (qty) => {
    setOption({
      ...optionCart,
      qty,
    });
  };

  //Add to cart Functionality
  const addToCart = async (id, slug) => {
    try {
      //If token Or User Login
      if (token) {
        if (optionCart.color !== undefined && optionCart.size !== undefined) {
          const url = `addProductToCart/${cart?.id}`;
          const res = await api.post(
            url,
            {
              product_id: id,
              color: optionCart.color,
              size: optionCart.size,
              qty: optionCart?.qty ? optionCart.qty : "1",
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          //if responce is successfull
          if (res.status === 200) {
            fetchCartData();
            setOption({
              qty: 1,
              color: "",
              size: "",
            });
            toast("✔️ Product is added in your Cart!", {
              position: "top-center",
              autoClose: 4000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

            if(addToWish) {
              addToWish(id)
            }
            closeCart();
          }
        } else {
          toast("🚫 Please select Size or Color!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } else {
        //if user isn't logged in or no token found
        if (optionCart.color !== undefined && optionCart.size !== undefined) {
          if (localCartData.length) {
            //if product is already in the cart
            const cartMain = localCartData.filter((cart) => {
              return cart.id === id;
            });

            if (cartMain.length) {
              toast("✖️ Product is already in the cart!", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            } else {
              //if similarProduct is not found in the cart
                try {
                  const responce = await api.get(`product/${slug}`);
                  if (responce) {
                    updateLocalCartData([
                      ...localCartData,
                      {
                        id: id,
                        slug: slug,
                        color: optionCart.color,
                        size: optionCart.size,
                        qty: optionCart?.qty ? optionCart.qty : "1",
                        product: responce.data.data,
                      },
                    ]);
                    toast("✔️ Product is added in your Cart!", {
                      position: "top-center",
                      autoClose: 4000,
                      hideProgressBar: true,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    });
                  }
                  closeCart();
                } catch (e) {
                  console.log(e);
                }
              }

          } else {
            //First Item cart added
            try {
              const responce = await api.get(`product/${slug}`);
              if (responce) {
                updateLocalCartData([
                  ...localCartData,
                  {
                    id: id,
                    slug: slug,
                    color: optionCart.color,
                    size: optionCart.size,
                    qty: optionCart?.qty ? optionCart.qty : "1",
                    product: responce.data.data,
                  },
                ]);
                toast("✔️ Product is added in your Cart!", {
                  position: "top-center",
                  autoClose: 4000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
                closeCart();
              }
            } catch (e) {
              console.log(e);
            }
          }
        } else {
          toast("🚫 Please select Size or Color!", {
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
    } catch (error) {
      if (error.response.status == 401) {
        userLogout();
        updateCartItem("");
        updateWishlist("");

        toast.error("Session has Expired!", {
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

  //Buy Now
  const buyNow = async (id,slug) => {
    try {
      if (token) {
        if (optionCart.color !== undefined && optionCart.size !== undefined) {
          const url = `addProductToCart/${cart?.id}`;
          const res = await api.post(
            url,
            {
              product_id: id,
              color: optionCart.color,
              size: optionCart.size,
              qty: optionCart?.qty ? optionCart.qty : "1",
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          //if responce is successfull
          if (res.status === 200) {
            fetchCartData();
            setOption({
              qty: 1,
              color: "",
              size: "",
            });
            toast("✔️ Product is added in your Cart!", {
              position: "top-center",
              autoClose: 4000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            router.push('/cart');
            closeCart();
          }
        } else {
          toast("🚫 Please select Size or Color!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } else {
        //if user isn't logged in or no token found
        if (optionCart.color !== undefined && optionCart.size !== undefined) {
          if (localCartData.length) {
            //if product is already in the cart
            const cartMain = localCartData.filter((cart) => {
              return cart.id === id;
            });

            if (cartMain.length) {
              toast("✖️ Product is already in the cart!", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            } else {
              //if similarProduct is not found in the cart
                try {
                  const responce = await api.get(`product/${slug}`);
                  if (responce) {
                    updateLocalCartData([
                      ...localCartData,
                      {
                        id: id,
                        slug: slug,
                        color: optionCart.color,
                        size: optionCart.size,
                        qty: optionCart?.qty ? optionCart.qty : "1",
                        product: responce.data.data,
                      },
                    ]);
                    toast("✔️ Product is added in your Cart!", {
                      position: "top-center",
                      autoClose: 4000,
                      hideProgressBar: true,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    });
                  }
                  router.push('/cart');
                  closeCart();
                } catch (e) {
                  console.log(e);
                }
              }

          } else {
            //First Item cart added
            try {
              const responce = await api.get(`product/${slug}`);
              if (responce) {
                updateLocalCartData([
                  ...localCartData,
                  {
                    id: id,
                    slug: slug,
                    color: optionCart.color,
                    size: optionCart.size,
                    qty: optionCart?.qty ? optionCart.qty : "1",
                    product: responce.data.data,
                  },
                ]);
                toast("✔️ Product is added in your Cart!", {
                  position: "top-center",
                  autoClose: 4000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
                router.push('/cart');
                closeCart();
              }
            } catch (e) {
              console.log(e);
            }
          }
        } else {
          toast("🚫 Please select Size or Color!", {
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
    } catch (error) {
      if (error.response.status == 401) {
        userLogout();
        updateCartItem("");
        updateWishlist("");

        toast.error("Session has Expired!", {
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

  //Shorting Duplication elemnet from array//
  const sortingDuplicate = (product) => {
    let i = [...new Set(product?.map((size) => size.size))];
    return i;
  };

  useEffect(() => {
    setOption({
      size: sortingDuplicate(product?.data?.product_variations)[0],
    });
  }, [product?.data?.product_variations]);

  return (
    <>
      <Modal
        show={show}
        onHide={closeCart}
        className="change_its_cartstyle"
        aria-labelledby="example-modal-sizes-title-lg"
        scrollable
        centered
      >
        <Modal.Header closeButton onHide={closeCart}>
        </Modal.Header>
         
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {/* <Modal.Header closeButton></Modal.Header> */}
            <Modal.Body className="p-0 do_change_code">
              <div className="container-fluid p-0 ">
                <div className="row">
                  <div className="col-lg-5 col-12">
                    <ProductSlider product={product?.data?.galleries} data={product?.data} />
                  </div>
                  <div className="col-lg-7 col-12">
                    <h1 className="font-32x mt-3 cartHead">{product?.data?.name}</h1>
                    <div className="d-flex align-items-center">
                      <div className="d-flex me-2">
                        <Rating
                        placeholderRating={parseFloat(
                          product?.data?.avg_rating[0]?.rating
                        ).toFixed(1)}
                        emptySymbol={<img src="/images/blank-star.svg" className="icon" width="16px" height="14px" />}
                        placeholderSymbol={<img src="/images/star.svg" className="icon" />}
                        fullSymbol={<img src="/images/star.svg" className="icon" />}
                        readonly
                      />
                      </div>
                      <span className="font-12x" id="secondry-text">
                        {product?.data?.avg_rating[0]?.total
                          ? `(${product?.data?.avg_rating[0]?.total} Reviews)`
                          : "(0 Reviews)"}
                      </span>
                    </div>
                    <div className="mt-3 d-sm-flex">
                      <div className="discount-section me-3">
                        <p className="mb-0 font-20x" id="secondry-text">
                          <del>
                            {`₹${parseInt(product?.data?.previous_price).toLocaleString()}/-`}
                          </del>
                        </p>
                        <p className="mb-0 font-30x ms-2 cartMoney" id="primary-color">
                          {`₹${parseInt(product?.data?.price).toLocaleString()}/-`}
                        </p>
                      </div>

                      <div className="d-flex flex-column mt-2 m-sm-0">
                        <p
                          className="mb-0 font-14x fw-light"
                          id="secondry-text"
                        >
                          Total Savings:
                          <span
                            id="secondry-color"
                            className="font-16x fw-bold ms-2"
                          >
                            {`₹${parseInt(
                              product?.data?.previous_price -
                              product?.data?.price
                            ).toLocaleString()}`}
                            (
                            {percentageDeal(
                              parseInt(product?.data?.price),
                              parseInt(product?.data?.previous_price)
                            )}
                            % )
                          </span>
                        </p>
                        <p className="mb-0 mt-1 font-12x" id="secondry-text">
                          (Inclusive of all Taxes)
                        </p>
                      </div>
                    </div>

                    <div className="row d-flex align-items-center mt-3">
                      <div className="col-sm-2">
                        <p
                          className="mb-0 font-16x"
                          id="secondry-text"
                          style={{ fontWeight: 500 }}
                        >
                          Size
                        </p>
                      </div>
                      <div className="col-sm-10 mt-1 mt-sm-0">
                        <div className="d-flex">
                          {sortingDuplicate(
                            product?.data?.product_variations
                          ).map((size) => {
                            return (
                              <>
                                <button
                                  className="d-flex flex-column justify-content-center align-items-center selected_box me-4"
                                  key={size}
                                  onClick={() => setSize(size)}
                                >
                                  <div
                                    className={`d-flex flex-column justify-content-center align-items-center ${
                                      optionCart.size === size
                                        ? "fabric-box-select"
                                        : "fabric-box "
                                    }`}
                                  >
                                    <p
                                      className={`font-14x mb-0 text-center fw-light"
                                          id="secondry-text"
                                          ${
                                            optionCart.size === size
                                              ? "text-white"
                                              : 'id="secondry-text"'
                                          }`}
                                    >
                                      {size}
                                    </p>
                                  </div>
                                </button>
                              </>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="row d-flex align-items-center mt-3">
                      <div className="col-sm-2">
                        <p
                          className="mb-0 font-16x"
                          id="secondry-text"
                          style={{ fontWeight: 500 }}
                        >
                          Color
                        </p>
                      </div>
                      <div className="col-sm-10 mt-2 mt-sm-0">
                        <div className="d-flex">
                          {product?.data?.product_variations.length
                            ? product?.data?.product_variations?.map(
                                (color) => {
                                  return (
                                    <>
                                      {color?.size === optionCart?.size && (
                                        <>
                                          <button
                                            className="d-flex flex-column justify-content-center align-items-center me-4 selected_box"
                                            key={color}
                                            onClick={() =>
                                              addColor(color.color)
                                            }
                                          >
                                            <div
                                              className={`rounded ${
                                                optionCart.color ===
                                                  color.color &&
                                                "select-color-button"
                                              }`}
                                              style={{
                                                backgroundColor: color.color,
                                                padding: "30px",
                                                height: "65px",
                                              }}
                                            ></div>
                                            <p
                                              className="font-14x mb-0 text-center fw-light"
                                              id="secondry-text"
                                            >
                                              {/* {color?.color} */}
                                            </p>
                                          </button>
                                        </>
                                      )}
                                    </>
                                  );
                                }
                              )
                            : null}
                        </div>
                      </div>
                    </div>

                    <div className="row d-flex align-items-center mt-3">
                      <div className="col-sm-2">
                        <p
                          className="mb-0 font-16x"
                          id="secondry-text"
                          style={{ fontWeight: 500 }}
                        >
                          Quantity
                        </p>
                      </div>
                      <div className="col-sm-10 mt-2 mt-sm-0">
                        <select
                          className="form-select cust-selectbox"
                          onChange={({ target: { value } }) => setQty(value)}
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>
                    </div>

                    <div className="row mt-4">
                      <div className="col-sm-6">
                        <button
                          className="w-100"
                          onClick={() =>
                            addToCart(product?.data?.id, product?.data?.slug)
                          }
                        >
                          <div className="add-to-cart">
                            <img src="/images/white-icon-cart.svg" alt="cart" />
                            <p className="font-18x fw-bold mb-0 ms-1 text-white">
                              ADD TO CART
                            </p>
                          </div>
                        </button>
                      </div>
                      <div className="col-sm-6 mt-3 mt-sm-0">
                        <button
                          className="w-100"
                          onClick={() => buyNow(product?.data?.id, product?.data?.slug)}
                        >
                          <div className="buy-now">
                            <img
                              src="/images/buy-logo.svg"
                              alt=""
                              className="me-2"
                            />
                            <p className="font-18x fw-bold mb-0 ms-1 text-white">
                              Buy Now
                            </p>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Modal.Body>
          </>
        )}
      </Modal>
    </>
  );
};

export default memo(Cart);
