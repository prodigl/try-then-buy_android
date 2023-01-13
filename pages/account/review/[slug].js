import React, { useEffect, useState } from "react";
import axios from "helpers/api";
import { useRouter } from "next/router";
import Loader from "components/LoadingSpinner";
import { AuthValidation } from "providers/AuthContext";
import Sidebar from "components/Sidebar";
import Rating from "react-rating";
import ReturnModal from "components/OrderReturnModal";
import { Header } from "components";
import Footer from "components/Footer";
import { toast } from 'react-toastify';
import api from "helpers/api";
import { config } from "config";
import DeliveryStatus from "components/Delivery-Status";
import { CartVolume } from "providers/CartContext";
import Link from "next/link";
import Address from 'components/Address';
import { format, parse, parseISO } from "date-fns";
import Back from "components/BackButton";

const Order = () => {
  const router = useRouter();
  const slug = router.query.slug;

  //Auth State Management---------
  const {
    user,
    token,
    userLogout
  } = AuthValidation();
  //Cart State Management---------
  const {
    updateCartItem,
    updateWishlist
  } = CartVolume();

  const [isLoading, setIsLoading] = useState(false);
  const [orderDetail, setOrderdetail] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const fetchOrder = async () => {
    try {
      if (token) {
        setIsLoading(true);
        const url = `order/${slug}`;
        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data) {
          setIsLoading(false);
          setOrderdetail(res.data.data);
        }
      } else {
        router.push('/');
      }
    } catch (error) {
      console.log(error)
      if (error.response.status == 401) {
        userLogout();
        updateCartItem("");
        updateWishlist("");
        router.push('/');

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
    fetchOrder();
  }, [slug, token]);

  const [isRating, setIsRating] = useState("");
  const [isDetails, setIsDetails] = useState("");
  const [productId, setProductId] = useState('');

  const getProductRating = (e) => {
    setIsRating(e);
  };

  const submitReview = async () => {
    try {

      if (isRating !== '' && isDetails !== '') {
        let res;
        if (token) {
          if (productId.length) {
            res = await api.post('review',
              {
                details: isDetails,
                rating: isRating,
                product_id: productId
              }, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            })

          } else {
            res = await api.post('review',
              {
                details: isDetails,
                rating: isRating,
                product_id: orderDetail?.order_products[0]?.id
              }, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            })
          }

          if (res.status == 200) {
            console.log(res.data);
            setIsRating("");
            setIsDetails("");
            router.push('/account/order');
            toast.success('Thank you for Review!', {
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
      }
    } catch (error) {
      console.log(error)
      if (error.response.status == 401) {
        userLogout();
        updateCartItem("");
        updateWishlist("");
        router.push('/');

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
  }

  // const totalDiscount = (coupon, loyalti) => {
  //   let tt = coupon + loyalti;
  //   return parseInt(tt);
  // }

  const total_discount = (amount, amout2) => {
    let amt = parseInt(amount);
    let loyl = parseInt(amout2);
    if (loyl) {
      let tt = parseInt(amt + loyl);
      return tt;
    } else {
      return amount;
    }
  }


  //Add default src for 404 image
  const addDefaultSrc = (e) => {
    e.target.src = "/images/error-product-image.png";
  };


  return (
    <>
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <>

          <div className="mobile pt-5">
            <div className="container-fluid">
              <div className="row mx-0">
                <div className="product-cartDetails">
                  <div className="d-flex justify-content-start align-items-center">
                    <Back />
                    <p className="mb-0 font-18x fw-bold mb-0 ms-2 ">
                     Review Order #{orderDetail?.order_number}
                    </p>
                    <p className="font-12x mb-0 ms-2" id="secondry-text">
                      ({orderDetail?.updated_at
                        ? format(
                          parseISO(orderDetail.updated_at),
                          "d.MM.yyyy",
                          new Date()
                        ).toString()
                        : null})
                       {/* { formateDate(orderDetail?.updated_at)} */}
                    </p>
                  </div>

                  <div className="row mt-4">
                    <div className="col-12">
                      {
                        orderDetail?.order_products?.length > 1 ?
                          orderDetail?.order_products?.map((product) => {
                            return (
                              <>
                                <div className="d-flex mb-3">
                                  <div className="d-flex align-items-center">
                                    <div className="radio-custome">
                                      <input
                                        type="radio"
                                        name="product_id"
                                        value={product.id}
                                        onChange={(e) => setProductId(e.target.value)}
                                      />
                                    </div>
                                    <Link href={`/product/${product?.slug}`}>
                                    <img
                                      src={`${config.productbasepath}${product.photo}`}
                                      className="mobileProductImage"
                                      onError={addDefaultSrc}
                                    />
                                    </Link>
                                  </div>
                                  <div className="d-flex flex-column ms-3">
                                    <p className="mb-0 font-20x">
                                      {product?.name.length <= 14
                                        ? `${product?.name}`
                                        : `${product?.name.substring(0, 13)}..`}
                                    </p>

                                    <div className="d-flex justify-content-between mt-3">
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
                              </>
                            );
                          })
                          :
                          orderDetail?.order_products?.map((product) => {
                            return (
                              <>
                                <div className="d-flex mb-3">
                                  <div className="d-flex align-items-center">
                                    <Link href={`/product/${product?.slug}`} >
                                    <img
                                      src={`${config.productbasepath}${product.photo}`}
                                      className="mobileProductImage"
                                      onError={addDefaultSrc}
                                    />
                                    </Link>
                                  </div>
                                  <div className="d-flex flex-column ms-3">
                                    <p className="mb-0 font-20x">
                                      {product?.name.length <= 14
                                        ? `${product?.name}`
                                        : `${product?.name.substring(0, 13)}..`}
                                    </p>

                                    <div className="d-flex justify-content-between mt-3">
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
                              </>
                            );
                          })

                      }


                    </div>

                    <div className="col-12">
                      <div className="d-flex justify-content-end">
                        <div className="d-flex justify-content-end flex-column mt-2">
                          <Link href={`/account/order/${orderDetail.id}`}>
                            <p
                              className="mb-0 font-12x fw-bold"
                              id="primery-color2"
                            >
                              View Order Details
                            </p>
                          </Link>
                          <p className="mb-0 font-16x fw-bold mt-4 text-end">
                            ₹ {orderDetail?.pay_amount}/-
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="reviewDiv">
                    <p className="font-15x mt-5 mb-2 fw-bold">
                      Post a Review
                    </p>

                    <div className="my-3">
                      <Rating
                        initialRating={isRating}
                        emptySymbol={
                          <img
                            src="/images/empty-star.svg"
                            className="icon"
                          />
                        }
                        fullSymbol={
                          <img src="/images/star.svg" className="icon" width="25px" />
                        }
                        onClick={(e) => getProductRating(e)}
                      />
                    </div>

                    <textarea
                      rows="4"
                      className="form-control"
                      onChange={(e) => setIsDetails(e.target.value)}
                    />
                    <button
                      className="add-to-cart-product mt-3"
                      style={{ width: "190px" }}
                      onClick={submitReview}
                    >
                      Post review
                    </button>
                  </div>

                  <div className="mt-5">
                    <DeliveryStatus />
                  </div>

                  <div className="delivery-address">
                    <p
                      id="karla"
                      className="font-15x fw-bold mt-4"
                      style={{ color: "#F39200" }}
                    >
                      See 3 more updates
                    </p>
                    <div className="mt-5">
                      <Address address={orderDetail?.address} />
                    </div>
                  </div>

                  <button
                    className="add-to-cart-product mt-3"
                    style={{ width: "100%", background: "#F39200" }}
                    onClick={handleShow}
                  >
                    Return
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <ReturnModal show={show} handleClose={handleClose} slug={slug} />
      <Footer />
    </>
  );
};
export default Order;