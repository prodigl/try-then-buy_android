import { useState, useEffect, memo, useRef } from "react";
import Link from "next/link";
import { AuthValidation } from "providers/AuthContext";
import { useRouter } from "next/router";
import api from "helpers/api";
import MultiRangeSlider from "components/MultiRangeSlider";

const Sorting = ({
  setIsSorting,
  sortingFilter,
  setSortingFilter,
  categoryId,
  catetype,
  data,
  isSorting,
  updateProductData,
  updateSliderDeactive
}) => {
  //Auth state managment -----------
  const {
    token
  } = AuthValidation();

  //AllState down there
  const [filter, setFilter] = useState("");

   //Fetching the type of filter by Category
   const filtertype = async () => {
    try {
      if (categoryId && catetype && sortingFilter) {
        const url = `category-filters?category=${catetype}&id=${categoryId}`;
        const res = await api.get(url);
        console.log('filter responce',res.data);
        if (res) {
          setFilter(res.data);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  //Component will update conditon
  useEffect(() => {
    filtertype();
  }, [categoryId, catetype, sortingFilter]);

  //Size
  const [size, setSize] = useState([]);
  //Color
  const [color, setColor] = useState([]);
  //min_price
  const [min, setMin] = useState(filter?.min_price);
  //max_price
  const [max, setMax] = useState(filter?.max_price);
  //Attributes
  const [attribute, setAttribute] = useState([]);

  const typeChecked = useRef(null);

  //Inserting Size in size State
  const getSizeValue = (e) => {
    let value = e.target.value;
    const findValue = size.includes(value);
    if (findValue) {
      const filtered = size.filter(size => size !== value);
      setSize(filtered);
    } else {
      setSize([...size, value]);
    }
  };

  //Inserting color in color state
  const getColorValue = (e) => {
    let value = e.target.value;
    const findValue = color.includes(value);
    if (findValue) {
      const filtered = color.filter(color => color !== value);
      setColor(filtered);
    } else {
      setColor([...color, value]);
    }
  };



  const getattribute = (e) => {

    const isValue = attribute.some(el => el.name === e.target.name);
    console.log(isValue);

    if (isValue) {
      const filtered = attribute.filter(el => el.name !== e.target.name && el.value !== e.target.value);
      filtered.push({
        name: e.target.name, value: e.target.value
      })
      console.log('attribute filtered', filtered)

      setAttribute(filtered);
    } else {
      setAttribute((old) => [
        ...old,
        { name: e.target.name, value: e.target.value }
      ]);

    }
  };


  const router = useRouter();

  const slug = router.query.slug;



  useEffect(async () => {

    const sort = Object.keys(isSorting).length ? `sort_by=${isSorting.order}&order_by=${isSorting.price}&` : '';
    const url = `${router.route.split("/")[1]}/${slug}?min_price=${filter?.min_price}&max_price=${filter?.max_price}&${sort}`;
    const value = Object.keys(attribute).map((i) => {
      return (
        `attributes[${i}][key] = ${Object.values(attribute)[i].name}&attributes[${i}][value] =${Object.values(attribute)[i].value}&`
      )
    })
    const vColor = color.length ? `color[]=${color}&` : '';
    const vSizer = size.length ? `size[]=${size}&` : '';
    let mLink = url.concat(...value, vSizer, vColor);
    try {
      if (token) {
        const response = await api.get(mLink, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        data(response.data);

      } else {
        const response = await api.get(mLink)
        data(response.data);
      }
    } catch (error) {
      console.log(error);
    }

  }, [color, size, attribute, min, max, isSorting, token]);

  //Shorting Duplication elemnet from array//
  const sortingDuplicate = (product) => {
    let i = [...new Set(product)]
    return i;
  };

  const appyFilter = () => {
    setSortingFilter(false);
    updateSliderDeactive();
  }

  const resetFilter = () => {
    setCatFilter("");
    setSortingFilter(false);
    updateProductData();
    updateSliderDeactive();

  }

  const isfilterExist = filter && Object.keys(filter?.attributes)[0];



  const [catFilter, setCatFilter] = useState();

  useEffect(() => {
    if (filter) {
      setCatFilter(isfilterExist);

    }
    return () =>setCatFilter();
  }, [filter])

  const filterData = (data) => {
    console.log('filterData onclick', data)
    if (data) {
      setCatFilter(data)
      console.log(typeChecked.current)
    }
  }


  return (
    <>
      <div
        className={
          sortingFilter
            ? "searchMenuWrapper menuWrapper-active"
            : "searchMenuWrapper"
        }
      >
        <div className="menuContainer">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 d-flex align-items-center py-3 mobile-header-fixed">
                <img
                  src="/images/cross.svg"
                  alt=""
                  className="img-fluid"
                  onClick={() => {setSortingFilter(false), updateSliderDeactive()}}
                />

              </div>
            </div>


            <div className="row" style={{ marginTop: '50px' }}>
              <div className="col-6 px-0 mobile-side-category pb-5">
                {filter && Object.keys(filter?.attributes)?.map((cate, index) => {
                  return (
                    <>
                      <ul className={cate === catFilter ? "mobile-sec-category-active" : "mobile-sec-category"} onClick={() => filterData(cate)}>
                        <li>
                          {cate}
                        </li>
                      </ul>
                    </>
                  );
                })}

                {filter?.color?.length ?
                  <ul className={"color" === catFilter ? "mobile-sec-category-active" : "mobile-sec-category"} onClick={() => filterData("color")}>
                    <li>
                      {filter?.color?.length ? "Color" : null}
                    </li>
                  </ul>
                  : null}

                {filter?.size?.length ?
                  <ul className={"size" === catFilter ? "mobile-sec-category-active" : "mobile-sec-category"} onClick={() => filterData("size")}>
                    <li>
                      {filter?.size?.length ? "Size" : null}
                    </li>
                  </ul>
                  : null}

                <ul className={"sortBy" === catFilter ? "mobile-sec-category-active" : "mobile-sec-category"} onClick={() => filterData("sortBy")}>
                  <li>
                    Sort By
                  </li>
                </ul>

                <ul className={"priceBy" === catFilter ? "mobile-sec-category-active" : "mobile-sec-category"} onClick={() => filterData("priceBy")}>
                  <li>
                    {filter?.max_price && "Price Range"}
                  </li>
                </ul>
              </div>
              <div className="col-6 mobile-side-subcategory px-2" >

                {catFilter ?
                  filter?.attributes[catFilter]?.map((attributes, index) => {
                    return (
                      <>
                        <div className="filterCheckbox d-flex align-items-center form-check my-3 ps-0" key={index}>
                          <input
                            type="radio"
                            name={catFilter}
                            value={attributes}
                            ref={typeChecked}
                            onChange={getattribute}
                          />
                          <label className="form-check-label ms-2">
                            {attributes}
                          </label>
                        </div>
                      </>
                    );
                  })
                  :
                  null
                }

                {catFilter === 'color' ? filter?.color
                  ? sortingDuplicate(filter.color).map((attribute) => {
                    return (
                      <>
                        <div className="filterCheckbox d-flex align-items-center form-check my-3 px-2">
                          <input
                            type="checkbox"
                            id="check1"
                            name="color"
                            value={attribute}
                            onChange={getColorValue}
                          />
                          <label className="form-check-label ms-2">{attribute}</label>
                        </div>
                      </>
                    );
                  })
                  : null : null}

                {catFilter === 'size' ? filter.size
                  ? sortingDuplicate(filter.size).map((attribute) => {
                    return (
                      <>
                        <div className="filterCheckbox d-flex align-items-center form-check my-3 px-2">
                          <input
                            type="checkbox"
                            id="check1"
                            name="color"
                            value={attribute}
                            onChange={getSizeValue}
                          />
                          <label className="form-check-label ms-2">{attribute}</label>
                        </div>
                      </>
                    );
                  })
                  : null : null}

                {catFilter === 'priceBy' ?
                  <>
                    <div className="filterCheckbox d-flex align-items-center form-check my-3 ps-0">
                      {filter?.max_price ? (
                        <div className="sliderContainer">
                          <MultiRangeSlider
                            min={filter?.min_price}
                            max={filter?.max_price}
                            getValue={({ min, max }) => {
                              // `min = ${min}, max = ${max}`
                              // console.log('min', min)
                              setMin(min);
                              setMax(max);
                            }}
                          />
                        </div>
                      ) : null}
                    </div>
                  </>

                  : null}

                {catFilter === 'sortBy' ?
                  <>
                    <div className="filterCheckbox d-flex align-items-center form-check my-3 px-1">
                      <div className="radio-custome">
                        <input type="radio"
                          name="sortby"
                          value="asc"
                          className="m-0"
                          onChange={(e) => setIsSorting({
                            price: 'price',
                            order: e.target.value
                          })}
                        // checked={sortingFilter.order == 'asc'}
                        />
                      </div>
                      <label className="form-check-label ms-2">Price : Low to High</label>
                    </div>

                    <div className="filterCheckbox d-flex align-items-center form-check my-3 px-1">
                      <div className="radio-custome">
                        <input type="radio"
                          name="sortby"
                          value="desc"
                          className="m-0"
                          onChange={(e) => setIsSorting({
                            price: 'price',
                            order: e.target.value
                          })}
                        // checked={sortingFilter.order == 'desc'}
                        />
                      </div>
                      <label className="form-check-label ms-2">Price : High to Low</label>
                    </div>


                  </>
                  : null}
              </div>
            </div>


            <div className="row px-0 mx-0 product-add-subject">
              <div className="col-6 px-0">
                <button
                  className="w-100"
                  onClick={resetFilter}
                >
                  <div className="add-to-cart">
                    <p className="font-16x mb-0 ms-1 text-white">
                      Reset All
                    </p>
                  </div>
                </button>
              </div>
              <div className="col-6 px-0">
                <button
                  className="w-100"
                  onClick={appyFilter}
                >
                  <div className="buy-now">
                    <p className="font-16x mb-0 ms-1 text-white">
                      Apply
                    </p>
                  </div>
                </button>
              </div>
            </div>


          </div>
        </div>
      </div>

    </>
  )
}

export default memo(Sorting);
