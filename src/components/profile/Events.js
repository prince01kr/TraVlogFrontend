import React from 'react'
import OneEvent from './OneEvent';
import '../../resources/css/event.css';

const Events = ({ allEvents }) => {
    // console.log('hyy', allEvents); 
    return (
        <div className="my-posts">
            {
                allEvents
                    ?
                    allEvents.map((item) => {
                        return (
                                <OneEvent
                                    event={item}
                                />   
                        ); 
                    })
                    :
                    <p>No Post Available.....</p>
            }
        </div>
    )
}

export default Events