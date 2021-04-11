import React from 'react';
import sitemap from '../../images/cane-creek-camp-map.png';

class ParkMap extends React.Component {
    render() {
        return (
            <div>
                <h1>Park Map</h1>
                <img alt="tree" src={sitemap}/>
            </div>
        );
    };
}

export default ParkMap;