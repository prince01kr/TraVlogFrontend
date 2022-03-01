import React, { useEffect, createContext, useReducer, useContext } from 'react';
import { Route, Routes as Switch, useNavigate } from 'react-router-dom';
import Navbar from './components/NavigationBar';
import Home from './components/Home';
import Profile from './components/Profile';
import Contact from './components/auth/Contact';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import PageNotFound from './components/PageNotFound';
import FollowedPost from './components/FollowedPost';
import AllPosts from './components/AllPosts';
import CreatePost from './components/CreatePost';
import OthersProfile from './components/OthersProfile';
import MyPosts from './components/MyPosts';
import { reducer, initialState } from './reducers/userReducer';
import PostOfEvents from './components/profile/PostOfEvents';

export const UserContext = createContext()

const Routing = () => {
  const navigate = useNavigate()
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (user) {
      dispatch({ type: "USER", payload: user });
    }else{
      // if (!navigate.location.pathname.startsWith('/reset'))
        navigate('/signin')
    }
  },[])

  return (
    <Switch>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/home" element={<AllPosts />} />
      <Route exact path="/mypost/:userId" element={<MyPosts />} />
      <Route exact path="/timeline" element={<FollowedPost />} />
      <Route exact path="/createpost" element={<CreatePost />} />
      <Route exact path="/signup" element={<SignUp />} />
      <Route exact path="/signin" element={<Login />} />
      <Route exact path="/profile" element={<Profile />} />
      <Route exact path="/contact" element={<Contact />} />
      <Route exact path="/profile/:userId" element={<OthersProfile />} />
      <Route exact path="/event/:eventId" element={<PostOfEvents />} />
      <Route path='*' element={<PageNotFound />} />
    </Switch>
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState);
  return (
    <UserContext.Provider value={{state,dispatch}}>
     <Navbar/>
     <div style={{marginTop:"5rem"}}></div>
     <Routing/>  
    </UserContext.Provider>
  );
}

export default App;





// function App() {
//   return (
//     <>
//      <Navbar/>
//        <Switch>
//         <Route exact path="/" element={<Home/>}/>
//         <Route exact path="/home" element={<AllPosts/>} />
//         <Route exact path="/createpost" element={<CreatePost/>} />
//         <Route exact path="/signup" element={<SignUp/>} />
//         <Route exact path="/signin" element={<Login/>} />
//         <Route exact path="/profile" element={<Profile/>} />
//         <Route exact path="/contact" element={<Contact/>} />
//         <Route path='*' element={<PageNotFound/>}/>
//       </Switch>  
//     </>
//   );
// }

// export default App;
