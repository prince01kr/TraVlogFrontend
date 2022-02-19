import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
    return (
        <>
            <Navbar bg="dark" expand="lg">
                <Container className="navb">
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
                            <Link className='underline-effect navbar-links' to="/">Home</Link>
                            <Link className='underline-effect navbar-links' to="/profile">Profile</Link>
                            <Link className='underline-effect navbar-links' to="/contact">Contact</Link>
                            <Link className='underline-effect navbar-links' to="/signin">Login</Link>
                            <Link className='underline-effect navbar-links' to="/signup">Register</Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default NavigationBar;
