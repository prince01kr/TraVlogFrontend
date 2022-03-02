import React from 'react'

const Details = ({userData}) => {


   return (
      <>
         {
            userData &&
            <div className='my-details'>
               <div className="details-row">
                  <div className="details-row-1">Name</div>
                  <span>:</span>
                  <div className="details-row-2">{userData.name}</div>
               </div>
               <div className="details-row">
                  <div className="details-row-1">Email</div>
                  <span>:</span>
                  <div className="details-row-2">{userData.email}</div>
               </div>
               <div className="details-row">
                  <div className="details-row-1">Phone</div>
                  <span>:</span>
                  <div className="details-row-2">{userData.phone}</div>
               </div>
               <div className="details-row">
                  <div className="details-row-1">Country</div>
                  <span>:</span>
                  <div className="details-row-2">{userData.country}</div>
               </div>

            </div>
         }
      </>
   )
}

export default Details