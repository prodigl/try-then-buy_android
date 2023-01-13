import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import axios from "helpers/api";
import { AuthValidation } from "providers/AuthContext";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
const index = ({
  show,
  handleClose,
  cancelOrderFinal,
  slug,
  orderDetail,
  setOrderdetail,
}) => {
  const [reason, setReason] = useState("");
  const { token } = AuthValidation();
  const router = useRouter();

  const checkReason = (e) => {
    setReason(e.target.value);
    console.log(reason);
  };

  const cancelOrder = async () => {
    try {
      if (reason) {
        const url = `order-cancel/${slug}`;
        const res = await axios.post(
          url,
          { reason },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res) {
          handleClose();
          setOrderdetail("");
          router.push(`/account/order`);
        }
      } else {
        // handleClose();
        toast.error('Select Reason from Cancel product!', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} className="cancel_order">
        <Modal.Header closeButton>
          <Modal.Title>Cancel Order #{orderDetail.order_number}</Modal.Title>
        </Modal.Header>
        <Modal.Body onHide={handleClose}>
          <p>
            Please let us know the reason for this cancellation. This will help
            us to improve our service
          </p>
          <div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="reason"
                value="Wrong Address"
                onClick={checkReason}
              />
              <label className="form-check-label">Wrong Address</label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="reason"
                value="Delivery date is too late"
                onClick={checkReason}
              />
              <label className="form-check-label">
                Delivery date is too late
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="reason"
                value="Delayed order"
                onClick={checkReason}
              />
              <label className="form-check-label">Delayed order</label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="reason"
                value="Order no longer required"
                onClick={checkReason}
              />
              <label className="form-check-label">
                Order no longer required
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="reason"
                value=" Wrong product size"
                onClick={checkReason}
              />
              <label className="form-check-label">Wrong product size</label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="reason"
                value="Other Reason"
                onClick={checkReason}
              />
              <label className="form-check-label">Other Reason</label>
            </div>

            <div className="my-3">
              <textarea
                className="form-control"
                placeholder="Enter Your Reason Here"
                rows="3"
                onChange={checkReason}
              ></textarea>
            </div>

            <div className="container">
              <div className="row">
                <div className="col-12 col-md-8">
                  <div className="row">
                    <div className="col-md-2 pe-0 col-2">
                      <p>Note :</p>
                    </div>
                    <div className="col-md-10 col-10">
                      <p>
                        Refunds may take up to 5 - 7 business days to reflect on
                        your account .
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <button className="cancel-order" onClick={cancelOrder}>
                    Cancel Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default index;
