import { useEffect, useState } from "react";
import Sidebar from "components/Sidebar";
import { AuthValidation } from "providers/AuthContext";
import { useRouter } from "next/router";
import axios from "helpers/api";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartVolume } from "providers/CartContext";
import { Header } from "components";
import Footer from "components/Footer";
import Loader from "components/LoadingSpinner";
import Back from "components/BackButton"


const Order = () => {

  const router = useRouter();
  //contextapi data
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
  const [order, setOrder] = useState([]);

  const fetchOrderData = async () => {
    try {
      setIsLoading(true);
      if (token) {
        const url = `orders`;
        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res) {
          console.log("order", res.data.data);
          setOrder(res.data.data);
          setIsLoading(false);
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
    fetchOrderData();
  }, [token]);


  return (
    <>
      <Header />
      {
        isLoading ? <Loader />
          :
          <>

            <div className="mobile">
              <div className="container-fluid mt-5">
                <div className="row pt-5">
                  <div className="col-12">
                    <div className="product-cartDetails" >
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <Back />
                          <p className="font-18x fw-bold mb-0 ms-2">Loyality Points</p>
                        </div>
                        <p className="font-22x fw-bold mb-0" id="success-text"> ₹{user?.wallet?.balance}</p>
                      </div>


                      {/* ₹{user?.wallet?.balance} */}
                    {/* </p> */}
                    <p className="font-18x fw-bold mb-0 mt-4">History</p>
                    {
                      order ? order.map((order) => {

                        return (
                          <>
                            {
                              order?.loyalty_point_earned > 0 ?
                                <>
                                  <div className="d-flex justify-content-between align-items-center mt-3">
                                    <p className="font-14x  mb-0">Order #{order?.razerpay_order_id}</p>
                                    <p
                                      className="font-14x fw-bold  text-end mb-0"
                                      id="success-text"
                                    >
                                      +{order.loyalty_point_earned}
                                    </p>
                                  </div>
                                  <hr />
                                </>
                                : null
                            }
                            {
                              order?.loyalty_discount > 0 ?
                                <>
                                  <div className="d-flex justify-content-between align-items-center mt-3">
                                    <p className="font-14x  mb-0">Order #{order?.razerpay_order_id}</p>
                                    <p
                                      className="font-14x fw-bold  text-end mb-0 text-danger"
                                    >
                                      -{order.loyalty_discount}
                                    </p>
                                  </div>
                                  <hr />
                                </>
                                : null
                            }

                          </>
                        )
                      }) : null
                    }


                    <p className="font-18x fw-bold mb-0 mt-5">Terms & Conditions</p>
                    <div className="terms-condition">
                      <ul>
                        <li className="font-12x mb-2" id="gray-text">
                          If the order value exceeds the Gift Card amount, the
                          balance must be paid by Credit Card/Debit Card/Internet
                          Banking. The Cash on Delivery payment option cannot be
                          used to pay the balance amount.
                        </li>
                        <li className="font-12x mb-2" id="gray-text">
                          If the order value exceeds the Gift Card amount, the
                          balance must be paid by Credit Card/Debit Card/Internet
                          Banking. The Cash on Delivery payment option cannot be
                          used to pay the balance amount.
                        </li>

                        <li className="font-12x mb-2" id="gray-text">
                          If the order value exceeds the Gift Card amount, the
                          balance must be paid by Credit Card/Debit Card/Internet
                          Banking. The Cash on Delivery payment option cannot be
                          used to pay the balance amount.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </>
      }

<Footer />
    </>
  );
};

export default Order;
