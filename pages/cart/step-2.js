import { useState, useEffect, useMemo, useRef } from "react";
import { AuthValidation } from "providers/AuthContext";
import { CartVolume } from "providers/CartContext";
import axios from "helpers/api";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CartFooter from "components/cart-footer";
import Link from "next/link";
import CartDetails from "components/CartDetails";
// import Loader from "components/LoadingHome";
import Loader from "components/LoadingSpinner";
import { History } from "swiper";

const step2 = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [address, setAddress] = useState([]);
  const [editable, setEditable] = useState(false);
  const [addressSingle, setAddressSingle] = useState("");
  const [payment, setPayment] = useState("");

  const ref = useRef(null);
  //Auth State Management ---------
  const { token, user, updateUser, userLogout } = AuthValidation();

  const { cart, fetchCartData, updateCartItem, coupon, updateWishlist } =
    CartVolume();

  // useEffect(() => {
  //   if (!cart?.order_products?.length) {

  //     router.push('/cart', undefined, { shallow: true });
  //   }
  // }, [])

  useEffect(() => {
    fetchCartData();
  }, [token]);

  //loyalty point
  const [loyalty, setLoyalty] = useState(user?.wallet?.balance);

  const updateLoyalty = (props) => {
    setLoyalty(props);
  };

  //Coupon modal state
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Fetch Addresses
  const fetchAddress = async () => {
    try {
      setIsLoading(true);
      const url = `address`;
      if (token) {
        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res) {
          setAddress(res.data.data);
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
        router.push("/");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchAddress();
  }, [token]);

  useMemo(() => {
    address?.map((address) => {
      if (address?.is_default == 1) {
        setAddressSingle(address?.id);
        setEditable(address?.id);
      }
    });
  }, [token, address]);

  const deleteAddress = async (id) => {
    try {
      const url = `address/delete`;
      if (token) {
        const res = await axios.post(
          url,
          {
            id: id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res) {
          fetchAddress();
          setEditable("");
        }
      }
    } catch (error) {
      console.log(error);
      if (error.response.status == 401) {
        userLogout();
        updateCartItem("");
        updateWishlist("");

        toast.error("Session Expired!", {
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

  const setAddressId = (id) => {
    setAddressSingle(id);
  };

  const setPaymentOrder = (e) => {
    let value = e.target.value;
    setPayment(value);
  };

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      // document.body.appendChild(script);

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const placeOrder = async () => {
    if (addressSingle !== "" && payment !== "") {
      if (payment === "cash") {
        try {
          const url = `place-order/${cart.id}`;
          const res = await axios.post(
            url,
            {
              address_id: addressSingle,
              payment_method: payment,
              loyalty_used: loyalty && loyalty,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (res) {
            console.log("cart", res.data);
            setAddressSingle("");
            setPayment("");
            localStorage.setItem("cart", JSON.stringify(res.data));
            fetchCartData();
            router.push("/cart/step-3");
          } else {
            alert("No value");
          }
        } catch (error) {
          console.log(error);
          if (error.response.status == 401) {
            userLogout();
            updateCartItem("");
            updateWishlist("");

            toast.error("Session Expired!", {
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

      if (payment === "razerpay") {
        try {
          const displayRazorpay = async () => {
            const res = await loadRazorpay();

            if (!res) {
              alert("Razorpay SDK Failed to load");
              return;
            }

            const urlraz = `place-order/${cart.id}`;
            const responce = await axios.post(
              urlraz,
              {
                address_id: addressSingle,
                payment_method: "razor_pay",
                loyalty_used: loyalty && loyalty,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            const { data } = responce;
            console.log("data", data);
            var options = {
              key: "rzp_test_DdEXQzCy1Yg4ry", // Enter the Key ID generated from the Dashboard
              // key: 'rzp_test_sBSpw2AJZSiWZz',
              name: "Try then Buy",
              currency: "INR",
              amount: loyalty
                ? data.pay_amount - loyalty * 100
                : data.pay_amount * 100,
              order_id: data.razerpay_order_id,
              description: "Thankyou for your for your payment",
              image: "https://trythenbuy.in/images/brand-logo.svg",
              handler: async function (response) {
                const urlres = `payment-complete/${cart.id}`;
                const res = await axios.post(
                  urlres,
                  {
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );
                if (res) {
                  setAddressSingle("");
                  setPayment("");
                  localStorage.setItem("cart", JSON.stringify(res.data));
                  // updateCartItem();
                  fetchCartData();

                  if (token) {
                    const responceData = await axios.get("user", {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    });

                    if (responceData) {
                      console.log("responce", responceData.data);
                      localStorage.setItem(
                        "user",
                        JSON.stringify(responceData?.data?.data)
                      );
                      updateUser(responceData.data.data);
                    }
                  }
                  router.push("/cart/step-3");
                }
              },
              prefill: {
                name: data?.customer_name,
                email: data?.customer_email,
                contact: data?.customer_phone,
              },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
          };
          displayRazorpay();
        } catch (error) {
          console.log(error);
          if (error.response.status == 401) {
            userLogout();
            updateCartItem("");
            updateWishlist("");

            toast.error("Session Expired!", {
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
    } else {
      toast.error("Please select a payment and address!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  //configration
  const owner = JSON.parse(localStorage.getItem("configration"));

  //Edit address
  const editAddress = async (id) => {
    router.push(`/account/edit-address/${id}`);
  };

  const back = () => {
    history.back();
  };
  return (
    <>
      {cart?.order_products?.length ? (
        <>
          {/* mobile view */}
          <div className="mobile mt-0">
            <div className="container-fluid pt-4">
              <div className="d-flex justify-content-between">
                <Link href="/">
                  <img src="/images/brand-logo.svg" alt="logo" />
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
                    <img src="/images/cart-delivary1.svg" />
                    <p className="mb-0 font-11x fw-bold ms-2">Summary</p>
                  </div>
                </Link>
                <Link href="/cart/step-2">
                  <div className="delivery ms-4">
                    <img src="/images/cart-delivary2.svg" />
                    <p className="mb-0 font-11x fw-bold ms-2">
                      Delivery & Payment
                    </p>
                  </div>
                </Link>
              </div>
            </div>

            {/* ********Top breadcrumb section**********  */}
            <div className="container mt-5">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link href="/">
                      <a>HOME</a>
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

            <div className="container-fluid">
              <h1 className="font-26x fw-bold">Delivery & Payment</h1>
              <div className="row">
                <div className="col-12 mb-2">
                  <div className="product-cartDetails">
                    {/* <h1 className="font-18x fw-bold">Shipping Address</h1> */}
                    <div className="d-flex justify-content-between">
                      <h1 className="font-18x fw-bold">Shipping Address</h1>
                      {editable && (
                        <div className="d-flex align-items-center">
                          <img
                            src="/images/edit.svg"
                            className="me-4"
                            width="18px"
                            height="20px"
                            onClick={() => editAddress(editable)}
                          />
                          <img
                            src="/images/delete.svg"
                            alt=""
                            width="20px"
                            height="20px"
                            onClick={() => deleteAddress(editable)}
                          />
                        </div>
                      )}
                    </div>

                    {isLoading ? (
                      <Loader />
                    ) : address ? (
                      address?.map((address) => {
                        return (
                          <>
                            <div className="d-flex justify-content-between mt-5">
                              <div className="d-flex justify-content-start align-items-center">
                                <div className="radio-custome">
                                  <input
                                    type="radio"
                                    // name="address"
                                    value={address?.id}
                                    className="m-0"
                                    onChange={() => {
                                      setAddressId(address?.id);
                                      setEditable(address?.id);
                                    }}
                                    id={`address${address?.id}`}
                                    checked={addressSingle == address?.id}
                                  />
                                </div>
                                <label
                                  className="font-16x mb-0 ms-3"
                                  id="alternative-black"
                                  for={`address${address?.id}`}
                                >
                                  #{address?.street_address},{" "}
                                  {address?.address_line_1},{" "}
                                  {address?.address_line_2}, {address?.city},{" "}
                                  {address?.state}
                                  <br />
                                  <span className="font-11x" id="secondry-text">
                                    {address?.is_default == 1 &&
                                      "Default Address"}
                                  </span>
                                </label>
                                <div>
                                  <div
                                    className="saving-money ms-3"
                                    style={{ marginTop: "-18px" }}
                                  >
                                    <p
                                      className="font-10x mb-0 fw-bold"
                                      id="secondry-color"
                                    >
                                      {address?.address_type.toUpperCase()}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              {/* {editable === address.id && (
                                  <div className="d-flex align-items-center">
                                    <img
                                      src="/images/edit.svg"
                                      className="me-4"
                                      width="18px"
                                      height="20px"
                                      onClick={() => editAddress(address.id)}
                                    />
                                    <br />
                                    <img
                                      src="/images/delete.svg"
                                      alt=""
                                      width="20px"
                                      height="20px"
                                      onClick={() => deleteAddress(address.id)}
                                    />
                                  </div>
                                )} */}
                            </div>
                          </>
                        );
                      })
                    ) : null}

                    <button
                      className="add-to-cart-product mt-4"
                      style={{ width: "190px" }}
                      onClick={() => router.push("/account/add-new-address")}
                    >
                      ADD NEW ADDRESS
                    </button>
                  </div>
                </div>

                <div className="col-12">
                  <div className="product-cartDetails mt-3">
                    <h1 className="font-18x fw-bold">Payment Method</h1>
                    <div
                      className={
                        payment === "razerpay"
                          ? "paymentMethod d-flex justify-content-start align-items-center mt-4"
                          : "d-flex justify-content-start align-items-center mt-4"
                      }
                    >
                      <div className="radio-custome d-flex align-items-center">
                        <input
                          type="radio"
                          name="payment"
                          value="razerpay"
                          id="razerpay"
                          // onChange={(e) => {
                          //   setCheck(e.target.value);
                          // }}
                          onClick={setPaymentOrder}
                        />
                      </div>
                      <label className="font-16x mb-0 ms-3" for="razerpay">
                        Razerpay
                      </label>
                    </div>
                    <div
                      className={
                        payment === "cash"
                          ? "paymentMethod d-flex justify-content-start align-items-center mt-4"
                          : "d-flex justify-content-start align-items-center mt-4"
                      }
                    >
                      <div className="radio-custome d-flex align-items-center">
                        <input
                          type="radio"
                          name="payment"
                          value="cash"
                          id="cash"
                          // onChange={(e) => {
                          //   setCheck(e.target.value);
                          // }}
                          onClick={setPaymentOrder}
                        />
                      </div>
                      <label className="font-16x mb-0 ms-3" for="cash">
                        COD
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-12 mt-4">
                  <div className="product-cartDetails">
                    <CartDetails
                      cart={cart}
                      handleShow={handleShow}
                      show={show}
                      handleClose={handleClose}
                      coupon={coupon}
                      loyalty={loyalty}
                      updateLoyalty={updateLoyalty}
                    />
                    {cart?.order_products?.length ? (
                      <>
                        <button
                          className="add-to-cart-product mt-4"
                          // onClick={() => router.push("/cart/step-3")}
                          onClick={placeOrder}
                        >
                          PLACE ORDER
                        </button>
                      </>
                    ) : null}
                  </div>
                </div>

                <div className="col-12">
                  <p
                    className="font-12x px-3 mt-3"
                    style={{ color: "#2B2B2B" }}
                  >
                    By pressing continue, you are agreeing with our <br />{" "}
                    <span id="secondry-color">Terms and Conditions</span> .
                  </p>
                </div>
              </div>
            </div>

            {/* *******Footer div ***** */}
            <CartFooter lWidth="47px" sWidth="74px" line="45px" />
          </div>
        </>
      ) : (
        // <Loader />
        back()
      )}
    </>
  );
};

export default step2;
