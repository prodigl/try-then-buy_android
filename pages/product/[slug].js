import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Product from "../../components/Product";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { config } from "config";
import ReviewModal from "../../components/ReviewModal";
import Breadcrumb from "../../components/Breadcum";
import axios from "helpers/api";
import { AuthValidation } from "providers/AuthContext";
import { CartVolume } from "providers/CartContext";
import Compare from "assets/vectors/Compare";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductSlider from "components/Product-slider";
import SimilarProduct from "components/similarProduct";
import ProductFullDetails from "components/ProductFullDetails";
import ProductMobileDetails from "components/ProductFullDetails/ProductMobile";
import renderHTML from "../../helpers/renderHTML";
import NewsLetter from "components/NewsLetter";
import Loader from "components/LoadingSpinner";
import Productinfo from "components/Productinfo";
import { Header } from "components";
import Footer from "components/Footer";
import ProductdetailsMobile from "components/Productinfo/mobileView";
import Signup from "components/Signupmodal";
import Rating from "react-rating";
import PositionIssue from "components/PositionIssue";
import Login from "components/LoginComp";
import { Product as Skeleton } from "components/Skelten";
import { Share } from "@capacitor/share";
import {MiscellaneousProvider} from "providers/Miscellaneous";

const Products = () => {
  const router = useRouter();
  // console.log('router',router.asPath);

  const slug = router.query.slug;
  //Auth  context
  const { token, userLogout, updateToken, updateUser } = AuthValidation();
  //Cart context
  const {
    cart,
    fetchCartData,
    updateCompare,
    compare,
    fetchCompare,
    localCartData,
    updateLocalCartData,
    updateCartItem,
    fetchWishlist,
    updateWishlist,
  } = CartVolume();

  const {isLogged, activeLogged, deActiveLogged, setLogged} = MiscellaneousProvider();  

  const [data, setData] = useState();
  const [user, setUser] = useState();
  const [loginBar, setLoginBar] = useState(false);
  const [available, setAvailable] = useState();
  const [message, setMessage] = useState();
  //product review modal state
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isDescription, setDescription] = useState("");

  //updating the product value if user's wishlist keeps;
  const getLatestProductDetail = async () => {
    if (token) {
      const url = `product/${slug}`;
      try {
        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const datamain = res.data;
        setData(datamain);
      } catch (e) {
        console.log(e);
      }
    } else {
      const url = `product/${slug}`;
      try {
        const res = await axios.get(url);
        const datamain = res.data;
        setData(datamain);
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    getLatestProductDetail();
  }, [token]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [data]);

  useEffect(async () => {
    const url2 = `product-reviews/${slug}`;
    const ress = await axios.get(url2);
    const user = ress.data;
    setUser(user);
  }, [token]);

  //Remove Product from  Wishlist functionality
  const addToWish = async (id) => {
    const url = `${config.apiUrl}add-to-wishlist/${id}`;
    // alert(id);
    try {
      if (token) {
        const res = await axios.post(
          url,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res) {
          fetchWishlist();
          if (res.data.message === "added to wishlist") {
            getLatestProductDetail();
            toast(`❤️ Product is Added to wishlist!`, {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          } else {
            getLatestProductDetail();
            toast("💔 Product is removed to wishlist!", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        }
      } else {
        // cartShow();
        loginBarUpdate();
      }
    } catch (error) {
      if (error.response.status == 401) {
        userLogout();
        updateCartItem("");
        updateWishlist("");

        toast.error("Session Expired..!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    }
  };

  const [optionCart, setOption] = useState({
    qty: "1",
    color: "",
    size: "",
  });

  //Getting size of the product
  const setSize = (size) => {
    setOption({
      ...optionCart,
      size: size,
      color: "",
    });
  };

  //Getting color of the product
  const addColor = (col) => {
    setOption({
      ...optionCart,
      color: col,
    });
  };

  //Getting qty of the product
  const setQty = (qty) => {
    setOption({
      ...optionCart,
      qty,
    });
  };

  //Add to cart Functionality
  const addToCart = async (id, slug) => {
    try {
      //If token Or User Login
      if (token) {
        const url = `addProductToCart/${cart.id}`;
        const res = await axios.post(
          url,
          {
            product_id: id,
            color: optionCart?.color,
            size: optionCart?.size,
            qty: optionCart?.qty ? optionCart.qty : "1",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        //if responce is successfull
        if (res.status === 200) {
          fetchCartData();

          setOption({
            ...optionCart,
            qty: 1,
            color: "",
          });
          toast("💼 Product is added in your Cart!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      } else {
        //if user isn't logged in or no token found

        if (localCartData.length) {
          //if product is already in the cart
          const cartMain = localCartData.filter((cart) => {
            return cart.id === id;
          });

          if (cartMain.length) {
            toast.warn("Product is already in the cart!", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else {
            //if similarProduct is not found in the cart

            try {
              const responce = await axios.get(`product/${slug}`);
              if (responce) {
                updateLocalCartData([
                  ...localCartData,
                  {
                    id: id,
                    slug: slug,
                    color: optionCart.color,
                    size: optionCart.size,
                    qty: optionCart?.qty ? optionCart.qty : "1",
                    product: responce.data.data,
                  },
                ]);

                setOption({
                  ...optionCart,
                  qty: 1,
                  color: "",
                });
                toast("💼 Product is added in your Cart!", {
                  position: "top-center",
                  autoClose: 2000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
              }
            } catch (e) {
              console.log(e);
            }
          }
        } else {
          //First Item cart added
          try {
            const responce = await axios.get(`product/${slug}`);
            if (responce) {
              updateLocalCartData([
                ...localCartData,
                {
                  id: id,
                  slug: slug,
                  color: optionCart.color,
                  size: optionCart.size,
                  qty: optionCart?.qty ? optionCart.qty : "1",
                  product: responce.data.data,
                },
              ]);
              toast("💼 Product is added in your Cart!", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            }
          } catch (e) {
            console.log(e);
          }
        }
      }
    } catch (err) {
      console.log(err?.response);
      if (err?.response?.status === 401) {
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
        updateWishlist("");
      }
    }
  };

  const buyNow = async (id, slug) => {
    try {
      //If token Or User Login
      if (token) {
        if (optionCart.color !== undefined && optionCart.size !== undefined) {
          const url = `addProductToCart/${cart.id}`;
          const res = await axios.post(
            url,
            {
              product_id: id,
              color: optionCart.color,
              size: optionCart.size,
              qty: optionCart?.qty ? optionCart.qty : "1",
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          //if responce is successfull
          if (res.status === 200) {
            fetchCartData();
            setOption({
              qty: 1,
              color: "",
              size: "",
            });
            toast.success("Product is added in your Cart!", {
              position: "top-center",
              autoClose: 4000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            router.push("/cart");
          }
        } else {
          toast.error("Please select Size & Color!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } else {
        //if user isn't logged in or no token found
        if (optionCart.color !== undefined && optionCart.size !== undefined) {
          if (localCartData.length) {
            //if product is already in the cart
            const cartMain = localCartData.filter((cart) => {
              return cart.id === id;
            });

            if (cartMain.length) {
              toast.warn("Product is already in the cart!", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            } else {
              //if similarProduct is not found in the cart
              try {
                const responce = await axios.get(`product/${slug}`);
                if (responce) {
                  updateLocalCartData([
                    ...localCartData,
                    {
                      id: id,
                      slug: slug,
                      color: optionCart.color,
                      size: optionCart.size,
                      qty: optionCart?.qty ? optionCart.qty : "1",
                      product: responce.data.data,
                    },
                  ]);
                  toast.success("Product is added in your Cart!", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                }
                router.push("/cart");
              } catch (e) {
                console.log(e);
              }
            }
          } else {
            //First Item cart added
            try {
              const responce = await axios.get(`product/${slug}`);
              if (responce) {
                updateLocalCartData([
                  ...localCartData,
                  {
                    id: id,
                    slug: slug,
                    color: optionCart.color,
                    size: optionCart.size,
                    qty: optionCart?.qty ? optionCart.qty : "1",
                    product: responce.data.data,
                  },
                ]);
                toast.success("Product is added in your Cart!", {
                  position: "top-center",
                  autoClose: 2000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
                router.push("/cart");
              }
            } catch (e) {
              console.log(e);
            }
          }
        } else {
          toast.error("Please select Size & Color!", {
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
    } catch (err) {
      if (err?.response?.status === 401) {
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
        updateWishlist("");
      }
    }
  };

  //Adding product for compare
  const addToCompare = async (id) => {
    let arr = [id];
    let compareId = JSON.parse(localStorage.getItem("compare"));

    if (compareId) {
      compareId.map((id) => {
        arr.push(id.id);
      });
    }

    try {
      if (arr.length <= 3) {
        const url = `product-compare`;
        let formData = new FormData();
        arr.forEach((item) => formData.append("id[]", item));
        console.log("formData", formData);
        const res = await axios.post(url, formData);

        if (res) {
          localStorage.setItem("compare", JSON.stringify(res.data.data));
          updateCompare(res.data.data);
          fetchCompare();
        }
      } else {
        alert("Campare Items exceeds limit..!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const checkAvailibity = (e) => {
    const avail = e.target.value.replace(/\D/g, "");
    setAvailable(avail);
  };

  const checkAvailibityProduct = async (id) => {
    try {
      if (available.length === 6) {
        const url = `check-availbility?delivery_postcode=${available}&product_id=${id}`;
        const res = await axios.get(url);
        if (res) {
          console.log(res.data);
          setMessage(res.data);
          setAvailable("");
        }
      } else {
        // const msg = 'Must be 6 digits';
        setMessage({
          message: "'Must be 6 digits",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage();
    }, 5000);
    return () => clearTimeout(timer);
  }, [message]);

  const percentageDeal = (actualP, preciousP) => {
    let c = Math.round(preciousP);
    let d = Math.round(actualP);
    let e = c - d;
    let p = e / c;
    let per = Math.round(p * 100);
    return per;
  };

  //Shorting Duplication size from array//
  const sortingDuplicate = (product) => {
    let i = [...new Set(product?.map((size) => size.size))];
    return i;
  };

  //Shorting Duplication color from array//
  const sortingDuplicateColor = (product) => {
    let i = [...new Set(product?.map((color) => color.color))];
    return i;
  };

  //Set first size for pre select....
  useEffect(() => {
    setOption({
      ...optionCart,
      size: sortingDuplicate(data?.data?.product_variations)[0],
      color: sortingDuplicateColor(data?.data?.product_variations)[0],
    });
  }, [data?.data?.product_variations]);

  const showCurrentDescription = (data) => {
    if (data) {
      setDescription(data);
    }
  };

  const ratingSequence = ["5", "4", "3", "2", "1"];

  const ratingCount = (value, rating) => {
    const rate = value.filter((value) => value.rating == rating);
    return rate.length;
  };

  const ratingPercentage = (value, rating) => {
    const rate = value.filter((value) => value.rating == rating);
    const percent = (rate.length / value.length) * 100;
    return percent;
  };

  const loginBarUpdate = () => {
    // setLoginBar(true);
    activeLogged();
  };

  const share = async () => {
    await Share.share({
      title: "See cool stuff",
      text: "Really awesome thing you need to see right meow",
      url: "http://ionicframework.com/",
      dialogTitle: "Share with buddies",
    });
  };

  return (
    <>
      <Header />
      <PositionIssue>
        {data ? (
          <>
            <div className="mobile">
              <div className="container-fluid pt-3 mt-3">
                <div className="row">
                  <div className="col-12">
                    <Breadcrumb
                      category={data?.data?.category}
                      subCategory={data?.data?.subcategory}
                      childcategory={data?.data?.childcategory}
                      productName={data?.data?.name}
                    />
                  </div>

                  <div className="col-12 mb-4">
                    <div style={{ position: "relative" }}>
                      <ProductSlider
                        product={data?.data?.galleries}
                        data={data.data}
                      />
                      <span className="wishlist-product">
                        {token ? (
                          data?.data?.wishlists?.length ? (
                            <img
                              src="/icons/client/heart-main-liked.svg"
                              alt="red-heart"
                              height={18}
                              width={20}
                              className="wishisht-product-icon pointer"
                              onClick={() => {
                                addToWish(data?.data?.id);
                              }}
                            />
                          ) : (
                            <img
                              src="/icons/client/heart.svg"
                              className="wishisht-product-icon pointer"
                              onClick={() => {
                                addToWish(data?.data?.id);
                              }}
                            />
                          )
                        ) : (
                          <img
                            src="/icons/client/heart.svg"
                            className="wishisht-product-icon pointer"
                            onClick={() => {
                              addToWish(data?.data?.id);
                            }}
                          />
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="row px-0 mx-0 product-add-subject">
                    <div className="col-6 px-0">
                      <button
                        className="w-100"
                        onClick={() =>
                          addToCart(data?.data?.id, data?.data?.slug)
                        }
                      >
                        <div className="add-to-cart">
                          <img
                            src="/images/white-icon-cart.svg"
                            alt="cart"
                            className=""
                          />
                          <p className="font-16x mb-0 ms-1 text-white">
                            ADD TO CART
                          </p>
                        </div>
                      </button>
                    </div>
                    <div className="col-6 px-0">
                      <button
                        className="w-100"
                        onClick={() => buyNow(data?.data?.id, data?.data?.slug)}
                      >
                        <div className="buy-now">
                          <img src="/images/buy-logo.svg" className="" />
                          <p className="font-16x mb-0 ms-1 text-white">
                            BUY NOW
                          </p>
                        </div>
                      </button>
                    </div>
                  </div>

                  <div className="row mt-0 mx-0 ">
                    <div
                      className="col-6 d-flex justify-content-start pointer"
                      // onClick={() => addToCompare(data?.data?.id)}
                    >
                      <Compare width="17px" height="14px" />
                      <span className="font-12x fw-bolder ms-2">
                        Add to Compare
                      </span>
                    </div>
                    {/* <RWebShare
                                            data={{
                                                text: `${data?.data?.name}`,
                                                url: `/product/${data?.data?.slug}`,
                                                // title: 'Try then buy',
                                            }}
                                            onClick={() =>
                                                console.log(
                                                    'shared successfully!'
                                                )
                                            }>
                                            <div className="col-6 pointer d-flex justify-content-end">
                                                <img
                                                    src="/images/share.svg"
                                                    alt=""
                                                    width="17px"
                                                    height="14px"
                                                />
                                                <span className="font-12x fw-bolder ms-2">
                                                    Share
                                                </span>
                                            </div>
                                        </RWebShare> */}
                    <div
                      className="col-6 pointer d-flex justify-content-end"
                      // onClick={share}
                      onClick={async () => {
                        await Share.share({
                          title: "",
                          text: `${data?.data?.name}`,
                          url: `https://trythenbuy.in/${router.asPath}`,
                          dialogTitle: "Share with buddies",
                        });
                      }}
                    >
                      <img
                        src="/images/share.svg"
                        alt=""
                        width="17px"
                        height="14px"
                      />
                      <span className="font-12x fw-bolder ms-2">Share</span>
                    </div>
                  </div>

                  <div className="container-fluid ">
                    <div className="row mt-4">
                      <div className="col-12">
                        <h1 className="font-22x fw-bold">{data?.data?.name}</h1>
                        <div className="d-flex align-items-center">
                          <div className="d-flex me-2">
                            <Rating
                              placeholderRating={parseFloat(
                                data?.data?.avg_rating[0]?.rating
                              ).toFixed(1)}
                              emptySymbol={
                                <img
                                  src="/images/blank-star.svg"
                                  className="icon"
                                  width="16px"
                                  height="14px"
                                />
                              }
                              placeholderSymbol={
                                <img src="/images/star.svg" className="icon" />
                              }
                              fullSymbol={
                                <img src="/images/star.svg" className="icon" />
                              }
                              readonly
                            />
                          </div>
                          <span className="font-12x" id="secondry-text">
                            {data?.data?.avg_rating[0]?.total
                              ? `(${data?.data?.avg_rating[0]?.total} Reviews)`
                              : "(0 Reviews)"}
                          </span>
                        </div>
                        <div
                          className="discount-section mt-4"
                          style={{ width: "100%" }}
                        >
                          <p className="mb-0 font-20x" id="secondry-text">
                            <del>
                              {`₹${parseInt(
                                data?.data?.previous_price
                              ).toLocaleString()}/-`}
                            </del>
                          </p>
                          <p className="mb-0 font-30x ms-2" id="primary-color">
                            {`₹${parseInt(
                              data?.data?.price
                            ).toLocaleString()}/-`}
                          </p>
                        </div>
                        <div className="d-flex flex-column fs-4">
                          <p
                            className="mb-0 font-14x fw-light mt-3"
                            id="secondry-text"
                          >
                            Total Savings:
                            <span id="secondry-color" className="ms-2 fw-bold">
                              {`₹${parseInt(
                                data?.data?.previous_price - data?.data?.price
                              ).toLocaleString()}`}{" "}
                              (
                              {percentageDeal(
                                parseInt(data?.data?.price),
                                parseInt(data?.data?.previous_price)
                              )}
                              %)
                            </span>{" "}
                          </p>
                          <p className="mb-0 font-12x" id="secondry-text">
                            (Inclusive of all Taxes)
                          </p>
                        </div>

                        <p className="mt-4 font-16x product-details-para">
                          {data?.data?.details.length
                            ? renderHTML(data?.data?.details)
                            : ""}
                          {/* {data?.data?.details} */}
                          <a
                            id="secondry-color"
                            className="font-14x text-decoration-none fw-bold"
                          >
                            More Details
                          </a>
                        </p>
                      </div>
                    </div>

                    <ProductdetailsMobile
                      details={data?.data?.product_attributes}
                    />

                    <div>
                      <p
                        className="mb-0 font-16x"
                        id="secondry-text"
                        style={{ fontWeight: 500 }}
                      >
                        Size
                      </p>
                      <div className="d-flex mt-3">
                        {sortingDuplicate(data?.data?.product_variations).map(
                          (size) => {
                            return (
                              <>
                                <button
                                  className="d-flex flex-column justify-content-center align-items-center selected_box me-4"
                                  key={size}
                                  onClick={() => setSize(size)}
                                >
                                  <div
                                    className={`d-flex flex-column justify-content-center align-items-center ${
                                      optionCart.size === size
                                        ? "fabric-box-select"
                                        : "fabric-box "
                                    }`}
                                  >
                                    <p
                                      className={`font-14x mb-0 text-center fw-light"
                                                                        id="secondry-text"
                                                                    ${
                                                                      optionCart.size ===
                                                                      size
                                                                        ? "text-white"
                                                                        : 'id="secondry-text"'
                                                                    }`}
                                    >
                                      {size}
                                    </p>
                                  </div>
                                </button>
                              </>
                            );
                          }
                        )}
                      </div>
                      {optionCart?.size && (
                        <>
                          <p
                            className="mb-0 font-16x mt-3"
                            id="secondry-text"
                            style={{
                              fontWeight: 500,
                            }}
                          >
                            Color
                          </p>
                          <div className="d-flex mt-3">
                            {data?.data?.product_variations.length
                              ? data?.data?.product_variations?.map((color) => {
                                  return (
                                    <>
                                      {color?.size === optionCart?.size && (
                                        <>
                                          <button
                                            className="d-flex flex-column justify-content-center align-items-center me-4 selected_box"
                                            key={color}
                                            onClick={() =>
                                              addColor(color.color)
                                            }
                                          >
                                            <div
                                              className={`rounded ${
                                                optionCart.color ===
                                                  color.color &&
                                                "select-color-button"
                                              }`}
                                              style={{
                                                backgroundColor: color.color,
                                                padding: "30px",
                                                height: "65px",
                                              }}
                                            ></div>
                                            <p
                                              className="font-14x mb-0 text-center fw-light"
                                              id="secondry-text"
                                            >
                                              {/* {color?.color} */}
                                            </p>
                                          </button>
                                        </>
                                      )}
                                    </>
                                  );
                                })
                              : "No color"}
                          </div>
                        </>
                      )}
                      <p
                        className="mb-0 font-16x mt-3"
                        id="secondry-text"
                        style={{ fontWeight: 500 }}
                      >
                        Quantity
                      </p>
                      <select
                        className="form-select cust-selectbox mt-3"
                        onChange={({ target: { value } }) => setQty(value)}
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>

                      <hr className="mt-4" />

                      <p
                        className="mb-0 font-16x"
                        id="secondry-text"
                        style={{ fontWeight: 500 }}
                      >
                        Delivery
                      </p>

                      <div
                        className="check-availablity  mt-3"
                        style={{ width: "100%" }}
                      >
                        <input
                          type="tel"
                          className="form-control shadow-none"
                          placeholder="Pincode"
                          name="pincode"
                          maxLength="6"
                          minLength="6"
                          onChange={checkAvailibity}
                          value={available}
                        />

                        <p
                          className="mb-0 font-14x me-3 fw-bold"
                          id="secondry-color"
                          style={{
                            cursor: "pointer",
                          }}
                          onClick={() => checkAvailibityProduct(data?.data?.id)}
                        >
                          CHECK AVAILABILITY
                        </p>
                      </div>

                      {message && (
                        <p className="mb-0 mt-2 font-14x  text-danger text-uppercase font-italic">
                          `{message.message}`
                        </p>
                      )}
                      <p
                        className="font-12x mb-0 mt-2"
                        id="secondry-text"
                        style={{ lineHeight: "16px" }}
                      >
                        Enter pincode to get Delivery Date, Assembly Information{" "}
                        <br />
                        and other details.{" "}
                      </p>

                      <hr className="mt-4" />

                      <p
                        className="mb-0 font-16x"
                        id="secondry-text"
                        style={{ fontWeight: 500 }}
                      >
                        Details
                      </p>
                      <div className="row mt-3">
                        <ProductMobileDetails
                          details={data?.data?.product_attributes}
                        />
                      </div>

                      <div className="row mt-4">
                        <div className="extra-container col-12">
                          <div className="slider-carosel d-flex">
                            <div
                              className={`${
                                !isDescription.length
                                  ? "activeSubMenu"
                                  : "subMenu"
                              } me-3`}
                              onClick={() =>
                                showCurrentDescription(
                                  data?.data?.additional_info
                                )
                              }
                            >
                              <p className="font-14x text-center text-dark mb-2">
                                Additional info
                              </p>
                            </div>

                            <div
                              className="subMenu me-3"
                              onClick={() =>
                                showCurrentDescription(data?.data?.care)
                              }
                            >
                              <p className="font-14x text-center text-dark mb-2">
                                Care
                              </p>
                            </div>

                            <div
                              className="subMenu me-3"
                              onClick={() =>
                                showCurrentDescription(
                                  data?.data?.merchant_info
                                )
                              }
                            >
                              <p className="font-14x text-center text-dark mb-2">
                                Merchant info
                              </p>
                            </div>

                            <div
                              className="subMenu me-3"
                              onClick={() =>
                                showCurrentDescription(
                                  data?.data?.warranty_info
                                )
                              }
                            >
                              <p className="font-14x text-center text-dark mb-2">
                                Warranty Info
                              </p>
                            </div>

                            <div
                              className="subMenu me-3"
                              onClick={() =>
                                showCurrentDescription(
                                  data?.data?.customer_redressal
                                )
                              }
                            >
                              <p className="font-14x text-center text-dark mb-2">
                                Customer Redressal
                              </p>
                            </div>
                          </div>
                        </div>
                        <hr className="mt-0" />

                        <div className="product-details-para-mob">
                          {isDescription
                            ? renderHTML(isDescription)
                            : renderHTML(data?.data?.additional_info)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="container-fluid mt-4">
                <h1 className="font-18x mt-4 fw-bold">Similar Products</h1>
                <div className="row px-1">
                  <SimilarProduct
                    product={data?.similarProduct}
                    percentageDeal={percentageDeal}
                  />
                </div>
              </div>

              <div className="container-fluid">
                <div className="row">
                  {data?.data?.ratings?.length ? (
                    <>
                      <h1 className="font-18x mt-4 fw-bold">Product Reviews</h1>

                      <div className="row mx-0 d-flex align-items-center mb-3">
                        <div className="d-flex justify-content-center align-items-center flex-column">
                          <p className="mb-0 font-32x" id="secondry-text">
                            {parseFloat(
                              data?.data?.avg_rating[0]?.rating
                            ).toFixed(1)}
                          </p>
                          <Rating
                            placeholderRating={parseFloat(
                              data?.data?.avg_rating[0]?.rating
                            ).toFixed(1)}
                            emptySymbol={
                              <img
                                src="/icons/client/blank-star-preview.svg"
                                className="icon"
                              />
                            }
                            placeholderSymbol={
                              <img
                                src="/icons/client/fill-star-preview.svg"
                                className="icon"
                              />
                            }
                            fullSymbol={
                              <img
                                src="/icons/client/fill-star-preview.svg"
                                className="icon"
                              />
                            }
                            readonly
                          />
                          <p className="mb-0 font-16x mt-3" id="secondry-text">
                            Based on &nbsp;
                            {data.data.ratings.length}
                            &nbsp; reviews
                          </p>
                          <hr className="w-100" />
                        </div>
                      </div>

                      {ratingSequence.map((value) => {
                        return (
                          <>
                            <div className="row mx-0 d-flex align-items-center mb-3">
                              <div className="col-1">
                                <p className="mb-0 font-16x" id="secondry-text">
                                  {value}
                                </p>
                              </div>
                              <div className="col-1">
                                <img
                                  src="/images/star.svg"
                                  width="20px"
                                  height="20px"
                                />
                              </div>
                              <div className="col-8">
                                <div
                                  className="progress w-100"
                                  style={{
                                    height: "4px",
                                  }}
                                >
                                  <div
                                    className="progress-bar bg-success"
                                    style={{
                                      width: `${ratingPercentage(
                                        data?.data?.ratings,
                                        value
                                      )}%`,
                                    }}
                                  ></div>
                                </div>
                              </div>
                              <div className="col-2">
                                <p className="mb-0 font-16x" id="secondry-text">
                                  {ratingCount(data?.data?.ratings, value)}
                                </p>
                              </div>
                            </div>
                          </>
                        );
                      })}

                      <div className="product-details-comment">
                        {data?.data?.ratings
                          .slice(0, 3)
                          .map((reviews, index) => {
                            return (
                              <>
                                <div
                                  className="userinfo mb-5"
                                  key={reviews?.id}
                                >
                                  <div className="d-flex justify-content-start flex-column">
                                    <div className="d-flex align-items-center">
                                      <img
                                        src="/images/user-image.svg"
                                        alt=""
                                        className="img-fluid"
                                      />
                                      <p className="mb-0 font-18x ps-3">
                                        {reviews.user.name}
                                      </p>
                                    </div>

                                    <div className="d-flex justify-content-start align-items-center mt-2">
                                      <p className="mb-0 font-18x">
                                        {reviews.rating}
                                      </p>
                                      {[...Array(5)].map((_, i) => {
                                        return (
                                          <>
                                            {reviews.rating > i && (
                                              <img
                                                src="/images/star.svg"
                                                className="img-fluid ps-1"
                                              />
                                            )}
                                          </>
                                        );
                                      })}
                                    </div>
                                  </div>
                                  <p className="mb-0 font-16x mt-4">
                                    {reviews.details}
                                  </p>
                                </div>
                              </>
                            );
                          })}

                        {/* <a className='d-flex justify-content-center font-18x fw-bold' id="primary-color">Show 50 more reviews</a> */}
                        {user?.data?.data?.length ? (
                          <div className="d-flex justify-content-center">
                            <button onClick={handleShow}>
                              <a
                                className="d-flex justify-content-center font-18x fw-bold"
                                id="primary-color"
                              >
                                {/* Show {user.data.data.length} more reviews */}
                                See all reviews
                              </a>
                            </button>
                          </div>
                        ) : null}
                      </div>
                    </>
                  ) : null}
                </div>
              </div>

              <div className="container-fluid">
                <h1 className="font-18x mt-4 fw-bold">More from the seller</h1>
                <div className="row px-1">
                  <Swiper
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper"
                    loop={true}
                    breakpoints={{
                      360: {
                        slidesPerView: 2,
                        spaceBetween: 6,
                      },
                      568: {
                        slidesPerView: 1,
                        // spaceBetween: 10
                      },
                      608: {
                        slidesPerView: 2.5,
                        spaceBetween: 30,
                      },
                      768: {
                        slidesPerView: 2.5,
                        spaceBetween: 30,
                      },
                      820: {
                        slidesPerView: 2.5,
                        spaceBetween: 30,
                      },
                      1001: {
                        slidesPerView: 3.5,
                        spaceBetween: 30,
                      },
                    }}
                  >
                    {data?.ownerProducts?.map((product) => {
                      return (
                        <>
                          <SwiperSlide>
                            <Product
                              product={product}
                              percentageDeal={percentageDeal}
                            />
                          </SwiperSlide>
                        </>
                      );
                    })}
                  </Swiper>
                </div>
              </div>

              <div className="container" style={{ marginTop: "100px" }}>
                <NewsLetter />
              </div>
            </div>
          </>
        ) : (
          <Skeleton />
        )}
        <Footer />
      </PositionIssue>

      <ReviewModal show={show} handleClose={handleClose} user={user} />
      <Login
        searchBar={isLogged}
        setSearchBar={setLogged}
        // updateSliderActive={updateSliderDeactive}
      />
    </>
  );
};

export default Products;
