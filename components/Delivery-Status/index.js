import React from 'react'

const index = () => {
    return (
        <>
            <div className="delivery-status">
                <img
                    src="/images/delivery-status.svg"
                    className="status-line"
                />
                <div className="d-flex justify-content-between align-items-start">
                    <div className="d-flex flex-column">
                        <p className="font-15x fw-bold mb-0">
                            Out for Delivery
                        </p>
                        <p className="font-12x" id="gray-text">
                            Delhi <span className="point-dash"></span> 12 Jul
                            10:30 am
                        </p>
                    </div>
                    <img src="/images/halfdelivery-circle.svg" />
                </div>
                <div className="d-flex justify-content-between align-items-start mt-4">
                    <div className="d-flex flex-column">
                        <p className="font-15x fw-bold mb-0">
                            Out for Delivery
                        </p>
                        <p className="font-12x" id="gray-text">
                            Delhi <span className="point-dash"></span> 12 Jul
                            10:30 am
                        </p>
                    </div>
                    <img src="/images/fulldelivary-circle.svg" />
                </div>
                <div className="d-flex justify-content-between align-items-start mt-4">
                    <div className="d-flex flex-column">
                        <p className="font-15x fw-bold mb-0">
                            Out for Delivery
                        </p>
                        <p className="font-12x" id="gray-text">
                            Delhi <span className="point-dash"></span> 12 Jul
                            10:30 am
                        </p>
                    </div>
                    <img src="/images/fulldelivary-circle.svg" />
                </div>
                <div className="d-flex justify-content-between align-items-start mt-4">
                    <div className="d-flex flex-column">
                        <p className="font-15x fw-bold mb-0">
                            Out for Delivery
                        </p>
                        <p className="font-12x" id="gray-text">
                            Delhi <span className="point-dash"></span> 12 Jul
                            10:30 am
                        </p>
                    </div>
                    <img src="/images/fulldelivary-circle.svg" />
                </div>
            </div>
        </>
    )
}

export default index