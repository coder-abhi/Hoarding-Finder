import React from 'react'
import './PopupCard.css'
function PopupCard(props) { 
    return (
        <div class="list-group">
            <div class="card-img-info">
                <img class="card-img" src={props.img} alt="" />
            </div>
            <div class="card-info">
                <span class="card-list-span card-list-span-name">Name : {props.data.name}</span>
                <span class="card-list-span">Price : {props.data.price}</span>
                <span class="card-list-span">{props.data.available == 0? "Rented Out": "Available"}</span>
                <span class="card-list-span">Next Availabe Date : {props.data.nextDate}</span>
                <span class="card-list-span card-list-span-btn">
                    {props.data.available == 0 ? <button className='prebook'>Pre Book Now</button>:<button className='book'>Book Now</button>}
                    </span>
            </div>

        </div>
    )
}

export default PopupCard
