import React from 'react';
import { Link } from 'react-router-dom';
import tinytrees from '../images/CreativeMarket9-10.png';
import '../style.css';

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.scrollElement = React.createRef();

        this.state = {
            isActive: false
        };
    }

    makeActive = () => {
        // console.log(this.state.isActive);
        if (this.state.isActive) {
            this.setState({isActive: false})
        } else {
            this.setState({isActive: true})
        }
    }
    
    render() {
        return (
            <div className="row header" >
                <div className="col-lg-12 col-sm-12">
                    <div className="title">
                        <Link to="/">
                            <div className="logo" >
                                <h1>Lakeside Pines</h1>
                                <h2>Campground &amp; RV Resort</h2>
                                <img alt="tree" className="tiny" src={tinytrees}/>
                            </div>
                        </Link>
                    </div>
                    {/* hide on mobile- show when hamburger clicked */}
                    <ul className={`collapse-mobile ${this.state.isActive ? "is-active" : ""}`}>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/amenities">Amenities</Link></li>
                        <li><Link to="/gallery">Photos</Link></li>
                        <li><Link to="/rates">Park Rates</Link></li>
                        <li><Link to="/parkmap">Park Map</Link></li>
                        <li><Link to="/book">Book Online</Link></li>
                        <li><Link to="/attractions">Area Attractions</Link></li>
                    </ul>
                    {/* hide on desktop */}
                    {/* Trigger the active state by appending class name is-active: */}
                    <button onClick={this.makeActive} className={`hamburger hamburger--slider mobileonly ${this.state.isActive ? "is-active" : ""}`} type="button">
                        <span className="hamburger-box">
                            <span className="hamburger-inner"></span>
                        </span>
                    </button>
                
                </div>
            </div>
        );
    };
}

export default Header;