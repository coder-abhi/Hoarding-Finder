import React,{useState,useEffect} from 'react'
import './Details.css'
import db from './NewData.json';

function Details({data}) {
    const [dataId ,setDataId] = useState(null)
    // db.filter((item)=>console.log(item))
    useEffect(()=>{
        for(var ele of db.features){
            if(ele.properties.id === data){
                setDataId(ele.properties); break;}}
                // console.log(db)
            },[])
            console.log(dataId)
            return (
        <div className='details'>{dataId && <div className='details-frame'>
            <h2 >{dataId.name}</h2>
            <img className='details-img' src={dataId.img} />
            <div >Full Adress : --------------------------------------- </div>
            <div className='details-price'>
                <small>$</small>
                <strong>{dataId.price}</strong>
            </div>
            <div> Availability : {dataId.available == 0? "Booked": "Available"}</div>
            <div className='details-date'>Next Available Date : {dataId.nextDate}</div>
            {dataId.available == 0 ? <button className='prebook'>Pre Book Now</button>:<button className='book'>Book Now</button>}
            </div>
        }
        </div>
    )
}

export default Details
