import React from 'react';
import { Route,Routes as Switch,BrowserRouter as Router} from 'react-router-dom';
import Navbar from './components/NavigationBar';
import Home from './components/Home';
import Profile from './components/Profile';
import Contact from './components/Contact';
import Login from './components/Login';
import SignUp from './components/SignUp';
import PageNotFound from './components/PageNotFound';

function App() {
  return (
    <>
     <Navbar/>
       <Switch>
        <Route path="/" element={<Home/>}/>
        <Route exact path="/signup" element={<SignUp/>} />
        <Route exact path="/signin" element={<Login/>} />
        <Route exact path="/profile" element={<Profile/>} />
        <Route exact path="/contact" element={<Contact/>} />
        <Route path='*' element={<PageNotFound/>}/>
      </Switch>  
    </>
  );
}

export default App;
