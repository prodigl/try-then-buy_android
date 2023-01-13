import Sidebar from "components/Sidebar";
import axios from "helpers/api";
import { config } from "config";
import { AuthValidation } from "providers/AuthContext";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { CartVolume } from "providers/CartContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Header } from "components";
import Footer from "components/Footer";
import CartModal from "components/CartModal";
import { useMemo } from "react";
import BackButton from 'components/BackButton'

const Order = () => {
  const router = useRouter();

  //Receving Wishlist items from the context
  const {
    cart,
    fetchCartData,
    fetchWishlist,
    wishlist,
    updateCartItem,
    setWishlist, } = CartVolume();

  //Receving token from the context
  const { user, token, userLogout } = AuthValidation();

  //For Cart opening modal
  const [cartProduct, setCartProduct] = useState(false);
  const closeCart = () => setCartProduct(false);
  const openCart = () => setCartProduct(true);
  const [cartId, setCartId] = useState("");
  const [cartSlug, setCartSlug] = useState("");

  //Check if token present or not
  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, [token]);

  //Remove Product from  Wishlist functionality
  const addToWishProduct = async (id) => {
    const url = `${config.apiUrl}add-to-wishlist/${id}`;
    try {
      const res = await axios.post(
        url,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res) {
        fetchWishlist();
      }
    } catch (error) {
      console.log(error);
      if (error.response.status == 401) {
        userLogout();
        updateCartItem("");
        setWishlist("");

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

  //Add Product to Cart && open cart Modal
  const addToCart = async (id, slug) => {
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
    //     }

    //     if (slug) {
    //       setCartId(id);
    //       setCartSlug(slug);
    //       openCart();
    //     } else {
    //       handleShow();
    //     }
    //   }
    // } catch (error) {
    //   console.log(error);
    //   if (error.response.status == 401) {
    //     userLogout();
    //     updateCartItem("");
    //     setWishlist('');

    //     toast.error('Session Expired..!', {
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


  //Add default src
  const addDefaultSrc = (e) => {
    e.target.src = "/images/error-product-image.png";
  };

  return (
    <>
      <Header />
      <div>

        {/* mobile view */}
        <div className="mobile">
          <div className="container-fluid profile-container-mobile mt-5">
            <div className="row pt-5">
              <div className="col-12">
                <div className="product-cartDetails" >
                  <div className="d-flex justify-content-start align-items-center">
                    <BackButton />
                    <p className="mb-0 font-18x fw-bold ms-3">
                      Your Wishlist ({wishlist.length})
                    </p>

                  </div>

                  {wishlist.length ? (
                    wishlist?.map((wishlist) => {
                      return (
                        <>
                          <div className="row mt-4" key={wishlist.id}>
                            <div className="col-12">
                              <div className="d-flex">
                                <img
                                  src={`${config.productbasepath}${wishlist?.product?.photo}`}
                                  className="mobileProductImage"
                                  onError={addDefaultSrc}
                                />
                                <div className="d-flex flex-column ms-3">
                                  <p
                                    title={wishlist?.product?.name}
                                    className="mb-0 font-20x"
                                  >
                                    {wishlist?.product?.name.length <= 13
                                      ? `${wishlist?.product?.name}`
                                      : `${wishlist?.product?.name.substring(
                                        0,
                                        13
                                      )}..`}
                                  </p>
                                  <p
                                    className="mb-0 font-14x mt-1"
                                    id="gray-text"
                                  >
                                    {/* {wishlist?.product?.details} */}
                                  </p>
                                  {/* <div className="d-flex justify-content-between">
                                    <p
                                      className="mb-0 font-14x mt-1 me-4"
                                      id="gray-text"
                                    >
                                      Color: Black
                                    </p>
                                    <p
                                      className="mb-0 font-14x mt-1"
                                      id="gray-text"
                                    >
                                      Size: Double
                                    </p>
                                  </div> */}
                                </div>
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="d-flex justify-content-between align-items-center">
                                <div className="pt-3">
                                  <p className="mb-0 font-14x" id="secondry-text">
                                    <del>
                                      {`₹ ${(parseInt(wishlist?.product?.previous_price).toLocaleString())}/-`}
                                    </del>
                                  </p>
                                  <p className="mb-0 font-16x fw-bold mt-2">
                                    {`₹ ${parseInt(wishlist?.product?.price).toLocaleString()}/-`}
                                  </p>
                                </div>
                                <div className="pt-3">
                                  <div className="d-flex justify-content-end align-items-end flex-column">
                                    <div
                                      className="d-flex align-items-center pointer"
                                      onClick={() =>
                                        addToCart(
                                          wishlist?.product_id,
                                          wishlist?.product?.slug
                                        )
                                      }

                                    >
                                      <img src="/images/header-logo3.svg" height="18px" />
                                      <p
                                        className="mb-0 font-12x ms-1"
                                      // id="secondry-color"
                                      >
                                        MOVE TO CART
                                      </p>
                                    </div>
                                    <button
                                      onClick={() => {
                                        addToWishProduct(wishlist?.product_id);
                                      }}
                                      className="mt-2 pointer"
                                    >
                                      <div className="d-flex align-items-center pb-1">
                                        <p
                                          className="mb-0 font-12x fw-bold text-primary"

                                        >
                                          Remove
                                        </p>
                                      </div>
                                    </button>

                                    <Link
                                      href={`/product/${wishlist?.product?.slug}`}
                                    >
                                      <a>
                                        <div className="d-flex align-items-center">
                                          <p
                                            className="mb-0 font-12x fw-bold"
                                            id="primery-color2"
                                          >
                                            View Product
                                          </p>
                                        </div>
                                      </a>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
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
                  {/* <p className="mb-0 text-center mt-4 font-18x fw-bold" id='secondry-text'>No more orders</p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <CartModal
        id={cartId}
        slug={cartSlug}
        show={cartProduct}
        closeCart={closeCart}
      // addToWish={addToWishProduct}
      />
      <ToastContainer />
    </>
  );
};

export default Order;
