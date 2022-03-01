import React, { useContext, useState, useEffect } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import logout from '../resources/images/logout-image.png';
const BACKEND_API = process.env.REACT_APP_SERVER_API;

const NavigationBar = () => {

    const navigate = useNavigate();
    const { state, dispatch } = useContext(UserContext);
    const [search, setSearch] = useState('');
    const [userData, setUserData] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    //Boot-Strap Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    useEffect(() => {
        const filteredResults = userData.filter((user) => {
            return ((user.name).toLowerCase()).includes(search.toLowerCase())
        })
        setSearchResults(filteredResults.reverse())
    }, [search])


    const fetchUsers = async () => {
        try {
            const token = window.localStorage.getItem('jwt');
            const config = {
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
            }
            const res = await axios.get(`${BACKEND_API}/all-users`, config);
            console.log("Hello", res.data);
            setUserData(res.data.allUsers);
        } catch (err) {
            console.log("Post is not fetching....");
            console.log('Error:  ', err.message);
        }
    }



    const renderList = () => {
        if (state) {
            return [
                <i className="material-icons search-icon" style={{ fontSize: "2rem" }}
                    onClick={() => {
                        handleShow();
                        fetchUsers();
                    }} 
                >search</i>,
                <Link key="1" className='underline-effect navbar-links ' to="/home">All Posts</Link>,
                <Link key="2" className='underline-effect navbar-links' to="/timeline">My Following's Posts</Link>,
                <Link key="3" className='underline-effect navbar-links' to="/createpost">Create</Link>,
                <Link key="4" className='underline-effect navbar-links' to="/profile">Profile</Link>,
                <Link key="5" className='underline-effect navbar-links' to="/contact">Contact</Link>,
                <button key="6" className="log-out-btn"
                    onClick={() => {
                        localStorage.clear();
                        dispatch({ type: "CLEAR" });
                        navigate('/signin');
                    }}
                >
                    <img className="logout-image" src={logout} alt="Loading Image" />
                </button>
            ]
        } else {
            return [
                <Link key="1" className='underline-effect navbar-links' to="/">Home</Link>,
                <Link key="2" className='underline-effect navbar-links' to="/signin">Login</Link>,
                <Link key="3" className='underline-effect navbar-links' to="/signup">Register</Link>
            ]
        }
    }


    return (
        <>
            <Navbar bg="dark" expand="lg" className="navbar">
                <Container className="navba">
                    <Navbar.Brand>
                        <Link to="/" className="navbar-logo">
                            <span style={{ paddingRight: "1.2rem", paddingLeft: "2rem" }}>
                                TraVlog
                            </span>
                            <i className="fas fa-tenge"></i>
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="navbar-menu ms-auto">
                            {renderList()}
                        </Nav>
                    </Navbar.Collapse>


                    <Modal scrollable={true} show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                <input
                                    placeholder='Search User'
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            {
                                search &&
                                searchResults.map((item) => {
                                    return (
                                        <div className="user-data-list">
                                        <img src={item.pic ? item.pic : "https://res.cloudinary.com/princekr20/image/upload/v1645680843/TraVlog/default_user_gwvz0i.png"}/>
                                            <Link
                                                style={{textDecoration:"none"}}
                                                to={item._id === state._id ? "/profile" : `/profile/${item._id}`}
                                                onClick={() => {
                                                    setSearch('');
                                                    handleClose();
                                                }}
                                            >
                                                <h3>{item.name}</h3></Link>
                                        </div>
                                    );
                                })
                            }
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary"
                                onClick={() => {
                                    handleClose();
                                    setSearch('');
                                }}
                            >
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>









                    {/* <Modal scrollable={true} show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                <input
                                    placeholder='Search User'
                                    value={search}
                                    onChange={(e) => fetchUsers(e.target.value)}
                                />
                            </Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            {
                                userData.map((item) => {
                                    return (
                                        <button
                                            onClick={() => {
                                                setSearch('');
                                            }}
                                        >
                                            <Link
                                                style={{ textDecoration: "none", color: "black" }}
                                                to={item._id === state._id ? "/profile" : `/profile/${item._id}`}
                                            >
                                                <h2>{item.name}</h2></Link>
                                        </button>

                                    );
                                })
                            }
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary"
                                onClick={() => {
                                    handleClose();
                                    setSearch('');
                                }}
                            >
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal> */}

                </Container>
            </Navbar>
        </>
    );
};

export default NavigationBar;
