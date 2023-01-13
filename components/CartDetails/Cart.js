import { useState, useEffect, memo } from "react";
import CouponModal from "components/couponModal";
import api from "helpers/api";
import { CartVolume } from "providers/CartContext";

const Cart = ({ cart, handleShow, show, handleClose, coupon, cartArray, localCartData, loyalty, updateLoyalty }) => {
  const [coupenData, setCouponData] = useState("");
  const [amnt, setAmnt] = useState(0);
  const { fetchCartData } = CartVolume();



  useEffect(() => {
    let value = 0;
    localCartData?.map((product) => {
      let v = parseFloat(product?.product?.price) * product.qty;
      value += parseInt(v);
    })
    setAmnt(value);
  }, [localCartData])



  useEffect(() => {
    const getcoupon = localStorage.getItem("coupon");
    if (getcoupon) {
      setCouponData(getcoupon);
    }
  }, [cart]);

  const removeCoupon = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const url = `remove-coupon/${id}`;
      if (token) {
        const res = await api.post(url, {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (res) {
          localStorage.removeItem("coupon");
          fetchCartData();
        }
      }
    } catch (error) {
      if (error?.response?.status == 401) {
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


  const total_amount = (amount) => {
    let amt = amount;
    let loyl = loyalty;
    if (loyl) {
      let tt = amt - loyl;
      return tt;
    } else {
      return amt;
    }

  }

  const gst_amount = (amount, tt) => {
   
    let amt = amount;
    let loyl = tt;
    let gst = amt - loyl;
    return gst;
  }
 
  return (
    <>
      <div className="d-flex justify-content-between">
        <p className="mb-0 font-14x fw-bold">Subtotal:</p>
        <p className="mb-0 font-14x fw-bold">

          {
            localCartData?.length ? `₹ ${amnt}` : (
              <>
                {`₹ ${Number(cart?.total_amount)?.toLocaleString()}`}
              </>)
          }


        </p>
      </div>
      {/* {
        !localCartData?.length ? <div className="d-flex justify-content-between mt-2">
          <p className="mb-0 font-14x fw-bold">
            GST :
          </p>
          <p className="mb-0 font-14x fw-bold">
            + ₹ {
              gst_amount(cart?.pay_amount, cart?.total_amount)
            }
          </p>
        </div> : null
      } */}


      {
        loyalty &&
          loyalty > 0 ?
          <div className="d-flex justify-content-between mt-2">
            <p className="mb-0 font-14x fw-bold" id="success-text">
              Loyalty Discount:
            </p>
            <div>

              <p className="mb-0 font-14x fw-bold text-end" id="success-text">
                - ₹
                {
                  loyalty
                }
              </p>
              <span className="d-block text-danger pointer font-12x remove-loyalty"
                onClick={() => { updateLoyalty(0) }}
              >Remove</span>
            </div>
          </div>
          :
          <div className="d-flex justify-content-between mt-2">
            <p className="mb-0 font-14x fw-bold" id="success-text">
              Retail Discount:
            </p>
            <p className="mb-0 font-14x fw-bold" id="success-text">
              - ₹0
            </p>
          </div>
      }


      <div className="d-flex justify-content-between mt-3">
        <p className="mb-0 font-14x fw-bold">Shipping Charges:</p>
        <p className="mb-0 font-14x fw-bold">FREE</p>
      </div>
      {cart?.coupon_code?.length ? (
        <div className="d-flex justify-content-between mt-2">
          <p className="mb-0 font-14x fw-bold">
            Coupon Discount (
            <span id="primary-color">
              {coupenData}
            </span>
            ) :
          </p>
          <p className="mb-0 font-14x fw-bold">
            {`- ₹${cart?.coupon_discount?.toLocaleString()}`}
          </p>
        </div>
      ) : null}

      <hr />
      <div className="d-flex justify-content-between align-items-center mt-2">
        <p className="mb-0 font-16x fw-bold">You Pay:</p>
        <div className="d-flex flex-column  justify-content-end">
          <p className="mb-0 font-18x fw-bold text-end" id="secondry-color">
            {
              localCartData?.length ? <>
                {`₹ ${amnt}`}
              </> : (
                <>
                  {`₹${total_amount(cart?.pay_amount).toLocaleString()}`}

                  <p className="mb-0 font-12x text-end" id="secondry-text">
                    (Inclusive of all Taxes)
                  </p>
                </>)
            }

          </p>

        </div>
      </div>
      <hr />

      {cart?.coupon_code?.length ? (
        <div className="coupen-field">
          <div className="d-flex justify-content-between">
            <p className="mb-0 font-12x" id="secondry-text">
              Coupon Applied
            </p>
            <a
              className="mb-0 font-12x fw-bold"
              style={{
                cursor: "pointer",
                color: "#EF1919",
              }}
              onClick={() => removeCoupon(cart.id)}
            >
              REMOVE
            </a>
          </div>
          <p className="font-22x fw-bold mb-1" id="success-text">
            {/* {coupon} */}
            {coupenData}
          </p>
          <p className="mb-0 font-12x" id="secondry-text">
            Get ₹1000 off on your first order above ₹1000.
          </p>
        </div>
      ) : cart?.order_products?.length ? (
        <button variant="primary" onClick={handleShow}>
          <div className="d-flex align-items-center mt-2">
            <img src="/images/discount.svg" alt="" />
            <p className="mb-0 font-14x fw-bold ms-2">
              Got a promo/voucher code?
            </p>
          </div>
        </button>
      ) : null}

      <CouponModal show={show} handleClose={handleClose} />
    </>
  );
};

export default memo(Cart);
