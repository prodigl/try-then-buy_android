import { useState, useEffect, memo } from "react";
import { Modal, Button } from "react-bootstrap";

const Review = ({ show, handleClose, user }) => {
  const [valuerate, setValue] = useState('');
  // const handleClose = () => setShow(false);
  const [isUser, setUser] = useState(user?.data?.data);
  const rating = ['5', '4', '3', '2', '1'];

  const handleValue = (e) => {
    setValue(e)
  };

  useEffect(() => {
    if (valuerate) {
      const is = user?.data?.data;
      if (is) {
        const newUser = is.filter((user) => user.rating ==  valuerate);
        setUser(newUser);
      }
    } else {
      setUser(user?.data?.data)
    }
    return () => {
      setUser(user?.data?.data);
    }
  }, [valuerate, show])

  useEffect(() => {
    setValue("")
  }, [handleClose])

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="reviewModal"
        >

        <Modal.Header closeButton>
          <div className="d-flex" style={{ overflow: 'auto' }}>
            {rating.map((value) => {
              return (
                <>

                  <div className={value === valuerate ? "rating-star-select me-3" : "rating-star me-3"} onClick={() => handleValue(value)}>
                    {value}
                    <img
                      src="/images/star.svg"
                      alt=""
                      className=" ps-1"
                    />
                  </div>

                </>
              );
            })}
          </div>
        </Modal.Header>
        <Modal.Body >
          <div className="product-details-comment" style={{maxHeight:'65vh', overflow:'auto'}}>
            {
              isUser?.length ?
                isUser?.map((review) => {
                  return (
                    <>
                      <div className="userinfo mb-5">
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="d-flex align-items-center">
                            <img
                              src="/images/user-image.svg"
                              className="img-fluid"
                            />
                            <p className="mb-0 font-18x ms-3">{review.user.name}</p>
                          </div>

                          <div className="d-flex justify-content-between align-items-center">
                            <p className="mb-0 font-18x">{review.rating}</p>
                            {[...Array(5)].map((_, i) => {
                              return (
                                <>
                                  {review.rating > i && (
                                    <img
                                      src="/images/star.svg"
                                      className="img-fluid ps-1"
                                    />
                                  )}
                                </>
                              );
                            })}
                          </div>
                        </div>
                        <p className="mb-0 font-16x mt-4">{review.details}</p>
                      </div>
                    </>
                  );
                })
                : <p>No Review</p>
            }
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default memo(Review);
