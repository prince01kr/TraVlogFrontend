import React, { useContext, useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import { Modal, Button } from 'react-bootstrap';
import FriendListModal from '../friendList.js/FriendListModal';
import EditProfileForm from './EditProfileForm';

const Profile_Details = ({ userData, mypost, setImage, upDateProfile,postEvent}) => {

 
  const { state, dispatch } = useContext(UserContext);
  const userId = userData._id;

  // Followers Modal
  const [show1, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  // Following Modal
  const [show2, setShowFl] = useState(false);
  const handleShowFl = () => setShowFl(true);
  const handleCloseFl = () => setShowFl(false);

  //Create Event Modal
  const [showEv, setShowEv] = useState(false);
  const handleShowEv = () => setShowEv(true);
  const handleCloseEv = () => setShowEv(false);

  //Edit Profile Modal
  const [showEdit, setShowEdit] = useState(false);
  const handleShowEdit = () => setShowEdit(true);
  const handleCloseEdit = () => setShowEdit(false);


  const [title,setTitle] = useState('');
  const [startDate,setStartDate] = useState('');
  const [endDate,setEndDate] = useState('');
  const [img,setImg] = useState('');

  // const updateProfile = async()=>{
  //   try {
  //     const token = window.localStorage.getItem('jwt');
  //     const config = {
  //       headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
  //     }
  //     const temp_post = { pic: url };
  //     const res = await axios.put(`${BACKEND_API}/updatepic`, temp_post, config);
  //     // console.log(res.data);
  //     const post_data = res.data;
  //     console.log(post_data);
  //     localStorage.setItem("user", JSON.stringify({ ...state, pic: res.data.url }));
  //     dispatch({ type: "UPDATEPIC", payload: res.data.url });
  //     callProfilePage();
  //   }
  //   catch (err) {
  //     console.log(`Error: ${err}`);
  //   }
  // } 



  return (
    <>
      <div className="profile-details">
        <div className="profile-pic-container">
          <div className='profile-pic-box'>
            <img className="profile-pic" src={state ? userData.pic : "https://res.cloudinary.com/princekr20/image/upload/v1645680843/TraVlog/default_user_gwvz0i.png"} alt="Loading Image" />
          </div>
          <div className="update-profile">
            <form onSubmit={(e) => {
              e.preventDefault();
              upDateProfile();
              e.target.reset();
            }}>
              <input
                className="choose-file"
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                name="filename"
              />
              <button id="profile-update-button" onClick={() => upDateProfile()} type="submit">Update Profile</button>
            </form>
          </div>
        </div>  

        <div className="profile-summary">
          <div className="profile-heading">
            <div className="profile-name">
              <h1 className="profile-name-heading">{state ? state.name : "No Name"}</h1>
            </div>
          </div>

          <ul className='heading-details'>
            <Link className="heading-details-count" to={userId ?"/mypost/"+userId : "/"}><li><span>{mypost.length}</span>  <span className="heading-details-val">Posts</span></li></Link>
            <li className="heading-details-count" onClick={handleShow}><span>{userData.followers ? userData.followers.length : 0}</span>  <span className="heading-details-val">Followers</span></li>
            <li className="heading-details-count" onClick={handleShowFl}><span>{userData.following ? userData.following.length : 0}</span>  <span className="heading-details-val">Followings</span></li>
          </ul>
          <div className="extra-button">
            <button 
            onClick={() => handleShowEdit(true)}
            className="profile-edit"
            >Edit Profile</button>

            <button
              className="profile-edit"
              onClick={() => handleShowEv(true)}
            >Create Tour</button>
          </div>
        </div>



        {/* Edit Profile Modal */}
        <Modal scrollable={true} show={showEdit}
          onHide={handleCloseEdit}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title> Edit Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body> 
             <EditProfileForm
               handleCloseEdit={handleCloseEdit}
             />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEdit}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>


        {/* Create Event Modal */}
        <Modal scrollable={true} show={showEv}
          onHide={handleCloseEv}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Create Tour</Modal.Title>
          </Modal.Header>
          <Modal.Body>
           <form
             onSubmit={(e) => {
                e.preventDefault();
                postEvent(title,startDate,endDate,img);
                handleCloseEv();
                e.target.reset();
              }}
           >
            <label htmlFor="title">Name of the Event: </label>
            <br />
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
              style={{ outline: "none", marginTop: "0.5rem" }}
            />
            <br />
            <br />

            <label htmlFor="startDate">Start Date: </label>
            <br />
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={startDate}
              onChange={(e)=>setStartDate(e.target.value)}
              style={{ outline: "none", marginTop: "0.5rem" }}
            />
            <br />
            <br />
            <label htmlFor="endDate">End Date: </label>
            <br />
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={endDate}
              onChange={(e)=>setEndDate(e.target.value)}
              style={{ outline: "none", marginTop: "0.5rem" }}
            />
            <br />
            <br />

            <div>
              <label htmlFor="endDate">Cover Image:</label>
              <br/>
              <input
                type="file"
                name="filename"
                onChange={(e) => setImg(e.target.files[0])}
              />
            </div>

            <button
              style={{marginTop:"1rem",width:"5rem",height:"2rem",backgroundColor:"skyblue"}}
              type="submit"
            >
              Create
            </button>
          </form>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEv}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>


        {/* Followers Modal */}

        <Modal scrollable={true}
          show={show1} onHide={handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Followers</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FriendListModal
              data={userData.followers}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Following Modal */}

        <Modal scrollable={true} show={show2} onHide={handleCloseFl}>
          <Modal.Header closeButton>
            <Modal.Title>Followings</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FriendListModal
              data={userData.following}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseFl}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

      </div>
    </>
  );
}

export default Profile_Details;