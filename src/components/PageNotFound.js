import React from 'react';
import ErrorPic from '../resources/images/error.jpg'
import {Link} from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className='error'>
       <div className='error-image-container'>
          <img className="error-image" src={ErrorPic} alt="Image Loading"/>
       </div>
       <div className='error-back'>
          <Link to='/' className="error-link">Back to Home</Link>
       </div>
    </div>
  )
}

export default PageNotFound
