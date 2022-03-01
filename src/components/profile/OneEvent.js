import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { UserContext } from '../../App';
// import '../../resources/css/event.css';

const OneEvent = ({ event }) => {

    //Boot-Strap Modals functionality for (Delete Post)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { state, dispatch } = useContext(UserContext);

    console.log('gello', event);

    return (
        <div className="my-post-box" key={event._id}>
            <img className="my-post-pic" src={event.photo} alt="Image Loading" />
            <button
                onClick={() => {
                    handleShow();
                }}
            >Open</button>

            {/* Open Modal */}
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                scrollable={true}
            >

                <Modal.Body>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                        <h2>{event.title}</h2>
                        <div>
                            startDate: {event.startDate}
                        </div>
                        <div>
                            endDate: {event.endDate}
                        </div>
                        <img
                            src={event.photo} alt="Loading Event"
                            style={{ width: "100%", height: "100%" }}
                        />


                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {
                        event.createdBy._id === state._id
                            ?
                            <Link className='create-event-button' to={"/event/" + event._id}><Button variant="secondary">Add Post & View Tour</Button></Link>
                            :
                            <Link className='create-event-button' to={"/event/" + event._id}><Button variant="secondary">View Post</Button></Link>
                    }
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default OneEvent;