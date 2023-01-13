import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import api from "helpers/api";
import axios from "axios";
import OutsideClickHandler from "react-outside-click-handler";
import { BsArrowRight } from 'react-icons/bs';

const Category = () => {
  const [category, setCategory] = useState("");
  const [cates, setCates] = useState();
  const [subs, setSubs] = useState();
  const [more, setMore] = useState(false);
  const [isCategory, setIsCategory] = useState('');

  const isCategorySet = (value) => {
    setIsCategory(value);
  }

  useEffect(async () => {
    const cancelToken = axios.CancelToken.source();
    try {
      const responce = await api.get(`header-category`, {
        cancelToken: cancelToken.token,
      });
      const data = responce.data;
      setCategory(data);
    } catch (err) {
      console.log(err);
    }

    return () => {
      cancelToken.cancel();
      setCates();
      setSubs();
    };
  }, []);


  // {console.log('logic',category?.data?.category[8].subs)}

  useEffect(() => {
    setSubs(category?.data?.category[10].subs);
  }, [category, more])


  let timeOutId;
  const cateMain = (cate) => {
    if (timeOutId) {
      clearTimeout(timeOutId);
      setCates("");
    }
    timeOutId = setTimeout(async () => {
      const responce = await api.get(`category/${cate}`);
      const data = responce.data.subs;
      setCates(data);
      setMore(false);
    }, 100)
  };




  useEffect(async () => {
    if (cates) {

      const responce = await api.get(`sub-category/${cates && cates[0]?.slug}`);
      const data = responce.data.childs;
      setSubs(data);
    }

    return () => {
      setSubs("");
    };
  }, [cates]);


  const alertme = async (cate) => {
    const responce = await api.get(`sub-category/${cate}`);
    const data = responce.data.childs;
    setSubs(data);
  };
  const subdata = subs && subs;


  const openExtraCategory = () => {
    setMore(!more);
  }

  const categoryDown = async (cate) => {
    const responce = await api.get(`category/${cate}`);
    const data = responce.data.subs;
    console.log(responce.data);
    setSubs(data);
  }

  const clearCategory = () => {
    setCates("");
    setSubs("")
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-lg-12 d-flex">
            {
              category?.data?.category?.slice(0, 10).map((cate, index) => {
                return (
                  <>
                    <div className="dropdown" key={cate.id}>
                      <div className="dropbtn">
                        <Link href={`/category/${cate.slug}`}>
                          <a>
                            <span
                              className="mb-0 font-14x"
                              onMouseEnter={() => cateMain(cate.slug)}
                            >
                              {cate.name}
                            </span>
                          </a>
                        </Link>
                      </div>

                      <div
                        className={
                          cates?.length
                            ? "dropdown-content"
                            : "content-sub-hide"
                        }
                        onMouseLeave={clearCategory}
                      >
                        <ul className="mb-0">
                          {cates?.length &&
                            cates?.map((sub) => {
                              return (
                                <>
                                  <li className="content-main" key={sub.id}>
                                    <Link
                                      href={`/sub-category/${sub.slug}`}
                                    >
                                      <a
                                        className="font-14x fw-light"
                                        onMouseOver={() =>
                                          alertme(sub.slug)
                                        }
                                      >
                                        {sub.name}
                                      </a>
                                    </Link>
                                    <ul
                                      className={
                                        subs?.length === 0
                                          ? "content-sub-hide"
                                          : "content-sub"
                                      }
                                    >
                                      {subdata?.length &&
                                        subdata?.map((child) => {
                                          return (
                                            <>
                                              <li key={child.id}>
                                                <Link
                                                  href={`/child-category/${child.slug}`}
                                                >
                                                  <a className="font-14x fw-light">
                                                    {child.name}
                                                  </a>
                                                </Link>
                                              </li>
                                            </>
                                          );
                                        })}
                                    </ul>
                                  </li>
                                </>
                              );
                            })}
                        </ul>
                      </div>
                    </div>
                  </>
                );
              })
            }


            <div className={!more ? "moreCategory" : "moreCategory-more"}>
              {
                category?.data?.category.length > 10 &&
                <div className="mt-3 pointer moreCategoryoption" onMouseOver={() => setMore(!more)} >
                  More
                </div>
              }

              {
                more &&
                <OutsideClickHandler
                  onOutsideClick={() => {
                    setMore(false)
                  }}
                >
                  <div className="morecategory-content" onMouseLeave={() => setMore(false)}>
                    <ul className="mb-0">
                      {
                        category?.data?.category?.slice(10, category?.data?.category.length).map((cate, index) => {
                          return (
                            <>
                              <li className="morecategory-main">
                                <Link href={`/category/${cate.slug}`} >
                                  <a className="font-14x fw-light"
                                    onMouseOver={() => categoryDown(cate.slug)}

                                  >{cate.name}
                                  </a>
                                </Link>


                                <div className={subs?.length && "morecategory-sub"}>
                                  <ul className="mb-0">
                                    {
                                      subs.length ?
                                      subs?.map((subs) => {
                                        return (
                                          <>
                                            <li className="mb-2 morecategory-subs">
                                              <Link href={`/sub-category/${subs.slug}`}>
                                                <div className="d-flex justify-content-between align-items-center"
                                                  onMouseOver={() => isCategorySet(subs.id)}
                                                // onMouseLeave={()=>setIsCategory('')}
                                                >
                                                  <a>
                                                    {subs.name}
                                                  </a>
                                                  {
                                                    isCategory == subs.id && <BsArrowRight className="pe-2" />
                                                  }

                                                </div>
                                              </Link>
                                              <div className="morecategory-child">
                                                <ul className="mb-0">
                                                  {
                                                    subs?.childs?.map((child) => {
                                                      return (
                                                        <>
                                                          <li className="mb-2">
                                                            <Link href={`/child-category/${child.slug}`}>
                                                              <a>
                                                                {child.name}
                                                              </a>
                                                            </Link>
                                                          </li>
                                                        </>
                                                      )
                                                    })
                                                  }
                                                </ul>
                                              </div>
                                            </li>
                                          </>
                                        )
                                      })
                                      : null
                                    }


                                  </ul>
                                </div>
                              </li>
                            </>
                          )
                        })
                      }


                    </ul>
                  </div>
                </OutsideClickHandler>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
