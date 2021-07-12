import React from 'react';
import { Link } from 'react-router-dom';
import tinytrees from '../images/CreativeMarket9-10.png';

class Footer extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                    <div className="footer">
                        <div className="title desktoponly">
                            <div className="logo">
                                <h1>Lakeside Pines</h1>
                                <h2>Campground &amp; RV Resort</h2>
                                <img alt="tree" className="tiny" src={tinytrees}/>
                            </div>
                        </div>
                        <p>1645 E Highway 25, Dandridge, TN 37725</p>
                        <p><button className="carousel-button blue"><Link to="/book">Book Online</Link></button> or call at 832.465.6700</p>
                        <p className="copy desktoponly">© Designed &amp; Developed by Kelly Bennett 2020</p>
                    </div>
                    </div>
                </div>
            </div>
        );
    };
}

export default Footer;