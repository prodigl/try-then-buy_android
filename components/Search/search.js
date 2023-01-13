import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import axios from "axios";
import { config } from "config";
import useOnClickOutside from "use-onclickoutside";
import { useRouter } from "next/router";

const search = () => {
  const router = useRouter();

  const [searhData, setSearchData] = useState([]);
  const [show, setShow] = useState(false);

  const [inputField, setInputField] = useState("");
  const clickRef = React.useRef();
  // useOnClickOutside(clickRef, show)

  const fetchSerchData = async () => {
    // alert("hello");
    try {
      const data = await axios.get(`${config.apiUrl}search`);
      const axiosData = data.data;
      setSearchData(axiosData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchSerchData();
  }, []);

  //If serch data is not avialable then reset the data
  useEffect(() => {
    if (inputField.length == "") {
      fetchSerchData();
    }
  }, [inputField]);

  //Set input value

  const handleFilter = async (event) => {
    const inputData = event.target.value;
    setInputField(inputData);

    try {
      if (inputData.length > 2) {
        const responce = await axios.get(
          `${config.apiUrl}search?q=${inputData}`
        );
        const data = responce.data;
        setSearchData(data);
      } else {
        const responce = await axios.get(`${config.apiUrl}search`);
        const data = responce.data;
        setSearchData(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //Onsubmit Action
  const submitForm = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <form className="d-flex w-50 input-box ms-4" onSubmit={submitForm}>
        <button className="btn-search" type="submit">
          <img src="/images/search.svg" alt="" width={20} height={20} />
        </button>

        <input
          className="form-control header-search me-2 shadow-none"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={handleFilter}
          ref={clickRef}
          onClick={() => setShow(!show)}
          onBlur={() => setShow(false)}
        />
        {show && (
          <div className="dataResult" onBlur={() => setShow(false)}>
            {searhData?.data?.category?.length ? (
              <div>
                <p
                  className="ps-3 font-12x mb-0 mt-3 fw-bold"
                  id="primary-color"
                >
                  CATEGORIES
                </p>
                {searhData.data &&
                  searhData.data.category.map((item, index) => {
                    return (
                      <>
                        {/* <button
                          onBlur={() => setShow(false)}
                          onClick={() => {
                            router.push(`/category/${item.slug}`);
                            setShow(false);
                            // alert("hello")
                          }}
                        >
                          <a className="dataItem ps-3">{item.name}</a>
                        </button> */}
                        <Link href={`/category/${item.slug}`} key={index}>
                          <a className="dataItem ps-3">{item.name}</a>
                        </Link>
                      </>
                    );
                  })}
              </div>
            ) : (
              console.log("No Category")
            )}
            {searhData?.data?.products?.length ? (
              <div>
                <p
                  className="ps-3 font-12x mb-0 mt-3 fw-bold"
                  id="primary-color"
                >
                  PRODUCTS
                </p>
                {searhData?.data?.products?.map((item, index) => {
                  return (
                    <>
                      <Link href={`/product/${item.slug}`} key={index}>
                        <a className="dataItem ps-3">{item.name}</a>
                      </Link>
                    </>
                  );
                })}
              </div>
            ) : null}
          </div>
        )}
      </form>
    </>
  );
};

export default search;
