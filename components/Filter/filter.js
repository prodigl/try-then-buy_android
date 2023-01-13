import MultiRangeSlider from "components/MultiRangeSlider";
import { useState, useEffect, memo } from "react";
import api from "helpers/api";
import { useRouter } from "next/router"; 
import axios from "axios";
import { AuthValidation } from "providers/AuthContext";

const Filter = ({ categoryId, catetype, data, isSorting }) => {

  //Auth state managment -----------
  const {
    token
  } = AuthValidation();

  //AllState down there
  const [filter, setFilter] = useState("");
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

  //Fetching the type of filter by Category
  const filtertype = async () => {
    try {
      if (categoryId) {
        const url = `category-filters?category=${catetype}&id=${categoryId}`;
        const res = await api.get(url);
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
  }, [categoryId, catetype]);

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

    const isName = attribute.some(el => el.name === e.target.name);
    const isValue = attribute.some(el => el.value === e.target.value);
    console.log('attribute name',isName);
    // console.log('attribute value',isValue);

    if (isName) {
      const filtered = attribute.filter(el => el.name !== e.target.name && el.value !== e.target.value);
      // filtered.push({
      //   name: e.target.name, value: e.target.value
      // })
      console.log('attribute filtered',filtered)

      setAttribute(filtered);

      // setAttribute((old) => [
      //   ...old,
      //   { name: e.target.name, value: e.target.value }
      // ]);
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
    console.log('attribute',attribute);
      const sort = Object.keys(isSorting).length ? `sort_by=${isSorting.order}&order_by=${isSorting.price}&`:'';
      const url = `${router.route.split("/")[1]}/${slug}?min_price=${min}&max_price=${max}&${sort}`;
      const value = Object.keys(attribute).map((i) => {
        return (
          `attributes[${i}][key] = ${Object.values(attribute)[i]?.name}&attributes[${i}][value] =${Object.values(attribute)[i]?.value}&`
        )
      })
      const vColor = color.length ? `color[]=${color}&` : '';
      const vSizer = size.length ? `size[]=${size}&` : '';
      let mLink = url.concat(...value, vSizer, vColor);
      try {
        if(token) {
          const response = await api.get(mLink,{
            headers : {
              Authorization : `Bearer ${token}`
            }
          })
          data(response.data);

        }else {
          const response = await api.get(mLink)
          data(response.data);
        }
      }catch(error){
        console.log(error);
      }

  }, [color, size, attribute, min, max, isSorting,token]);

  //Shorting Duplication elemnet from array//
  const sortingDuplicate = (product) => {
    let i = [...new Set(product)]
    return i;
  };

  return (
    <>
      <div>

        {
          filter
            ?
            <>
              <p className="font-16x" id="secondry-text">
                APPLY FILTERS
              </p>
              {
                Object.keys(filter?.attributes)?.map((cate, index) => {
                  return (
                    <>

                      <p className="font-16x fw-bold">{cate}</p>
                      {filter?.attributes[cate]?.map((attribute, index) => {
                        return (
                          <>
                            <div className="filterCheckbox  d-flex align-items-center form-check mb-3 ps-0" key={index}>
                              <input
                                type="checkbox"
                                id="check1"
                                name={cate}
                                value={attribute}
                                onChange={getattribute}
                              />
                              <label className="form-check-label ms-2">
                                {attribute}
                              </label>
                            </div>
                          </>
                        );
                      })}
                    </>
                  );
                }
                )
              }
            </>
            : null}

        <p className="font-16x fw-bold"> 
          {filter?.color?.length ? "Color" : null}
        </p>
        {filter?.color
          ? sortingDuplicate(filter.color).map((attribute) => {
            return (
              <>
                <div className="filterCheckbox d-flex align-items-center form-check mb-3 ps-0">
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
          : null}

        <p className="font-16x fw-bold">
          {filter?.size?.length ? "Size" : null}
        </p>
        {filter.size
          ? sortingDuplicate(filter.size).map((attribute) => {
            return (
              <>
                <div className="filterCheckbox d-flex align-items-center form-check mb-3 ps-0">
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
          : null}

        <p className="font-16x fw-bold">{filter?.max_price && "Price Range"}</p>
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
  );
};

export default memo(Filter);
