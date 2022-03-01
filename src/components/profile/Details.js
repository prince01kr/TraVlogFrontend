import React, { useContext } from 'react'
import { UserContext } from '../../App'

const Details = () => {

   const { state, dispatch } = useContext(UserContext);

   return (
      <>
         {
            state &&
            <div className='my-details'>
               <div className="details-row">
                  <div className="details-row-1">Name</div>
                  <span>:</span>
                  <div className="details-row-2">{state.name}</div>
               </div>
               <div className="details-row">
                  <div className="details-row-1">Email</div>
                  <span>:</span>
                  <div className="details-row-2">{state.email}</div>
               </div>
               <div className="details-row">
                  <div className="details-row-1">Phone</div>
                  <span>:</span>
                  <div className="details-row-2">{state.phone}</div>
               </div>
               <div className="details-row">
                  <div className="details-row-1">Country</div>
                  <span>:</span>
                  <div className="details-row-2">{state.country}</div>
               </div>

            </div>
         }
      </>
   )
}

export default Details