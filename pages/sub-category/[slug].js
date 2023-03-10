import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { config } from "config";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import Product from "../../components/MoreProduct";
import Filter from "../../components/Filter";
import Link from "next/link";
import api from "../../helpers/api";
import Heart from "assets/vectors/heart";
import Cart from "assets/vectors/cart";
import { CartVolume } from "providers/CartContext";
import { AuthValidation } from "providers/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signup from "components/Signupmodal";
import CartModal from "components/CartModal";
import NewsLetter from "components/NewsLetter";
import Loader from "components/LoadingSpinner";
import { Header } from "components";
import Footer from "components/Footer";
import Sorting from "components/sortingMobile";
import PositionIssue from "components/PositionIssue";
import Login from "components/LoginComp";
import Skeleton from "components/Skelten/Category";
import { MiscellaneousProvider } from "providers/Miscellaneous";

const Demo = (props) => {
  //ServerSide Rendering data
  const [data, setData] = useState();

  //Auth state managment -----------
  const { token, updateUser, updateToken, userLogout } = AuthValidation();

   //Cart State Management---------
   const {
    fetchWishlist,
    updateCartItem,
    updateWishlist,
    cart,
    localCartData,
    fetchCartData,
    updateLocalCartData,
  } = CartVolume();

  //miscellaneous state
  const { updateSliderActive, updateSliderDeactive, isLogged, activeLogged, deActiveLogged, setLogged } = MiscellaneousProvider();

  //Add default src for 404 image
  const addDefaultSrc = (e) => {
    e.target.src = "/images/error-product-image.png";
  };

  //Add category default src
  const addCategorySrc = (e) => {
    e.target.src = "/images/Category Placeholder.svg";
  };

  const updateProductData = async () => {
    if (token) {
      const url = `sub-category/${slug}`;
      try {
        const res = await api.get(url, {
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
      // setData(props.data);
      try {
        const url = `sub-category/${slug}`;
        const res = await api.get(url);
        const datamain = res.data;
        setData(datamain);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    updateProductData();
  }, [token, props]);

  // const [data, setData] = useState(datam);
  //Getting router slug
  const router = useRouter();
  const slug = router.query.slug;
  const [isSorting, setIsSorting] = useState({});
  const [categoryId, setCategoryId] = useState("");
  const [catetype, setCateytype] = useState("subcategory_id");

  //Getting id form category for filter types
  const filterData = async () => {
    try {
      const url = `sub-category/${slug}`;
      const res = await api.get(url);

      if (res) {
        console.log("resdata", res.data.id);
        setCategoryId(res.data.id);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    filterData();
  }, []);

  //Sign up Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //For Cart opening modal
  const [cartProduct, setCartProduct] = useState(false);
  const closeCart = () => setCartProduct(false);
  const openCart = () => setCartProduct(true);
  const [cartId, setCartId] = useState("");
  const [cartSlug, setCartSlug] = useState("");
  const [filterHide, setFilterhide] = useState(false);
  const [loginBar, setLoginBar] = useState(false);
  //Add or Remove Product to Wishlist
  const addToWishlist = async (id) => {
    const url = `${config.apiUrl}add-to-wishlist/${id}`;
    // alert(url);
    try {
      if (token) {
        const res = await api.post(
          url,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res) {
          fetchWishlist();
          updateProductData();

          if (res.data.message === "added to wishlist") {
            toast("?????? Product is Added to wishlist!", {
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
            toast("???? Product is removed to wishlist!", {
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
        // handleShow();
        loginBarUpdate();
      }
    } catch (err) {
      console.log(err);
      if (err.response.status === 401) {
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
        });
      }
    }
  };

  //Add Product to Cart && open cart Modal
  const addToCart = async (id, slug) => {
    const url = `product/${slug}`;
    try {
      const res = await api.get(url);
      if (res.status === 200) {
        const product = res.data.data;
        console.log(product);
        const color = product?.product_variations[0]?.color;
        const size = product?.product_variations[0]?.size;
        // console.log(color, size);

        if (token) {
          const url = `addProductToCart/${cart?.id}`;
          const res = await api.post(
            url,
            {
              product_id: id,
              color: color ? color : "",
              size: size ? size : "",
              qty: 1,
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
            toast("?????? Product is added in your Cart!", {
              position: "top-center",
              autoClose: 4000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        } else {
          if (localCartData.length) {
            //if product is already in the cart
            const cartMain = localCartData.filter((cart) => {
              return cart.id === id;
            });

            if (cartMain.length) {
              toast("?????? Product is already in the cart!", {
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
                const responce = await api.get(`product/${slug}`);
                if (responce) {
                  updateLocalCartData([
                    ...localCartData,
                    {
                      id: id,
                      slug: slug,
                      color: color ? color : "",
                      size:    size ? size : "",
                      qty: 1,
                      product: responce.data.data,
                    },
                  ]);
                  toast("?????? Product is added in your Cart!", {
                    position: "top-center",
                    autoClose: 4000,
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
            }
          } else {
            //First Item cart added
            try {
              const responce = await api.get(`product/${slug}`);

              if (responce) {
                updateLocalCartData([
                  ...localCartData,
                  {
                    id: id,
                    slug: slug,
                    color: color? color : "",
                    size: size? size : "",
                    qty: 1,
                    product: responce.data.data,
                  },
                ]);
                toast("?????? Product is added in your Cart!", {
                  position: "top-center",
                  autoClose: 4000,
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
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const percentageDeal = (actualP, preciousP) => {
    let c = Math.round(preciousP);
    let d = Math.round(actualP);
    let e = c - d;
    let p = e / c;
    let per = Math.round(p * 100);
    return per;
  };


  let lastScrollY = window.scrollY;
  const controlNavbar = () => {
    const scrollY = window.scrollY;
    const direction = scrollY > lastScrollY ? "down" : "up";
    lastScrollY = scrollY > 0 ? scrollY : 0;

    if (window.scrollY > 500 && direction === "down") {
      // setFilterhide(true)
      setTimeout(() => {
        setFilterhide(true);
      }, 300);
    } else if (direction === "up") {
      // alert(direction)
      setFilterhide(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);

    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, []);

  const [sortingFilter, setSortingFilter] = useState(false);

  const isSortingFilter = () => {
    // alert("hello world");
    setSortingFilter(true);
    updateSliderActive();
  };

  const loginBarUpdate = () => {
    // setLoginBar(true);
    activeLogged();
  };

  return (
    <>
      <Header />
      <PositionIssue>
        {data ? (
          <>
            {/*  Mobile View  */}
            <div className="mobile">
              {/********** Category and breadcum  ***********/}
              <div className="category-box">
                <div className="container-fluid px-4">
                  <nav>
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <Link href="/">
                          <a>HOME</a>
                        </Link>
                      </li>
                      <li className="breadcrumb-item">
                        <Link href={`/category/${data?.category.slug}`}>
                          <a>{data?.category.name}</a>
                        </Link>
                      </li>
                      <li className="breadcrumb-item">
                        <a href="#" id="primary-color">
                          {data?.name?.charAt(0)?.toUpperCase() +
                            data?.name?.slice(1)}
                        </a>
                      </li>
                    </ol>
                  </nav>
                  <h1 className="font-22x mb-5">
                    {data?.name?.charAt(0)?.toUpperCase() +
                      data?.name?.slice(1)}
                  </h1>
                </div>
                <div className="container-fluid extra-container px-4">
                  <div className="slider-carosel">
                    {data?.childs?.map((value) => {
                      return (
                        <>
                          <Link href={`/child-category/${value.slug}`}>
                            <div className="card card-style-box me-4">
                              <img
                                src={`${config.childCategoriesBasePath}${value.image}`}
                                className="card-img-top"
                                alt={value.name}
                                onError={addCategorySrc}
                              />
                              <div className="card-body card-style-body">
                                <p className="card-text">{value.name}</p>
                              </div>
                            </div>
                          </Link>
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="container-fluid px-1 mobile-swipper">
                <Product id={data.id} category={"subcategory_id"} />
              </div>

              {data?.products?.data?.length ? (
                <section>
                  <div className="container">
                    <div className="row mt-0 mb-3">
                      <div className="col-12 ">
                        <div className="d-flex justify-content-between align-items-center">
                          <p className="font-16x mb-0" id="secondry-text">
                            Found{" "}
                            <span className="fw-bolder text-dark">
                              {data?.products?.data?.length}
                            </span>
                            &nbsp;options
                          </p>

                          {/* <div className="d-flex align-items-center">
                          <p className="font-16x mb-0 me-3" id="secondry-text">
                            Sort By
                          </p>
                          <select
                            name="price"
                            className="form-select custome-select px-0"
                            onChange={(e) => setIsSorting({
                              price: 'price',
                              order: e.target.value
                            })}>
                            <option selected disabled>--Options--</option>
                            <option value="asc">Price : Low to High</option>
                            <option value="desc">Price : High to Low</option>
                          </select>
                        </div> */}
                        </div>
                      </div>
                    </div>

                    <div className="row px-1">
                      <div className="col-12">
                        <div className="row ">
                          <div
                            style={{
                              transitionTimingFunction: "ease-in",
                              transition: "0.5s",
                              display: `${!filterHide ? "none" : "block"}`,
                            }}
                          >
                            <div
                              className="filter-mobile py-3"
                              onClick={isSortingFilter}
                            >
                              <span>
                                <img src="/images/filter1.svg" />
                              </span>
                              <span className="font-16x text-white ms-3">
                                Sort / Filter
                              </span>
                            </div>
                          </div>
                          {data?.products?.data?.map((crrElm) => {
                            return (
                              <>
                                <div className="col-6 col-sm-6 col-md-4 ps-0 pe-1">
                                  <div className="product-box-cart">
                                    <div className="card product-card">
                                      <div
                                        className="card-image customise-img"
                                        style={{
                                          height: "204px",
                                        }}
                                      >
                                        <Link
                                          href={`/product/${encodeURIComponent(
                                            crrElm.slug
                                          )}`}
                                        >
                                          <img
                                            src={`${config.productbasepath}${crrElm.photo}`}
                                            className="card-img-top"
                                            onError={addDefaultSrc}
                                            // height="100%"
                                            // style={{
                                            //   objectFit: 'cover'
                                            // }}
                                            style={{
                                              objectFit: "cover",
                                              height: "204px",
                                            }}
                                          />
                                        </Link>
                                        <div className="discount">
                                          <span>
                                            {percentageDeal(
                                              parseInt(crrElm.price),
                                              parseInt(crrElm.previous_price)
                                            )}
                                            % off
                                          </span>
                                        </div>
                                      </div>
                                      <div className="card-body ">
                                        <p className="product-heading mb-0 text-start">
                                          {crrElm?.name.length > 16
                                            ? crrElm?.name.substring(0, 15) +
                                              "..."
                                            : crrElm?.name}
                                        </p>
                                        {/* <div className="product-discount">
                                                                                        <p className="mb-0 text-start">
                                                                                            (
                                                                                            {percentageDeal(
                                                                                                parseInt(
                                                                                                    crrElm.price
                                                                                                ),
                                                                                                parseInt(
                                                                                                    crrElm?.previous_price
                                                                                                )
                                                                                            )}
                                                                                            %OFF)
                                                                                        </p>
                                                                                    </div> */}
                                        <div className="d-flex justify-content-between align-items-center">
                                          <div>
                                            <p className="font-14x mt-2 mb-3 fw-bold">
                                              &#8377;
                                              {parseInt(
                                                crrElm.price
                                              ).toLocaleString()}
                                              <del className="product-marked-price ms-3">
                                                &#8377;
                                                {parseInt(
                                                  crrElm.previous_price
                                                ).toLocaleString()}
                                              </del>
                                            </p>
                                            <p className="font-10x text-start mb-2">
                                              Fast Delivery Available
                                            </p>
                                          </div>
                                        </div>
                                        <hr className="my-2" />
                                        <div className="d-flex justify-content-between align-items-center px-2">
                                          {crrElm?.wishlists?.length ? (
                                            <div
                                              onClick={() =>
                                                addToWishlist(crrElm.id)
                                              }
                                              style={{
                                                cursor: "pointer",
                                              }}
                                            >
                                              {/* <Heart width={26} height={22} /> */}
                                              <img src="/icons/client/heart-main-liked.svg" />
                                            </div>
                                          ) : (
                                            <div
                                              onClick={() =>
                                                addToWishlist(crrElm.id)
                                              }
                                              style={{
                                                cursor: "pointer",
                                              }}
                                            >
                                              <img src="/icons/client/heart-main.svg" />
                                            </div>
                                          )}
                                          <div
                                            onClick={() =>
                                              addToCart(crrElm.id, crrElm.slug)
                                            }
                                            // onClick={() =>
                                            //     router.push(
                                            //         `/product/${crrElm.slug}`
                                            //     )
                                            // }
                                            className="ms-3"
                                            style={{
                                              cursor: "pointer",
                                            }}
                                          >
                                            <img src="/icons/client/cart.svg" />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              ) : (
                <div className="no-product">
                  <img src="/images/no-product.svg" alt="no-product" />
                  <p className="font-26x">No product found!</p>
                  <p className="font-16x text-center" id="secondry-text">
                    We don???t have any product. Please try to search for another
                    Category.
                  </p>
                </div>
              )}
            </div>
          </>
        ) : (
          <Skeleton />
        )}
        <Footer />
      </PositionIssue>
      <Signup
        show={show}
        handleClose={handleClose}
        updateUser={updateUser}
        updateToken={updateToken}
      />
      <CartModal
        id={cartId}
        slug={cartSlug}
        show={cartProduct}
        closeCart={closeCart}
      />
      <Sorting
        sortingFilter={sortingFilter}
        setSortingFilter={setSortingFilter}
        categoryId={categoryId}
        catetype={catetype}
        data={setData}
        isSorting={isSorting}
        setIsSorting={setIsSorting}
        updateSliderDeactive={updateSliderDeactive}
      />
      <Login
        searchBar={isLogged}
        setSearchBar={setLogged}
        // updateSliderActive={updateSliderDeactive}
      />
    </>
  );
};


export default Demo;
