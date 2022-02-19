import React from 'react'
import defalt_profile_pic from '../../resources/images/profile.jpg';
const Profile_Details = () => {
  return (
    <>
      <div className="profile-details">
        <div className="profile-pic-container">
          <div className='profile-pic-box'>
            <img className="profile-pic" src={defalt_profile_pic} alt="Loading Image" />
          </div>
        </div>

        <div className="profile-summary">
          <div className="profile-heading">
             <div className="profile-name">
                <h1 className="profile-name-heading">Prince Kumar</h1>
             </div>
             <div className="profile-edit">
                <button>Edit Profile</button>  
             </div>
          </div>

          <ul className='heading-details'>
             <li><span className="heading-details-count">100</span>  <span className="heading-details-val">Posts</span></li>
             <li><span className="heading-details-count">100</span>  <span className="heading-details-val">Followers</span></li>
             <li><span className="heading-details-count">100</span>  <span className="heading-details-val">Followings</span></li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Profile_Details;