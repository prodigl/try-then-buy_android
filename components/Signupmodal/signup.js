import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Link from "next/link";
import { config } from "config";
import api from "helpers/api";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import { CartVolume } from "providers/CartContext";
import { AuthValidation } from "providers/AuthContext";
import * as yup from 'yup';
require("yup-phone");

const phoneSchema = yup.string().phone("IN", true).required();

const SignupModal = ({
  show,
  handleClose,
  // updateUser,
  // updateToken,
  // getLocalData,
  // updateLocalCartData
}) => {

  // Cart State Mangament ------------------
  const {
    cart,
    fetchCartData,
    updateLocalCartData,
    updateCartItem,
    localCartData
  } = CartVolume();

  //Auth State Management-----------------
  const {
    token,
    updateToken,
    updateUser,
  } = AuthValidation();

  const [otpData, setOtpdata] = useState([]);
  const [errorOtp, setErrorOtp] = useState(false);
  const [verify, setVerify] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();




  //For Mobile number purpose
  const [mobile, setMobile] = useState({
    phone: "",
  });
  const [valid, setValid] = useState();
  const [phone, setPhone] = useState("");

  //Checking phone number is valid or not
  const validatePhone = async (phone) => {
    if (phone.length > 6) {
      const isValid = await phoneSchema.isValid(phone);
      setValid(isValid);
    } else {
      setValid();
    }
  };


  useEffect(() => {
    validatePhone(phone)
  }, [phone]);


  const onChangeHandler = (ev) => {
    const value = ev.target.value.replace(/\D/g, "");
    setPhone(value.trim());
  };



  //For otp number purpose
  const [otp, setOtp] = useState({
    otp: "",
  });

  const [otpVal, setOtpVal] = useState({});

  //Saving mobile number
  const setPhoneNumber = (e) => {
    let name = e.target.name;
    // let value = e.target.value;
    let value = e.target.value.replace(/\D/g, "");
    setMobile({
      ...mobile,
      [name]: value,
    });
  };

  //Saving otp number
  const setOtpNumber = (e) => {

    let name = e.target.name;
    let value = e.target.value;
    setOtp({
      [name]: value,
    });
  };

  //Mobile number submiting
  const formSubmit = async (e) => {
    // e.preventDefault();
    if(valid) {

      try {
        const url = `${config.apiUrl}send-otp`;
        const res = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            // phone: mobile.phone,
            phone
          }),
          headers: {
            "Content-type": "application/json",
          },
        });

        const data = await res.json();

        if (data) {
          setOtpdata(data);
          setVerify(true);
        }
      } catch (error) {
        console.log(error.responce);
      }
    }
  };


  //Otp number submitting
  const otpSubmit = async (e) => {
    e.preventDefault();
    const phone = otpData?.data?.user?.phone;
    try {
      const url = `${config.apiUrl}verify-otp`;

      const res = await api.post(url, {
        phone: phone ? phone : mobile.phone,
        otp: otp.otp,
      });

      const data = res.data;

      setOtpVal(data);

      const token = data?.data?.token;
      localStorage.setItem("token", data.data.token);
      updateToken(data.data.token);

      try {
        const url = 'user';
        if (token) {
          const responce = await api.get('user', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })

          if (responce) {
            console.log('responce', responce.data);
            // const user = responce.data.data;
            localStorage.setItem("user", JSON.stringify(responce?.data?.data));
            updateUser(responce.data.data);
          }

        }
      } catch (error) {
        console.log(error)
      }
      //For localCartData if user didn't logged in
      if (localCartData?.length) {
        try {
          if (token) {
            const url = `initializeCart`;
            const res = await api.get(url, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            if (res.status == 200) {
              const id = res?.data?.id;
              try {
                localCartData.map(async (value) => {
                  if (value.id) {
                    const url = `addProductToCart/${id}`;
                    let res = await api.post(
                      url,
                      {
                        product_id: value.id,
                        color: value.color,
                        size: value.size,
                        qty: value.qty,
                      },
                      {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      }
                    );

                    if (res.status == 200) {
                      localStorage.removeItem("localCartData");
                      updateLocalCartData([]);
                      // fetchCartData();
                      updateCartItem(data);
                      router.push("/cart/step-2");
                    }
                  }
                });
              } catch (e) {
                console.log(e);
              }
            }
          }
        } catch (err) {
          console.log(err);
        }
      }

      if (data) {
        handleClose();
        setVerify(false);
        setOtpdata("");
        setOtp({
          otp: "",
        });
        setErrorOtp(false);

        toast.info(`Welcome ${data?.data?.user?.name ? data?.data?.user?.name : ''} to Try Then buy!`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      setErrorOtp(true);
      console.log(error.response);
      if (error.response.status == 400) {
        setError(error.response.data.message)
      }
    }

  };

  //Clear otp data after close the modal
  useEffect(() => {
    if (show == false) {
      setOtpdata("");
      setVerify(false);
      setMobile({
        phone: "",
      });
      setPhone("");
      setErrorOtp(false);
      setError("");
      setOtp({
        otp: "",
      })
    }
  }, [show]);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose} 
        className="change_its_style"
        centered
      >
        <Modal.Body className="p-0" >
          <div className="container-fluid p-0 ">
            <div className="row">
              <div className="signUpImg col-lg-5 col-12" style={{ height: 'inherit' }}>
                <img src="/images/sign_modal.jpg" className="img-fluid" />
              </div>
              <div className="col-lg-7 col-12 px-4">
                <Modal.Header closeButton>
                </Modal.Header>
                {verify ? (
                  <div>
                    <form className="mt-2 signup" onSubmit={otpSubmit}>
                      <div className="d-flex align-items-center mt-4 mb-3">
                        <img src="/icons/back.svg" className="img-fluid" onClick={() => {
                          setVerify(false);
                          setOtpdata([]);

                        }} />
                        <h6 className="font-14x mb-0 ms-3" id="secondry-text">OTP Number</h6>
                      </div>

                      <input
                        className="form-control me-2 input-box"
                        value={otp.otp}
                        type="number"
                        placeholder="Enter Mobile Number"
                        onChange={setOtpNumber}
                        name="otp"
                        maxLength="4"
                        style={errorOtp ? { border: "1px solid red" } : null}
                        required
                      />
                      <div className="d-flext justify-content-end text-end align-items-center" onClick={() => formSubmit()}>
                        <img src="/icons/reset.svg" />
                        <span className="ms-2 font-12x" id="secondry-text" >
                          Reset OTP
                        </span>
                      </div>
                      <p className="text-danger mt-3 mb-0">{error && `***${error}***`}</p>

                      <button
                        className="main-button mt-4"
                        style={{
                          width: "155px",
                          height: "42px",
                          borderRadius: "4",
                        }}
                      >
                        <p className="mb-0 font-12x text-center text-white">
                          CONTINUE
                        </p>
                      </button>
                    </form>

                  </div>
                ) : (
                  <div>
                    <h3 className="font-22x">Sign up or Sign in</h3>
                    <p className="font-14x fw-light" id="secondry-text">
                      Enjoy the convenience of a single account across all
                      participating brands.
                    </p>

                    <div className="mt-2 signup"
                    //  onSubmit={formSubmit}
                    >
                      <h6 className="font-14x mt-4">Mobile Number</h6>
                      <input
                        className="form-control me-2 input-box"
                        // type="number"
                        type="tel"
                        placeholder="Enter Mobile Number"
                        // value={mobile.phone}
                        // onChange={setPhoneNumber}
                        // name="phone"
                        maxLength="10"
                        name="phone"
                        value={phone}
                        onChange={onChangeHandler}
                      // value={formik.values.phone}
                      // onChange={formik.handleChange}
                      // onBlur={formik.handleBlur}
                      />
                      {
                        phone.length > 3 && valid == true ? <p className="text-success font-12x mb-0 "></p> :
                          valid == false ? <p className="text-danger font-12x mb-0 "><em >You've entered an invalid phone number.</em></p> : null
                      }

                        <button
                          className="main-button mt-3"
                          style={{
                            width: "155px",
                            height: "42px",
                            borderRadius: "4",
                          }}
                        >
                          <p className="mb-0 font-12x text-center text-white" onClick={formSubmit}>
                            CONTINUE
                          </p>
                        </button>

                    </div>
                    {/* <p className="font-12x fw-light mt-3">
                      By continuing you’re agreeing to our
                      <Link href="#">
                        <a>Terms and Conditions</a>
                      </Link>
                    </p> */}
                  </div>
                )}

                {otpData && otpData?.data?.otp}
                {/* {otpData && otpData?.message} */}
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default SignupModal;
