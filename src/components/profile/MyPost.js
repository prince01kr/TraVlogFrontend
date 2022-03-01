import React from 'react'
const MyPost = ({ mypost }) => {
   return (
      <div className="my-posts">
         {
           mypost ? 
            mypost.map((item) => {
               return (
                  <div className="my-post-box" key={item._id}>
                     <img className="my-post-pic" src={item.photo} alt="Image Loading" />
                  </div>
               )
            })
            :
            <p>No Post Available.....</p>
         }
      </div>  
   )
}

export default MyPost