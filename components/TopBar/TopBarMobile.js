import React from "react";

const TopBarMobile = () => {
  return (
    <>
      <div className="topBar py-2">
        <div className="container-fluid">
          <div className="row">
            <div className="col-l2 d-flex justify-content-between">
              <div className="d-flex">
                <img src="images/callWhite.svg" alt="call" />
                <a href="tel:98999 99999" className="font-14x ms-2">
                  (+91) 98999 99999
                </a>
              </div>
              <div className="d-flex">
                <img src="images/notepad.svg" alt="notepad" />
                <a href="" className="font-14x ms-2">
                  Post your Requirements
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopBarMobile;
