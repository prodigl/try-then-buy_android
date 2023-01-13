import { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { CartVolume } from "providers/CartContext";
import { config } from "config";
import {useRouter} from 'next/router';


const Compare = ({ compare }) => {
  const { fetchCompare } = CartVolume();
  const [isShown, setIsShown] = useState(false);
    const router = useRouter();


  //Remove the all compare data
  const removeAllCompareData = () => {
    // localStorage.removeItem("compare");
    localStorage.setItem("compare", JSON.stringify([]));
    fetchCompare();

  };

  //Add category default src
  const addCategorySrc = (e) => {
    e.target.src = "/images/Category Placeholder.svg";
  };

  //Remove the items of array
  const removeSignleItem = (id) => {
    const item = compare.filter((compare) => compare.id !== id);
    console.log(item);
    localStorage.setItem("compare", JSON.stringify(item));
    fetchCompare();
  };

  return (
    <>
      <div className={`campare_section `}>
        <div className={`campare_section_inside `}>
          <div
            className={`campare_section_hoverdata ${isShown && "main-active"}`}
          >
            <div className="d-flex">
              {compare.length &&
                compare.map((product) => {
                  return (
                    <>
                      <div className="campare_card">
                        <div className="d-flex flex-column">
                          <div className="d-flex justify-content-between">
                            <img
                              src={`${config.productbasepath}${product.photo}`}
                              onError={addCategorySrc}
                              width="104px"
                              height="122px"
                            />
                            <div
                              onClick={() => removeSignleItem(product.id)}
                              style={{
                                cursor: "pointer",
                              }}
                            >
                              {/* <img src="/images/cross.svg" /> */}
                              <img src="/images/delete.svg" />
                            </div>
                          </div>
                          <p className="mb-0">
                            
                            {product?.name?.length <= 10
                          ? `${product?.name}`
                          : `${product?.name?.substring(0, 10)}..`}
                            </p>
                        </div>
                      </div>
                    </>
                  );
                })}
                {
                    compare.length > 1 && <div
                    className="compare_remove"
                    onClick={removeAllCompareData}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    Remove All
                  </div>
                }
              
            </div>
          </div>

          <OutsideClickHandler
            onOutsideClick={() => {
              setIsShown(false);
            }}
          >
            <div
              className="campare_link"
              onMouseEnter={() => setIsShown(true)}
              style={{
                cursor: "pointer",
              }}
              onClick={()=>router.push('/compare')}
            >
              <span>
                Compare
                <span className="ms-2">({compare?.length})</span>
              </span>
            </div>
          </OutsideClickHandler>
        </div>
      </div>
    </>
  );
};

export default Compare;
