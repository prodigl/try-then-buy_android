import React, { useState } from "react";
import MultiRangeSlider from "components/MultiRangeSlider";
import Dropdown from "components/PostRequirements/Dropdown";
import DropdownArray from "components/PostRequirements/DropdownArray";
import { Header } from "components";
import Footer from "components/Footer";

export const colors = [
  {
    id: 1,
    color: "#FF0000",
  },
  {
    id: 2,
    color: "#0000FF",
  },
  {
    id: 3,
    color: "#00FF00",
  },
  {
    id: 4,
    color: "#A020F0",
  },
];

const Post = () => {
  //form data states
  const [postRData, setPostRData] = useState({
    category: "",
    subCategory: "",
    subSubCategory: "",
    productBrand: [],
    material: [],
    size: [],
    fabric: [],
    priceRange: {
      minV: 0,
      maxV: 0,
    },
    colorsArray: [],
  });

  console.log("postRData: ", postRData);

  //deleteColor
  const deleteColor = (index) => {
    //using splice method
    // postRData.productBrand.splice(item, 1);
    // setPostRData({ ...postRData, productBrand: postRData.productBrand });

    //using filter method
    let filterData = postRData.colorsArray.filter((ele, i) => {
      return i !== index;
    });
    setPostRData({ ...postRData, colorsArray: filterData });
  };

  return (
    <>
    <Header />
      <div className="">
        <div className="postRequirement container-fluid container-lg">
          <h1 className="font-26x fw-bold text-dark mb-2">
            Post your requirements
          </h1>
          <p className="mb-2 mt-4 font-12x" id="secondry-text">
            Select Category(<span style={{ color: "#F15733" }}>*</span>)
          </p>

          <div className="row">
            <Dropdown
              type="text"
              placeholder="Select Category"
              className="form-control postr-inputfield"
              postRData={postRData.category}
              setPostRData={(x) => setPostRData({ ...postRData, category: x })}
            />
            <Dropdown
              type="text"
              placeholder="Select sub Category"
              className="form-control postr-inputfield"
              postRData={postRData.subCategory}
              setPostRData={(x) =>
                setPostRData({ ...postRData, subCategory: x })
              }
            />
            <Dropdown
              type="text"
              placeholder="Select sub sub Category"
              className="form-control postr-inputfield"
              postRData={postRData.subSubCategory}
              setPostRData={(x) =>
                setPostRData({ ...postRData, subSubCategory: x })
              }
            />
          </div>

          <div className="row mt-2 mt-md-5">
            <DropdownArray
              label="Select Product Brands"
              type="text"
              placeholder="Select from available product brands"
              className="form-control postr-inputfield"
              postRData={postRData.productBrand}
              setPostRData={(x) =>
                setPostRData({
                  ...postRData,
                  productBrand: [...postRData.productBrand, x],
                })
              }
              onDelete={(x) =>
                setPostRData({
                  ...postRData,
                  productBrand: x,
                })
              }
            />
            <DropdownArray
              label="Select Available Materials"
              type="text"
              placeholder="Select from available materials"
              className="form-control postr-inputfield"
              postRData={postRData.material}
              setPostRData={(x) =>
                setPostRData({
                  ...postRData,
                  material: [...postRData.material, x],
                })
              }
              onDelete={(x) =>
                setPostRData({
                  ...postRData,
                  material: x,
                })
              }
            />
            <DropdownArray
              label="Select Available Sizes"
              type="text"
              placeholder="Select from available sizes"
              className="form-control postr-inputfield"
              postRData={postRData.size}
              setPostRData={(x) =>
                setPostRData({
                  ...postRData,
                  size: [...postRData.size, x],
                })
              }
              onDelete={(x) =>
                setPostRData({
                  ...postRData,
                  size: x,
                })
              }
            />
          </div>

          <div className="row mt-2 mt-md-5">
            <DropdownArray
              label="Select Available Fabrics"
              type="text"
              placeholder="Select from available fabrics"
              className="form-control postr-inputfield"
              postRData={postRData.fabric}
              setPostRData={(x) =>
                setPostRData({
                  ...postRData,
                  fabric: [...postRData.fabric, x],
                })
              }
              onDelete={(x) =>
                setPostRData({
                  ...postRData,
                  fabric: x,
                })
              }
            />

            <div className="col-12 col-md-4">
              <p className="mb-2 font-12x" id="secondry-text">
                Price Range
              </p>
              <div className="sliderContainer">
                <MultiRangeSlider
                  min={5000}
                  max={25000}
                  getValue={({ min, max }) => {
                    console.log(`min = ${min}, max = ${max}`);
                    // setPostRData({
                    //   ...postRData,
                    //   priceRange: {
                    //     minV: min,
                    //     maxV: max,
                    //   },
                    // });
                  }}
                />
              </div>
            </div>

            <div className="col-12 col-md-4 mt-5 mt-md-0">
              <p className="mb-2 font-12x mt-1 mt-md-0" id="secondry-text">
                Select Available Colors
              </p>
              <div className="mt-0 mt-md-3 d-flex choose-color">
                {postRData.colorsArray !== "" &&
                  postRData?.colorsArray?.map((item, i) => {
                    return (
                      <>
                        <div
                          className="circle-inside-color"
                          style={{
                            backgroundColor: `${item}`,
                          }}
                          onClick={() => {
                            deleteColor(i);
                          }}
                        ></div>
                      </>
                    );
                  })}
                <button className="add-color">
                  <img src="/images/choose-color.svg" alt="" />
                  <div className="choosen-color">
                    <p className="mb-2 font-16x fw-bold" id="secondry-text">
                      Available Colors
                    </p>
                    <div className="d-flex flex-wrap flex-row align-items-center">
                      {colors.map((item, i) => {
                        return (
                          <>
                            <input
                              type="checkbox"
                              id="check1"
                              name="option1"
                              value={item.color}
                              onChange={(e) =>
                                setPostRData({
                                  ...postRData,
                                  colorsArray: [
                                    ...postRData.colorsArray,
                                    e.target.value,
                                  ],
                                })
                              }
                              className="colors"
                              style={{ backgroundColor: `${item.color}` }}
                              disabled={
                                postRData.colorsArray.includes(item.color)
                                  ? true
                                  : false
                              }
                              checked={
                                postRData.colorsArray.includes(item.color)
                                  ? true
                                  : false
                              }
                            />
                          </>
                        );
                      })}
                    </div>
                  </div>
                </button> 
              </div>
            </div>
          </div>

          <button
            className="add-to-cart-product mt-5"
            style={{ width: "257px" }}
          >
            POST YOUR REQUIREMENTS
          </button>
        </div>
      </div>
    <Footer />
                 
      {/* mobile view */}
    </>
  );
};

export default Post;
