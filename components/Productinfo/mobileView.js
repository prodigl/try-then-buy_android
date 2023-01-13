import React from 'react'

const mobileView = ({ details }) => {
    return (
        <>
            {
                details.length ?
                    <div>
                        <hr className="product-details-horizental" />
                        <div className="row">
                            {
                                details?.slice(0, 4)?.map((elm) => {
                                    return (
                                        <>
                                            <div className="col-6 d-flex align-items-center">
                                                <img src="/images/warrenty.svg" alt="" />
                                                <div className="d-flex flex-column ms-2">
                                                    <p className="mb-0 font-16x fw-bold">{elm.product_value.length > 20 ? elm.product_value.substring(0,19) + '...' : elm.product_value}</p>
                                                    <p
                                                        className="mb-0 font-14x fw-light"
                                                        id="secondry-text"
                                                    >
                                                        {elm.product_key}
                                                    </p>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })
                            }


                        </div>
                        <hr className="product-details-horizental" />
                    </div>
                    : null
            }

        </>
    )
}

export default mobileView