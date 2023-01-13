import React from "react";

const Product = ({ details }) => {
  return (
    <>
      {details?.length
        ? details?.map((elm) => {
            return (
              <>
                <div className="col-lg-3">
                  <p className="font-16x">{elm.product_key}</p>
                </div>
                <div className="col-lg-9">
                  <p className="font-16x fw-bolder">{elm.product_value}</p>
                </div>
              </>
            );
          })
        : null}
    </>
  );
};

export default Product;
