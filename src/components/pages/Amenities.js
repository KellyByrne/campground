import React from 'react';
import building from '../../images/building.svg';
import doubletrees from '../../images/doubletrees.svg';
import hikingpack from '../../images/hikingpack.svg';
import map from '../../images/map.svg';
import marshmallows from '../../images/marshmallows.svg';
import mtnandwater from '../../images/mtnandwater.svg';
import scenictrees from '../../images/scenictrees.svg';
import snorkel from '../../images/snorkel.svg';
import tentandwater from '../../images/tentandwater.svg';
import waterandfish from '../../images/waterandfish.svg';

class Amenities extends React.Component {
    render() {
        return (
            <div className="circle-icon">
                {/* <h1>Amenities</h1> */}
                <div class="outer">
                    <div class="inner rotate">
                        <h1>Amenities</h1>
                        <div class="blue-highlight"></div>
                    </div>
                </div>
                <div className="row">
                    <div className="circle-container col-lg-4 col-sm-12">
                        <div className="circle"><img alt="tree" src={waterandfish}/></div>
                            <h4>Lakefront Camp &amp; Play</h4>
                            <p>12 acres of land along Douglas Lake offers scenic beauty and a peaceful nature getaway </p>
                    </div>
                    <div className="circle-container col-lg-4 col-sm-12">
                        <div className="circle"><img alt="tree" src={snorkel}/></div>
                            <h4>Indoor Swimming Pool</h4>
                            <p>An indoor swimming pool is a fun everyday activity but especially perfect on rainy or cold days, or for a little time out of the sun </p>
                    </div>
                    <div className="circle-container col-lg-4 col-sm-12">
                        <div className="circle"><img alt="tree" src={marshmallows}/></div>
                            <h4>Free &amp; Fast Wifi</h4>
                            <p>Our wifi offers top speeds ... </p>
                    </div>
                </div>
                <div className="row">
                    <div className="circle-container col-lg-4 col-sm-12">
                        <div className="circle"><img alt="tree" src={doubletrees}/></div>
                            <h4>Leash Free Dog Park</h4>
                            <p>Let your dog experience the freedom and joy of leash free life at our fully fenced in dog park</p>
                    </div>
                    <div className="circle-container col-lg-4 col-sm-12">
                        <div className="circle"><img alt="tree" src={mtnandwater}/></div>
                            <h4>Lake Rentals</h4>
                            <p>Rent kayaks, canoes, peddleboats, paddleboards, and more for a fun, activity filled day at the lake </p>
                    </div>
                    <div className="circle-container col-lg-4 col-sm-12">
                        <div className="circle"><img alt="tree" src={building}/></div>
                            <h4>Clean private restrooms</h4>
                            <p>Enjoy clean private restrooms with tile showers</p>
                    </div>
                </div>
                <div className="row">
                    <div className="circle-container col-lg-4 col-sm-12">
                        <div className="circle"><img alt="tree" src={scenictrees}/></div>
                            <h4>Full Camper Hookups</h4>
                            <p>40/50 amp hookups, water, sewage </p>
                    </div>
                    <div className="circle-container col-lg-4 col-sm-12">
                        <div className="circle"><img alt="tree" src={tentandwater}/></div>
                            <h4>Tent Sites</h4>
                            <p>Soft tent pads </p>
                    </div>
                    <div className="circle-container col-lg-4 col-sm-12">
                        <div className="circle"><img alt="tree" src={map}/></div>
                            <h4>Prime Location</h4>
                            <p>Lakeside Pines is located 30 minutes from Sevierville and Knoxville, 40 from Pigeon Forge, and about an hour to Gatlinburg and Smoky Mountain National Park</p>
                    </div>
                </div>
                <div className="row">
                    <div className="circle-container col-lg-4 col-sm-12">
                        <div className="circle"><img alt="tree" src={hikingpack}/></div>
                            <h4>Area Attractions</h4>
                            <p>Dandridge attractions </p>
                    </div>
                </div>
            </div>
        );
    };
}

export default Amenities;