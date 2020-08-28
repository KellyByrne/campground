import React from 'react';
import {Link} from 'react-router-dom';
import '../style.css';
import tinytrees from '../images/CreativeMarket9-10.png';

class Header extends React.Component {
    render() {
        return (
            <div className="row header" >
                <div className="col-12">
                    <div className="title">
                        <div className="logo">
                            <h1>Lakeside Pines</h1>
                            <h2>Campground &amp; RV Community</h2>
                            <img alt="tree" className="tiny" src={tinytrees}/>
                        </div>
                    </div>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/amenities">Amenities</Link></li>
                        <li><Link to="/gallery">Photos</Link></li>
                        <li><Link to="/rates">Park Rates</Link></li>
                        <li><Link to="/rates">Park Map</Link></li>
                        <li><Link to="/book">Book Online</Link></li>
                        <li><Link to="/attractions">Area Attractions</Link></li>
                    </ul>
                </div>
            </div>
        );
    };
}

export default Header;