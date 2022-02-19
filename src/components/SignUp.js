import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import signpic from '../resources/images/register.png';
import axios from 'axios';
const BACKEND_API = process.env.REACT_APP_SERVER_API;

const SignUp = () => {

  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "", email: "", phone: "", country: "", password: "", cpassword: ""
  });

  const handleInputs = async (e) => {
    const name = e.target.name;
    const val = e.target.value;
    setUser({ ...user, [name]: val });
  }

  const postData = async (e) => {
    e.preventDefault();
    const temp_user = user;
    try {
      const config = {
        headers: { 'Content-Type': 'application/json' }
      }
      const res = await axios.post(`${BACKEND_API}/register`, temp_user, config);
      console.log(res.data)
      setUser({ name: "", email: "", phone: "", country: "", password: "", cpassword: "" });
      navigate('/signin');
      window.alert("Registration Successfull");

    }
    catch (err) {
      window.alert("Invalid Registration");
      console.log("Invalid Registration");
      console.log(`Error: ${err.message}`);
    }

  }


  return (
    <>
      <section className="sign">
        <div className="sign-container">
          <div className="sign-left">
            <h2 className='form-heading'>SignUp</h2>
            <form method="POST" className="signup-form">
              <div className="form-group">
                <label htmlFor="name">
                  <i class="zmdi zmdi-account"></i>
                </label>
                <input id="name" type="text" name="name"
                  value={user.name}
                  onChange={handleInputs}
                  autoComplete='off' placeholder='Enter Name'
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">
                  <i class="zmdi zmdi-email"></i>
                </label>
                <input id="email" type="text" name="email"
                  value={user.email}
                  onChange={handleInputs}
                  autoComplete='off' placeholder='Enter Email'
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">
                  <i class="zmdi zmdi-phone-in-talk"></i>
                </label>
                <input id="phone" type="text" name="phone"
                  value={user.phone}
                  onChange={handleInputs}
                  autoComplete='off' placeholder='Enter phone'
                />
              </div>
              <div className="form-group">
                <label htmlFor="country">
                  <i class="zmdi zmdi-city"></i>
                </label>
                <input id="country" type="text" name="country"
                  value={user.country}
                  onChange={handleInputs}
                  autoComplete='off' placeholder='Enter country'
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">
                  <i class="zmdi zmdi-lock"></i>
                </label>
                <input id="password" type="text" name="password"
                  value={user.password}
                  onChange={handleInputs}
                  autoComplete='off' placeholder='Enter password'
                />
              </div>
              <div className="form-group">
                <label htmlFor="cpassword">
                  <i class="zmdi zmdi-lock"></i>
                </label>
                <input id="cpassword" type="text" name="cpassword"
                  value={user.cpassword}
                  onChange={handleInputs}
                  autoComplete='off' placeholder='Confirm Password'
                />
              </div>
              <div className='form-button'>
                <input type="submit" onClick={postData} name="register" id="register" className="form-submit" />
              </div>
            </form>
          </div>

          <div className="sign-right">
            <figure>
              <img src={signpic} alt="Loading Image" />
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
