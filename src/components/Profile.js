import React, { useState, useEffect } from 'react';
import Profile_Details from './profile/Profile-Details';
import Profile_Posts from './profile/Profile-Posts';
import '../resources/css/profile.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const BACKEND_API = process.env.REACT_APP_SERVER_API;

const Profile = () => {

  const navigate = useNavigate();

  const callProfilePage = async () => {
    // const token = isAutheticated();
    // if (token) {
    //   const config = {
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${token}`,
    //     },
    //   };

    //   try {
    //     const res = await axios.get(`${BACKEND_API}/profile`, config);
    //     console.log(res.data);
    //   }
    //   catch (err) {
    //     if (err.response) {
    //       //If error found which is not in the 200 range
    //       console.log(err.response.data);
    //     }
    //     else {
    //       console.log(`Error Found :  ${err.message}`);
    //       navigate('/signin');
    //     }
    //   }
    // };


    try{
      
      const res = await fetch(`${BACKEND_API}/about`,{
        method:"GET",
        headers:{
          "Accept":"application/json",
          "Content-Type":"application/json"
        },
        credentials: 'include'
      });
      
    const data = await res.json();
     console.log('hello mam',data.jwtokens);

      if(!data.status === 200){
        const error = new Error(res.error); 
        throw error;
      }

    }catch(err){
       console.log('xxxx ',err.message);
       console.log('yyy ',err);
       navigate('/signin');
    }
  }

  useEffect(() => {
    callProfilePage();
  }, []);

  return (
    <>
      <div className='profile-container'>
        <Profile_Details />
        <Profile_Posts />
      </div>
    </>
  );
};

export default Profile;
