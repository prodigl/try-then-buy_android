import React from 'react'

const Back = () => {

    const handleBack = () => {
        history.back();
    }
  return (
    <div className='d-flex align-items-center' onClick={handleBack}>
        <img src="/images/back.png" />
    </div>
  )
}

export default Back