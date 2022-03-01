import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
const BACKEND_API = process.env.REACT_APP_SERVER_API;

const EditProfileForm = ({handleCloseEdit}) => {
 
  const {state,dispatch} = useContext(UserContext);
  const [name,setName] = useState(state.name);
  const [email,setEmail] = useState(state.email);
  const [phone,setPhone] = useState(state.phone);
  const [country,setCountry] = useState(state.country);

  const EditProfile = async()=>{
    try {
      const token = window.localStorage.getItem('jwt');
      const config = {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
      }
      const temp_post = {name,email,phone,country};
      const res = await axios.put(`${BACKEND_API}/updateprofile`, temp_post, config);
      const new_data = res.data;
      console.log(new_data);
      localStorage.setItem("user", JSON.stringify({...state, name:new_data.name, email:new_data.email, phone:new_data.phone, country:new_data.country }));
      dispatch({ type: "USER", payload: new_data}); 
      setName('');
      setEmail('');
      setCountry('');
      setPhone('');
      toast.success('Data Saved Successfully...');
      handleCloseEdit();
    }
    catch (err) {
      console.log(`Error: ${err}`); 
    }
  }
 
  return (
    <div>
       <ToastContainer/>
      <form>
        <label htmlFor="name">Name:</label>
        <br/>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e)=>setName(e.target.value)}
         />
         <br/>

        <label htmlFor="email">Email:</label>
        <br/>
        <input
          id="email"
          type="text"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
         />
         <br/>

        <label htmlFor="phone">Phone:</label>
        <br/>
        <input
          id="phone"
          type="text"
          value={phone}
          onChange={(e)=>setPhone(e.target.value)}
         />
         <br/>

         <label htmlFor="country">Country:</label>
        <br/>
        <input
          id="country"
          type="text"
          value={country}
          onChange={(e)=>setCountry(e.target.value)}
         />
         <br/>

         <button
          type="submit"
          style={{marginTop:"1rem",width:"5rem",height:"2rem",backgroundColor:"skyblue"}}
          onClick={(e)=>{
            e.preventDefault();
            EditProfile();
          }}
         >
           Submit
         </button>

      </form>
    </div>
  )
}
 
export default EditProfileForm
