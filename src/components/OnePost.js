import React, { useState, useContext } from 'react';
import { UserContext } from '../App';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const OnePost = ({
    item, unlikePost, likePost,
    makeComment, deletePost,
    deleteComment, editPost
}) => {

    const { state, dispatch } = useContext(UserContext);
    const [title, setTitle] = useState(item.title);
    const [body, setBody] = useState(item.body);
    const [image, setImage] = useState('');

    console.log("xxxx", item.comments);
    const len = item.comments.length;

    //Boot-Strap Modals functionality for (View All Comments)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //Boot-Strap Modals functionality for (Delete Post)
    const [showDel, setShowDel] = useState(false);
    const handleCloseDel = () => setShowDel(false);
    const handleShowDel = () => setShowDel(true);

    //Boot-Strap Modals functionality for (Edit Post)
    const [showEd, setShowEd] = useState(false);
    const handleCloseEd = () => setShowEd(false);
    const handleShowEd = () => setShowEd(true);


    return ( 
        <>
            <div className="all-posts-post" key={item._id}>
                <div className="all-post-heading">
                    <div className="all-posts-heading-pic">
                        <Link
                            to={item.postedBy._id === state._id ? "/profile" : "/profile/" + item.postedBy._id}
                        >
                            <img className="all-posts-head-img" src={item.postedBy.pic ? item.postedBy.pic : "https://res.cloudinary.com/princekr20/image/upload/v1645680843/TraVlog/default_user_gwvz0i.png"} />
                        </Link>
                    </div>
                    <div className="all-posts-heading-name">
                        <h2>
                            <Link
                                style={{ textDecoration: "none", color: "black" }}
                                to={item.postedBy._id === state._id ? "/profile" : "/profile/" + item.postedBy._id}
                            >
                                {item.postedBy.name}</Link>
                        </h2>
                    </div>
                </div>
                <div className="delete-post">
                    {
                        item.postedBy._id === state._id
                        &&
                        <>
                            <i
                                onClick={handleShowEd}
                                class="material-icons delete-post-btn"
                            >
                                create</i>

                            <i
                                onClick={handleShowDel}
                                class="material-icons delete-post-btn"
                            >
                                delete</i>
                        </>
                    }
                </div>
                <hr class="heading-line" />
                {/* <br /> */}

                <div className="all-post-body">
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                    <img className="all-post-body-pic" src={item.photo} alt="Loading Images" />
                </div>


                <div className="all-post-like">
                    <div className="likee">
                        {
                            item.likes.includes(state._id)
                                ?
                                <i className="material-icons likee-icon"
                                    style={{ color: "red", marginLeft: "1.5rem", fontSize: "3rem" }}
                                    onClick={() => { unlikePost(item._id) }}
                                >thumb_down</i>
                                :
                                <i className="material-icons likee-icon"
                                    style={{ color: "green", marginLeft: "1.5rem", fontSize: "3rem" }}
                                    onClick={() => { likePost(item._id) }}
                                >thumb_up</i>
                        }

                    </div>
                    <div style={{ fontSize: "1.4rem", marginLeft: "1.5rem" }}>{item.likes.length} likes   <span style={{ marginLeft: "1rem" }}>{len} Comments</span></div>
                    {
                        len > 0
                        &&
                        <div style={{ marginTop: "0.5rem", marginLeft: "1.5rem" }}>
                            <h5 style={{ color: "purple" }}>{item.comments[len - 1].postedBy.name}</h5>
                            <p>{item.comments[len - 1].text}</p>
                        </div>

                    }

                    <form onSubmit={(e) => {
                        e.preventDefault();
                        makeComment(e.target[0].value, item._id);
                        e.target.reset();
                    }}>
                        <input className="comment-section"
                            type="text" placeholder='Add Comment'
                        />
                        <button type='submit' className="hit-comment"><i class="material-icons">add</i></button>
                        <div className='comment-button'>
                            <button class='comment-btn' type='button'
                                onClick={handleShow}
                            >Comments</button>
                        </div>
                    </form>

                </div>

                {/* Modals */}

                {/* 1. Delete Modal */}
                <Modal
                    show={showDel}
                    onHide={handleCloseDel}
                    backdrop="static"
                    keyboard={false}
                    scrollable={true}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Do you Agree to Delete the Post?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary"
                            onClick={() => {
                                deletePost(item._id);
                                handleCloseDel();
                            }}
                        >
                            Yes
                        </Button>
                        <Button variant="secondary" onClick={handleCloseDel}>
                            No
                        </Button>
                    </Modal.Footer>
                </Modal>


                {/* 2. Edit Modal */}
                <Modal
                    show={showEd}
                    onHide={handleCloseEd}
                    backdrop="static"
                    keyboard={false}
                    scrollable={true}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Editing Post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <ToastContainer />
                        <div className="create-container-box">
                            <form>
                                <input className="comment-section"
                                    type="text"
                                    name='title'
                                    placeholder='Add Title'
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                <input className="comment-section"
                                    type="text"
                                    name='body'
                                    placeholder='Add Description'
                                    value={body}
                                    onChange={(e) => setBody(e.target.value)}
                                />
                                <div className="create-post-upload-image">
                                    <span style={{ fontSize: "1.3rem", color: "brown", marginRight: "5px" }}>Upload Image:</span>
                                    <input
                                        type="file"
                                        name="filename"
                                        onChange={(e) => setImage(e.target.files[0])}
                                    />
                                </div>
                            </form>
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary"
                            onClick={() => {
                                editPost(item._id, title, body, image);
                                handleCloseEd();
                            }}
                        >
                            Edit Done
                        </Button>
                        <Button variant="secondary" onClick={handleCloseEd}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>


                {/*3.View All Comments Modal  */}

                <Modal
                    scrollable={false}
                    show={show}
                    onHide={handleClose}
                    // backdrop="dynamic"
                    // keyboard={false}
                    // scrollable={true}
                >
                    <Modal.Header closeButton>
                        <Modal.Title >All Comments</Modal.Title>
                    </Modal.Header>


                    <div className="all-comments-container">
                        {
                            item.comments.map((record) => {
                                return (
                                    
                                    <div className="all-comment" key={record._id}>
                                        <div className="comments-head">
                                            <img src={record.postedBy.pic} />
                                            <Link style={{textDecoration:"none"}} to={record.postedBy._id === state._id ? "/profile" : "/profile/" + record.postedBy._id}><h5 style={{ color: "purple", display: "flex",alignItems:"center" }}>{record.postedBy.name}</h5></Link>
                                            <span className="comments-del">
                                                {
                                                    record.postedBy._id === state._id
                                                    &&
                                                    <i
                                                        onClick={() => {
                                                            deleteComment(record._id, item._id);
                                                        }}
                                                        style={{ color: "grey", marginRight: "2rem", fontSize: "1.4rem", cursor: "pointer" }}
                                                        className="material-icons"
                                                    >
                                                        delete</i>
                                                }
                                            </span>
                                        </div>
                                        <p>{record.text}</p>
                                        {/* <hr/> */}
                                    </div>


                                )
                            })
                        }
                    </div>

                    <form onSubmit={(e) => {
                        e.preventDefault();
                        makeComment(e.target[0].value, item._id);
                        e.target.reset();
                    }}>
                        <input className="comment-section"
                            style={{ marginBottom: "1rem" }}
                            type="text" placeholder='Add Comment'
                        />
                        <button type='submit' className="hit-comment"><i class="material-icons">add</i></button>
                    </form>


                </Modal>

            </div>
        </>
    )
}

export default OnePost