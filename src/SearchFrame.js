import React, { useState, useRef, useEffect } from 'react'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
// import Product from './Product'; //title img price req
import db from './NewData.json';
import './SearchFrame.css'
import TryProduct from './TryProduct';


const MAPBOX_TOKEN = "pk.eyJ1IjoiYWJoaTI2MjAiLCJhIjoiY2tuemlrajJpMDVhYjJ3bnNhMGcxaGVobCJ9.lpt8PXoPtzQCcjtyB52H7g";


// let mapDiv = document.getElementById('geocoder')




function SearchFrame({mapFun,detailsFun}) {
    // console.log("In Search Frame : "+mapFun)
    // console.log(props.status);
    const container = useRef(null);
    const geocoder = useRef(null);
    const [result, setResult] = useState([]);

    // const [sliderVal,setSliderVal] = useState(1000);

    useEffect(() => {
        if (geocoder.current) return;
        geocoder.current = new MapboxGeocoder({
            accessToken: MAPBOX_TOKEN,
            bbox: [72.26983589270117, 15.586130847817179, 80.88472451637365, 21.97716963680302],
            placeholder: "Search For Hordings",
            types: 'country locality region postcode district place'
            // types: 'country,region,place,postcode,locality,neighborhood'
        });
    }, [geocoder.current])

    useEffect(() => {
        if (!geocoder.current) return;
        geocoder.current.addTo(container.current);
    }, [])



    useEffect(() => {
        if (!geocoder.current) return;
        geocoder.current.on('result', function (results) {
            var listA = [];
            var bbox_res = results.result.bbox
            console.log('BBOX = ' + bbox_res);
            for (var ele of db.features) {
                if (ele.geometry.coordinates[0] > bbox_res[0] && bbox_res[2] > ele.geometry.coordinates[0] && ele.geometry.coordinates[1] > bbox_res[1] && bbox_res[3] > ele.geometry.coordinates[1]) {
                    listA.push(ele);
                    console.log(ele);

                    // break;
                }
            }
            setResult(listA);
            console.log(result);
        })

    }) 
    // console.log(sliderVal);

    return (
        <div>
            <div ref={container} className="geocoder"/>
            <div className="result-Screen">
                {/* <div className="result-Filter"> */}
                    {/* <div className='filter-item-box'> */}

                    {/* <h3 className='filter-item'> Price Range </h3> */}
                    {/* <input className='filter-item' type="RANGE" min="2000" max="1000" step="10" value={sliderVal} onChange={(e)=>setSliderVal(e.target.value)} /> */}
                    {/* </div> */}
                {/* </div> */}
                <ul className="result-List">
                    
                    {/* {result.map((item)=> <Product title={item.properties.name} image={item.properties.img} price={item.properties.price} className="product-item"/>)} */}
                    {result.map((item)=><TryProduct id={item.properties.id} title={item.properties.name} price={item.properties.price} image={item.properties.img} center={item.geometry.coordinates} mapFuntion={mapFun} detailsFun={detailsFun}/>)}
                    {/* {result.map((item) =>
                    // console.log(item)
                    // <Product />
                       <Product title={item.properties.name} image={item.properties.img} price={item.properties.price} className="product-item"/>
                    )} */}

                </ul>

            </div>
        </div>
    )
}

export default SearchFrame;
