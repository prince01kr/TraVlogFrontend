import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import loginpic from '../resources/images/signin.png';
import axios from 'axios';
const BACKEND_API = process.env.REACT_APP_SERVER_API;

const Login = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async (e) => {
    e.preventDefault();
    const temp_user = {email,password};
    try {
      const config = {
        headers: { 'Content-Type': 'application/json' }
      }
      const res = await axios.post(`${BACKEND_API}/login`, temp_user, config);
      console.log(res.data)
      setEmail('');
      setPassword('');
      navigate('/profile');
      window.alert("Login Successfull");

    }
    catch (err) {
      window.alert("Invalid Data");
      console.log("Invalid Login");
      console.log(`Error: ${err.message}`);
    }
}


return (
  <>
    <section className="sign">
      <div className="sign-container">
        <div className="sign-left">
          <h2 className='form-heading'>SignIn</h2>
          <form className="signin-form">
            <div className="form-group">
              <label htmlFor="email">
                <i class="zmdi zmdi-email"></i>
              </label>
              <input id="email" type="text" name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete='off' placeholder='Enter Email'
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">
                <i class="zmdi zmdi-lock"></i>
              </label>
              <input id="password" type="text" name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete='off' placeholder='Enter password'
              />
            </div>

            <div className='form-button'>
              <input type="submit" name="login" id="login" className="form-submit"
                value="log-in"
                onClick={loginUser}
              />
            </div>

            <div className="create-account">
              <Link className="right-link" to="/signup">Create New Account</Link>
            </div>

          </form>
        </div>

        <div className="sign-right">
          <figure>
            <img src={loginpic} alt="Loading Image" />
          </figure>
        </div>
      </div>
    </section>
  </>
);
};

export default Login;
