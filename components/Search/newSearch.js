import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import axios from "axios";
import { config } from "config";

const SearchBar = () => {
    // query 👇 inside input 
    const [searchQuery, setSearchQuery] = useState("");
    const [searhData, setSearchData] = useState([])
    const [activeIndex, setActiveIndex] = useState(-1);

    const inputRef = useRef(null);

    // manage when dropdown is in view 👇
    const [inFocus, setInFocus] = useState(false);


    const fetchData = async () => {
        try {

            const data = await axios.get(`${config.apiUrl}search`);
            const axiosData = data.data;
            setSearchData(axiosData);

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchData();
    }, [])

    const handleOnChange = (e) => {
        // 👇 update query when user types
        setSearchQuery(e.target.value);
        setInFocus(true);
        // setActiveIndex(-1);
    };

    const findSearchResults = (e) => {
        // 👇 stopped default navigate to /search?q=searchQuery based on form action
        e.preventDefault();
        // 👇 remove focus from input
        // inputRef.current.blur();
        // setInFocus(false);
    };

    return (
        <form
            className="d-flex w-50 input-box ms-4"
            action="/search"
            method="GET"
            onSubmit={findSearchResults}
        >
            <div className="d-flex">
                <input
                    className="form-control me-2"
                    type="text"
                    name="q"
                    placeholder="Search..."
                    autoComplete="off"
                    value={searchQuery}
                    onChange={handleOnChange}
                    ref={inputRef}
                    onFocus={() => {
                        // 👇 show dropdown on focus
                       
                        setInFocus(true);
                    }}
                    onBlur={() => {
                        // 👇 hide dropdown when focus leaves
                       
                        // setInFocus(false);
                    }}

                />
                <button className="btn-search" type="submit">
                    <img src="/images/search.svg" alt="" />
                </button>
            </div>
            {inFocus && (
                <div className='dataResult' 
                onFocus={() => {
                    // 👇 show dropdown on focus
                   
                    setInFocus(true);
                }}
                onBlur={() => {
                    // 👇 hide dropdown when focus leaves
                   
                    setInFocus(false);
                }}
                tabindex="0" 
                
                >

                    <div
                    
                    >
                        {searhData?.data?.category?.length ?
                            <div>
                                <p className='ps-3 font-16x mb-0 mt-3' id='primary-color'>Category</p>
                                {

                                    searhData?.data && searhData?.data?.category.map((item, index) => {
                                        return (
                                            <>
                                                <Link href={`/category/${item.slug}`}>
                                                    <a className={activeIndex === index ? "dataItem ps-3 active" : "dataItem ps-3 "}>{item.name}</a>
                                                </Link>

                                            </>
                                        )
                                    })
                                }
                            </div>
                            : console.log('No Category')
                        }
                        {searhData?.data?.products?.length ?
                            <div>
                                <p className='ps-3 font-16x mb-0 mt-3' id='primary-color'>Product</p>
                                {

                                    searhData?.data?.products?.map((item) => {
                                        return (
                                            <>
                                                <Link href={`/category/product/${item.slug}`}>
                                                    <a className='dataItem ps-3'>{item.name}</a>

                                                </Link>
                                            </>
                                        )
                                    })
                                }
                            </div> : console.log('no product')
                        }
                    </div>

                    {/* : 'No Items there!'
                }  */}


                </div>
            )}
        </form>
    );
};

export default SearchBar;
