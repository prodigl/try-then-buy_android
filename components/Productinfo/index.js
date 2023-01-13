const App = ({ details }) => {
    return (
        <>


            <hr className="product-details-horizental" /> 
            <div className="row">
                {details?.length
                    ? details?.slice(0,4)?.map((elm) => {
                        return (
                            <>

                                <div className="col-lg-3 d-flex align-items-center">
                                    <img src="/images/warrenty.svg" />
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
                        );
                    })
                    : null}

                
            </div>
            <hr className="product-details-horizental" />

        </>
    )
}

export default App;