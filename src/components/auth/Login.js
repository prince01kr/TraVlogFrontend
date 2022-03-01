import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../../App';

const BACKEND_API = process.env.REACT_APP_SERVER_API;

const Login = () => {

  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async (e) => {
    e.preventDefault(); 
    const temp_user = { email, password };
    try {
      const config = {
        headers: { 'Content-Type': 'application/json' }
      }
      const res = await axios.post(`${BACKEND_API}/login`, temp_user, config);
      //Local Storage only stores string
      localStorage.setItem('jwt', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      //Dispatching to context API
      console.log("hell",res.data); 
      dispatch({ type: "USER", payload: res.data.user });
      setEmail('');
      setPassword('');
      navigate('/home');
      toast.success('Logged In Successfuly....');
      
     
    }
    catch (err) {
      toast.error('Fill Correct Data...');
      console.log("Invalid Login");
      console.log(`Error: ${err.message}`);
    }
  }


  return (
    <>
      <ToastContainer/>
      <section className="sign">
        <div className="sign-container">
          <div className="sign-left">
            <h2 className='form-heading'>SignIn</h2>
            <div style={{width:"87%",display:"flex",justifyContent:"flex-end"}}>
              <span style={{marginLeft:"1rem"}}>(required : *)</span>
            </div>
            <form className="signin-form">
              <div className="form-group">
                <label htmlFor="email">
                  <i class="zmdi zmdi-email">*</i>
                </label>
                <input id="email" type="email" name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete='off' placeholder='Enter Email'
                />
              </div> 

              <div className="form-group">
                <label htmlFor="password">
                  <i class="zmdi zmdi-lock">*</i>
                </label>
                <input id="password" type="password" name="password"
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
              <img src="https://res.cloudinary.com/princekr20/image/upload/v1645641168/TraVlog/signin_xpazia.png" alt="Loading Image" />
            </figure>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
