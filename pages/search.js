import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import api from "helpers/api";
import Filter from "components/Filter";
import Link from "next/link";
import { config } from "config";
import Heart from "assets/vectors/heart";
import Cart from "assets/vectors/cart";
import CartModal from "components/CartModal";
import Loader from "components/LoadingSpinner";
import { Header } from "components";
import Footer from "../components/Footer";
import { CartVolume } from "providers/CartContext";
import { AuthValidation } from "providers/AuthContext";
import Signup from "components/Signupmodal";
import { toast } from "react-toastify";

const Search = () => {
    //Auth state managment -----------
    const {
        token,
        updateUser,
        updateToken,
        userLogout
    } = AuthValidation();

    //Cart State Management---------
    const {
        fetchWishlist,
        updateCartItem,
        updateWishlist
    } = CartVolume();

    const [category, setCategory] = useState([]);
    const [product, setProduct] = useState([]);

    //For Cart opening modal
    const [cartProduct, setCartProduct] = useState(false);
    const closeCart = () => setCartProduct(false);
    const openCart = () => setCartProduct(true);
    const [cartId, setCartId] = useState("");
    const [cartSlug, setCartSlug] = useState("");

    //Sign Modal opening
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const router = useRouter();
    const searchQ = router.query.q;

    const fetchCategory = async() => {
        try {
            const resCategory = await api.get(`search-category?q=${searchQ}`);
            if (resCategory) {
                setCategory(resCategory.data);
            }

        } catch (error) {
            console.log(error)
        }
    }

    const fetchProduct = async() => {
        try {
            if (token) {
                const resProduct = await api.get(`search-product?q=${searchQ}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                if (resProduct) {
                    setProduct(resProduct.data.data);
                }
            } else {
                const resProduct = await api.get(`search-product?q=${searchQ}`);
                if (resProduct) {
                    setProduct(resProduct.data.data);
                }
            }
        } catch (error) {
            console.log(error)
            if (error.response.status == 401) {
                userLogout();
                updateCartItem("");
                updateWishlist("");

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
    }

    useEffect(async () => {
        fetchCategory();
        fetchProduct();
    }, [searchQ]);

    //Add or Remove Product to Wishlist
    const addToWishlist = async (id) => {
        console.log(id)
        const url = `${config.apiUrl}add-to-wishlist/${id}`;
        try {
            if (token) {
                const res = await api.post(
                    url,
                    {},
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                if (res.status === 200) {
                    fetchWishlist();
                    fetchProduct();
                    if (res.data.message === "added to wishlist") {
                        toast.success('Product is added to wishlist!', {
                            position: "top-center",
                            autoClose: 2000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    } else {
                        toast.error('Product is removed to wishlist!', {
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
            } else {
                handleShow();
            }
        } catch (error) {
            console.log(error);
            if (error.response.status == 401) {
                userLogout();
                updateCartItem("");
                updateWishlist("");

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


    //Add Product to Cart && open cart Modal
    const addToCart = (id, slug) => {
        setCartId(id);
        setCartSlug(slug);

        if (id != "" && slug != "") {
            openCart();
        }
    };

    //Add default src for 404 image
    const addDefaultSrc = (e) => {
        e.target.src = "/images/error-product-image.png";
    };

    //Add category default src
    const addCategorySrc = (e) => {
        e.target.src = "/images/Category Placeholder.svg";
    };

    const percentageDeal = (actualP, preciousP) => {
        let c = Math.round(preciousP);
        let d = Math.round(actualP);
        let e = c - d;
        // let p = Math.round(e / c);
        let p = e / c;
        let per = Math.round(p * 100);
        // let per = p*100
        return per;
    };

    return (
        <>
            <Header />
            

            {/* ***************mobile view************************  */}

            <div className="mobile">
                {/********** Category and breadcum  ***********/}
                <div className="category-box">
                    <div className="container-fluid px-4">
                        <nav >
                            <ol className="breadcrumb">
                                <Link href="/">
                                    <li className="breadcrumb-item">
                                        <a >HOME</a>
                                    </li>
                                </Link>
                                <li className="breadcrumb-item">
                                    <a href="#" id="primary-color">
                                        {searchQ}
                                    </a>
                                </li>
                            </ol>
                        </nav>
                        <h1 className="font-22x mb-5">
                            Showing Results for "{searchQ}"
                        </h1>
                    </div>
                    <div className="container-fluid extra-container px-4">
                        <div className="slider-carosel">
                            {
                                category.length ?
                                    category?.map((category) => {
                                        return (
                                            <>

                                                {
                                                    !category.category_id && !category.subcategory_id &&
                                                    <>
                                                        <Link href={`category/${category.slug}`}>
                                                            <div className="card card-style-box me-4">
                                                                <img
                                                                    src={`${config.categoriesBasePath}${category.image}`}
                                                                    className="card-img-top"
                                                                    alt={category.name}
                                                                    onError={addCategorySrc}
                                                                />
                                                                <div className="card-body card-style-body">
                                                                    <p className="card-text">{category.name}</p>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                        {
                                                            category.subs.length ? category.subs.map((category) => {
                                                                return (
                                                                    <>
                                                                        <Link href={`/sub-category/${category.slug}`}>
                                                                            <div className="card card-style-box me-4">
                                                                                <img
                                                                                    src={`${config.subCategoriesBasePath}${category.image}`}
                                                                                    className="card-img-top"
                                                                                    alt={category.name}
                                                                                    onError={addCategorySrc}
                                                                                />
                                                                                <div className="card-body card-style-body">
                                                                                    <p className="card-text">{category.name}</p>
                                                                                </div>
                                                                            </div>
                                                                        </Link>

                                                                    </>
                                                                )
                                                            }) : null
                                                        }
                                                    </>
                                                }

                                                {
                                                    category.category_id ?
                                                        <>
                                                            <Link href={`/sub-category/${category.slug}`}>
                                                                <div className="card card-style-box me-4">
                                                                    <img
                                                                        src={`${config.subCategoriesBasePath}${category.image}`}
                                                                        className="card-img-top"
                                                                        alt={category.name}
                                                                        onError={addCategorySrc}
                                                                    />
                                                                    <div className="card-body card-style-body">
                                                                        <p className="card-text">{category.name}</p>
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                            {
                                                                category.childs.length ? category.childs.map((category) => {
                                                                    return (
                                                                        <>
                                                                            <Link href={`/child-category/${category.slug}`}>
                                                                                <div className="card card-style-box me-4">
                                                                                    <img
                                                                                        src={`${config.childCategoriesBasePath}${category.image}`}
                                                                                        className="card-img-top"
                                                                                        alt={category.name}
                                                                                        onError={addCategorySrc}
                                                                                    />
                                                                                    <div className="card-body card-style-body">
                                                                                        <p className="card-text">{category.name}</p>
                                                                                    </div>
                                                                                </div>
                                                                            </Link>
                                                                        </>
                                                                    )
                                                                }) : null
                                                            }
                                                        </>
                                                        : null
                                                }
                                                {
                                                    category.subcategory_id ?
                                                        <>
                                                            <Link href={`/child-category/${category.slug}`}>
                                                                <div className="card card-style-box me-4">
                                                                    <img
                                                                        src={`${config.childCategoriesBasePath}${category.image}`}
                                                                        className="card-img-top"
                                                                        alt={category.name}
                                                                        onError={addCategorySrc}
                                                                    />
                                                                    <div className="card-body card-style-body">
                                                                        <p className="card-text">{category.name}</p>
                                                                    </div>
                                                                </div>
                                                            </Link>

                                                        </>
                                                        : null
                                                }


                                                {/* {!category.childs && (
                                                <Link href={`/category/${category.slug}`}>
                                                    <div className="card card-style-box me-4">
                                                        <img
                                                            src={`${category.photo}`}
                                                            className="card-img-top"
                                                            alt={category.name}
                                                            onError={addCategorySrc}
                                                        />
                                                        <div className="card-body card-style-body">
                                                            <p className="card-text">{category.name}</p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            )}
                                            {!category.subs ? (
                                                <Link href={`/sub-category/${category.slug}`}>
                                                    <div className="card card-style-box me-4">
                                                        <img
                                                            src={`${config.subCategoriesBasePath}${category.image}`}
                                                            className="card-img-top"
                                                            alt={category.name}
                                                            onError={addCategorySrc}
                                                        />
                                                        <div className="card-body card-style-body">
                                                            <p className="card-text">{category.name}</p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            ) : ""} */}
                                            </>
                                        );
                                    })
                                    : null
                            }
                        </div>
                    </div>
                </div>

                {product.length ? (
                    <section>
                        <div className="container">


                            <div className="row">
                                <div className="col-12">
                                    <div className="row my-5">
                                        <div className="col-12">
                                            <p className="font-16x" id="secondry-text">
                                                Found{" "}
                                                <span className="fw-bolder text-dark">
                                                    {product.length}
                                                </span>{" "}
                                                options
                                            </p>
                                        </div>
                                    </div>
                                    <div className="row px-3">
                                        {product?.map((crrElm) => {
                                            return (
                                                <>
                                                    <div className="col-12 col-sm-6 col-md-4" key={crrElm.id}>
                                                        <div className="product-box-cart">
                                                            <div className="card product-card">
                                                                <Link
                                                                    href={`/product/${encodeURIComponent(
                                                                        crrElm.slug
                                                                    )}`}
                                                                >
                                                                    <img
                                                                        src={`${config.productbasepath}${crrElm.photo}`}
                                                                        className="card-img-top"
                                                                        onError={addDefaultSrc}
                                                                    />
                                                                </Link>

                                                                <div className="card-body ">
                                                                    <p className="product-heading mt-3 mb-0 text-start">
                                                                        {crrElm.name}
                                                                    </p>
                                                                    <div className="product-discount">
                                                                        <p className="mb-0 text-start">
                                                                            (
                                                                            {percentageDeal(
                                                                                crrElm.price,
                                                                                crrElm?.previous_price
                                                                            )}
                                                                            %OFF)
                                                                        </p>
                                                                    </div>
                                                                    <div className="d-flex justify-content-between align-items-center">
                                                                        <div>
                                                                            <p className="font-18x mt-3 fw-bold">
                                                                                &#8377;{parseInt(crrElm.price).toLocaleString()}
                                                                                <del className="product-marked-price ms-2">
                                                                                    &#8377;{parseInt(crrElm.previous_price).toLocaleString()}
                                                                                </del>
                                                                            </p>
                                                                        </div>
                                                                        <div className="d-flex align-items-center">
                                                                            {crrElm?.wishlists?.length ? (
                                                                                <div
                                                                                    onClick={() =>
                                                                                        addToWishlist(crrElm.id)
                                                                                    }
                                                                                    style={{ cursor: "pointer" }}
                                                                                >
                                                                                    {/* <Heart width={26} height={22} /> */}
                                                                                    <img
                                                                                        src="/images/heart icon.svg"
                                                                                        alt="red-heart"
                                                                                        height={22}
                                                                                        width={26}
                                                                                    />
                                                                                </div>
                                                                            ) : (
                                                                                <div
                                                                                    onClick={() =>
                                                                                        addToWishlist(crrElm.id)
                                                                                    }
                                                                                    style={{ cursor: "pointer" }}
                                                                                >
                                                                                    <Heart width={26} height={22} />
                                                                                </div>
                                                                            )}
                                                                            <div
                                                                                onClick={() =>
                                                                                    addToCart(crrElm.id, crrElm.slug)
                                                                                }
                                                                                className="ms-3"
                                                                                style={{ cursor: "pointer" }}
                                                                            >
                                                                                <Cart width={26} height={24} />
                                                                            </div>
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
                            We don’t have any product of “
                            <span className="text-dark fw-bold ">{searchQ}</span>”. <br />{" "}
                            Please try to search for another query.
                        </p>
                    </div>
                )}
            </div>

            <Footer />
            <CartModal
                id={cartId}
                slug={cartSlug}
                show={cartProduct}
                closeCart={closeCart}
            />
            <Signup
                show={show}
                handleClose={handleClose}
                updateUser={updateUser}
                updateToken={updateToken}
            />
        </>
    );
};

export default Search;
