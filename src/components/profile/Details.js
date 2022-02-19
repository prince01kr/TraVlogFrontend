import React from 'react'

const Details = () => {
  return (
    <div className='my-details'>
       <div className="details-row">
          <div className="details-row-1">Name</div>
          <span>:</span>
          <div className="details-row-2">Prince Kumar</div>
       </div>
       <div className="details-row">
          <div className="details-row-1">Email</div>
          <span>:</span>
          <div className="details-row-2">princekumargilli@gmail.com</div>
       </div>
       <div className="details-row">
          <div className="details-row-1">Phone</div>
          <span>:</span>
          <div className="details-row-2">+91-8706023</div>
       </div>
       <div className="details-row">
          <div className="details-row-1">Country</div>
          <span>:</span>
          <div className="details-row-2">India</div>
       </div>
    </div>
  )
}

export default Details