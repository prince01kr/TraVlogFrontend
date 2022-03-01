import React,{useState,useEffect} from 'react';
import '../resources/css/posts.css';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
const CLOUDINARY_URL = process.env.REACT_APP_CLOUDINARY_URL;
const BACKEND_API = process.env.REACT_APP_SERVER_API;

const CreatePost = () => {
  
  const navigate = useNavigate();
  const [title,setTitle] = useState("");
  const [body,setBody] = useState("");
  const [image,setImage] = useState("");
  const [url,setUrl] = useState("");
  
  const savePostInDB = async()=>{
    if(url){
      try {
        const token = window.localStorage.getItem('jwt');
        const config = {
          headers: { 'Content-Type': 'application/json',Authorization: `Bearer ${token}` }
        }
        const temp_post = {title,body,photo:`${url}`};
        const res = await axios.post(`${BACKEND_API}/createpost`, temp_post, config);
        setTitle(''); 
        setBody('');
        setImage('');
        setUrl('');
        toast.success("Post Uploaded Successfully");
        navigate('/home');
      }
      catch (err) {
        toast.error('Fill All fields correcttly...');
        console.log("Please fill data correctly");
        console.log(`Error: ${err}`);
      }
    }
  }

  const postDetails = async()=>{
    try{
      const data = new FormData();
      data.append("file",image);
      data.append("upload_preset","TraVlog");
      data.append("cloud_name","princekr20");
      const res = await axios.post(`${CLOUDINARY_URL}/image/upload`,data);
      setUrl(res.data.url);
    }catch(err){
      console.log("Something error in cloudinary posting");
      toast.error('Fill All fields correcttly...');
      console.log(err);
    }
  } 

  useEffect(()=>{ 
    savePostInDB(); 
   },[url]);
 
  return (
    <div className="create-posts-container">
      <ToastContainer/>
      <div className="create-container-box">
         <h2 style={{textDecorationLine:"underline",fontSize:"2rem",fontWeight:"bold"}}>Create Post</h2>
         <span style={{marginTop:"2rem"}}>(All field required:)</span>
         <input className="comment-section" 
          type="text"
          name='title' 
          placeholder='Add Title'
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
         />
         <input className="comment-section" 
          type="text" 
          name='body'
          placeholder='Add Description'
          value={body}
          onChange={(e)=>setBody(e.target.value)}
         />
         <div className="create-post-upload-image">
            <span style={{fontSize:"1.3rem",color:"brown",marginRight:"5px"}}>Upload Image:</span>
            <input 
              type="file" 
              name="filename"
              onChange={(e)=>setImage(e.target.files[0])}
            />
         </div>
         <button className='create-post-button'
           onClick={()=>postDetails()}
         >
           Submit
         </button>
      </div>
    </div> 
  )
}

export default CreatePost