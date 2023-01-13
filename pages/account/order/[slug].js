import React, { useEffect, useState } from "react";
import axios from "helpers/api";
import { useRouter } from "next/router";
import Loader from "components/LoadingSpinner";
import { AuthValidation } from "providers/AuthContext";
import Sidebar from "components/Sidebar";
import { config } from "config";
import CancelModal from "components/PerOrderCancelModal";
import { Header } from "components";
import Footer from "components/Footer";
import { format, parse, parseISO } from "date-fns";
import DeliveryStatus from "components/Delivery-Status";
import DeliveryMan from "components/Delivery-man";
import { CartVolume } from "providers/CartContext";
import { toast } from "react-toastify";
import Link from "next/link";
import Address from 'components/Address';
import Back from 'components/BackButton';

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
  }, [slug]);

  const cancelOrderFinal = () => {
    setShow(false);
  };
  //Add default src
  const addDefaultSrc = (e) => {
    e.target.src = "/images/error-product-image.png";
  };

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


  

  return (
    <>
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <>

          <div className="mobile pt-2">
            <div className="container-fluid mt-4">
              <div className="row">
                <div className="col-12">
                  <div className="product-cartDetails">


                    <div className="mobile-orderView">
                      <div className="d-flex align-items-center">
                        <Back />
                        <p className="mb-0 font-18x fw-bold mb-0 ms-3">
                          Items Ordered
                        </p>
                      </div>

                      <div className="row mt-4">
                        <div className="col-lg-8">
                          {orderDetail?.order_products?.map((product) => {
                            return (
                              <>
                                <div className="row mb-3">
                                  <div className="col-4 px-0">
                                    <Link href={`/product/${product?.slug}`}>
                                    <img
                                      src={`${config.productbasepath}${product?.photo}`}
                                      className="mobileProductImage"
                                      onError={addDefaultSrc}
                                    />
                                    </Link>
                                  </div>
                                  <div className="col-8">
                                    <div className="d-flex flex-column">
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
                                </div>

                              </>
                            );
                          })}
                        </div>

                        <div className="col-lg-4">
                          <div className="d-flex justify-content-end">
                            <div className="d-flex justify-content-end flex-column mt-2">
                              {/* <p
                                className="mb-0 font-12x fw-bold"
                                id="primery-color2"
                              >
                                View Order Details
                              </p> */}
                              <Link href={`/account/review/${orderDetail.id}`} >
                                <button className="rateReview">
                                  Rate & Review Product
                                </button>
                              </Link>
                              <p className="mb-0 font-16x fw-bold mt-3 text-end">
                                ₹ {orderDetail?.pay_amount}/-
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>



                      <div className=" amountSummary">
                        <div
                          className="d-flex justify-content-between align-items-center"
                          style={{ marginTop: "50px" }}
                        >
                          <p className="mb-0 font-18x fw-bold" id="twice-black">
                            Summary
                          </p>
                          {/* <p className="mb-0 font-15x fw-bold" id='alternative-blue'>Call</p> */}
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between align-items-center">
                          <p className="mb-0 font-15x" id="secondry-text">
                            Total Price
                          </p>
                          <p className="mb-0 font-15x">
                            ₹ {orderDetail?.total_amount} /-
                          </p>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mt-3">
                          <p className="mb-0 font-15x" id="secondry-text">
                            GST (18%)
                          </p>
                          <p className="mb-0 font-15x">₹ {orderDetail?.tax} /-</p>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mt-3">
                          <p className="mb-0 font-15x" id="secondry-text">
                            Discount{" "}
                          </p>
                          <p className="mb-0 font-15x">
                            ₹
                            {/* {orderDetail?.coupon_discount}  */}
                            {total_discount(orderDetail.loyalty_discount, orderDetail.coupon_discount)}
                            /-
                          </p>
                        </div>

                        <div className="d-flex justify-content-between align-items-center mt-3">
                          <p className="mb-0 font-15x" id="secondry-text">
                            Delivery Fee{" "}
                          </p>
                          <p className="mb-0 font-15x">
                            ₹ {orderDetail?.pay_amount} /-
                          </p>
                        </div>

                        <div className="d-flex justify-content-end flex-column mt-3 text-end">
                          <p
                            className="font-20x mb-0 fw-lighter"
                            id="twice-black"
                          >
                            Payable amount
                          </p>
                          <p className="mb-0 font-18x fw-bold mb-0">
                            ₹ {orderDetail?.pay_amount}/-
                          </p>
                        </div>
                      </div>

                      <DeliveryMan />
                    </div>

                    <div className="pt-5">
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

                    <button className="cancel-order" onClick={handleShow}>
                      Cancel Order
                    </button>



                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <CancelModal
        show={show}
        handleClose={handleClose}
        cancelOrderFinal={cancelOrderFinal}
        slug={slug}
        orderDetail={orderDetail}
        setOrderdetail={setOrderdetail}
      />
      <Footer />
    </>
  );
};
export default Order;
