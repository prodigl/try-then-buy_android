import React from 'react'

const index = () => {
    return (
        <>
            <div
                className="d-flex justify-content-between align-items-center"
                style={{ marginTop: "64px" }}
            >
                <p className="mb-0 font-18x fw-bold" id="twice-black">
                    Delivery man details
                </p>
                <p
                    className="mb-0 font-15x fw-bold"
                    id="alternative-blue"
                >
                    Call
                </p>
            </div>
            <hr />
            <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0 font-15x" id="secondry-text">
                    Name
                </p>
                <p className="mb-0 font-15x">Hitesh Kumar</p>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-3">
                <p className="mb-0 font-15x" id="secondry-text">
                    Email
                </p>
                <p className="mb-0 font-15x">hitesh@mail.com</p>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-3">
                <p className="mb-0 font-15x" id="secondry-text">
                    Phone{" "}
                </p>
                <p className="mb-0 font-15x">9999999999</p>
            </div>
        </>
    )
}

export default index