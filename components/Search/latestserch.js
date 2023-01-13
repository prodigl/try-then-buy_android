import React, { useEffect, useState, useRef } from "react";
import listenForOutsideClick from "./latest";

const Menu = () => {
  const menuRef = useRef(null);
  const [listening, setListening] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [inputField, setInputField] = useState("");
  const [show, setShow] = useState(false);
  const [searhData, setSearchData] = useState([]);
  useEffect(listenForOutsideClick(listening, setListening, menuRef, setIsOpen));

  const fetchData = async () => {
    try {
      const data = await axios.get(`${config.apiUrl}search`);
      const axiosData = data.data;
      setSearchData(axiosData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  //If serch data is not avialable then reset the data
  useEffect(() => {
    if (inputField.length == "") {
      fetchData();
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

  return (
    <div ref={menuRef} >
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={handleFilter}
   
          onClick={toggle}
          // onBlur={() => setShow(false)}
        />
    
 
          <div className="dataResult" onBlur={() => setShow(false)}>
            {searhData?.data?.category?.length ? (
              <div>
                <p className="ps-3 font-16x mb-0 mt-3" id="primary-color">
                  Category
                </p>
                {searhData.data &&
                  searhData.data.category.map((item, index) => {
                    return (
                      <>
                        <button
                          onBlur={() => setShow(false)}
                          onClick={() => {
                            router.push(`/category/${item.slug}`);
                            setShow(false);
                            // alert("hello")
                          }}
                        >
                          <a className="dataItem ps-3">{item.name}</a>
                        </button>
                        <Link
                          href={`/category/${item.slug}`}
                          key={index}
                          onClick={setHide}
                        >
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
                <p className="ps-3 font-16x mb-0 mt-3" id="primary-color">
                  Product
                </p>
                {searhData?.data?.products?.map((item, index) => {
                  return (
                    <>
                      <Link
                        href={`/product/${item.slug}`}
                        key={index}
                        onClick={setHide}
                      >
                        <a className="dataItem ps-3">{item.name}</a>
                      </Link>
                    </>
                  );
                })}
              </div>
            ) : null}
          </div>

    </div>
  );
};

export default Menu;
