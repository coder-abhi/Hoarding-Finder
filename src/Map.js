import React, { useState,useRef,useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import RoomSharpIcon from '@material-ui/icons/RoomSharp';
import db from './NewData.json';
import PopupCard from './PopupCard';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import './Map.css'
const MAPBOX_TOKEN = "pk.eyJ1IjoiYWJoaTI2MjAiLCJhIjoiY2tuemlrajJpMDVhYjJ3bnNhMGcxaGVobCJ9.lpt8PXoPtzQCcjtyB52H7g";

function Map({mapCenter}) {

  const container = useRef(null);
  const geocoder = useRef(null);

  const [viewport, setViewport] = useState({
    longitude: mapCenter[0],
    latitude: mapCenter[1],
    zoom: mapCenter[2]
  });

  useEffect(() => {
    if(geocoder.current) return;
    geocoder.current = new MapboxGeocoder({
        accessToken: MAPBOX_TOKEN,
        bbox: [72.26983589270117, 15.586130847817179, 80.88472451637365, 21.97716963680302],
        placeholder: "Search For Hordings",
        types: 'country locality region postcode district place',
        
        // types: 'country,region,place,postcode,locality,neighborhood'
    });
},[geocoder.current])

useEffect(() => {
  if(!geocoder.current) return;
   geocoder.current.on('result', function (results) {
       setViewport({longitude:results.result.center[0], 
        latitude:results.result.center[1], 
        zoom:10, transitionDuration: 1000, }) 
   }
)})

useEffect(() => {
  if(!geocoder.current ) return;
  geocoder.current.addTo(container.current);
}, [])



  // const [markStatus,setMarkStatus] = useState(false);
  const [showPopup, togglePopup] = useState(false);
  const [popNow,setPopNow] = useState([]);
  return (
    <div className='map-container' >
      <div ref={container} className='geo-container'/>
      <ReactMapGL {...viewport} width="99vw" height="93vh" onViewportChange={setViewport} mapboxApiAccessToken={MAPBOX_TOKEN}
        mapStyle='mapbox://styles/mapbox/streets-v11' onNativeClick={()=>{togglePopup(false)}}
      >


        {
          db.features.map((ele) => {
            return (
              <button onClick={() => { setPopNow(ele); togglePopup(true) }}>

                <Marker latitude={ele.geometry.coordinates[1]} longitude={ele.geometry.coordinates[0]} offsetLeft={-20} offsetTop={-10}>
                  <RoomSharpIcon />
                </Marker>
              </button>
            )

          })}
        {showPopup && <Popup
          latitude={popNow.geometry.coordinates[1]}
          longitude={popNow.geometry.coordinates[0]}
          closeButton={false}
          tipSize= {20}
          className="map-popup"
          closeOnClick={false}
          onClose={() => togglePopup(false)}
          anchor="top"
        // onClick = togglePopup(true)
        >
          <PopupCard data={popNow.properties} name={popNow.properties.name} price={popNow.properties.price} img={popNow.properties.img}/>
        </Popup>}
      </ReactMapGL>
      <div className="sidebar">
        Longitude: {viewport.longitude} | Latitude: {viewport.latitude} | Zoom: {viewport.zoom}
      </div>
    </div>
  );
}
export default Map;
// longitude: 76.92167129017841,
// latitude: 18.848924482522783,