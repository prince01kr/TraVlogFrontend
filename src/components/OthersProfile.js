import React, { useState, useEffect, useContext } from 'react';
import { useParams,Link } from 'react-router-dom';
import '../resources/css/profile.css';
import axios from 'axios';
import { Modal,Button } from 'react-bootstrap';
import Profile_Posts from './profile/Profile-Posts';
import { UserContext } from '../App';
import FriendListModal from './friendList.js/FriendListModal';
const BACKEND_API = process.env.REACT_APP_SERVER_API;

const Profile = () => {

    const [otherUser, setOtherUser] = useState({});
    const [mypost, setOtherUserPost] = useState([]);
    const [showfollow, setShowFollow] = useState(true);
    const { state, dispatch } = useContext(UserContext);
    const { userId } = useParams();
    // console.log(userId);

    // Followers Modal
    const [show1, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    // Following Modal
    const [show2, setShowFl] = useState(false);
    const handleShowFl = () => setShowFl(true);
    const handleCloseFl = () => setShowFl(false);


    const [allEvents,setAllEvents] = useState([]);


    const callProfilePage = async () => {
        try {
            const token = window.localStorage.getItem('jwt');
            const config = {
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
            }
            const res = await axios.get(`${BACKEND_API}/user/${userId}`, config);
            // console.log(res.data);
            //console.log(res.data.user.followers.length);
            setOtherUser(res.data.user);
            setOtherUserPost(res.data.userPost);
            setAllEvents(res.data.myEvents);

        } catch (err) {
            console.log("Post is not fetching....");
            console.log('Error:  ', err.message);
        }
    }
    useEffect(async () => {
        await callProfilePage();
        if (!state.following.includes(userId)) {
            setShowFollow(true);
        }
        else {
            setShowFollow(false);
        }
    }, []);

    const followUser = async () => {
        try {
            const token = window.localStorage.getItem('jwt');
            const config = {
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
            }
            const temp_post = { followId: userId };
            const res = await axios.put(`${BACKEND_API}/follow`, temp_post, config);
            //console.log(res.data);
            const new_data = res.data;
            dispatch({ type: "UPDATE", payload: { following: new_data.following, followers: new_data.followers } })
            localStorage.setItem("user", JSON.stringify(new_data));
            setShowFollow(false);
            callProfilePage();
        }
        catch (err) {
            console.log(`Error: ${err}`);
        }
    }


    const unfollowUser = async () => {
        try {
            const token = window.localStorage.getItem('jwt');
            const config = {
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
            }
            const temp_post = { unfollowId: userId };
            const res = await axios.put(`${BACKEND_API}/unfollow`, temp_post, config);
            //console.log(res.data);
            const new_data = res.data;
            dispatch({ type: "UPDATE", payload: { following: new_data.following, followers: new_data.followers } })
            localStorage.setItem("user", JSON.stringify(new_data));
            setShowFollow(true);
            callProfilePage();
        }
        catch (err) {
            console.log(`Error: ${err}`);
        }
    }
 
    return (
        <>
            <div className='profile-container'>
                <div className="profile-details">
                    <div className="profile-pic-container">
                        <div className='profile-pic-box'>
                            <img className="profile-pic" src={otherUser.pic ? otherUser.pic : "https://res.cloudinary.com/princekr20/image/upload/v1645680843/TraVlog/default_user_gwvz0i.png"} alt="Loading Image" />
                        </div>
                    </div>

                    <div className="profile-summary">
                        <div className="profile-heading">
                            <div className="profile-name">
                                <h1 className="profile-name-heading">{otherUser.name}</h1>
                            </div>
                        </div>

                        <ul className='heading-details'>
                            <Link className="heading-details-count" to={"/mypost/"+userId}><li><span className="heading-details-count">{mypost.length}</span>  <span className="heading-details-val">Posts</span></li></Link>
                            <li key="2" className="heading-details-count" onClick={handleShow} ><span className="heading-details-count">{otherUser.followers? otherUser.followers.length : 0}</span>  <span className="heading-details-val">Followers</span></li>
                            <li key="3" className="heading-details-count" onClick={handleShowFl} ><span className="heading-details-count">{otherUser.following ? otherUser.following.length : 0}</span>  <span className="heading-details-val">Followings</span></li>
                        </ul>
                        <div className="follow-unfollow">
                            {
                                showfollow
                                    ?
                                    <button
                                        onClick={() => followUser()}
                                        className="follow common"
                                    >Follow</button>
                                    :
                                    <button
                                        onClick={() => unfollowUser()}
                                        className="un-follow common"
                                    >Unfollow</button>
                            }
                        </div>
                    </div>
                </div>

                {/* Followers Modal */}

                <Modal scrollable={true} show={show1} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Followers</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FriendListModal
                            data={otherUser.followers}
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
                            data={otherUser.following}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseFl}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Profile_Posts
                    mypost={mypost}
                    userData={otherUser}
                    allEvents={allEvents}
                />

            </div>
        </>
    );
};

export default Profile;
