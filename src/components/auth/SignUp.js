import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
const BACKEND_API = process.env.REACT_APP_SERVER_API;
const CLOUDINARY_URL = process.env.REACT_APP_CLOUDINARY_URL;

const SignUp = () => { 

  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "", email: "", phone: "", country: "", password: "", cpassword: ""
  });
  const [image,setImage] = useState("");
  const [url,setUrl] = useState(undefined);

  const handleInputs = async (e) => {
    const name = e.target.name;
    const val = e.target.value;
    setUser({ ...user, [name]: val });  
  }

  const upLoadpic = async()=>{
    try{
      const data = new FormData();
      data.append("file",image);
      data.append("upload_preset","TraVlog");
      data.append("cloud_name","princekr20");
      const res = await axios.post(`${CLOUDINARY_URL}/image/upload`,data);
      setUrl(res.data.url);
    }catch(err){
      console.log("Something error in cloudinary posting");
      console.log(err);
    }
  }

  const upLoadFields = async()=>{

    const temp_user = {...user,pic:url};
    try {
      const config = {
        headers: { 'Content-Type': 'application/json' }
      }
      const res = await axios.post(`${BACKEND_API}/register`, temp_user, config);
      console.log(res.data)
      setUser({ name: "", email: "", phone: "", country: "", password: "", cpassword: "" });
      setImage('');
      setUrl(''); 
      navigate('/signin');
      toast.success("Registration Successfull");
    }
    catch (err) {
      toast.error('Fill Data Correctly...');
      console.log(`Error: ${err.message}`);
    }
  }

  useEffect(()=>{ 
    if(url){
      upLoadFields(); 
    }
   },[url]);

   const postData = async (e) => {
    e.preventDefault();
    if(image){
      upLoadpic();
    }else{
      upLoadFields();
    }
  }


  return ( 
    <>
      <ToastContainer/>
      <section className="sign">
        <div className="sign-container">
          <div className="sign-left">
            <h2 className='form-heading'>SignUp</h2>
            <div style={{width:"87%",display:"flex",justifyContent:"flex-end"}}>
              <span style={{marginLeft:"1rem"}}>(required : *)</span>
            </div>
            <form method="POST" className="signup-form">
              <div className="form-group">
                <label htmlFor="name">
                  <i className="zmdi zmdi-account">*</i>
                </label>
                <input id="name" type="text" name="name"
                  value={user.name}
                  onChange={handleInputs}
                  autoComplete='off' placeholder='Enter Name'
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">
                  <i className="zmdi zmdi-email">*</i>
                </label>
                <input id="email" type="email" name="email"
                  value={user.email}
                  onChange={handleInputs}
                  autoComplete='off' placeholder='Enter Email'
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">
                  <i className="zmdi zmdi-phone-in-talk">*</i>
                </label>
                <input id="phone" type="text" name="phone"
                  value={user.phone}
                  onChange={handleInputs}
                  autoComplete='off' placeholder='Enter phone'
                />
              </div>
              <div className="form-group">
                <label htmlFor="country">
                  <i className="zmdi zmdi-city">*</i>
                </label>
                <input id="country" type="text" name="country"
                  value={user.country}
                  onChange={handleInputs}
                  autoComplete='off' placeholder='Enter country'
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">
                  <i className="zmdi zmdi-lock">*</i>
                </label>
                <input id="password" type="password" name="password"
                  value={user.password}
                  onChange={handleInputs}
                  autoComplete='off' placeholder='Enter password'
                />
              </div>
              <div className="form-group">
                <label htmlFor="cpassword">
                  <i className="zmdi zmdi-lock">*</i>
                </label>
                <input id="cpassword" type="password" name="cpassword"
                  value={user.cpassword}
                  onChange={handleInputs}
                  autoComplete='off' placeholder='Confirm Password'
                />
              </div>
              <div className="signup-upload-profile">
                <span style={{ fontSize: "1rem", color: "brown", marginLeft:"1rem",marginRight:"0.5rem",fontWeight:"bold" }}>Upload Profile Pic:</span>
                <input
                  onChange={(e)=>setImage(e.target.files[0])}
                  type="file"
                  name="filename"
                />
              </div>
              <div className='form-button' style={{marginTop:"1rem"}}>
                <input type="submit" onClick={postData} name="register" id="register" className="form-submit" />
              </div>
            </form>
          </div>

          <div className="sign-right">
            <figure>
              <img src="https://res.cloudinary.com/princekr20/image/upload/v1645641168/TraVlog/register_fide2z.png" alt="Loading Image" />
            </figure>
            <div className="sign-right-link">
              <Link className="right-link" to="/signin">SignIn</Link>
            </div>
          </div>
        </div>
      </section>

    </>
  );
};

export default SignUp;
