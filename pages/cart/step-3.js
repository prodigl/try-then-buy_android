import { useEffect, useState } from "react";
import { AuthValidation } from "providers/AuthContext";
import Loader from "components/LoadingSpinner";
import OrderDetails from "components/OrderDetails";
import { useRouter } from "next/router";
import CartFooter from "components/cart-footer";
import { config } from "config";
import Link from "next/link";




const Step = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [order, serOrder] = useState("");
  const { token } = AuthValidation();
  const router = useRouter();
  const [owner, setOwner] = useState('');
  const cartPurchased = localStorage.getItem("cart");


  useEffect(() => {
    if (!cartPurchased) {
      history.back();
    }
  }, [cartPurchased])


  const fetchOrderItem = () => {
    setIsLoading(true);
    try {
      if (token) {
        const data = JSON.parse(cartPurchased);
        if (data) {
          serOrder(data);
          setIsLoading(false);
        }
      } else {
        localStorage.removeItem("cart");
        router.push('/')
      }

    } catch (e) {
      console.log(e);
    }
  };


  useEffect(() => {
    fetchOrderItem();
    const user = JSON.parse(localStorage.getItem("configration"));
    setOwner(user);
  }, []);


  const addDefaultSrc = (e) => {
    e.target.src = "/images/error-product-image.png";
  };

  const percentageDeal = (actualP, preciousP) => {
    let c = Math.round(preciousP);
    let d = Math.round(actualP);
    let e = c - d;
    let p = e / c;
    let per = Math.round(p * 100);
    return per;
  };

  return (
    <>

      {/* mobile view */}
      <div className="mobile mt-0">
        {/* <Header /> */}
        <div className="container-fluid my-3" >
          <div className="d-flex justify-content-between">
            <Link href="/">
              <img src="/images/brand-logo.svg" />
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
                (+91) 70180 64278
              </p>
            </div>
          </div>
        </div>

        <div className="container-fluid mt-4 px-0">
          <div className="payment-status">
            <div className="summery">
              <img src="/images/cart-summary.svg" />
              <p className="mb-0 font-11x fw-bold ms-2">Summary</p>
            </div>
            <div className="delivery ms-4">
              <img src="/images/cart-delivary2.svg" />
              <p className="mb-0 font-11x fw-bold ms-2">Delivery & Payment</p>
            </div>
          </div>
        </div>

        {/* ********Top breadcrumb section**********  */}
        <div className="container-fluid mt-4 ">
          <nav >
            <ol className="breadcrumb mb-2">
              <li className="breadcrumb-item">
                <Link href="/">
                <a >HOME</a>
                </Link>
              </li>
              <li className="breadcrumb-item">
                <a href="#" id="primary-color">
                  CART
                </a>
              </li>
            </ol>
          </nav>
        </div>

        <div className="container-fluid mt-5">
          <div className="d-flex justify-content-between align-items-center">
            <img src="/icons/shopping-cart.gif"style={{
              width :'100px'
            }} />
            <Link href="/">
              <button
                className="add-to-cart-product mt-4"
                style={{ background: "#F15733", width: "191px" }}
              >
                BACK TO SHOPPING
              </button>
            </Link>
          </div>
          <h1 className="font-26x mt-4 mb-0">
            Your order has been placed successfully
          </h1>
          <p className="font-16x pb-3 mt-3" id="secondry-text">
            Thank you for choosing try then buy. Your order will soon be
            dispatched.
          </p>
          <div className="product-cartDetails mt-3 ">
            {order?.order_products?.map((product) => {
              return (
                <>
                  <div className="d-flex py-3">
                    <Link href={`/product/${product?.slug}`}>
                    <img
                      src={`${config.productbasepath}${product.photo}`}
                      onError={addDefaultSrc}
                      className="mobileProductImage"
                    />
                    </Link>
                    <div className="d-flex flex-column ms-3">
                      <p title={product?.name} className="mb-0 font-20x">
                        {product?.name.length <= 14
                          ? `${product?.name}`
                          : `${product?.name.substring(0, 13)}...`}
                      </p>
                      <div className="d-flex align-items-center mt-2">
                        <p
                          className="font-12x fw-bold  mb-0"
                          style={{ color: "#999" }}
                        >
                          <del>
                            {`₹ ${parseInt(product?.previous_price).toLocaleString()}/-`}
                          </del>
                        </p>
                        <div className="saving-money ms-1">
                          <p
                            className="font-10x mb-0 fw-bold"
                            id="secondry-color"
                          >
                            Saving {percentageDeal(parseInt(product.previous_price), parseInt(product.price))}%
                          </p>
                        </div>
                      </div>
                      <p
                        className="font-14x fw-bold  mb-0 mt-1"
                        id="primary-color"
                      >
                        {`₹ ${parseInt(product?.price).toLocaleString()}/-`}
                      </p>

                      <div className="d-flex justify-content-between">
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
            })}
          </div>

          <div className="product-cartDetails mt-5">
            <OrderDetails order={order} />
          </div>
        </div>

        {/* *******Footer div ***** */}
        <CartFooter lWidth="47px" sWidth="74px" line="45px" />
      </div>
    </>
  );
};

export default Step;
