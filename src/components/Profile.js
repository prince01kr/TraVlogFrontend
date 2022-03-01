import React, { useState, useEffect, useContext } from 'react';
import Profile_Details from './profile/Profile-Details';
import Profile_Posts from './profile/Profile-Posts';
import '../resources/css/profile.css';
import axios from 'axios';
import { UserContext } from '../App';
const BACKEND_API = process.env.REACT_APP_SERVER_API;
const CLOUDINARY_URL = process.env.REACT_APP_CLOUDINARY_URL;

const Profile = () => { 

  const [mypost, setMyPost] = useState([]);
  const [userData, setUserData] = useState({});
  const [allEvents,setAllEvents] = useState([]);
  const [image, setImage] = useState("");
  const [url, setUrl] = useState(undefined);
  const { state, dispatch } = useContext(UserContext);


  const postEvent = async (name, startDate, endDate, img) => {
    if (img) {
      try {
        const data = new FormData();
        data.append("file", img);
        data.append("upload_preset", "TraVlog");
        data.append("cloud_name", "princekr20");
        const res = await axios.post(`${CLOUDINARY_URL}/image/upload`, data);
        const urlx = res.data.url;
        // console.log('hello', res.data.url);
        if (urlx) {
          try {
            // console.log("exxxxx", name);
            const token = window.localStorage.getItem('jwt');
            const config = {
              headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
            }
            const temp_post = { name, startDate, endDate, photo: urlx };
            // console.log(temp_post);
            const res = await axios.post(`${BACKEND_API}/createevent`, temp_post, config);
            // console.log('hyy', res.data);
            callProfilePage();
          }
          catch (err) {
            console.log("Please fill data correctly");
            console.log(`Error: ${err}`);
          }

        }

      } catch (err) {
        console.log("Something error in cloudinary posting");
        console.log(err);
      }

    }
  }




  const callProfilePage = async () => {
    try {
      const token = window.localStorage.getItem('jwt');
      const config = {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
      }
      const res = await axios.get(`${BACKEND_API}/myprofile`, config);
      console.log(res.data);
      setMyPost(res.data.myPost);
      setUserData(res.data.user);
      setAllEvents(res.data.myEvents);
    } catch (err) {
      console.log("Post is not fetching....");
      console.log('Error:  ', err.message);
    }
  }

  useEffect(() => {
    callProfilePage();
  }, []);

  const upDateProfile = async () => {
    if (image) {
      try {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "TraVlog");
        data.append("cloud_name", "princekr20");
        const res = await axios.post(`${CLOUDINARY_URL}/image/upload`, data);
        setUrl(res.data.url);
        console.log('hello', res.data.url);
      } catch (err) {
        console.log("Something error in cloudinary posting");
        console.log(err);
      }
    }

  }

  const saveToDatabase = async () => {
    try {
      const token = window.localStorage.getItem('jwt');
      const config = {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
      }
      const temp_post = { pic: url };
      const res = await axios.put(`${BACKEND_API}/updatepic`, temp_post, config);
      // console.log(res.data);
      const post_data = res.data;
      console.log(post_data);
      localStorage.setItem("user", JSON.stringify({ ...state, pic: res.data.url }));
      dispatch({ type: "UPDATEPIC", payload: res.data.url });
      callProfilePage();
    }
    catch (err) { 
      console.log(`Error: ${err}`);
    }
  }

  useEffect(() => {
    if (url) {
      saveToDatabase();
    }
  }, [url]) 

  return (
    <>
      <div className='profile-container'>
        <Profile_Details
          userData={userData}
          mypost={mypost}
          setImage={setImage}
          upDateProfile={upDateProfile}
          postEvent={postEvent}
        />
        <Profile_Posts
          mypost={mypost}
          allEvents={allEvents}
        />
      </div>
    </>
  ); 
};

export default Profile;
