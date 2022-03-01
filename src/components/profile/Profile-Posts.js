import React from 'react'
import { Tabs,Tab} from 'react-bootstrap';
import MyPost from './MyPost';
import Details from './Details';
import Events from './Events';

const Profile_Posts = ({mypost,allEvents}) => {
  return (
    <div className='profile-posts'>
       <Tabs 
            defaultActiveKey="posts"
            transition={true}
            id="noanim-tab-example"
            className="profile-nav-bottom mb-3"
          >
            <Tab eventKey="posts" title="Posts">
              <MyPost
                mypost={mypost}
              />
            </Tab>
            <Tab eventKey="events" title="Tours">
              <Events
                allEvents={allEvents}
              />
            </Tab>
            <Tab eventKey="details" title="Details">
              <Details/>
            </Tab>
        </Tabs>
    </div>
  )
}

export default Profile_Posts;