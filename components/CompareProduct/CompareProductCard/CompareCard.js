import React, { useState } from "react";
import { CartVolume } from "providers/CartContext";
import { config } from "config";
import Dropdown from "../CompareProductDropdown/Dropdown";

const CompareCard = () => {
  const { compare } = CartVolume();

  //Add default src for 404 image
  const addDefaultSrc = (e) => {
    e.target.src = "/images/error-product-image.png";
  };

  const [comparePDetails, setComparePDetails] = useState({
    category: "",
    subCategory: "",
    searchValue: "",
  });
  console.log("comparePDetails1 ", comparePDetails);

  return (
    <>
      <div className="col-lg-3">
        <div className="product-box m-0" style={{ width: "100%" }}>
          <div className="card product-card">
            <div className="select-image">
              <button className="font-18x fw-bold">+ Add Product</button>
            </div>
            <div className="card-body ">
              <Dropdown
                title="Choose Category"
                comparePDetails={comparePDetails.category}
                setComparePDetails={(x) =>
                  setComparePDetails({ ...comparePDetails, category: x })
                }
              />
              <Dropdown
                title="Choose Sub Category"
                comparePDetails={comparePDetails.subCategory}
                setComparePDetails={(x) =>
                  setComparePDetails({ ...comparePDetails, subCategory: x })
                }
              />
              {/* <Dropdown>
                          <Dropdown.Toggle id="dropdown-basic">
                            Choose Sub Category
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <input type="text" className="w-100" />
                          </Dropdown.Menu>
                        </Dropdown> */}
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="Search Product"
                  className="input-box-size pb-1"
                  value={comparePDetails.searchValue}
                  onChange={(e) =>
                    setComparePDetails({
                      ...comparePDetails,
                      searchValue: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompareCard;
