import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import api from "helpers/api";
import { CartVolume } from "providers/CartContext";
import { AuthValidation } from "providers/AuthContext";

const coupon = ({ show, handleClose }) => {
  //Cart context
  const { cart, fetchCartData, updateCoupon, updateCartItem } = CartVolume();

  //user and token context
  const { token } = AuthValidation();

  const [couponCart, setCoupon] = useState("");

  const fetchCoupon = async () => {
    try {
      const url = `coupons`;
      const res = await api.get(url);
      // console.log(res.data);
      setCoupon(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCoupon();
  }, [show]);

  const applyCoupon = async (couponId, couponCode) => {
    let url = `apply-coupon/${cart.id}`;
    try {
      const res = await api.post(
        url,
        {
          coupon_id: couponId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("coupon", res.data.data.coupon.code);
      localStorage.setItem("coupon", res.data.data.coupon.code);

      if (res) {
        fetchCartData();
        handleClose();
        setCoupon("");
        updateCoupon(couponCode);
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        toast.error("Login Session has Expired!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
    
        userLogout();
        updateCartItem("");
      }
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="coupon-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Select Coupon</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {couponCart?.data?.length
            ? couponCart?.data?.map((coupon) => {
                return (
                  <>
                    <div className="container mb-3">
                      <div className="row">
                        <div className="col-4 col-md-3 mb-3 mb-sm-0">
                          <div className="coupen-offer">{coupon?.code}</div>
                        </div>
                        <div className="col-4 col-md-6 mb-3 mb-sm-0">
                          <p
                            className="font-14x mb-0"
                            style={{ color: "#7E8F9A" }}
                          >
                            Get 20% Off only if you are new user.
                          </p>
                          <p className="font-12x mb-0" id="primary-color">
                            More.
                          </p>
                        </div>
                        <div className="col-4 col-md-3 pb-3 pb-sm-0">
                          <div
                            className="apply-coupon"
                            onClick={() => applyCoupon(coupon.id, coupon?.code)}
                            style={{
                              cursor: "pointer",
                            }}
                          >
                            APPLY COUPON
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })
            : <p className="text-center">No Coupon is available Now!</p>
            }
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default coupon;
