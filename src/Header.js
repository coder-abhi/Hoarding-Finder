import React,{useState} from 'react'
import logo from './pirate.svg';
import "./Header.css"
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Map from './Map';
// import Map2 from './Map2';
import SearchFrame from './SearchFrame';
import Details from './Details';

// longitude: 76.92167129017841,
// latitude: 18.848924482522783,
// console.log('hello')
function Header() {
    const [detailsData,setDetailsData] = useState(null)
    console.log(detailsData)
    const [mapC,setMapC] = useState([76.92167129017841,18.848924482522783,6.3188790944311055])
    // function Run(cen){setMapC(cen)}
    return (
        <Router>
            <div className="header">
                <div className="logo">
                    <img src={logo} className="logo-img" alt="" />
                </div>
                <nav className="nav-bar">
                    <ul className="nav-bar-ul">
                        <Link to='/' exact={true}>
                            <li className="header-nav-item"><a>Home</a></li>
                        </Link>

                        <Link to='/maps'>
                            <li className="header-nav-item"><a>Map</a></li>
                        </Link>

                        <Link to='/services'>
                            <li className="header-nav-item"><a>Services</a></li>
                        </Link>

                        <Link to='/about'>
                            <li className="header-nav-item"><a>Abaout Us</a></li>
                        </Link>


                    </ul>
                </nav>

            </div>
            <Switch>
                <Route path='/' exact='true'>
                    <SearchFrame mapFun={setMapC} detailsFun={setDetailsData}/>
                </Route>
                <Route path='/maps'>
                    <Map mapCenter={mapC}/>
                </Route>
                <Route path='/details'>
                   {detailsData && <Details data={detailsData}/>}
                </Route>
            </Switch>
        </Router>
    )
}
export default Header
