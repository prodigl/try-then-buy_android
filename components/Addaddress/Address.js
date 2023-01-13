import React from "react";
import { Modal, Button } from "react-bootstrap";

const Address = () => {
    return (
        <>
            <div className="product-cartDetails" style={{ width: "90%" }}>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <h1 className="font-18x fw-bold">Add new Address</h1>
                                </div>

                                <form method="post" onSubmit={saveAddress}>
                                <div>
                                    <div className="personal-info mt-3">
                                        <p className="mb-0 font-12x" id="secondry-text">
                                            Flat, House no., Building, Company, Apartment
                                        </p>
                                        <input
                                            type="text"
                                            className="form-control mt-2"
                                            name="street_address"
                                            style={{
                                                maxWidth: "100%",
                                            }}
                                            value={state.street_address}
                                            onChange={updateState}
                                            required
                                        />
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col-lg-4 col-12">
                                            <div className="personal-info">
                                                <p className="mb-0 font-12x" id="secondry-text">
                                                    Area, Street, Sector, Village
                                                </p>
                                                <input
                                                    type="text"
                                                    className="form-control mt-2"
                                                    name="address_line_1"
                                                    value={state.address_line_1}
                                                    onChange={updateState}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-4 col-12">
                                            <div className="personal-info">
                                                <p className="mb-0 font-12x" id="secondry-text">
                                                    Landmark
                                                </p>
                                                <input
                                                    type="text"
                                                    className="form-control mt-2"
                                                    name="address_line_2"
                                                    value={state.address_line_2}
                                                    onChange={updateState}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-4 col-12">
                                            <div className="personal-info">
                                                <p className="mb-0 font-12x" id="secondry-text">
                                                    Pincode
                                                </p>
                                                <input
                                                    type="text"
                                                    className="form-control mt-2"
                                                    name="postcode"
                                                    value={state.postcode} 
                                                    onChange={updateState}
                                                    oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..?)\../g, '$1');" 
                                                    maxLength="6" 
                                                    minLength="6"
                                                    required
                                                />
                                                
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col-lg-4 col-12">
                                            <div className="personal-info">
                                                <p className="mb-0 font-12x" id="secondry-text">
                                                    City
                                                </p>
                                                <input
                                                    type="text"
                                                    className="form-control mt-2"
                                                    name="city"
                                                    value={state.city}
                                                    onChange={updateState}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-4 col-12">
                                            <div className="personal-info">
                                                <p className="mb-0 font-12x" id="secondry-text">
                                                    State
                                                </p>
                                                <input
                                                    type="text"
                                                    className="form-control mt-2"
                                                    name="state"
                                                    value={state.state}
                                                    onChange={updateState}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-4 col-12">
                                            <div className="personal-info">
                                                <p className="mb-0 font-12x" id="secondry-text">
                                                    Address Type
                                                </p>
                                                <select className='form-select mt-2 font-12x ' name="address_type" required onChange={(e)=>{
                                                    setState({
                                                        ...state,
                                                        address_type: e.target.value
                                                    })
                                                }} 
                                                
                                                >
                                                    <option selected disabled value="">Choose...</option>
                                                   
                                                    <option value="home">
                                                        Home
                                                    </option>
                                                    <option value="work">
                                                        Work
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col-lg-4 col-12">
                                            <div className="personal-info">
                                                <p className="mb-0 font-12x" id="secondry-text">
                                                    Name
                                                </p>
                                                <input
                                                    type="text"
                                                    className="form-control mt-2"
                                                    // placeholder="Enter your Name"
                                                    name="title"
                                                    value={state.title}
                                                    onChange={updateState}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-4 col-12">
                                            <div className="personal-info">
                                                <p className="mb-0 font-12x" id="secondry-text">
                                                    Phone
                                                </p>
                                                <input
                                                    type="text"
                                                    className="form-control mt-2"
                                                    // placeholder="Enter your Name"
                                                    name="phone"
                                                    value={state.phone}
                                                    onChange={updateState}
                                                    maxLength="10" 
                                                    minLength="10"
                                                    required
                                                />
                                            </div>
                                        </div>


                                    </div>
                                    <div className="radio-custome d-flex align-items-center mt-4">

                                        <input type="checkbox" 
                                        name="address" 
                                        value="false"
                                        // value={address?.id} 
                                        className="m-0"
                                            // onClick={() => setEditable(address?.id)}
                                            onClick={()=>setDefault(!idefault)}
                                        />
                                        <span className="mb-0 font-12x" id="secondry-text">&nbsp;&nbsp; Add as default Address</span>
                                    </div>

                                </div>

                                <button
                                    className="add-to-cart-product mt-5"
                                    style={{ width: "190px" }}
                                    // onClick={saveAddress}
                                    
                                    type="submit"
                                >
                                    SAVE ADDRESS
                                </button>
                                </form>
                            </div>
        </>
    );
};

export default Address;
