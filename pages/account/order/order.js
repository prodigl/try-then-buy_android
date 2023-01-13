import { useEffect, useState } from "react";
import Link from "next/link";
import { AuthValidation } from "providers/AuthContext";
import { useRouter } from "next/router";
import { config } from "config";
import axios from "helpers/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartVolume } from "providers/CartContext";
import Loader from "components/LoadingSpinner";
import { Header } from "components";
import Footer from "components/Footer";
import Back from 'components/BackButton';
import Dateformat from "components/Dateformat";



const order = () => {

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

  //Add default src for 404 image
  const addDefaultSrc = (e) => {
    e.target.src = "/images/error-product-image.png";
  };

  const countproduct = (data) => {
    const mainData = data.filter((filter)=> {
      return filter.status != "cancelled"
    })

    return mainData.length;
  }
  return (
    <>
      <Header />
      {
        isLoading ?
          <Loader />
          :
          <div>

            <div className="mobile">
              <div className="container-fluid profile-container-mobile mt-5">
                <div className="row pt-5">
                  <div className="col-12">
                    <div className="product-cartDetails">
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <Back />
                          <p className="mb-0 font-18x fw-bold ms-3">
                            Your Orders ({countproduct(order)})
                          </p>
                        </div>
                        {/* <div className="ms-3 filter-box">
                          <img src="/images/filter.svg" alt="" />
                          <p className="font-14x filterCss fw-light mb-0 ms-2">
                            Filters
                          </p>
                        </div> */}
                      </div>
                      <div className="my-3">
                        {/* <form className="d-flex w-100 input-box">
                          <button className="btn-search" type="submit">
                            <img src="/images/search.svg" alt="" />
                          </button>
                          <input
                            className="form-control body-search ps-0 me-2 shadow-none"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                          />
                        </form> */}
                      </div>
                      {isLoading ? (
                        <Loader />
                      ) : (
                        order?.map((order) => { 
                          return (
                            <>
                              {
                                order.status === "cancelled" ?
                                  <>
                                    <div className="row mt-4">
                                      {order?.order_products.map((product) => {
                                        return (
                                          <>
                                            <div className="col-12">
                                              <div className="d-flex mb-3">
                                                <Link href={`/product/${product?.slug}`}>
                                                <img
                                                  src={`${config.productbasepath}${product.photo}`}
                                                  className="mobileProductImage"
                                                  style={{filter: 'grayscale(100%)' }}
                                                  onError={addDefaultSrc}
                                                  />
                                                </Link>
                                                <div className="d-flex flex-column ms-3">
                                                  <p
                                                    className="mb-0 font-20x  text-secondary"
                                                  >
                                                    {product?.name.length <= 13
                                                      ? `${product?.name}`
                                                      : `${product?.name.substring(
                                                        0,
                                                        13
                                                      )}..`}
                                                  </p>
                                                  
                                                  <div className="d-flex justify-content-between ">
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

                                                  <div className="d-flex justify-content-start mt-2">
                                                    <p className="mb-0 font-16x fw-bold text-secondary">
                                                      {`₹ ${(order?.pay_amount).toLocaleString()}/-`}
                                                    </p>
                                                  </div>

                                                  <button className="rateReview mt-2  bg-secondary text-dark">
                                                    Product Canceled
                                                  </button>

                                                </div>
                                              </div>
                                            </div>
                                          </>
                                        );
                                      })}
                                      
                                    </div>
                                    <hr />
                                  </> : <>
                                    <div className="row mt-4">
                                      {order?.order_products.map((product) => {
                                        return (
                                          <>
                                            <div className="col-12">
                                              <div className="d-flex mb-3">
                                              <Link href={`/product/${product?.slug}`}>
                                                <img
                                                  src={`${config.productbasepath}${product.photo}`}
                                                  className="mobileProductImage"
                                                  onError={addDefaultSrc}
                                                />
                                                </Link>
                                                <div className="d-flex flex-column ms-3">
                                                  <p
                                                    title={product?.name}
                                                    className="mb-0 font-20x"
                                                  >
                                                    {product?.name.length <= 13
                                                      ? `${product?.name}`
                                                      : `${product?.name.substring(
                                                        0,
                                                        13
                                                      )}..`}
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
                                      <div className="col-6 mt-3">
                                        <div className="d-flex justify-content-start">
                                          <div>
                                            <div className="d-flex align-items-center pb-1">
                                              <p className="mb-0 font-12x fw-bold">
                                                Ordered on {" "}
                                                {
                                                  <Dateformat date={order?.updated_at} />
                                                }
                                              </p>
                                            </div>
                                            <button className="rateReview mt-2" onClick={() => {
                                              router.push(`/account/review/${order.id}`)
                                            }}>
                                              Rate & Review Product
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-6 pt-3 d-flex justify-content-end">
                                        <div>
                                          <div onClick={() => {
                                            router.push(`/account/order/${order.id}`)
                                          }}>
                                            <p
                                              className="mb-0 font-12x fw-bold"
                                              id="primery-color2"
                                              style={{ cursor: "pointer" }}
                                            >
                                              View Order Details
                                            </p>
                                          </div>
                                          <p className="mb-0 font-16x fw-bold mt-2 text-end">
                                            {`₹ ${(order?.pay_amount).toLocaleString()}/-`}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    <hr />
                                  </>
                              }
                            </>
                          );
                        })
                      )}

                      <p
                        className="mb-0 text-center mt-4 font-18x fw-bold"
                        id="secondry-text"
                      >
                        No more orders
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      }
      <Footer />
    </>
  );
};

export default order;
