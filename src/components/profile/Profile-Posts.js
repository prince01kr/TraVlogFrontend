import React from 'react'
import { Tabs,Tab} from 'react-bootstrap';
import MyPost from './MyPost';
import Details from './Details';

const Profile_Posts = () => {
  return (
    <div className='profile-posts'>
       <Tabs
            defaultActiveKey="home"
            transition={false}
            id="noanim-tab-example"
            className="profile-nav-bottom mb-3"
          >
            <Tab eventKey="home" title="Your Posts">
              <MyPost/>
            </Tab>
            <Tab eventKey="profile" title="Your Details">
              <Details/>
            </Tab>
          </Tabs>
    </div>
  )
}

export default Profile_Posts;