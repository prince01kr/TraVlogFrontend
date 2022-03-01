import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../../resources/css/event.css';
import { UserContext } from '../../App';
const CLOUDINARY_URL = process.env.REACT_APP_CLOUDINARY_URL;
const BACKEND_API = process.env.REACT_APP_SERVER_API;

const PostOfEvents = () => {

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");
    const [postId, setPostId] = useState("");
    const [allPosts,setAllPosts] = useState([]);
    const { eventId } = useParams();
    const [user,setUser] = useState('');

    const {state,dispatch} = useContext(UserContext);

    const savePostInDB = async () => {
        if (url) {
            try {
                const token = window.localStorage.getItem('jwt');
                const config = {
                    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
                }
                const temp_post = { title, body, photo: `${url}` };
                const res = await axios.post(`${BACKEND_API}/createpost`, temp_post, config);
                setPostId(res.data.post._id);
                // console.log("1",res.data.post._id);
                // console.log(res.data);
                setTitle('');
                setBody('');
                setImage('');
                setUrl('');
                retrivePosts();
            }
            catch (err) {
                // toast.error('Post Uploaded Succesfully');
                console.log("Please fill data correctly");
                console.log(`Error: ${err}`);
            }
        }
    }

    const postDetails = async () => {
        try {
            const data = new FormData();
            data.append("file", image);
            data.append("upload_preset", "TraVlog");
            data.append("cloud_name", "princekr20");
            const res = await axios.post(`${CLOUDINARY_URL}/image/upload`, data);
            setUrl(res.data.url);
        } catch (err) {
            console.log("Something error in cloudinary posting");
            console.log(err);
        }
    }

    const saveToEvent = async () => {
        try {
            const token = window.localStorage.getItem('jwt');
            const config = {
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
            }
            const temp_post = { eventId,postId };
            const res = await axios.put(`${BACKEND_API}/addPostToEvent`, temp_post, config);
            setPostId('');
        }
        catch (err) {
            console.log(`Error: ${err}`);
        }
    }
 
    const retrivePosts = async()=>{
        try {
            const token = window.localStorage.getItem('jwt');
            const config = {
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
            }
            const res = await axios.get(`${BACKEND_API}/postOfEvent/${eventId}`, config);
            console.log(res.data);
            setAllPosts(res.data.allPost[0].posts);
            setUser(res.data.allPost[0].createdBy);
            allPosts.reverse();
        }
        catch (err) {
            console.log(`Error: ${err}`);
        }
    }


    useEffect(() => {
        savePostInDB();
    }, [url]);

    useEffect(() => {
        if (postId) {
            saveToEvent();
        }
        else{
            retrivePosts();
        }
    }, [postId]);



    return (
        <div className="main-event">
         {
            state && state._id === user &&
             <div class="sidenav">

                <h2 style={{ color: "white" }}>Create Post</h2>
                <span style={{marginTop:"2rem",color:"white"}}>(All field required:)</span>
                <input className="comment-section"
                    type="text"
                    name='title'
                    placeholder='Add Title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input className="comment-section"
                    type="text"
                    name='body'
                    placeholder='Add Description'
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />
                <div className="create-post-upload-image" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <span style={{ fontSize: "1.3rem", color: "brown", marginRight: "5px" }}>Upload Image:</span>
                    <input
                        type="file"
                        name="filename"
                        style={{ display: "inline-block", marginLeft: "2rem", color: "white" }}
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>
                <button className='create-post-button'
                    onClick={() => postDetails()}
                >
                    Submit
                </button>

            </div>
         }
             
            <div 
              style={(state && state._id !== user) ? {marginLeft:"0rem"} : {background:"white"}}
              class="all-event-post"
            >
               {
                   allPosts.length 
                   ?
                    allPosts.map((item)=>{
                        return(
                          <div className="rigth-sidebar">
                              <h2>{item.title}</h2>
                              <h5>{item.body}</h5>
                              <img src={item.photo} alt="Loading Image"/>
                          </div>
                        );
                    })
                   :
                   <p>No Post Available to this Event...</p>
               }
            </div>
        </div>
    )
}

export default PostOfEvents