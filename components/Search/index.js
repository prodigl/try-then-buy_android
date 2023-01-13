import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { config } from "config";
import { useRouter } from "next/router";
import api from "helpers/api";
import OutsideClickHandler from 'react-outside-click-handler'; 

const Search = () => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [category, setCategory] = useState([]);
  const [product, setProduct] = useState([]);
  const [isSearch, setIsSearch] = useState('');

  let value;
  const handleSearch = async (e) => {
    value = e.target.value;
    console.log('value', value);
    setIsSearch(value)
  }


  useEffect(async () => {
    if (isSearch.length == '') {
      setCategory([]);
      setProduct([]);
    } else {
      if (isSearch.length > 3) {
        try {
          //Finding Category
          const urlcate = `search-category?q=${isSearch}`;
          const res = await api.get(urlcate);
          console.log('category search', res.data);
          setCategory(res.data);

          //Finding Product
          const urlprod = `search-product?q=${isSearch}`;
          const responce = await api.get(urlprod);
          console.log('product search', responce.data);
          setProduct(responce.data);

        } catch (error) {
          console.log(error)
        }
      }
    }

    return () => {
      setCategory([]);
      setProduct([]);
    }
  }, [isSearch])

  const searchManualData = (e) => {
    e.preventDefault();
    if (isSearch.length) {
      router.push(`/search?q=${isSearch && isSearch}`);
    }
  }



  return (
    <>

      <form className="d-flex w-50 input-box ms-4" onSubmit={searchManualData} >
        <button className="btn-search" type="submit">
          <img src="/icons/client/search.svg" width={20} height={30} />
        </button>

        <input
          className="form-control header-search me-2 shadow-none"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={handleSearch}
          onClick={() => setShow(!show)}
          name="q"
          value={isSearch}
        />
        {
          show &&
          <OutsideClickHandler onOutsideClick={() => setShow(false)}>
            <div className="dataResult">
              {
                category.length ?
                  (
                    <>
                      <p className="ps-3 font-12x mb-0 mt-3 fw-bold" id="primary-color">
                        CATEGORIES
                      </p>
                      {
                        category.map((category) => {
                          return (
                            <>
                              {
                                !category.category_id && !category.subcategory_id &&
                                <>
                                  <Link href={`/category/${category.slug}`}>
                                    <a className="dataItem ps-3">{category.name}</a>
                                  </Link>
                                  {
                                    category.subs.length ? category.subs.map((category) => {
                                      return (
                                        <>
                                          <Link href={`/sub-category/${category.slug}`}>
                                            <a className="dataItem ps-3">{category.name}</a>
                                          </Link>
                                          {
                                            category.childs.length ? category.childs.map((category) => {
                                              return (
                                                <>
                                                  <Link href={`/child-category/${category.slug}`}>
                                                    <a className="dataItem ps-3">{category.name}</a>
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
                                      <a className="dataItem ps-3">{category.name}</a>
                                    </Link>
                                    {
                                      category.childs.length ? category.childs.map((category) => {
                                        return (
                                          <>
                                            <Link href={`/child-category/${category.slug}`}>
                                              <a className="dataItem ps-3">{category.name}</a>
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
                                      <a className="dataItem ps-3">{category.name}</a>
                                    </Link>
                                   
                                  </>
                                  : null
                              }
                              {/* {
                                !category.childs &&
                                <Link href={`/category/${category.slug}`}>
                                  <a className="dataItem ps-3">{category.name}</a>
                                </Link>
                              }
                              {
                                !category.subs ?
                                  <Link href={`/sub-category/${category.slug}`}>
                                    <a className="dataItem ps-3">{category.name}</a>
                                  </Link> : ''
                              }
                              {
                                category?.childs?.length ?
                                  category?.childs?.map((child) => {
                                    return (
                                      <>
                                        <Link href={`/child-category/${child.slug}`}>
                                          <a className="dataItem ps-3">{child.name}</a>
                                        </Link>
                                      </>
                                    )
                                  }) : ''
                              } */}
                            </>
                          )
                        })
                      }

                    </>
                  )
                  : null
              }

              {
                product?.data?.length ?
                  <>
                    <p className="ps-3 font-12x mb-0 mt-3 fw-bold" id="primary-color">
                      Product
                    </p>
                    {
                      product?.data?.map((product) => {
                        return (
                          <>

                            <Link href={`/product/${product.slug}`}>
                              <a className="dataItem ps-3">{product.name}</a>
                            </Link>
                          </>
                        )
                      }
                      )
                    }
                  </>
                  : null


              }

            </div>
          </OutsideClickHandler>
        }


      </form>
    </>
  );
};

export default Search;
