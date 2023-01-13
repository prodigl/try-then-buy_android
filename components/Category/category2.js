import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { config } from "config";
import axios from "axios";
import { useRef } from "react";

const Category = () => {
  const [category, setCategory] = useState(""); 
  const [more, setMore] = useState(true)
  //Fetching the header-Catergory
  const fetchCategory = async () => {
    try {
      const responce = await axios.get(`${config.apiUrl}header-category`);
      const data = responce.data;
      setCategory(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchCategory();
  }, []);

  // const subList = useRef();
  // useEffect(() => {
  //   console.log(subList.current.value);
  // }, []);
 
 
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-lg-12 d-flex">
            {
              more ?
            category
              ? category?.data?.category?.slice(0,7).map((cate, index) => {
                  return (
                    <>
                      <div className="dropdown" key={index}>
                        <div className="dropbtn">
                          <Link href={`/category/${cate.slug}`} >
                            <a>
                              <span className="mb-0 font-14x">{cate.name}</span>
                              <img
                                src="/images/dropdown.svg"
                                alt=""
                                className="ms-2"
                              />
                            </a>
                          </Link>
                        </div>
                        <div className="dropdown-content">
                          <ul className="mb-0">
                            {cate?.subs?.length &&
                              cate?.subs?.map((sub, ind) => {
                                return (
                                  <>
                                    <li className="content-main">
                                      <Link href={`/sub-category/${sub.slug}`}>
                                        <a className="font-14x fw-light">
                                          {sub.name}
                                        </a>
                                      </Link>
                                      <ul
                                        className={
                                          sub.childs.length == 0
                                            ? "content-sub-hide"
                                            : "content-sub"
                                        }
                                       
                                      >
                                        {sub?.childs?.length &&
                                          sub?.childs?.map((child) => {
                                            return (
                                              <>
                                                <li>
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
              : console.log("no category")
            : category
            ? category?.data?.category?.slice(8,14).map((cate, index) => {
                return (
                  <>
                    <div className="dropdown" key={index}>
                      <div className="dropbtn">
                        <Link href={`/category/${cate.slug}`}>
                          <a>
                            <span className="mb-0 font-14x">{cate.name}</span>
                            <img
                              src="/images/dropdown.svg"
                              alt=""
                              className="ms-2"
                            />
                          </a>
                        </Link>
                      </div>
                      <div className="dropdown-content">
                        <ul className="mb-0">
                          {cate?.subs?.length &&
                            cate?.subs?.map((sub, ind) => {
                              return (
                                <>
                                  <li className="content-main">
                                    <Link href={`/sub-category/${sub.slug}`}>
                                      <a className="font-14x fw-light">
                                        {sub.name}
                                      </a>
                                    </Link>
                                    <ul
                                      className={
                                        sub.childs.length == 0
                                          ? "content-sub-hide"
                                          : "content-sub"
                                      }
                                    >
                                      {sub?.childs?.length &&
                                        sub?.childs?.map((child) => {
                                          return (
                                            <>
                                              <li>
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
            : console.log("no category")
            }
            {
              more  ? (<div className="mt-3 pointer" id="secondry-color" onClick={()=>setMore(!more)}>More</div>) :
              (<div className="mt-3 pointer" id="secondry-color" onClick={()=>setMore(!more)}>Back</div>)
            }
              {/* <div className="mt-3" id="secondry-color" onClick={()=>setMore(!more)}>More</div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
