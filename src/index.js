
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import 'https://mapbox-gl/dist/mapbox-gl.css';

import reportWebVitals from './reportWebVitals';
// mapboxgl.accesssToken = 'pk.eyJ1IjoiYWJoaTI2MjAiLCJhIjoiY2tuemlrajJpMDVhYjJ3bnNhMGcxaGVobCJ9.lpt8PXoPtzQCcjtyB52H7g';

ReactDOM.render(
  <React.StrictMode>
    <App />
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
