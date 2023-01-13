import React from 'react'

const Address = ({address}) => {
    return (
        <>
            <p id="karla" className="font-15x fw-bold">
                Delivery address
            </p>

            <p className="font-12x mb-0" id="secondry-text">
                {address?.title}
            </p>
            <p className="font-12x mb-0 mt-1" id="secondry-text">
            {address?.phone}
            </p>
            <p className="font-12x mb-0 mt-1" id="secondry-text">
                {address?.street_address}
            </p>
            <p className="font-12x mb-0 mt-1" id="secondry-text">
            {address?.address_line_1}
            </p>
            <p className="font-12x mb-0 mt-1" id="secondry-text">
            {address?.address_line_2}
            </p>
            <p className="font-12x mb-0 mt-1" id="secondry-text">
            {address?.city} | {address?.postcode} | {address?.state}
            </p>
        </>
    )
}

export default Address