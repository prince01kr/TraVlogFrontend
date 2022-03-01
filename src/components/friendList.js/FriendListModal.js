import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

const FriendListModal = ({data}) => {
    console.log(data);
    const {state,dispatch} = useContext(UserContext);
    return ( 
        <div>
         {
            data.map((item)=>{
                return(
                    <div className="user-data-list">
                       <img src={item.pic ? item.pic : "https://res.cloudinary.com/princekr20/image/upload/v1645680843/TraVlog/default_user_gwvz0i.png"}/>
                       <Link
                          to= {item._id === state._id ? "/profile" : "/profile/"+item._id}
                          style={{textDecoration:"none"}}
                        >
                          <h3>{item.name}</h3>
                        </Link>
                    </div>
                )
            }) 
         }  
        </div>
    )
}

export default FriendListModal