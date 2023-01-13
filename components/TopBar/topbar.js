const topbar = () => {
  return (
    <>
      <div className="topBar py-2">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="row">
                <div className="col-lg-6 d-flex">
                  <img src="images/callWhite.svg" alt="call" />
                  <a href="tel:98999 99999" className="font-14x ms-2">
                    (+91) 98999 99999
                  </a>
                </div>
                <div className="col-lg-6 d-flex">
                  <img src="images/starWhite.svg" alt="star" />
                  <a href="" className="font-14x ms-2">
                    Loyalty Points
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-6 d-flex justify-content-end">
              <img src="images/notepad.svg" alt="notepad" />
              <a href="" className="font-14x ms-2">
                Post your Requirements
              </a>
            </div>
          </div>
        </div>
      </div>
  

    </>
  );
};

export default topbar;
