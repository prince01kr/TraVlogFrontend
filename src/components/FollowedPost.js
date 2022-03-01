import React, { useState, useEffect } from 'react';
import '../resources/css/posts.css';
import axios from 'axios';
import OnePost from './OnePost';
const BACKEND_API = process.env.REACT_APP_SERVER_API;


const AllPosts = () => {

  const [data, setData] = useState([]);

  const fetchingData = async () => {
    try {
      const token = window.localStorage.getItem('jwt');
      const config = {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
      }
      const res = await axios.get(`${BACKEND_API}/followedPost`, config);
      console.log("Hello", res.data);
      setData(res.data.allPosts);
    } catch (err) {
      console.log("Post is not fetching....");
      console.log('Error:  ', err.message);
    }
  }

  useEffect(() => {
    //Calling
    fetchingData();
  }, [])

  const likePost = async (id) => {
    try {
      const token = window.localStorage.getItem('jwt');
      const config = {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
      }
      const temp_post = { postId: id };
      const res = await axios.put(`${BACKEND_API}/like`, temp_post, config);
      // console.log(res.data);
      const post_data = res.data;
      const newData = data.map((item) => {
        if (item._id === post_data._id) {
          return post_data
        }
        else {
          return item
        }
      });
      setData(newData);
    }
    catch (err) {
      console.log(`Error: ${err}`);
    }
  }

  const unlikePost = async (id) => {
    try {
      const token = window.localStorage.getItem('jwt');
      const config = {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
      }
      const temp_post = { postId: id };
      const res = await axios.put(`${BACKEND_API}/unlike`, temp_post, config);
      const post_data = res.data;
      // console.log(post_data);
      const newData = data.map((item) => {
        if (item._id === post_data._id) {
          return post_data
        }
        else {
          return item
        }
      });
      setData(newData);

    }
    catch (err) {
      console.log(`Error: ${err}`);
    }
  }

  const makeComment = async (text, postId) => {
    try {
      const token = window.localStorage.getItem('jwt');
      const config = {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
      }
      const temp_comment = { postId, text };
      // console.log(temp_comment);
      const res = await axios.put(`${BACKEND_API}/comment`, temp_comment, config);
      // console.log(res.data);
      const post_data = res.data;
      const newData = data.map((item) => {
        if (item._id === post_data._id) {
          return post_data
        }
        else {
          return item
        }
      });
      setData(newData);
    }
    catch (err) {
      console.log(`Error: ${err}`);
    }
  }

  const deletePost = async (postId) => {
    try {
      const token = window.localStorage.getItem('jwt');
      const config = {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
      }
      const res = await axios.delete(`${BACKEND_API}/deletepost/${postId}`, config);
      console.log(res.data);
      const del_data = res.data;
      const newData = data.filter((item) => {
        return item._id !== del_data._id
      });
      setData(newData);
      fetchingData();
    }
    catch (err) {
      console.log(`Error: ${err}`);
    }
  }


  const deleteComment = async (commentId,postId) => {
    try {
      const token = window.localStorage.getItem('jwt');
      const config = {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
      }
      const temp = {commentId,postId};
      const res = await axios.delete(`${BACKEND_API}/deletecomment`,{params: temp}, config);
      console.log(res.data);
      const del_data = res.data;
      const newData = data.filter((item) => {
        return item._id !== del_data._id
      });
      setData(newData);
      fetchingData();
    }
    catch (err) {
      console.log(`Error: ${err}`);
    }
  }



  return (
    <div className="all-posts-container">
      <div className="all-post-container-box">
        {
          data.length 
          ?
          data.map((item) => {
            return (
              <OnePost
                item={item} 
                unlikePost={unlikePost}
                likePost={likePost}
                makeComment={makeComment}
                deletePost={deletePost}
                deleteComment={deleteComment}
              />
            )
          }) 
          :
          <p style={{fontSize:"3rem",marginTop:"5rem"}}>No post available.......</p> 
        }
      </div>
    </div>
  )
}

export default AllPosts;


