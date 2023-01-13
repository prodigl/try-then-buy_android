import { useEffect, useState } from "react";
import Sidebar from "components/Sidebar";
import Link from "next/link";
import { AuthValidation } from "providers/AuthContext";
import { useRouter } from "next/router";
import { config } from "config";
import axios from "helpers/api";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartVolume } from "providers/CartContext";
import { Header } from "components";
import Footer from "components/Footer";
import Loader from "components/LoadingSpinner";
import Back from "components/BackButton";

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
                isLoading ? <Loader /> :
                    <>

                        <div className="mobile">
                            <div className="container-fluid mt-5">
                                <div className="row pt-5 mx-0">
                                    <div className="product-cartDetails">
                                        <div className="d-flex align-items-center">
                                            <Back />
                                            <p className="font-18x fw-bold ms-2 mb-0">Transactions</p>
                                        </div>
                                        {
                                            order.length ?
                                                order.map((order) => {
                                                    return (
                                                        <>
                                                            {
                                                                order?.transaction &&

                                                                <div>
                                                                    <div className="row pt-3">
                                                                        <div className="col-6">
                                                                            <p className="font-14x  mb-0">Order #{order?.transaction?.razerpay_order_id}</p>
                                                                        </div>

                                                                        <div className="col-6">
                                                                            <p className="font-16x fw-bold  text-end mb-0" id='success-text'>₹{order?.transaction?.paid_amount}</p>
                                                                        </div>
                                                                    </div>
                                                                    <hr />
                                                                </div>

                                                            }
                                                        </>
                                                    )



                                                })

                                                : "No Transactions Available...!"
                                        }
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
