import { format } from "date-fns";
import Link from "next/link";
import Dateformat from "components/Dateformat";

const index = ({ order }) => {

  const total_discount = (amount, amout2) => {
    let amt = parseInt(amount);
    let loyl = parseInt(amout2);
    if (loyl) {
      let tt = parseInt(amt+loyl);
      return tt;
    } else {
      return amount;
    }

  }

  return (
    <>
      <div className="d-flex justify-content-between">
        <p className="mb-0 font-14x fw-bold">Order ID:</p>
        <p className="mb-0 font-14x fw-bold">{
          order?.razerpay_order_id ? order?.razerpay_order_id :
            order.ref_id}</p>
      </div>
      <div className="d-flex justify-content-between my-2">
        <p className="mb-0 font-14x fw-bold">Order Items:</p>
        <p className="mb-0 font-14x fw-bold">
          {/* {order?.order_products?.reduce((product) => {
            return product?.pivot?.qty;
          })} */}
          {
            order?.order_products?.length
          }
        </p>
      </div>
      <div className="d-flex justify-content-between my-2">
        <p className="mb-0 font-14x fw-bold">Ordered At:</p>
        <p className="mb-0 font-14x fw-bold">
          {/* {order?.updated_at ? format(new Date(order.updated_at), 'dd.MM.yyyy').toString() : null} */}

          { order?.updated_at ? <Dateformat date={order?.updated_at} />: ''}
        </p>
      </div>
      <div className="d-flex justify-content-between my-2">
        <p className="mb-0 font-14x fw-bold">Expected Delivery:</p>
        <p className="mb-0 font-14x fw-bold">
          {/* May 20th */}
        </p>
      </div>
      <div className="d-flex justify-content-between my-2">
        <p className="mb-0 font-14x fw-bold">Total Discount:</p>
        <p className="mb-0 font-14x fw-bold">₹
        {/* {order.loyalty_discount ?total_discount(order.loyalty_discount, order.coupon_discount) : '0'} */}
        {total_discount(order.loyalty_discount, order.coupon_discount)}
        </p>
      </div>
      <hr style={{ border: "2px solid #000", opacity: "1" }} />
      <div className="d-flex justify-content-start flex-column">
        <p className="mb-2 font-14x fw-bold" id="secondry-text">
          Shipping Address:
        </p>
        <p className="mb-0 font-14x fw-bold mt-1">
          {
            order?.address ? (`#${order?.address.street_address},${order?.address.address_line_1},${order?.address.address_line_2},${order?.address.city},(${order?.address.state.toUpperCase()})`) : null
          }
        </p>
      </div>

      <hr />
      <div className="d-flex justify-content-between align-items-center mt-2">
        <p className="mb-0 font-16x fw-bold">Amount Paid:</p>
        <div className="d-flex flex-column  justify-content-end">
          <p className="mb-0 font-18x fw-bold text-end" id="secondry-color">
            ₹{order?.pay_amount}
          </p>
          <p className="mb-0 font-12x text-end" id="secondry-text">
            (Paid using Debit Card)
          </p>
        </div>
      </div>
      <hr />
      <div className="d-flex justify-content-center align-items-center mt-2">
        <img src="/images/invoice.svg" />
        <div className="ms-3">
          <p className="mb-0 font-16x fw-bold" id="secondry-color">
            Download Invoice
          </p>
          {/* <p className="mb-0 font-12x" id="secondry-text">
            PDF - 100KB
          </p> */}
        </div>
      </div>

      <Link href={`/account/order/${order?.id}`}>
        <button
          className="add-to-cart-product mt-4"
          style={{ background: "#F15733" }}
        >
          VIEW ORDER
        </button>
      </Link>
    </>
  );
};

export default index;
