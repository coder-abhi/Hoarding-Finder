import React from 'react'
import './Product.css';
import { BrowserRouter as Route, Switch, Link } from 'react-router-dom';
import MapSharpIcon from '@material-ui/icons/MapSharp';

function TryProduct({id, title, price, image, center, mapFuntion ,detailsFun}) {
    // console.log("In Try Product"+mapFuntion)
    function sendMapData() {
        center.push(12);
        console.log("Center === " + center)
        mapFuntion(center);
    }
    console.log("ID ========== "+id)
    return (
        <div className="product">
            <div className="product-info">
                <p>{title}</p>
                <p className="product-price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
            </div>
            <img src={image} alt="Not Found" />
            <div className="product-button">

                <Link to='/details'>
                    <button onClick={detailsFun(id)} className='product-full-button'>
                        See Full Specification
                </button>
                </Link>
                <span title="See On Map" className='product-map-icon'>
                    <Link to='/maps'>
                        <MapSharpIcon onClick={() => sendMapData()} />
                    </Link>

                </span>
            </div>
        </div>
    )
}

export default TryProduct
