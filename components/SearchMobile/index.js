import { useState, useEffect } from "react";
import Link from "next/link";
import { AuthValidation } from "providers/AuthContext";
import { useRouter } from "next/router";
import api from "helpers/api";

const hamburgermenu = ({ searchBar, setSearchBar, updateSliderActive }) => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [category, setCategory] = useState([]);
  const [product, setProduct] = useState([]);
  const [isSearch, setIsSearch] = useState("");

  const closeSearchBar = () => {
    setSearchBar(false);
    updateSliderActive();
  };

  let value;
  const handleSearch = async (e) => {
    value = e.target.value;
    console.log("value", value);
    setIsSearch(value);
  };

  useEffect(async () => {
    if (isSearch.length == "") {
      setCategory([]);
      setProduct([]);
    } else {
      if (isSearch.length > 3) {
        try {
          //Finding Category
          const urlcate = `search-category?q=${isSearch}`;
          const res = await api.get(urlcate);
          console.log("category search", res.data);
          setCategory(res.data);

          //Finding Product
          const urlprod = `search-product?q=${isSearch}`;
          const responce = await api.get(urlprod);
          console.log("product search", responce.data);
          setProduct(responce.data);
        } catch (error) {
          console.log(error);
        }
      }
    }

    return () => {
      setCategory([]);
      setProduct([]);
    };
  }, [isSearch]);

  const searchManualData = (e) => {
    e.preventDefault();
    if (isSearch.length) {
      router.push(`/search?q=${isSearch && isSearch}`);
    }
    setSearchBar("");
  };

  return (
    <>
      <div
        className={
          searchBar
            ? "searchMenuWrapper menuWrapper-active"
            : "searchMenuWrapper"
        }
      >
        <div className="menuContainer">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 d-flex align-items-center mobile-header-fixed" style={{
                // paddingTop:'12px',
                // paddingBottom : '12px'
                height:'62px'
              }}>
                <img
                  src="/images/cross.svg"
                  alt=""
                  className="img-fluid"
                  onClick={closeSearchBar}
                />
                <form
                  className="d-flex input-box animateSearchBar"
                  onSubmit={searchManualData}
                  style={{ marginLeft: "8%" }}
                >
                  <button className="btn-search" type="submit">
                    <img
                      src="/icons/client/search.svg"
                      // width={20}
                      height={30}
                    />
                  </button>

                  <input
                    className="form-control header-search me-2 shadow-none"
                    type="search"
                    placeholder="Search"
                    onChange={handleSearch}
                    name="q"
                    value={isSearch}
                  />
                </form>
              </div>
            </div>

            {
              category.length && product?.data?.length ?

                <div className="seachItemprovide">
                  {category.length ? (
                    <>
                      <p
                        className="ps-3 font-16x mb-0 mt-3 fw-bold"
                        id="primary-color"
                      >
                        CATEGORIES
                      </p>
                      <ul>
                        {category.map((category) => {
                          return (
                            <>
                              <li>

                                {
                                  !category.category_id && !category.subcategory_id &&
                                  <>
                                    <Link href={`/category/${category.slug}`}>
                                      <a className="seachItemprovide_link ps-3">{category.name}</a>
                                    </Link>
                                    {
                                      category.subs.length ? category.subs.map((category) => {
                                        return (
                                          <>
                                            <Link href={`/sub-category/${category.slug}`}>
                                              <a className="seachItemprovide_link ps-3">{category.name}</a>
                                            </Link>
                                            {
                                              category.childs.length ? category.childs.map((category) => {
                                                return (
                                                  <>
                                                    <Link href={`/child-category/${category.slug}`}>
                                                      <a className="seachItemprovide_link ps-3">{category.name}</a>
                                                    </Link>
                                                  </>
                                                )
                                              }) : null
                                            }
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
                                        <a className="seachItemprovide_link ps-3">{category.name}</a>
                                      </Link>
                                      {
                                        category.childs.length ? category.childs.map((category) => {
                                          return (
                                            <>
                                              <Link href={`/child-category/${category.slug}`}>
                                                <a className="seachItemprovide_link ps-3">{category.name}</a>
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
                                        <a className="seachItemprovide_link ps-3">{category.name}</a>
                                      </Link>

                                    </>
                                    : null
                                }

                              </li>
                            </>
                          );
                        })}
                      </ul>
                    </>
                  ) : null}

                  {product?.data?.length ? (
                    <>
                      <p
                        className="ps-3 font-16x mb-0 mt-3 fw-bold"
                        id="primary-color"
                      >
                        PRODUCTS
                      </p>
                      {product?.data?.map((product) => {
                        return (
                          <>
                            <Link href={`product/${product.slug}`}>
                              <a className="seachItemprovide_link ps-3">
                                {product.name}
                              </a>
                            </Link>
                          </>
                        );
                      })}
                    </>
                  ) : null}
                </div>
                :
                <section >
                  <div className='container-fluid'>
                    <div className='error-body-section' style={{
                      backgroundImage: `url(/icons/search.svg)`
                    }} >
                      {/* <p className='font-18x opps-line'>OOPS!</p> */}


                    </div>
                  </div>
                </section>
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default hamburgermenu;
